// ProfileList View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/Profile",
	"../collections/ProfilesCollection"
], function( $, Backbone, ProfileModel, ProfilesCollection ) {

    // Extends Backbone.View
    var ProfileListView = Backbone.View.extend( {
    	events: {
	    	'touchend #profile-list-verizon button': 'loadProfile'
    	},
    
    	attributes: {
	    	"data-role": "page",
	    	"id": "profileList",
	    	"data-title": "Profiles"
    	},

    	sectionTitle: 'Profiles',
		
        // The View Constructor
        initialize: function(attrs) {
			this.progressTemplate = attrs.progressTemplate;
			this.profileListTemplate = attrs.profileListTemplate;
        },

        // Renders all of the Category models on the UI
        render: function() {
            var _template = _.template(this.progressTemplate);
			this.$el.html(_template({header: 'Accounts',message: 'Gathering profiles. Please wait.'}));

			App.changeTitle(this.sectionTitle);

			App.resetTimer();

            // Maintains chainability
            return this;
        },
        
        getProfiles: function(){
        	var self = this;
        	$.post( App.config.server + App.config.getAvailableProfilesAPI ).done(function( data ) {
		        var returnedData = JSON.parse(data);
		        var profilesArray = [];
		        var profiles = returnedData.rows;
		        //console.log('#### PROFILE LIST RESPONSE ####');
		        //console.log(profiles);
		        App.profileCollection = new ProfilesCollection();
		        
		        $.each(profiles, function(i, v){
		        	var id = _.uniqueId();
			    	var profile = new ProfileModel({ id: id, provider: profiles[i].mnoId, description: profiles[i].status});
			    	App.profileCollection.add(profile);
		        });
				
		        self.showProfileList();
	        });

        },
        
        showProfileList: function(){
	        var _template = _.template(this.profileListTemplate);
	        //console.log(this.profileCollection.toJSON())
			this.$el.html(_template({collection: App.profileCollection.toJSON()}));
        },
        
        loadProfile: function(e){
	        var target = $(e.target);
	        Backbone.history.navigate('profile?' + target.data('id'), {trigger: true})
        }


    } );

    // Returns the View class
    return ProfileListView;

} );