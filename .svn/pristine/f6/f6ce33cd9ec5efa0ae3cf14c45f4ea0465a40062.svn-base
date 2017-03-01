// Mobile Router
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"js/views/MenuView",
	"js/models/Login",
	"js/views/LoginView",
	"js/models/AccountList",
	"js/views/AccountListView",
	"js/models/Account",
	"js/views/ActiveAccountDetailsView",
	"js/models/Profile",
	"js/models/Job",
	"js/views/ProfileListView",
	"js/views/JobListView",
	"js/views/JobDetailsView",
	"js/views/ProfileDetailsView",
	"js/views/SubscriptionListView",
	"js/views/SubscriptionDetailsView",
	"js/collections/ProfilesCollection",
	"js/collections/JobsCollection",
	"text!templates/Menu.html",
	"text!templates/Login.html",
	"text!templates/Progress.html",
	"text!templates/AccountList.html",
	"text!templates/ActiveAccountDetails.html",
	"text!templates/ProfileList.html",
	"text!templates/JobList.html",
	"text!templates/JobDetails.html",
	"text!templates/ProfileDetailsTemplate.html",
	"text!templates/SubscriptionList.html",
	"text!templates/SubscriptionDetailsTemplate.html"
], function(
			$, 
			Backbone, 
			MenuView,
			LoginModel,
			LoginView,
			AccountListModel,
			AccountListView,
			AccountModel,
			ActiveAccountDetailsView,
			ProfileModel,
			JobModel,
			ProfileListView,
			JobListView,
			JobDetailsView,
			ProfileDetailsView,
			SubscriptionListView,
			SubscriptionDetailsView,
			ProfilesCollection,
			JobsCollection,
			MenuTemplate,
			LoginTemplate,
			ProgressTemplate,
			AccountListTemplate,
			ActiveAccountDetailsTemplate,
			ProfileListTemplate,
			JobListTemplate,
			JobDetailsTemplate,
			ProfileDetailsTemplate,
			SubscriptionListTemplate,
			SubscriptionDetailsTemplate
			) {

    // Extends Backbone.Router
    var MainRouter = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {
        	App.menuView = new MenuView({template: MenuTemplate});
            App.loginView = new LoginView({template: LoginTemplate});
            App.activeAccountDetailsView;
            App.accountListView;
            App.profileListView;
            
            var page = App.menuView.render().$el;
        	$('body').append(page);

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        },

        // Backbone.js Routes
        routes: {

            // When there is no hash bang on the url, the home method is called
            "": "home",
            "home": "home",
            "login?:action": "login",
            "accountList?:id": "getAccountList",
			"account?:id": "getAccountDetails",
			"profileList": "getProfileList",
			"profile?:id" : "getProfileDetails",
			"jobList":	"getJobList",
			"job?:id": "getJobDetails",
			"subscriptionList": "getSubscriptionList",
			"subscriptionDetails": "getSubscriptionDetails"

        },

        // Home method
        home: function() {
        	if(App.reload){
	        	location.reload();
        	}
        	else{
				this.login();
			}
            // Programatically changes to the categories page
            //$.mobile.changePage( "#categories" , { transition: "slide", reverse: true, changeHash: false } );

        },
        
        login: function(action){
        	console.log('MainRouter::login');
        	var page = App.loginView.render().$el;
        	$('body').append(page)
	        window.slider.slidePageFrom($(page), 'right');
	        if(action){
		        App.loginView.showMessage(action);
	        }
	        //$.mobile.changePage( "#login" , { transition: transition, reverse: false, changeHash: false } );
        },
        
        getAccountList: function(id){
        	console.log('MainRouter::getAccountList');
        	var self = this;
	        App.accountListView = new AccountListView({progressTemplate: ProgressTemplate, accountListTemplate: AccountListTemplate});
	        var page = App.accountListView.render().$el;
	        $('body').append(page);
	        window.slider.slidePageFrom($(page), 'right');
	        setTimeout(function(){App.accountListView.getAccounts()}, 2000);	        
        },
        
        getAccountDetails: function(account){
	        console.log('MainRouter::getAccountDetails');
	        var self = this;
	        App.activeAccountDetailsView = new ActiveAccountDetailsView({progressTemplate: ProgressTemplate, activeAccountDetailsTemplate: ActiveAccountDetailsTemplate});
	        var page = App.activeAccountDetailsView.render().$el;
	        $('body').append(page);
	        window.slider.slidePageFrom($(page), 'right');
	        setTimeout(function(){App.activeAccountDetailsView.getActiveAccountDetails(account)}, 2000);
        },
        
        getProfileList: function(){
	        console.log('MainRouter::getProfileList');
        	var self = this;
	        App.profileListView = new ProfileListView({progressTemplate: ProgressTemplate, profileListTemplate: ProfileListTemplate});
	        var page = App.profileListView.render().$el;
	        $('body').append(page);
        	if(App.isBack){
		        var direction = 'left';
		        App.isBack = false;
	        }
	        else{
		        var direction = 'right';
	        }
	        window.slider.slidePageFrom($(page), direction);        
	        setTimeout(function(){App.profileListView.getProfiles()}, 2000);
        },
        
        getJobList: function(){
	        console.log('MainRouter::getJobList');
        	var self = this;
	        App.jobListView = new JobListView({progressTemplate: ProgressTemplate, jobListTemplate: JobListTemplate});
	        var page = App.jobListView.render().$el;
	        $('body').append(page);
	        if(App.isBack){
		        var direction = 'left';
		        App.isBack = false;
	        }
	        else{
		        var direction = 'right';
	        }
	        window.slider.slidePageFrom($(page), direction);
	        setTimeout(function(){App.jobListView.getJobs()}, 2000);
        },
        
        getJobDetails: function(id){
	        console.log('MainRouter::getJobDetails');
	        var self = this;
	        App.jobDetailsView = new JobDetailsView({progressTemplate: ProgressTemplate, jobDetailsTemplate: JobDetailsTemplate});
	        var page = App.jobDetailsView.render().$el;
	        $('body').append(page);
	        window.slider.slidePageFrom($(page), 'right');        
	        setTimeout(function(){App.jobDetailsView.getJobDetails(id)}, 2000);
        },
        
        getProfileDetails: function(id){
	        console.log('MainRouter::getProfileDetails');
	        var self = this;
	        App.profileDetailsView = new ProfileDetailsView({progressTemplate: ProgressTemplate, profileDetailsTemplate: ProfileDetailsTemplate});
	        var page = App.profileDetailsView.render().$el;
	        $('body').append(page);
	       window.slider.slidePageFrom($(page), 'right');
	        setTimeout(function(){App.profileDetailsView.getProfileDetails(id)}, 2000);
        },
        
        getSubscriptionList: function(){
	        console.log('MainRouter::getSubscriptionList');
        	var self = this;
	        App.subscriptionListView = new SubscriptionListView({progressTemplate: ProgressTemplate, subscriptionListTemplate: SubscriptionListTemplate});
	        var page = App.subscriptionListView.render().$el;
	        $('body').append(page);
        	if(App.isBack){
		        var direction = 'left';
		        App.isBack = false;
	        }
	        else{
		        var direction = 'right';
	        }
	        window.slider.slidePageFrom($(page), direction);
	        setTimeout(function(){App.subscriptionListView.getSubscriptions()}, 2000);
        },
        
        getSubscriptionDetails: function(id){
	        console.log('MainRouter::getSubscriptionDetails');
	        var self = this;
	        App.subscriptionDetailsView = new SubscriptionDetailsView({progressTemplate: ProgressTemplate, subscriptionDetailsTemplate: SubscriptionDetailsTemplate});
	        var page = App.subscriptionDetailsView.render().$el;
	        $('body').append(page);
	        window.slider.slidePageFrom($(page), 'right');
	        setTimeout(function(){App.subscriptionDetailsView.getSubscriptionDetails(id)}, 2000);
        }

    } );

    // Returns the Router class
    return MainRouter;

} );