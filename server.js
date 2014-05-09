/**
 * Created by tamil on 5/9/14.
 */

"use strict";

var restify = require('restify');
var merror = require('./errors/module');
var asyncParallel = require('./async/async');
var serialCall = require('./async/normal');
var whenParallel = require('./async/when');

var server = restify.createServer();


server.get('/merror', merror);

server.get('/aparallel', asyncParallel);

server.get('/serialcall', serialCall);

server.get('/wparallel', whenParallel);

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});