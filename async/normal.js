/**
 * Created by tamil on 5/8/14.
 */

"use strict";

var request = require('request');

// Assume we got to call few different urls in parallel and get the results back

var timer = new Date();

console.log("Let's begin", timer);

request.get('http://thekrazycouponlady.com', function (error, response, body) {

	console.log('Timer after First Call', new Date());

	request.get('http://thekrazycouponlady.com', function (error, response, body) {
		console.log('Time after Second Call', new Date());
	});

	// Good habit to clean up the unwanted before closure gets created
	body = '';
	response = '';
});

// OR Maintain a counter handler