// Job Model
// ==============

// Includes file dependencies
define([
	"jquery",
	"backbone"
], function( $, Backbone ) {

    // The Model constructor
    var JobModel = Backbone.Model.extend( {
		defaults: {
			eid: '',
			iccid: '',
			phoneNumber: '',
			jobId: '',
			description: '',
			status: '',
			type: '',
			date: ''
		}
    } );

    // Returns the Model class
    return JobModel;

} );