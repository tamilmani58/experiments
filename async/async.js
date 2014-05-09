/**
 * Created by tamil on 5/8/14.
 */

"use strict";

var async = require('async'),
	request = require('request');


function doRequest(req, res) {
	var start = 'Start Line ' + new Date(),
		url = 'http://1.cuzillion.com/bin/resource.cgi?type=js&sleep=5&n=1&t=1399648150';

	async.parallel({
		call1 : function (cb) {
			request.get(url, function () {
				var msg = 'First Call ' + new Date();
				return cb(null, msg);
			});
		},
		call2 : function (cb) {
			request.get(url, function () {
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

