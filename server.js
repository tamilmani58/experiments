/**
 * Created by tamil on 5/9/14.
 */

"use strict";

var restify = require('restify');
var merror = require('./errors/module');

var server = restify.createServer();


server.get('/merror', merror);

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});