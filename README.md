# sitemap.xml

Stream URLs to the sitemap.

[![Build Status](https://travis-ci.org/bryanburgers/sitemap-xml.png?branch=master)](https://travis-ci.org/bryanburgers/sitemap-xml)

## Usage

```js
var sitemap = require('sitemap-xml');

// Raw node
var http = require('http');
http.createServer(function (request, response) {
	res.writeHead(200, {'Content-Type': 'application/xml'});
	var stream = sitemap();
	stream.pipe(response);
	stream.write({ loc: 'http://example.com/', lastmod: '2013-04-21' });
	stream.write({ loc: 'http://example.com/page-1', priority: '0.9' });
	stream.end();
})

// Express
app.get('/sitemap.xml', function(request, response, next) {
	var stream = sitemap();
	stream.pipe(response);
	stream.write({ loc: 'http://example.com/', lastmod: '2013-04-21' });
	stream.write({ loc: 'http://example.com/page-1', priority: '0.9' });
	stream.end();
});
```

