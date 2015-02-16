openGraphScraper
==============
[![Build Status](https://travis-ci.org/jshemas/openGraphScraper.png?branch=master)](https://travis-ci.org/jshemas/openGraphScraper)

A simple node module for scraping Open Graph info off a site.

### Installation
```
npm install open-graph-scraper
```

### Usage
```
var ogs = require('open-graph-scraper');
var options = {'url':'http://ogp.me/'};
ogs(options, function(err, results) {
	console.log("err:",err);
	console.log("results:",results);
});
```
You can also set a timeout flag like...
```
var ogs = require('open-graph-scraper');
var options = {'url':'http://ogp.me/','timeout':'2000'};
ogs(options, function(err, results) {
	console.log("err:",err);
	console.log("results:",results);
});
```

### Result JSON
Check the return for a ```success``` flag. If success is set to true, then the url input was valid. Otherwise it will be set to false. The above eample will return something like...
```
{
  data: {
    ogTitle: "Open Graph protocol"
    ogType: "website"
    ogUrl: "http://ogp.me/"
    ogImage: "http://ogp.me/logo.png"
    ogDescription: "The Open Graph protocol enables any web page to become a rich object in a social graph."
  }
  success: true
}
```

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

### TODO
-Get more info from url(s) like title tags and more images
