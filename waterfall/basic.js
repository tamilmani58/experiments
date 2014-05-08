/**
 * Created by tamil on 5/8/14.
 */
// A Bit thought through code

// 1: You unwind the callback soup
// 2: Save memory leaks due to closures

"use strict";

var redis = require('redis');
var fs = require('fs');

var client = redis.createClient(6379, "localhost");

function callonError(err) {
	console.log(err);
}

function writeDataToFile(data) {
	fs.writeFile('whitelist_backup.txt', data, function (err) {
		if (err) {
			callonError(err);
		}
		console.log('It\'s saved!');
	});
}

client.smembers('whitelist', function (err, reply) {
	if (err) {
		callonError(err);
	} else {
		writeDataToFile(reply);
	}
});