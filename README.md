openGraphScraper
==============
[![Build Status](https://travis-ci.org/jshemas/openGraphScraper.png?branch=master)](https://travis-ci.org/jshemas/openGraphScraper)
[![Known Vulnerabilities](https://snyk.io/test/github/jshemas/openGraphScraper/badge.svg)](https://snyk.io/test/github/jshemas/openGraphScraper)
[![Coverage Status](https://coveralls.io/repos/github/jshemas/openGraphScraper/badge.svg?branch=master)](https://coveralls.io/github/jshemas/openGraphScraper?branch=master)

A simple node module for scraping Open Graph and Twitter Card info off a site.

### Installation
```
npm install open-graph-scraper
```

### Usage
```javascript
var ogs = require('open-graph-scraper');
var options = {'url': 'http://ogp.me/'};
ogs(options, function (error, results) {
  console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
  console.log('results:', results);
});

```

You can set a timeout flag like... Example four seconds:
```javascript
var ogs = require('open-graph-scraper');
var options = {'url': 'http://ogp.me/', 'timeout': 4000};
ogs(options, function (error, results) {
  console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
  console.log('results:', results);
});
```

You can set custom headers. For example scraping data in a specific language:
```javascript
var ogs = require('open-graph-scraper');
var options = {'url': 'http://ogp.me/', 'headers': { 'accept-language': 'en' }};
ogs(options, function (error, results) {
  console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
  console.log('results:', results);
});
```

You can set a blacklist. For example if you want to black list youtube.com:
```javascript
var ogs = require('open-graph-scraper');
var options = {'url': 'http://ogp.me/', 'blacklist': ['youtube.com']};
ogs(options, function (error, results) {
  console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
  console.log('results:', results);
});
```

Example of setting encoding(default is `null`):
```javascript
var ogs = require('open-graph-scraper');
var options = {'url': 'http://ogp.me/', 'encoding': 'utf8'};
ogs(options, function (error, results) {
  console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
  console.log('results:', results);
});
```

There is also a followAllRedirects(default is `true`) and a maxRedirects(default is `20`) option:
```javascript
var ogs = require('open-graph-scraper');
var options = {'url': 'http://ogp.me/', 'followAllRedirects': true, 'maxRedirects': 20};
ogs(options, function (error, results) {
  console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
  console.log('results:', results);
});
```

If you would like the response of the page you scraped you can grab it as the third param:
```javascript
var ogs = require('open-graph-scraper');
var options = {'url': 'http://ogp.me/', 'timeout': 4000};
ogs(options, function (error, results, response) {
  console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
  console.log('results:', results);
  console.log('response:', response); // The whole Response Object
});
```

Promise Example:
```javascript
var ogs = require('open-graph-scraper');
var options = {'url': 'http://ogp.me/'};
ogs(options)
  .then(function (result) {
    console.log('result:', result);
  })
  .catch(function (error) {
    console.log('error:', error);
  });
```

Note: By default if page dose not have something like a `og:title` tag it will try and look for it in other places and return that. If you truely only want open graph info you can use the option `onlyGetOpenGraphInfo` and set it to `true`.

It's possible to pass in an HTML string instead of a URL. There won't be a resonse object.
```javascript
var htmlString = /* html string goes here */;
var ogs = require('open-graph-scraper');
var options = {'html': htmlString};
ogs(options, function (error, results) {
  console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
  console.log('results:', results);
});
```


### Results JSON
Check the return for a ```success``` flag. If success is set to true, then the url input was valid. Otherwise it will be set to false. The above example will return something like...
```javascript
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
- There is a `allMedia` option you can set to `true` if you want all the images/videos send back.

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
