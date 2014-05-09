/**
 * Created by tamil on 5/8/14.
 */

"use strict";

var request = require('request');

// Assume we got to call few different urls in parallel and get the results back
// Or we need to read multiple files together and return the results back

function doRequest(req, res) {
	var data = {};
	data.start = 'Start Line ' + new Date();
	request.get('http://thekrazycouponlady.com', function (error, response, body) {
		data.kcl = 'First Call ' + new Date();
		request.get('http://thekrazycouponlady.com', function (error, response, body) {
			data.kcl2 = 'Second Call ' + new Date();
			data.end = 'Finish Line ' + new Date();
			return res.send(data);
		});
		// Good habit to clean up the unwanted before closure gets created
		body = '';
		response = '';
	});
}

module.exports = doRequest;


// OR Maintain a counter handler