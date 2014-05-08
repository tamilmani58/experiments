/**
 * Created by tamil on 5/8/14.
 */

"use strict";

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var url = require('url');

if (cluster.isMaster) {
	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});
} else {
	// Workers can share any TCP connection
	// In this case its a HTTP server
	http.createServer(function(req, res) {
		var parsedUrl = url.parse(req.url, true);
		console.log(parsedUrl);
		if (parsedUrl.query.test) {
			test++;
		}
		res.writeHead(200);
		res.end("hello world\n");
	}).listen(8000);
}

process.on('uncaughtException', function (err) {
	console.log(err);
});
