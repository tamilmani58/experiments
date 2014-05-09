/**
 * Created by tamil on 5/8/14.
 */

"use strict";

var async = require('async'),
	request = require('request');


function doRequest(req, res) {
	var start = 'Start Line ' + new Date();

	async.parallel({
		kcl : function (cb) {
			request.get('http://thekrazycouponlady.com', function () {
				var msg = 'First Call ' + new Date();
				return cb(null, msg);
			});
		},
		kcl2 : function (cb) {
			request.get('http://thekrazycouponlady.com', function () {
				var msg = 'Second Call ' + new Date();
				return cb(null, msg);
			});
		}
	}, function (err, data) {
		var end = 'Finish Line ' + new Date();
		data.start = start;
		data.end = end;
		return res.send(data);
	});
}

module.exports = doRequest;

