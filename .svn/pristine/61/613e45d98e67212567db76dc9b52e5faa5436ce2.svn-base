// SubscriptionList View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/Subscription",
	"../collections/SubscriptionCollection"
], function( $, Backbone, SubscriptionModel, SubscriptionCollection ) {

    // Extends Backbone.View
    var SubscriptionListView = Backbone.View.extend( {
    	events: {
	    	'touchend #subscription-list-active button': 'loadProfile',
	    	'touchend #subscription-list-verizon button': 'loadProfile',
	    	'touchend #subscription-list-partner button': 'loadProfile'
    	},
    
    	attributes: {
	    	"data-role": "page",
	    	"id": "subscription-list"
    	},

    	sectionTitle: 'Subscriptions',
		
        // The View Constructor
        initialize: function(attrs) {
			this.progressTemplate = attrs.progressTemplate;
			this.subscriptionListTemplate = attrs.subscriptionListTemplate;
        },

        // Renders all of the Category models on the UI
        render: function() {
            var _template = _.template(this.progressTemplate);
			this.$el.html(_template({header: 'Accounts',message: 'Gathering subscriptions. Please wait.'}));

			App.changeTitle(this.sectionTitle);

			App.resetTimer();

            // Maintains chainability
            return this;
        },
        
        getSubscriptions: function(){
        	var self = this;
        	$.post( App.config.server + App.config.getUserProfilesAPI ).done(function( data ) {
		        var returnedData = JSON.parse(data);
		        var subscriptionsArray = [];
		        var subscriptions = returnedData.rows;
		        //console.log('#### PROFILE LIST RESPONSE ####');
		        //console.log(profiles);
		        App.subscriptionCollection = new SubscriptionCollection();
		        
		        $.each(returnedData.rows, function(key, val){
		        	var provider = key;
		        	var providerArray = val;
			        $.each(providerArray, function(index, val){
			        	var id = _.uniqueId();
			        	var subscription = new SubscriptionModel({
			        		id: id, 
			        		provider: provider, 
			        		status: providerArray[index].status, 
			        		profileId: providerArray[index].profileId,
			        		profileName: providerArray[index].profileName, 
			        		phoneNumber: providerArray[index].msisdn
			        	});
				        App.subscriptionCollection.add(subscription);
			        });
		        });
				
		        self.showSubscriptionList();
	        });

        },
        
        showSubscriptionList: function(){
	        var _template = _.template(this.subscriptionListTemplate);
	        //console.log(this.profileCollection.toJSON())
			this.$el.html(_template({collection: App.subscriptionCollection.toJSON()}));
        },
        
        loadProfile: function(e){
	        var target = $(e.target);
	        Backbone.history.navigate('subscriptionDetails?' + target.data('id'), {trigger: true})
        }


    } );

    // Returns the View class
    return SubscriptionListView;

} );