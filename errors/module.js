/**
 * Created by tamil on 5/8/14.
 */

"use strict";

var myCounter = 0;

function incAndGet(req, res) {
	myCounter++;
	res.send('' + myCounter);
}

module.exports = incAndGet;
