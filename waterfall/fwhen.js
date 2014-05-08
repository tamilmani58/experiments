/**
 * Created by tamil on 5/8/14.
 */

// Say if there were 5 levels of callbacks Ex: Building Akamai Dicts for different spam types
// This menthod will be still maintainable
// What about the two above?
// 1. Will be inception of callback
// 2. Will be a chanined callback [Less readable]
// Here, error handling is done at only one final level;
// Any intermediate state can reject an error which will automagically reach on failure in the end

"use strict";

var redis = require('redis');
var	fs = require('fs');
var	when = require('when');

var client = redis.createClient(6379, "localhost");

function getDataFromRedis(key) {
	var defer = when.defer();
	client.smembers(key, function (err, reply) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(reply);
		}
	});
	return defer.promise;
}

function writeDataToFile(data) {
	var defer = when.defer();
	fs.writeFile('whitelist_backup.txt', reply, function (err) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve();
		}
	});
	return defer.promise;
}

getDataFromRedis('whitelist')
	.then(writeDataToFile)
	.then(function onSuccess() {}, function onFailure(err) {
		console.log(err);
	});