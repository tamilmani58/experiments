/**
 * Created by tamil on 5/8/14.
 */

"use strict";

var request = require('request');

var urlCrawled;

function incAndGet(req, res) {
	if (req.query.wait) {
		urlCrawled = 'Cuzillion';
		return request.get('http://1.cuzillion.com/bin/resource.cgi?type=js&sleep=10&n=1&t=1399648150', function () {
			return res.send('' + urlCrawled);
		});
	}
	urlCrawled = '' + Math.random() * 1000;
	return res.send(urlCrawled);
}

module.exports = incAndGet;
