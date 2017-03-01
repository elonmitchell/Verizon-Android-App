
// Sets the require.js configuration for your application.
require.config( {

	baseUrl: "",

	// 3rd party script alias names
	paths: {

		// Core Libraries
		"jquery": "js/lib/jquery",
		"underscore": "js/lib/lodash-min",
		"backbone": "js/lib/backbone-min",
		"backbone.touch": "js/lib/backbone.touch.min",
		"bootstrap": "js/lib/bootstrap",
		"router": "js/routers/mobileRouter",
		"text": "js/lib/text"
	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim: {

		"backbone": {
			"deps": [ "underscore", "jquery" ],
			"exports": "Backbone"
		},

		"backbone.touch": ['backbone']

	}

});

// Includes File Dependencies
require([
	"jquery",
	"backbone",
	"bootstrap",
	"router"
], function ( $, Backbone, Bootstrap, Mobile ) {

	this.slider = new PageSlider($("body"));

	require( [ "bootstrap" ], function () {

		// Instantiates a new Backbone.js Mobile Router
		this.router = new Mobile();

		$(document.body).on('click', '[data-rel]', function () {
		    var rel = $(this).data('rel');
		    if (rel == 'back') {
		        history.back();
		    }
		});

		$(document.body).on('touchend', '.navbar-toggle', function(){
			var target = $('.navbar-toggle');
			if(target.hasClass('collapsed')){
				target.removeClass('collapsed');
			}
			else{
				target.addClass('collapsed');
			}
			classie.toggle( document.body, 'cbp-spmenu-push-toright' );
			classie.toggle( document.getElementById( 'cbp-spmenu-s1' ), 'cbp-spmenu-open' );
		});

		$(document.body).on('touchend', '.page', function(){
			var target = $('.navbar-toggle');
				target.addClass('collapsed');
			classie.removeClass( document.body, 'cbp-spmenu-push-toright' );
			classie.removeClass( document.getElementById( 'cbp-spmenu-s1' ), 'cbp-spmenu-open' );
		});

		$(document.body).on('click', '#alert-button', function(){
			navigator.notification.alert(
				'All pending jobs for this account have completed.',
				function(){
					$('#alert-button').hide();
					$('#pending-changes').html('No pending changes.');
					$('#pending-changes').removeClass('pending-changes-yes');
					$('#pending-changes').addClass('pending-changes-no');
				},
				'Jobs Complete',
				'Close'
			);
		});

		/*
$(function () {
		    $("[data-role=header],[data-role=footer]").toolbar().enhanceWithin();
		    $("[data-role=panel]").panel().enhanceWithin();
		});
*/
		document.addEventListener("backbutton", App.handleDeviceBackButton, false);

		$(document).on("pagecreate", function () {
		    $("[data-role=panel]").one("panelbeforeopen", function () {
		        var height = $.mobile.pageContainer.pagecontainer("getActivePage").outerHeight();
		        $(".ui-panel-wrapper").css("height", height + 1);
		    });
		});

	});
});

var App = {
	config: {

		server: 'https://xvzw70.xdev.motive.com', //NO TRAILING "/"
		loginAPI: '/SP/login.do',
		getActiveAccountsAPI: '/SP/getActiveAccounts.do',
		getActiveAccountDetailsAPI: '/SP/getActiveAccountDetails.do',
		getAvailableProfilesAPI: '/SP/getAvailableProfiles.do',
		getProfileDetailsAPI: '/SP/getProfileDetails.do',
		downloadProfileAPI: '/SP/modProfile.do',
		getUserProfilesAPI: '/SP/getUserProfiles.do',
		getManageProfileDetails: '/SP/getManageProfilesDetails.do',
		makeProfileActiveAPI: '/SP/modChange.do',
		deleteProfileAPI: '/SP/modStop.do',
		getJobDetailsStatusByIDAPI: '/SP/getJobDetailsStatusByID.do',
		getJobHistoryAPI: '/SP/getJobHistoryByUser.do',
		getJobDetailsAPI: '/SP/getJobDetailsByID.do'

		/*
		server: 'http://localhost:8888',
		loginAPI: '/SP/login.php',
		getActiveAccountsAPI: '/SP/getActiveAccounts.php',
		getActiveAccountDetailsAPI: '/SP/getActiveAccountDetails.php',
		getAvailableProfilesAPI: '/SP/getAvailableProfiles.php',
		getProfileDetailsAPI: '/SP/getProfileDetails.php',
		downloadProfileAPI: '/SP/modProfile.php',
		getUserProfilesAPI: '/SP/getUserProfiles.php',
		getManageProfileDetails: '/SP/getManageProfilesDetails.php',
		makeProfileActiveAPI: '/SP/modChange.php',
		deleteProfileAPI: '/SP/modStop.php'
		*/
	},
	views: {},
	models: {},
	collections: {
		profileCollection: '',
		jobCollection: ''
	},
	currentUser: '',
	currentAccount: '',
	jobsPending: [],
	jobsStatusRunning: false,
	jobStatusCounter: 0,
	isBack: false,
	timeoutID: null,

	handleDeviceBackButton: function(){
		//handle Android hardware back button
		console.log('main.js::handleDeviceBackButton::Back button clicked');
	},

	startTimer: function() {
	    console.log('main.js::startTimer::Start timer');
	    this.timeoutID = window.setTimeout(this.goInactive, 900000);
	},

	resetTimer: function(e) {
	    console.log('main.js::resetTimer::Reset Timer');
	    window.clearTimeout(this.timeoutID);
	    this.startTimer();
	},

	goInactive: function() {
	    // do something
	    console.log('main.js::goInactive::Application timed out');
	    this.reload = true;
	    Backbone.history.navigate('login?timeout', {trigger: true});
	},

	changeTitle: function(title){
		$('#page-title-text').animate({marginLeft: '-=30px', opacity: '0.0'}, 200, 'swing', function() {
			$(this).css({'marginLeft': '+=60px'});
	        $(this).text(title).animate({marginLeft: '-=30px', opacity: '1.0'}, 200, 'swing', function(){});
	    });
	},

	checkForChanges: function(){
		var self = this;
		if(this.jobsPending.length > 0){
				console.log('main.js::checkForChanges::' + this.jobsPending.length + 'job(s) pending');
				App.jobsStatusRunning = true;
				var jobID = App.jobsPending[0];
				console.log('main.js::checkForChanges::Checking status of job ' + jobID);
				$.post( App.config.server + App.config.getJobDetailsStatusByIDAPI, {jobID: jobID} ).done(function( data ) {
	        		var returnedData = JSON.parse(data);
	        		var status = returnedData.rows.STATUS;
	        		if(status == '200'){
	        			console.log('main.js::checkForChanges::Job ' + jobID + ' is complete');
		        		self.jobsPending.splice(0, 1);
	        		}
	        		setTimeout(function(){self.checkForChanges()}, 10000);
	        	});

	}
		else{
			if(App.jobsStatusRunning){
				console.log('main.js::checkForChanges::All jobs are complete');
				App.jobsStatusRunning = false;
				$('#alert-button').show();
			}
			else{
				console.log('main.js::checkForChanges::No jobs pending');
			}
		}
	}
};
