/**
 * Created by tamil on 5/8/14.
 */

"use strict";

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var url = require('url');
var domain = require('domain');


function requestListener(req, res) {
	// Create a domain
	var uncaughtExceptionHandler = domain.create();

	// Handle Error
	uncaughtExceptionHandler.on('error', function (err) {
		try {
			console.log(err);
			// Kill him if he hasn't committed suicide within 10 Secs
			var killtimer = setTimeout(function() {
				process.exit(1);
			}, 10000);

			// But don't keep the process open just for that!
			killtimer.unref();

			// Close the server
			server.close();

			// Commit a suicide; This dies gracefully
			cluster.worker.disconnect();

			// Hurray!!! we saved the client
			res.writeHead(500);
			res.end('Failed');
		} catch (e) {}
	});

	uncaughtExceptionHandler.add(req);
	uncaughtExceptionHandler.add(res);

	uncaughtExceptionHandler.run(function () {
		var parsedUrl = url.parse(req.url, true);
		if (parsedUrl.query.test) {
			test++;
		}
		res.writeHead(200);
		res.end("hello world\n");
	});
}

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
	var server = http.createServer(requestListener).listen(8000);
}