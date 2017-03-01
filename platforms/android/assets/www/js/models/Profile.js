// Profile Model
// ==============

// Includes file dependencies
define([
	"jquery",
	"backbone"
], function( $, Backbone ) {

    // The Model constructor
    var ProfileModel = Backbone.Model.extend( {
		defaults: {
			isActive: false,
			isDefault: false,
			profileName: 'NA',
			eid: '',
			iccid: '',
			phoneNumber: '',
			profileId: '',
			provider: '',
			profileId: '',
			description: '',
			dateActivated: ''
		}
    } );

    // Returns the Model class
    return ProfileModel;

} );