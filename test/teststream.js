"use strict";

var stream = require('stream');
var util = require('util');

function TestStream() {
	stream.Writable.call(this);
	this._contents = '';
}

util.inherits(TestStream, stream.Writable);

TestStream.prototype._write = function(chunk, encoding, callback) {
	this._contents += chunk.toString(encoding);
	callback();
};

TestStream.prototype.getContents = function() {
	return this._contents;
};

module.exports = function() {
	return new TestStream();
};
