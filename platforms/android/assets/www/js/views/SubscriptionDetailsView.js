// SubscriptionDetails View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone"
], function( $, Backbone ) {

    // Extends Backbone.View
    var SubscriptionDetailsView = Backbone.View.extend( {
    	events: {
    		'touchend #profile-active-btn': 'confirmActiveProfile',
    		'touchend #profile-stop-btn': 'confirmDeleteProfile',
			'touchend #profile-disable-btn': 'confirmDisableProfile',
	    	'touchend #profile-active-confirm-btn': 'makeProfileActive',
			'touchend #profile-disable-confirm-btn': 'disableProfile',
			'touchend #profile-delete-btn': 'deleteProfile',
	    	'touchend .back-button': 'goBack'
    	},
    
    	attributes: {
	    	"data-role": "page",
	    	"id": "subscription-details"
    	},

    	sectionTitle: 'Subscription Details',
		
        // The View Constructor
        initialize: function(attrs) {
			this.progressTemplate = attrs.progressTemplate;
			this.subscriptionDetailsTemplate = attrs.subscriptionDetailsTemplate;
		
	        
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

        getSubscriptionDetails: function(id){
        	var self = this;
        	var model = App.subscriptionCollection.get(id);
        	console.log(model);
        	var profileId = model.get('profileId');
        	var eid = model.get('eid');
        	var iccid = model.get('iccid');
        	$.post( App.config.server + App.config.getManageProfileDetails, {profileId: profileId} ).done(function( data ) {
        		var returnedData = JSON.parse(data);
        		model.set({
        			eid: returnedData.rows.eid,
        			iccid: returnedData.rows.iccid, 
        			profileId: returnedData.rows.profileId, 
        			dateActivated: returnedData.rows.dateActivated,
        			description: returnedData.rows.description,
					isDefault: returnedData.rows.isDefault,
					status: returnedData.rows.status
					
        		});
        		App.subscriptionCollection.set(model, {remove: false});
        		//alert('id: ' + newModel.get('id') + 'mnoId: ' + newModel.get('provider') + '\nsubscriptionType: ' + newModel.get('description') + '\neid: ' + newModel.get('eid') + '\niccid: ' + newModel.get('iccid'));
				
				var _template = _.template(self.subscriptionDetailsTemplate);
				self.$el.html(_template(model.toJSON()));
        	});
        },
        
        confirmActiveProfile: function(){
	        var self = this;
        	navigator.notification.confirm(
			    'Please confirm that you are authorizing a change of the profile associated with that device. The time required to complete this transaction may vary depending on your network conditions.',  // message
			    function(button){
			    	if(button == 2){
				    	self.makeProfileActive();
			    	}
			    },         // callback
			    'Activate Profile',            // title
			    ['Cancel', 'Ok']                  // buttonName
			);
        },
        
        makeProfileActive: function(){
	        var model = App.subscriptionCollection.get($(this.$el).find('#subscription-profile-details').data('id'));
	        $.post( App.config.server + App.config.makeProfileActiveAPI, {
	        		profileId: model.get('profileId'), 
					eid: model.get('eid'),
					iccid: model.get('iccid')
	        	}).done(function( data ) {
	        		var returnedData = JSON.parse(data);
	        		var jobId = returnedData.jobId.jobId;
					if(jobId != "" && jobId != null){
			        	App.jobsPending.push(jobId);
		        	}
				Backbone.history.navigate('account?' + App.currentAccount, {trigger: true});
        	});
        },
        
		confirmDisableProfile: function(){
	        var self = this;
        	navigator.notification.confirm(
			    'Please confirm that you are authorizing a change of the profile associated with that device.Operation Requested is disable profile',  // message
			    function(button){
			    	if(button == 2){
				    	self.disableProfile();
			    	}
			    },         // callback
			    'Disable Profile',            // title
			    ['Cancel', 'Ok']                  // buttonName
			);
        },
        
        disableProfile: function(){
	        var model = App.subscriptionCollection.get($(this.$el).find('#subscription-profile-details').data('id'));
	        $.post( App.config.server + App.config.disableProfileAPI, {
	        		profileId: model.get('profileId'), 
					eid: model.get('eid'),
					iccid: model.get('iccid'),
					enableProfile:'false'
	        	}).done(function( data ) {
	        		var returnedData = JSON.parse(data);
	        		var jobId = returnedData.jobId.jobId;
					if(jobId != "" && jobId != null){
			        	App.jobsPending.push(jobId);
		        	}
				Backbone.history.navigate('account?' + App.currentAccount, {trigger: true});
        	});
        },
		
        confirmDeleteProfile: function(){
	        var self = this;
        	navigator.notification.confirm(
			    'Are you sure that you would like to delete this profile from your device, as well as from our system? Once deleted, you will no longer have access to this profile or its information.',  // message
			    function(button){
			    	if(button == 2){
				    	self.deleteProfile();
			    	}
			    },         // callback
			    'Stop Profile',            // title
			    ['Cancel', 'Ok']                  // buttonName
			);
        },
        
        deleteProfile: function(){
	        var model = App.subscriptionCollection.get($(this.$el).find('#subscription-profile-details').data('id'));
	        $.post( App.config.server + App.config.deleteProfileAPI, {
	        		profileId: model.get('profileId'), 
					eid: model.get('eid'),
					iccid: model.get('iccid')
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
	        Backbone.history.navigate('subscriptionList', {trigger: true});
        }
    } );

    // Returns the View class
    return SubscriptionDetailsView;

} );