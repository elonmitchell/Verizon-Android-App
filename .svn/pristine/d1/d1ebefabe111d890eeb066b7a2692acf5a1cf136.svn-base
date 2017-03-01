// Login View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/Login"
], function( $, Backbone, LoginModel ) {

    // Extends Backbone.View
    var LoginView = Backbone.View.extend( {
    	events: {
	    	'touchend .login-btn': 'goLogin'
    	},

    	attributes: {
	    	"id": "login",
	    	"data-role": "page"
    	},
    	
		template: '../templates',
		
        // The View Constructor
        initialize: function(attrs) {            
			this.template = attrs.template;
        },

        // Renders all of the Category models on the UI
        render: function() {
            var template = _.template(this.template);
			this.$el.html(template).trigger("create");
			this.delegateEvents();
			$('body').addClass('login-screen');
			$('.navbar-header').hide();
			$('form').submit(function(event){
				event.preventDefault();
				alert('submit form');
  			});
  			$('.navbar-toggle').hide();
  			Ladda.bind( '#form-submit' );
			
            // Maintains chainability
            return this;
        },
        
        showMessage: function(action){
	        var message;
	        switch(action){
		        case 'timeout':
		        message = 'You have been logged out due to inactivity. Please login again.';
		        break;
		        
		        case 'usernamePasswordEmpty':
		        message = 'Please enter a username.<br>Please enter a password.';
		        break;
		        
		        case 'usernameEmpty':
		        message = 'Please enter a username.';
		        break;
		        
		        case 'passwordEmpty':
		        message = 'Please enter a password.';
		        break;
		        
		        case 'usernameLength':
		        message = 'Username must be at least 4 characters.';
		        break;
	        }
	        
	        this.$('#alert-box').html(message).show();
        },
        
        goLogin: function(e){    
        	console.log('LoginView::goLogin');    	
        	var self = this;
        	
        	//for Ladda button effect
        	e.preventDefault();
		 	var l = Ladda.create(document.querySelector( '#form-submit' ));
		 	l.start();
		 	
        	this.$('#btn-submit').addClass('ui-state-disabled');
        	var username = this.$('#username').val();
        	var password = this.$('#password').val();
        	if(username == '' && password == ''){
	        	this.showMessage('usernamePasswordEmpty');
	        	l.stop();
	        	return false;
        	}
        	else if(username == ''){
	        	this.showMessage('usernameEmpty');
	        	l.stop();
	        	return false;
        	}
        	else if(password == ''){
	        	this.showMessage('passwordEmpty');
	        	l.stop();
	        	return false;
        	}
        	else if(username.length < 4){
	        	this.showMessage('usernameLength');
	        	l.stop();
	        	return false;
        	}
			console.log('LoginView::goLogin::call login API');
        	$.post( App.config.server + App.config.loginAPI, { username: username, password: password }).done(function( data ) {
				var returnedData = JSON.parse(data);
				var statusCode = returnedData.response.statusCode;
				console.log('LoginView::login::login request complete. statusMessage=' + returnedData.response.statusMessage)
				
				switch(statusCode){
					case 1:
						console.log('LoginView::login::Login successful.');
						App.currentUser = username;
						App.startTimer();
						Backbone.history.navigate('accountList?' + username, {trigger: true});
						$('.navbar-header').show();
						break;
					
					case 2:
						console.log('LoginView::login::Login failed (Status Code=' + statusCode + ').');
						l.stop();
						break;
						
					case 3:
						console.log('LoginView::login::Login failed (Status Code=' + statusCode + ').');
						self.$('#alert-box').html('<p>The Username and/or password that you entered are invalid. Please try again.</p>').show();
						l.stop();
						break;
						
					case 4:
						console.log('LoginView::login::Login failed (Status Code=' + statusCode + ').');
						break;
						
					case 5:
						console.log('LoginView::login::Login failed (Status Code=' + statusCode + ').');
						break;
						
					case 6:
						console.log('LoginView::login::Login failed (Status Code=' + statusCode + ').');
						break;
						
					default:
						console.log('LoginView::login::Login failed for unknown reason.');
				}
				

			});
        }

    } );

    // Returns the View class
    return LoginView;

} );