// Account Model
// ==============

// Includes file dependencies
define([
	"jquery",
	"backbone"
], function( $, Backbone ) {

    // The Model constructor
    var AccountModel = Backbone.Model.extend( {
		defaults: {
			profileName: '',
			eid: '',
			iccid: '',
			phoneNumber: '',
			provider: '',
			description: '',
			dateActivated: ''
		}
    } );

    // Returns the Model class
    return AccountModel;

} );