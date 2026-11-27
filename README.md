# openGraphScraper

[![Node.js CI](https://github.com/jshemas/openGraphScraper/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/jshemas/openGraphScraper/actions/workflows/node.js.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/jshemas/openGraphScraper/badge.svg)](https://snyk.io/test/github/jshemas/openGraphScraper)

A simple Node.js module with TypeScript declarations for scraping Open Graph, Twitter Card, and other metadata from a site.

Note: `open-graph-scraper` doesn't support browser usage at this time but you can use `open-graph-scraper-lite` if you already have the `HTML` and can't use Node's [Fetch API](https://nodejs.org/docs/latest/api/globals.html#fetch).

## Installation

Open Graph Scraper requires Node.js 20 or newer.

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
    console.log('error:', error); // false for successful requests
    console.log('html:', html); // The HTML of the page
    console.log('result:', result); // The Open Graph results
    console.log('response:', response); // The response from the Fetch API
  })
  .catch((data) => {
    const { error, result } = data;
    console.log('error:', error); // true for failed requests
    console.log('result:', result); // The error and request details
  });
```

## Results JSON

Each successful result has `success: true` in the `result` object. Failed requests reject the Promise with an `ErrorResult` that has `error: true` and `result.success: false`.

### Successful result

```javascript
{
  error: false,
  html: '<html>...</html>',
  response: {},
  result: {
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
}
```

### Failed result

```javascript
{
  error: true,
  html: undefined,
  response: undefined,
  result: {
    success: false,
    requestUrl: 'http://invalid.example/',
    error: 'Invalid URL',
    errorDetails: {}
  }
}
```

## Options

| Name                 | Info                                                                                                                                      | Default Value                                                                       | Required |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|----------|
| url                  | URL of the site.                                                                                                                          |                                                                                     | Required unless `html` is used |
| html                 | You can pass in an HTML string to scrape. `html` and `url` are mutually exclusive.                                                        |                                                                                     | Required unless `url` is used |
| fetchOptions         | Options that are used by the Fetch API                                                                                                    | {}                                                                                  |          |
| timeout              | Request timeout for Fetch (Default is 10 seconds)                                                                                         | 10                                                                                  |          |
| blacklist            | Pass in site values to block, including redirect destinations.                                                                            | []                                                                                  |          |
| onlyGetOpenGraphInfo | Only fetch Open Graph info and don't use fallbacks. Use `true` to disable all fallbacks, or an array to disable fallbacks for specific properties: `image`, `title`, `description`, `locale`, `logo`, `url`, `favicon`, `audioUrl`, or `date`. | false                                                                               |          |
| customMetaTags       | Here you can define custom meta tags you want to scrape.                                                                                  | []                                                                                  |          |
| urlValidatorSettings | Overrides URL validation settings such as allowed protocols, host/TLD requirements, port requirements, fragments, query components, underscores, trailing dots, and length limits. | HTTP(S) protocols; host and TLD required; protocol not required; fragments and query components allowed |          |
| jsonLDOptions        | Controls JSON-LD parse errors with `throwOnJSONParseError` and `logOnJSONParseError`.                                                     | `{ throwOnJSONParseError: false, logOnJSONParseError: false }`                        |          |

Note: `open-graph-scraper` uses the [Fetch API](https://nodejs.org/docs/latest/api/globals.html#fetch) for requests and most of [Fetch's options](https://developer.mozilla.org/en-US/docs/Web/API/fetch#options) should work as `open-graph-scraper`'s `fetchOptions` options.

For SSRF protection, requests are limited to HTTP(S) destinations whose resolved IP addresses are public. Redirect destinations are checked before they are requested. Redirect handling cannot be overridden, and custom Undici dispatchers supplied in `fetchOptions` or configured globally are ignored because they could bypass these protections.

## Types and Import Example

```typescript
import type { SuccessResult } from 'open-graph-scraper/types';
import ogs from 'open-graph-scraper';

// Example of how to get types
const example: SuccessResult = {
  result: { ogTitle: 'this is a title' },
  error: false,
  response: {},
  html: '<html></html>'
};

// Import example
const options = { url: 'http://ogp.me/' };
ogs(options)
  .then((data) => {
    const { error, html, result, response } = data;
    console.log('error:', error);
    console.log('html:', html);
    console.log('result:', result);
    console.log('response:', response);
  })
  .catch((data) => console.log('error:', data));
```

## Custom Meta Tag Example

```javascript
const ogs = require('open-graph-scraper');
const options = {
  url: 'https://github.com/jshemas/openGraphScraper',
  customMetaTags: [{
    multiple: false, // Set to false for one tag or true for repeated tags
    property: 'hostname', // Meta tag property, name, or itemprop attribute
    fieldName: 'hostnameMetaTag', // name of the result variable
  }],
};
ogs(options)
  .then((data) => {
    const { result } = data;
    console.log('hostnameMetaTag:', result.customMetaTags.hostnameMetaTag); // hostnameMetaTag: github.com
  })
  .catch((data) => console.log('error:', data));
```

## HTML Example

```javascript
const ogs = require('open-graph-scraper');
const options = {
  html: `<html><head>
  <link rel="icon" type="image/png" href="https://bar.com/foo.png" />
  <meta charset="utf-8" />
  <meta property="og:description" name="og:description" content="html description example" />
  <meta property="og:image" name="og:image" content="https://www.foo.com/bar.jpg" />
  <meta property="og:title" name="og:title" content="foobar" />
  <meta property="og:type" name="og:type" content="website" />
  </head></html>`,
};
ogs(options)
  .then((data) => {
    const { result } = data;
    console.log('result:', result);
    // result: {
    //   ogDescription: 'html description example',
    //   ogTitle: 'foobar',
    //   ogType: 'website',
    //   ogImage: [ { url: 'https://www.foo.com/bar.jpg', type: 'jpg' } ],
    //   favicon: 'https://bar.com/foo.png',
    //   charset: 'utf-8',
    //   success: true
    // }
  })
  .catch((data) => console.log('error:', data));
```

## User Agent Example

The request header is set to [undici](https://github.com/nodejs/undici) by default. Some sites might block this, and changing the `userAgent` might work. If not you can try [using a proxy](https://www.scrapingbee.com/blog/proxy-node-fetch/) for the request and then pass the `html` into `open-graph-scraper`.

```javascript
const ogs = require('open-graph-scraper');
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';
ogs({ url: 'https://www.wikipedia.org/', fetchOptions: { headers: { 'user-agent': userAgent } } })
  .then((data) => {
    const { error, html, result, response } = data;
    console.log('error:', error);
    console.log('html:', html);
    console.log('result:', result);
    console.log('response:', response);
  })
  .catch((data) => console.log('error:', data));
```

## JSON-LD Parsing Options Example

The `throwOnJSONParseError` and `logOnJSONParseError` properties control what happens if `JSON.parse` throws
an error while parsing JSON-LD data. Both default to `false`. Set `throwOnJSONParseError` to `true` to throw the
error, or set `logOnJSONParseError` to `true` to log it to the console.

```javascript
const ogs = require('open-graph-scraper');
ogs({ url: 'https://www.wikipedia.org/', jsonLDOptions: { throwOnJSONParseError: true } })
  .then((data) => {
    const { error, html, result, response } = data;
    console.log('error:', error);
    console.log('html:', html);
    console.log('result:', result);
    console.log('response:', response);
  })
  .catch((data) => console.log('error:', data));
```

## Running the example app

The `example` folder contains a simple Express app. From that directory, run `npm ci && npm run start` to start it. Once the app is running, open `http://localhost:3000/scraper?url=http://ogp.me/` in a web browser to test it. A `Dockerfile` is also included if you want to run the example app in a Docker container.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

## Security

See [SECURITY.md](SECURITY.md) for security reporting instructions.
