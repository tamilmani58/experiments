/**
 * Created by tamil on 5/9/14.
 */

"use strict";

var async = require('async');

async.waterfall([
	function (cb) {
		if (true) {
			cb(null, "I'm done");
		}
		cb(1, 'There is an error');
	},
	function (data, cb) {
		console.log('From Level 1', data);
		cb(null, "Finally done");
	}
], function (data, err) {
	console.log('From End Point', data, err);
});