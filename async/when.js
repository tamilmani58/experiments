/**
 * Created by tamil on 5/8/14.
 */

"use strict";

var request = require('request');
var when = require('when');

console.log('Start Line', new Date());

function deferredWrapper(url, log) {
	var defer = when.defer();
	request.get(url, function () {
		console.log(log, new Date());
		// It is a best practice to return on every end point of execution in nodejs.
		return defer.resolve(true);
	});
	return defer.promise;
}

// Creating an array of promises that we need to get resolved
var promisesArray = [deferredWrapper('http://thekrazycouponlady.com', 1), deferredWrapper('http://thekrazycouponlady.com', 2)];

// Settle them down

when.settle(promisesArray).then(function () {
	console.log('Finish Line', new Date());
});

// when.any, when.all, when.some