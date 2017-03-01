// ProfileDetails View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/Account"
], function( $, Backbone, AccountModel ) {

    // Extends Backbone.View
    var ProfileDetailsView = Backbone.View.extend( {
    	events: {
	    	'touchend #download-confirm-btn': 'downloadProfile',
	    	'touchend #profile-download-btn': 'confirmDownload',
	    	'touchend .back-button': 'goBack'
    	},
    
    	attributes: {
	    	"data-role": "page",
	    	"id": "account",
	    	"data-title": "Account Details"
    	},

    	sectionTitle: 'Profile Details',
		
        // The View Constructor
        initialize: function(attrs) {
			this.progressTemplate = attrs.progressTemplate;
			this.profileDetailsTemplate = attrs.profileDetailsTemplate;
        },

        // Renders all of the Category models on the UI
        render: function() {
            var _template = _.template(this.progressTemplate);
			this.$el.html(_template({header: 'Accounts',message: 'Gathering profile details. Please wait.'}));

			App.changeTitle(this.sectionTitle);

			App.resetTimer();

            // Maintains chainability
            return this;
        },
        
        getProfileDetails: function(id){
        	var self = this;    
        	var model = App.profileCollection.get(id);
        	console.log(model);
        	var mnoId = model.get('provider');
        	var subscriptionType = model.get('description');
        	$.post( App.config.server + App.config.getProfileDetailsAPI, {mnoId: mnoId, subscriptionType: subscriptionType} ).done(function( data ) {
        		var returnedData = JSON.parse(data);
        		model.set({eid: returnedData.rows.eid, iccid: returnedData.rows.iccid, phoneNumber: returnedData.rows.phoneNumber, profileId: returnedData.rows.profileId, dateActivated: returnedData.rows.dateActivated});
        		App.profileCollection.set(model, {remove: false});
        		//alert('id: ' + newModel.get('id') + 'mnoId: ' + newModel.get('provider') + '\nsubscriptionType: ' + newModel.get('description') + '\neid: ' + newModel.get('eid') + '\niccid: ' + newModel.get('iccid'));
				var _template = _.template(self.profileDetailsTemplate);
				self.$el.html(_template(model.toJSON()));
        	});
        },
        
        confirmDownload: function(){
	        var self = this;
        	navigator.notification.confirm(
			    'Please confirm that you are authorizing a change of the profile associated with that device.\n\nThe time required to complete this transaction may vary depending on your network conditions.',  // message
			    function(button){
			    	if(button == 2){
			    		var timeoutValue = App.timeOut;	
			    		if(!timeoutValue){	    		
			    			self.downloadProfile();
			    		}else	{
			    			navigator.notification.alert(
			    		            'The application timed out, Please login again',  	// message
			    		           '',         						// callback
			    		            'Time Out',           		 	// title
			    		            'OK'                  			// buttonName
			    		        );
			    		}
			    	}
			    },         // callback
			    'Download Profile',            // title
			    ['Cancel', 'Download']                  // buttonName
			);
        },
        
        downloadProfile: function(){
	        var makeActive = $(this.$el).find('#make-active-checkbox').is(':checked');
	        var model = App.profileCollection.get($(this.$el).find('#active-profile-details').data('id'));
	        $.post( App.config.server + App.config.downloadProfileAPI, {
	        		profileId: model.get('profileId'), 
					eid: model.get('eid'),
					iccid: model.get('iccid'),
					enableProfile: makeActive
	        	}).done(function( data ) {
	        		var returnedData = JSON.parse(data);
	        		var jobId = returnedData.jobId.jobId;
					if(jobId != "" && jobId != null){
			        	App.jobsPending.push(jobId);
		        	}
				Backbone.history.navigate('account?' + App.currentAccount, {trigger: true});
        	});
        },
        
        goBack: function(){
        	App.isBack = true;
	        Backbone.history.navigate('profileList', {trigger: true});
        }
    } );

    // Returns the View class
    return ProfileDetailsView;

} );