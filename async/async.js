/**
 * Created by tamil on 5/8/14.
 */

"use strict";

var async = require('async'),
	request = require('request');

console.log('Start Line', new Date());

async.parallel({
	kcl : function (cb) {
		request.get('http://thekrazycouponlady.com', function () {
			console.log('First Call', new Date());
			return cb(null, true);
		});
	},
	kcl2 : function (cb) {
		request.get('http://thekrazycouponlady.com', function () {
			console.log('Second Call', new Date());
			return cb(null, true);
		});
	}
}, function (err, data) {
	console.log('Finish Line', new Date());
});