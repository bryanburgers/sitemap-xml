"use strict";

var stream = require('stream');
var util = require('util');

function SitemapStream() {
	stream.Transform.call(this, { objectMode: true });
	this._headOutputted = false;
}

util.inherits(SitemapStream, stream.Transform);

if (!String.prototype.encodeHTML) {
	String.prototype.encodeHTML = function () {
		return this.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	};
}

SitemapStream.prototype._transform = function(chunk, encoding, callback) {
	if (!this._headOutputted) {
		this.push('<?xml version="1.0" encoding="UTF-8"?>\r\n', 'utf-8');
		this.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', 'utf-8');
		this._headOutputted = true;
	}

	if (typeof(chunk) === 'string') {
		chunk = {
			loc: chunk
		};
	}

	this.push('<url>', 'utf-8');
	this.push('<loc>', 'utf-8');
	this.push(chunk.loc.encodeHTML(), 'utf-8');
	this.push('</loc>', 'utf-8');

	if (chunk.lastmod) {
		this.push('<lastmod>', 'utf-8');
		this.push(chunk.lastmod.encodeHTML(), 'utf-8');
		this.push('</lastmod>', 'utf-8');
	}

	if (chunk.changefreq) {
		this.push('<changefreq>', 'utf-8');
		this.push(chunk.changefreq.encodeHTML(), 'utf-8');
		this.push('</changefreq>', 'utf-8');
	}

	if (chunk.priority) {
		this.push('<priority>', 'utf-8');
		this.push(chunk.priority.encodeHTML(), 'utf-8');
		this.push('</priority>', 'utf-8');
	}

	this.push('</url>', 'utf-8');
	callback();
};

SitemapStream.prototype._flush = function(callback) {
	this.push('</urlset>');
	callback();
};

module.exports = function() {
	return new SitemapStream();
};
