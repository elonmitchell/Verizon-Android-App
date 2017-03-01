/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    onDeviceReady: function() {
        console.log("We got to device ready");
    },
    // Scan a barcode
    //
    scan: function() {
    	//close menu
    	$('.navbar-toggle').removeClass('collapsed');
    	$('body').removeClass('cbp-spmenu-push-toright');
    	$('#cbp-spmenu-s1').removeClass('cbp-spmenu-open');
        
    	var $this = this;
        window.plugins.barcodeScanner.scan( function(data) {
        	var val = {},
        	results = data.text.split(","),
        	prop = ["eid","profileId","iccid"],
        	profileEID = $('#profile-eid').text();
        	
        	//create an object
        	$.each(results,function(x,result){
        		if(result.indexOf(prop[x]) > -1){
        			val[prop[x]] = result.replace(prop[x] + ":","");
        		}
        	});

            if(val.profileId && val.eid && val.iccid){
            	if(val.eid === profileEID){
	            	navigator.notification.confirm(
	        			    'Please confirm that you are authorizing a change of the profile associated with that device.\n\nThe time required to complete this transaction may vary depending on your network conditions.',  // message
	        			    function(button){
	        			    	if(button == 2){
	        			        	$.ajax({
	        			        		  type: "POST",
	        			        		  url: App.config.server + App.config.downloadProfileAPI,
	        			        		  data: {profileId: val.profileId,eid: val.eid,iccid: val.iccid,enableProfile: false},
	        			        		  success: function(data){
	
	        			        		  },
	        			        		  error: function(data){
	
	        			        		  }
	        			        	});
	        			    	}
	        			    },         // callback
	        			    'Confirm Profile Upload',// title
	        			    ['Cancel', 'Confirm']// buttonName
	        		);
            	}else{
	            	navigator.notification.confirm(
	        			    'The EID does not match your profile.',  // message
	        			    function(button){
	        			    	if(button == 2){
	                                $this.scan();
	        			    	}
	        			    },         // callback
	        			    'Confirm Profile Upload',// title
	        			    ['Cancel','Scan Again']// buttonName
	        		);
            	}
            }else{
            	navigator.notification.confirm(
        			    'There was an error while scanning your code, please try again',  // message
        			    function(button){
        			    	if(button == 2){
                                $this.scan();
        			    	}
        			    },         // callback
        			    'Confirm Profile Upload',// title
        			    ['Cancel','Scan Again']// buttonName
        		);
            }
        }, function(error) {

        });
    },
    // Encode text into QR code
    //
    encode: function(data) {
        if(data){
            window.plugins.barcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, data, function(success) {
                alert("encode success: " + success);
            }, function(fail) {
                alert("encoding failed: " + fail);
            });
        }else{
            alert("Hey! I don't have anything to encode!");
        }
    }
};
