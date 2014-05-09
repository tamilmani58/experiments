/**
 * Created by tamil on 5/8/14.
 */

"use strict";

var request = require('request');
var when = require('when');

function deferredWrapper(url, log) {
	var defer = when.defer();
	request.get(url, function () {
		// It is a best practice to return on every end point of execution in nodejs.
		return defer.resolve(log + ' ' + new Date());
	});
	return defer.promise;
}

function doRequest(req, res) {
	var start = "Start Line " + new Date(),
		finalValue = [start],
		url = 'http://1.cuzillion.com/bin/resource.cgi?type=js&sleep=5&n=1&t=1399648150';
	// Creating an array of promises that we need to get resolved
	var promisesArray = [deferredWrapper(url, 'First Call'), deferredWrapper(url, 'Second Call')];

	// Settle them down
	return when.settle(promisesArray).then(function (descriptors) {
		finalValue.concat(descriptors.map(function (descriptor) {
			return descriptor.value;
		}));
		finalValue.push("End Line " + new Date());
		return res.send(finalValue);
	});

	// when.any, when.all, when.some
}

module.exports = doRequest;