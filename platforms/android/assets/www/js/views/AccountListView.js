// AccountList View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/AccountList"
], function( $, Backbone, AccountListModel ) {

    // Extends Backbone.View
    var AccountListView = Backbone.View.extend( {
    	events: {
	    	'touchend #account-list button': 'loadAccount'
    	},
    
    	attributes: {
	    	"data-role": "page",
	    	"id": "account-list"
    	},

    	sectionTitle: 'Active Accounts',
		
        // The View Constructor
        initialize: function(attrs) {
			this.progressTemplate = attrs.progressTemplate;
			this.accountListTemplate = attrs.accountListTemplate;
        },

        // Renders all of the Category models on the UI
        render: function() {
            var _template = _.template(this.progressTemplate);
			this.$el.html(_template({header: 'Accounts',message: 'Gathering accounts. Please wait.'}));

		    // Since this is the forst screen after login, remove the login-screen class and add the cbp-spmenu-push class
		    setTimeout(function(){$('#login').remove();}, 2000)
		    $('body').removeClass('login-screen');
		    $('body').addClass('cbp-spmenu-push');
		    
		    App.changeTitle(this.sectionTitle);
			
		    App.menuView.toggleOptions();
		    
		    App.resetTimer();
			
            // Maintains chainability
            return this;
        },
        
        getAccounts: function(){
        	var self = this;
        	$.post( App.config.server + App.config.getActiveAccountsAPI ).done(function( data ) {
		        var returnedData = JSON.parse(data);
		        var phoneNumberArray = [];
		        var phoneNumbers = returnedData.rows;
		        $.each(phoneNumbers, function(i, v){
			        phoneNumberArray.push(phoneNumbers[i]);
		        });
		        if(phoneNumberArray.length < 1){
			        //Do something if no accounts are returned
			        alert('No accounts deteced.')
		        }
		        else{
		        	self.model = new AccountListModel({phoneNumbers: phoneNumberArray});
		        	var _template = _.template(self.accountListTemplate);
					self.$el.html(_template(self.model.toJSON()));
				}
	        });

        },
        
        loadAccount: function(e){
	        var target = $(e.target);
	        App.currentAccount = target.data('number');
	        console.log('AccountView::loadAccount::get account details for ' + App.currentAccount);
	        App.menuView.toggleOptions();
	        Backbone.history.navigate('account?' + App.currentAccount, {trigger: true})
        }


    } );

    // Returns the View class
    return AccountListView;

} );