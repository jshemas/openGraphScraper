# openGraphScraper

[![Node.js CI](https://github.com/jshemas/openGraphScraper/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/jshemas/openGraphScraper/actions?query=branch%3Amaster)
[![Known Vulnerabilities](https://snyk.io/test/github/jshemas/openGraphScraper/badge.svg)](https://snyk.io/test/github/jshemas/openGraphScraper)

A simple node module for scraping Open Graph and Twitter Card info off a site.

Note: `open-graph-scraper` doesn't support browser usage at this time.

## Installation

```bash
npm install open-graph-scraper --save
```

## Usage

```javascript
const ogs = require('open-graph-scraper');
const options = { url: 'http://ogp.me/' };
ogs(options)
  .then((data) => {
    const { error, html, result, response } = data;
    console.log('error:', error);  // This returns true or false. True if there was an error. The error itself is inside the result object.
    console.log('html:', html); // This contains the HTML of page
    console.log('result:', result); // This contains all of the Open Graph results
    console.log('response:', response); // This contains response from the Fetch API
  })
```

## Results JSON

Check the return for a ```success``` flag. If success is set to true, then the url input was valid. Otherwise it will be set to false. The above example will return something like...

```javascript
{
  ogTitle: 'Open Graph protocol',
  ogType: 'website',
  ogUrl: 'https://ogp.me/',
  ogDescription: 'The Open Graph protocol enables any web page to become a rich object in a social graph.',
  ogImage: [
    {
      height: '300',
      type: 'image/png',
      url: 'https://ogp.me/logo.png',
      width: '300'
    }
  ],
  charset: 'utf-8',
  requestUrl: 'http://ogp.me/',
  success: true
}
```

## Options

| Name                 | Info                                                                       | Default Value | Required |
|----------------------|----------------------------------------------------------------------------|---------------|----------|
| url                  | URL of the site.                                                           |               | x        |
| html                 | You can pass in an HTML string to run ogs on it. (use without options.url) |               |          |
| fetchOptions         | Options that are used by the Fetch API                                     | {}            |          |
| timeout              | Request timeout for Fetch (Default is 10 seconds)                          | 10            |          |
| blacklist            | Pass in an array of sites you don't want ogs to run on.                    | []            |          |
| onlyGetOpenGraphInfo | Only fetch open graph info and don't fall back on anything else.           | false         |          |
| ogImageFallback      | Fetch other images if no open graph ones are found.                        | true          |          |
| customMetaTags       | Here you can define custom meta tags you want to scrape.                   | []            |          |
| urlValidatorSettings | Sets the options used by validator.js for testing the URL                  | [Here](https://github.com/jshemas/openGraphScraper/blob/master/lib/utils.ts#L4-L17)          |          |

Note: `open-graph-scraper` uses the [Fetch API](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#fetch) for requests and most of [Fetch's options](https://developer.mozilla.org/en-US/docs/Web/API/fetch#options) should work as `open-graph-scraper`'s `fetchOptions` options.

## Custom Meta Tag Example

```javascript
const ogs = require('open-graph-scraper');
const options = {
  url: 'https://github.com/jshemas/openGraphScraper',
  customMetaTags: [{
    multiple: false, // is there more than one of these tags on a page (normally this is false)
    property: 'hostname', // meta tag name/property attribute
    fieldName: 'hostnameMetaTag', // name of the result variable
  }],
};
ogs(options)
  .then((data) => {
    const { error, result, response } = data;
    console.log('hostnameMetaTag:', result.hostnameMetaTag); // hostnameMetaTag: github.com
  })
```

## User Agent Example

```javascript
const ogs = require("open-graph-scraper");
const userAgent = 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.5563.57 Mobile Safari/537.36';
const headers = new Headers({
  'user-agent': userAgent,
});
ogs({ url: 'https://www.wikipedia.org/', fetchOptions: { headers } })
  .then((data) => {
    const { error, html, result, response } = data;
    console.log('error:', error);  // This returns true or false. True if there was an error. The error itself is inside the result object.
    console.log('html:', html); // This contains the HTML of page
    console.log('result:', result); // This contains all of the Open Graph results
    console.log('response:', response); // This contains response from the Fetch API
  })
```

## Tests

Then you can run the tests by running...

```bash
npm run test
```
