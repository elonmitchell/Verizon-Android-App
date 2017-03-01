// Subscription Collection
// ===================

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/Subscription" ], function( $, Backbone, SubscriptionModel ) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( ) {

        },

        // Sets the Collection model property to be a Category Model
        model: SubscriptionModel
    } );

    // Returns the Model class
    return Collection;

} );