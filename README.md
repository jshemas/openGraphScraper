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

### Resulte JSON
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
mocha spec/
```

### Make
This will install the all of the dependencies, then run the tests
```
make test
```

### TODO
-Get more info from url(s) like title tags and more images

## License

(The MIT License)

Copyright (c) 2013 Josh Shemas

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
