// JobDetails View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/Job"
], function( $, Backbone, JobModel ) {

    // Extends Backbone.View
    var JobDetailsView = Backbone.View.extend( {
    	events: {
			'touchend .back-button': 'goBack'
    	},
    
    	attributes: {
	    	"data-role": "page",
	    	"id": "job",
	    	"data-title": "Job Details"
    	},

    	sectionTitle: 'Job Details',
		
        // The View Constructor
        initialize: function(attrs) {
			this.progressTemplate = attrs.progressTemplate;
			this.jobDetailsTemplate = attrs.jobDetailsTemplate;
        },

        // Renders all of the Category models on the UI
        render: function() {
            var _template = _.template(this.progressTemplate);
			this.$el.html(_template({header: 'Accounts',message: 'Gathering job details. Please wait.'}));

			App.changeTitle(this.sectionTitle);

			App.resetTimer();

            // Maintains chainability
            return this;
        },
        
        getJobDetails: function(id){
        	var self = this;    
        	var model = App.jobCollection.get(id);
        	console.log(model);
			var _template = _.template(this.jobDetailsTemplate);
			this.$el.html(_template(model.toJSON()));
        },
        
        goBack: function(){
        	App.isBack = true;
	        Backbone.history.navigate('jobList', {trigger: true});
        }
        
    } );

    // Returns the View class
    return JobDetailsView;

} );