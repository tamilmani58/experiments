/**
 * Created by tamil on 5/8/14.
 */

// Benefits are the same - Clean and Neat
// Async is more awesome when you have multiple async tasks to be done and they can be done in parallel
// Ex: Building akamai dicts for multiple spam types

"use strict";

var redis = require('redis');
var	fs = require('fs');
var	async = require('async');

var client = redis.createClient(6379, "localhost");

async.waterfall([
	function getDataFromRedis(cb) {
		client.smembers('whitelist', function (err, reply) {
			if (err) {
				cb(err);
			} else {
				cb(null, reply);
			}
		});
	},
	function writeDataToFile(data, cb) {
		fs.writeFile('whitelist_backup.txt', data, function (err) {
			if (err) {
				cb(err);
			} else {
				cb(null, "Successful");
			}
		});
	}
], function (err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
});