// Profile Collection
// ===================

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/Profile" ], function( $, Backbone, ProfileModel ) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( ) {

        },

        // Sets the Collection model property to be a Category Model
        model: ProfileModel
    } );

    // Returns the Model class
    return Collection;

} );