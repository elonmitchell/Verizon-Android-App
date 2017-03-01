// Wait View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
], function( $, Backbone ) {

    // Extends Backbone.View
    var AccountView = Backbone.View.extend( {
    
    	attributes: {
	    	"data-role": "page",
	    	"id": "accounts",
	    	"data-title": "Accounts"
    	},

		
        // The View Constructor
        initialize: function() {

            

        },

        // Renders all of the Category models on the UI
        render: function() {
            var _template = _.template($('#progress-template').html());
			this.$el.html(_template());

            // Maintains chainability
            return this;
        }


    } );

    // Returns the View class
    return WaitView;

} );