// Menu View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone"
], function( $, Backbone ) {

    // Extends Backbone.View
    var MenuView = Backbone.View.extend( {
    	events: {
	    	'touchend #menu-home': 'goHome',
	    	'touchend #menu-profiles': 'goProfiles',
	    	'touchend #menu-accounts': 'goAccounts',
	    	'touchend #menu-subscriptions': 'goSubscriptions',
	    	'touchend #menu-history': 'goHistory',
	    	'touchend #menu-logout': 'confirmLogout',
	    	'touchend #logout-confirm-btn': 'goLogout'
    	},
    	
		template: _.template(''),
		
        // The View Constructor
        initialize: function(attrs) {
			this.template = attrs.template;
        },

        // Renders all of the Category models on the UI
        render: function() {
            var template = _.template(this.template);
			this.$el.html(template).trigger("create");
			
            // Maintains chainability
            return this;
        },
        
        toggleOptions: function(){
        	if($('.cbp-spmenu a').hasClass('cbp-spmenu-disabled')){
	        	$('#menu-home, #menu-profiles, #menu-accounts, #menu-subscriptions, #menu-history').unbind('touchend', this.selectAccountAlert);
	        	$('#menu-logout').unbind('touchend', this.confirmLogout);
	        	this.delegateEvents();
				$('.cbp-spmenu a').removeClass('cbp-spmenu-disabled');
        	}
        	else{
	        	this.undelegateEvents();
	        	$('#menu-home, #menu-profiles, #menu-accounts, #menu-subscriptions, #menu-history').bind('touchend', this.selectAccountAlert);
	        	$('#menu-logout').bind('touchend', this.confirmLogout);
				$('.cbp-spmenu a').addClass('cbp-spmenu-disabled');
				$('#menu-logout').removeClass('cbp-spmenu-disabled');
        	}
        },
        
        selectAccountAlert: function(){
        	App.menuView.closeMenu();
	        navigator.notification.alert('You must select an account before proceeding', function(){}, 'Select Account', 'Close');
        },
        
        goToSection: function(section){
	        var currentLocation = Backbone.history.fragment;
	    	switch(section){
		    	case "home":
	        if(currentLocation.indexOf('account?') == -1){
		        Backbone.history.navigate('account?' + App.currentAccount, {trigger: true});
	        }
		    		break;
		    		
		    	case "profiles":
		    		if(currentLocation.indexOf('profileList?') == -1 && currentLocation.indexOf('profile?') == -1){
				        Backbone.history.navigate('profileList', {trigger: true});
			        }
		    		break;
		    		
		    	case "accounts":
		    		if(currentLocation.indexOf('accountList?') == -1){
				        Backbone.history.navigate('accountList?' + App.currentUser, {trigger: true});
			        }
			        break;
			        
			    case "history":
			    	if(currentLocation.indexOf('jobList?') == -1 && currentLocation.indexOf('job?') == -1){
				        Backbone.history.navigate('jobList?' + App.currentUser, {trigger: true});
			        }
			    	break;
			    	
			    case "subscriptions":
			    	if(currentLocation.indexOf('subscriptionList?') == -1 && currentLocation.indexOf('subscriptionDetails?') == -1){
				        Backbone.history.navigate('subscriptionList', {trigger: true});
			        }
			    	break;
			    	
			    default:
			    	Backbone.history.navigate('account?' + App.currentAccount, {trigger: true});
	    	}	  
        },
        
        goHome: function(){
        	console.log('MenuView::goHome');
	        this.closeMenu();
	        var self = this;
	        setTimeout(function(){self.goToSection('home')}, 200);
        },
        
        goProfiles: function(){
        	console.log('MenuView::goProfiles');
        	this.closeMenu();
	        var self = this;
	        setTimeout(function(){self.goToSection('profiles')}, 200);
        },
        
        goAccounts: function(){
        	console.log('MenuView::goAccounts');
	        this.closeMenu();
	        var self = this;
	        setTimeout(function(){self.goToSection('accounts')}, 200);
        },
        
        goHistory: function(){
        	console.log('MenuView::goHistory');
	        this.closeMenu();
	        var self = this;
	        setTimeout(function(){self.goToSection('history')}, 200);
        },
        
        goSubscriptions: function(){
        	console.log('MenuView::goSubscriptions');
	        this.closeMenu();
	        var self = this;
	        setTimeout(function(){self.goToSection('subscriptions')}, 200);
        },
        
        closeMenu: function(){
        	console.log('MenuView::closeMenu');
	        classie.toggle( document.body, 'cbp-spmenu-push-toright' );
			classie.toggle( document.getElementById( 'cbp-spmenu-s1' ), 'cbp-spmenu-open' );
			$('.navbar-toggle').addClass('collapsed');
        },
        
        confirmLogout: function(){
        	var self = App.menuView;
        	self.closeMenu();
        	navigator.notification.confirm(
			    'Are you sure you would like to log out of the application?',  // message
			    function(button){
			    	if(button == 2){
				    	self.goLogout();
			    	}
			    },         // callback
			    'Log Out',            // title
			    ['Cancel', 'Log Out']                  // buttonName
			);
        },
        
        goLogout: function(){
        	console.log('MenuView::goLogout');
			App.reload = true;
	        Backbone.history.navigate('home', {trigger: true});
        }

    } );

    // Returns the View class
    return MenuView;

} );