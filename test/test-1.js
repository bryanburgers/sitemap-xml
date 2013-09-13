var assert = require('assert');
var teststream = require('./teststream.js');

var sitemap = require('../index.js');

describe('sitemap-xml', function() {
	it('writes out one url', function(next) {
		var writable = teststream();

		var s = sitemap();
		s.pipe(writable);
		s.write({ loc: 'http://example.com/' });
		s.end();

		writable.on('finish', function() {
			var output = writable.getContents();
			assert.equal(output, '<?xml version="1.0" encoding="UTF-8"?>\r\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>http://example.com/</loc></url></urlset>');

			next();
		});
	});

	it('writes out multiple URLs', function(next) {
		var writable = teststream();

		var s = sitemap();
		s.pipe(writable);
		s.write({ loc: 'http://example.com/1' });
		s.write({ loc: 'http://example.com/2' });
		s.end();

		writable.on('finish', function() {
			var output = writable.getContents();
			assert.equal(output, '<?xml version="1.0" encoding="UTF-8"?>\r\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>http://example.com/1</loc></url><url><loc>http://example.com/2</loc></url></urlset>');

			next();
		});
	});

	it('writes out a URL with an ampersand', function(next) {
		var writable = teststream();

		var s = sitemap();
		s.pipe(writable);
		s.write({ loc: 'http://example.com/?p=1&q=2' });
		s.end();

		writable.on('finish', function() {
			var output = writable.getContents();
			assert.equal(output, '<?xml version="1.0" encoding="UTF-8"?>\r\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>http://example.com/?p=1&amp;q=2</loc></url></urlset>');

			next();
		});
	});

	it('writes out a URL if it is not passed in as an object', function(next) {
		var writable = teststream();

		var s = sitemap();
		s.pipe(writable);
		s.write('http://example.com/');
		s.end();

		writable.on('finish', function() {
			var output = writable.getContents();
			assert.equal(output, '<?xml version="1.0" encoding="UTF-8"?>\r\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>http://example.com/</loc></url></urlset>');

			next();
		});
	});

	it('writes out a URL with lastmod', function(next) {
		var writable = teststream();

		var s = sitemap();
		s.pipe(writable);
		s.write({ loc: 'http://example.com/', lastmod: '2013-04-21' });
		s.end();

		writable.on('finish', function() {
			var output = writable.getContents();
			assert.equal(output, '<?xml version="1.0" encoding="UTF-8"?>\r\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>http://example.com/</loc><lastmod>2013-04-21</lastmod></url></urlset>');

			next();
		});
	});

	it('writes out a URL with changereq', function(next) {
		var writable = teststream();

		var s = sitemap();
		s.pipe(writable);
		s.write({ loc: 'http://example.com/', changefreq: 'monthly' });
		s.end();

		writable.on('finish', function() {
			var output = writable.getContents();
			assert.equal(output, '<?xml version="1.0" encoding="UTF-8"?>\r\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>http://example.com/</loc><changefreq>monthly</changefreq></url></urlset>');

			next();
		});
	});

	it('writes out a URL with priority', function(next) {
		var writable = teststream();

		var s = sitemap();
		s.pipe(writable);
		s.write({ loc: 'http://example.com/', priority: '1.0' });
		s.end();

		writable.on('finish', function() {
			var output = writable.getContents();
			assert.equal(output, '<?xml version="1.0" encoding="UTF-8"?>\r\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>http://example.com/</loc><priority>1.0</priority></url></urlset>');

			next();
		});
	});

	it('writes out a URL with all options', function(next) {
		var writable = teststream();

		var s = sitemap();
		s.pipe(writable);
		s.write({ loc: 'http://example.com/', lastmod: '2013-04-21', changefreq: 'monthly', priority: '1.0' });
		s.end();

		writable.on('finish', function() {
			var output = writable.getContents();
			assert.equal(output, '<?xml version="1.0" encoding="UTF-8"?>\r\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>http://example.com/</loc><lastmod>2013-04-21</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>');

			next();
		});
	});
});
