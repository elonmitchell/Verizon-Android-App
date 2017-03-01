// JobList View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/Job",
	"../collections/JobsCollection"
], function( $, Backbone, JobModel, JobsCollection ) {

    // Extends Backbone.View
    var JobListView = Backbone.View.extend( {
    	events: {
	    	'touchend #job-list button': 'loadProfile'
    	},
    
    	attributes: {
	    	"data-role": "page",
	    	"id": "jobList",
	    	"data-title": "Jobs"
    	},

    	sectionTitle: 'Job History',
		
        // The View Constructor
        initialize: function(attrs) {
			this.progressTemplate = attrs.progressTemplate;
			this.jobListTemplate = attrs.jobListTemplate;
        },

        // Renders all of the Category models on the UI
        render: function() {
            var _template = _.template(this.progressTemplate);
			this.$el.html(_template({header: 'Accounts',message: 'Gathering job history. Please wait.'}));

			App.changeTitle(this.sectionTitle);

			App.resetTimer();

            // Maintains chainability
            return this;
        },
        
        getJobs: function(){
        	var self = this;
        	$.post( App.config.server + App.config.getJobHistoryAPI, {userName: App.currentUser} ).done(function( data ) {
		        var returnedData = JSON.parse(data);
		        var profilesArray = [];
		        var jobs = returnedData.rows;
		        //console.log('#### PROFILE LIST RESPONSE ####');
		        //console.log(profiles);
		        App.jobCollection = new JobsCollection();
		        
		        $.each(jobs, function(i, v){
		        	var id = _.uniqueId();
			    	var job = new JobModel({ id: id, eid: jobs[i].EID, iccid: jobs[i].ICCID, phoneNumber: jobs[i].MSISDN, jobId: jobs[i].ID, type: jobs[i].ACTION_NAME, description: jobs[i].STATUS_DESCRIPTION, status: jobs[i].STATUS, date: jobs[i].INSERTED});
			    	App.jobCollection.add(job);
		        });
				
		        self.showJobList();
	        });

        },
        
        showJobList: function(){
	        var _template = _.template(this.jobListTemplate);
	        //console.log(this.profileCollection.toJSON())
			this.$el.html(_template({collection: App.jobCollection.toJSON()}));
        },
        
        loadProfile: function(e){
	        var target = $(e.target);
	        Backbone.history.navigate('job?' + target.data('id'), {trigger: true})
        }


    } );

    // Returns the View class
    return JobListView;

} );