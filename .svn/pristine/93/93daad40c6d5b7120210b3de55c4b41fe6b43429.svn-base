// ActiveAccountDetails View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/Profile"
], function( $, Backbone, ProfileModel ) {

    // Extends Backbone.View
    var ActiveAccountDetailsView = Backbone.View.extend( {
    	events: {
	    	
    	},
    
    	attributes: {
	    	"data-role": "page",
	    	"id": "account-details"
    	},

    	sectionTitle: 'Active Account Details',
		
        // The View Constructor
        initialize: function(attrs) {
			this.progressTemplate = attrs.progressTemplate;
			this.activeAccountDetailsTemplate = attrs.activeAccountDetailsTemplate;
        },

        // Renders all of the Category models on the UI
        render: function() {
            var _template = _.template(this.progressTemplate);
			this.$el.html(_template({header: 'Accounts',message: 'Gathering account info. Please wait.'}));

			App.changeTitle(this.sectionTitle);

			$('.navbar-toggle').show();
			if(!App.jobsStatusRunning){
				console.log('ActiveAccountDetails.js::render::Job status check is not running. Start now.');
        		App.checkForChanges();
        	}
        	else{
	        	console.log('ActiveAccountDetails.js::render::Job status check is already running. Do not Start.');
        	}
        	
        	App.resetTimer();
            // Maintains chainability
            return this;
        },
        
        getActiveAccountDetails: function(phoneNumber){
        	var self = this;
        	$.post( App.config.server + App.config.getActiveAccountDetailsAPI, {msisdn: phoneNumber} ).done(function( data ) {
        		var returnedData = JSON.parse(data);
        		console.log(returnedData);
        		self.model = new ProfileModel({
        			isDefault: returnedData.rows[0].isDefault,
        			isActive: returnedData.rows[0].isActive,
	        		profileName: returnedData.rows[0].profileName,
	        		eid: returnedData.rows[0].eid,
	        		iccid: returnedData.rows[0].iccid,
	        		phoneNumber: returnedData.rows[0].phone,
	        		provider: returnedData.rows[0].provider,
	        		description: returnedData.rows[0].description,
	        		dateActivated: returnedData.rows[0].dateActivated
        		});
        		console.log('MODEL: \n' + 
        				'profileName: ' + self.model.get('profileName') + '\n' + 
        				'eid: ' + self.model.get('eid') + '\n' + 
        				'iccid: ' + self.model.get('iccid') + '\n' + 
        				'phoneNumber: ' + self.model.get('phoneNumber') + '\n' + 
        				'provider: ' + self.model.get('provider') + '\n' + 
        				'description: ' + self.model.get('description') + '\n' + 
        				'dateActivated: ' + self.model.get('dateActivated')
        			 )
				var _template = _.template(self.activeAccountDetailsTemplate);
				self.$el.html(_template(self.model.toJSON()));
        	});
        }
    } );

    // Returns the View class
    return ActiveAccountDetailsView;

} );