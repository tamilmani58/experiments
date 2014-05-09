/**
 * Created by tamil on 5/9/14.
 */
"use strict";

// Use return statement in all valid return points to avoid mistakes

var async = require('async');

async.waterfall([
	function (cb) {
		if (true) {
			return cb(null, "I'm done");
		}
		return cb(1, 'There is an error');
	},
	function (data, cb) {
		console.log('From Level 1', data);
		return cb(null, "Finally done");
	}
], function (data, err) {
	console.log('From End Point', data, err);
});