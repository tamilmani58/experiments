/**
 * Created by tamil on 5/8/14.
 */
// Without any thinking

"use strict";

var redis = require('redis');
var	fs = require('fs');

var client = redis.createClient(6379, "localhost");

function callonError(err) {
	console.log(err);
}

client.smembers('whitelist', function (err, reply) {
	if (err) {
		callonError(err);
	} else {
		fs.writeFile('whitelist_backup.txt', reply, function (err) {
			if (err) {
				callonError(err);
			}
			console.log('It\'s saved!');
		});
	}
});