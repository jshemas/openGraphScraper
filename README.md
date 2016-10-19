openGraphScraper
==============
[![Build Status](https://travis-ci.org/jshemas/openGraphScraper.png?branch=master)](https://travis-ci.org/jshemas/openGraphScraper)
[![Known Vulnerabilities](https://snyk.io/test/github/jshemas/openGraphScraper/badge.svg)](https://snyk.io/test/github/jshemas/openGraphScraper)

A simple node module for scraping Open Graph info off a site.

### Installation
```
npm install open-graph-scraper
```

### Usage
```
var ogs = require('open-graph-scraper');
var options = {'url': 'http://ogp.me/'};
ogs(options, function (err, results) {
	console.log('err:', err); // This is returns true or false. True if there was a error. The error it self is inside the results object.
	console.log('results:', results);
});
```
You can set custom headers. For example scraping data in a specific language:
```
var ogs = require('open-graph-scraper');
var options = {'url': 'http://ogp.me/', 'headers': { 'accept-language': 'en' }};
ogs(options, function (err, results) {
	console.log('err:', err); // This is returns true or false. True if there was a error. The error it self is inside the results object.
	console.log('results:', results);
});
```

You can also set a timeout flag like... Example four seconds:
```
var ogs = require('open-graph-scraper');
var options = {'url': 'http://ogp.me/', 'timeout': 4000};
ogs(options, function (err, results) {
	console.log('err:', err); // This is returns true or false. True if there was a error. The error it self is inside the results object.
	console.log('results:', results);
});
```

If you would like the source of the page you scraped you can grab it as the third param:
```
var ogs = require('open-graph-scraper');
var options = {'url': 'http://ogp.me/', 'timeout': 4000};
ogs(options, function (err, results, source) {
	console.log('err:', err); // This is returns true or false. True if there was a error. The error it self is inside the results object.
	console.log('results:', results);
	console.log('source:', source); // Source of the page
});
```

Note: By default if page dose not have something like a `og:title` tag it will try and look for it in other places and return that. If you truely only want open graph info you can use the option `onlyGetOpenGraphInfo` and set it to `true`.

### Results JSON
Check the return for a ```success``` flag. If success is set to true, then the url input was valid. Otherwise it will be set to false. The above example will return something like...
```
{
	data: {
		ogTitle: 'Open Graph protocol',
		ogType: 'website',
		ogUrl: 'http://ogp.me/',
		ogDescription: 'The Open Graph protocol enables any web page to become a rich object in a social graph.',
		ogImage: {
			url: 'http://ogp.me/logo.png',
			width: '300',
			height: '300',
			type: 'image/png'
		}
	},
	success: true
}
```

### Features
- This will also scrape twitter info!
- There is a `allMedia` flag you can set to `true` if you want all the images/videos send back.

### Tests
You have to have mocha running. To install it run...
```
npm install mocha -g
```
Then you can run the tests by turning on the server and run...
```
mocha tests/
```

### Make
This will install the all of the dependencies, then run the tests
```
make test
```
