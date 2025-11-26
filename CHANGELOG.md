# Change Log

## 6.11.0

- Updating `type` to support the new `jsonLDOptions`
- Dropping `node18` support since it's passed it's end of life
- Updating to the latest `undici` version 7
- Updating dependencies to fix npm vulnerabilities

## 6.10.0

- Updating dependencies to fix npm vulnerabilities

## 6.9.0

- Add `jsonLDOptions.throwOnJSONParseError` and change default behavior to not throw on JSON-LD string parse errors

## 6.8.4

- Normalize `content-type` header check for case insensitivity
- Updating dependencies

## 6.8.3

- Fixed issue where empty jsonLD would caused an error
- Updating dependencies

## 6.8.2

- Remove new lines from jsonLD.
- If url string is not `isLatin1` then encode it, otherwise you will run into `ByteString` errors within `fetch`
- Updating dependencies

## 6.8.1

- Fixing issue where setting `fetchOptions.headers` would replace the default `headers`
- Updating dependencies

## 6.8.0

- Updating how `onlyGetOpenGraphInfo` works. By default it is `false` but now it accepts an array of properties for which no fallback should be used.
- Updating how you get types `import { SuccessResult } from 'open-graph-scraper/types';`. See readme for details.
- Updating dependencies

## 6.7.2

- Adding `types` to the npm export. You can now use `import { SuccessResult } from 'open-graph-scraper/types/lib/types';`
- Updating dependencies

## 6.7.1

- Remove `default` export off of the `run` function and just set `export` to `run`.
- Updating dependencies

## 6.7.0

- Replace `validator` with internal version of `isUrl` so we have better control on how that works.
- Fix issue where `JSON` parsing fails when Youtube escape '&' to '\x26'.
- Updating dependencies

## 6.6.3

- Fix issue with the `charset` fallback. Replace Buffer.from with Uint8Array since body is always html
- Updating dependencies to fix npm vulnerabilities

## 6.6.2

- Fixed issue with `package.json` `exports` was not working in `CommonJs` projects.
- Fixed issue where if the `jsonLD` tag was empty, it would cause a error.

## 6.6.1

- Use `node16` for `module`/`moduleResolution` ESM build
- Fixed issue with `package.json` `exports` was not working in `NextJs` projects.

## 6.6.0

- Updating the `tsc` build process to better support both `ESM` and `commonJS`
- Fixed issue where some meta tags would always come back as array even thought there was only ever one meta tag.
- Removed the `dist` folder from version control
- Start running node22 in the CI pipeline
- General typescript clean up
- Example service will only return the `result` of OGS now
- Updating dependencies

## 6.5.2

- adding a new favicon fallback using appIcon
- Updating dependencies to fix npm vulnerabilities

## 6.5.1

- jsonLD is now a array of objects since there can be more then one jsonLD tag pre page
- Updating dependencies to fix npm vulnerabilities

## 6.5.0

- Adding support for JSON LD
- Adding support for `og:image:alt`, `twitterAccount`, `fbAppId` and extra og tags for `music` and `video`
- Fixing jsdoc param name
- Updating dependencies

## 6.4.0

- Add character encoding detection and decoding logic using `iconv-lite`
- Updating dependencies

## 6.3.4

- Adding check to make sure `customMetaTags` are valid
- Updating dependencies

## 6.3.3

- Updating dependencies
- Sent the `Accept: text/html` header by default

## 6.3.2

- Fixing issue with npm

## 6.3.1

- Adding a fallback for `charset` using `http-equiv`
- Updating dependencies to fix npm vulnerabilities

## 6.3.0

- Export `SuccessResult` and `ErrorResult` types
- Updating dependencies

## 6.2.2

- Updating dependencies to fix npm vulnerabilities

## 6.2.1

- Send back more details when there is a server error

## 6.2.0

- Modified the `url` property in `OpenGraphScraperOptions` to be an optional property since you don't need this when using just `html`
- `Type` can optional in `ImageObject` since type is not set it it's invalid
- Take all of the `customMetaTags` out of base of `ogObject` and store them into `ogObject.customMetaTags`
- The internal meta properties can be string arrays
- Updating Dependencies

## 6.1.0

- Setting the `origin` `header` to the request url since `fetch` runs in [cors mode by default](https://github.com/nodejs/undici/issues/1305).
- Import `undici` for `fetch` so all versions of node18 are running the same version of `fetch`. Now ogs supports all versions of node18!
- Updating Dependencies

## 6.0.1

- `OpenGraphScraperOptions.fetchOptions` should be of type `RequestInit` instead of `Request`.
- Updating Dependencies

## 6.0.0 (Has breaking changes!)

- Replace `GOT` with [fetch](https://nodejs.org/docs/latest-v18.x/api/globals.html#fetch)!
- Only supporting `node18` or higher going forward
- Updated how options work. `Fetch` and `OGS` options no longer being mixed together, users can now set [fetch options](https://developer.mozilla.org/en-US/docs/Web/API/fetch#options) using `options.fetchOptions`
- Remove any ogImages/ogVideos/twitterImages/twitterPlayers/musicSongs results that have no url
- The `downloadLimit` option has been removed in favor of just using timeouts.
- Limit ogImages/ogVideos/twitterImages/twitterPlayers/musicSongs to 10 items
- Adding html to the `SuccessResult` of `OGS`
- Adding `options.timeout` to set the fetch request timeout. (default is 10 seconds)
- Remove `null` values from ogImages/ogVideos/twitterImages/twitterPlayers/musicSongs
- Removing `options.allMedia`, you can just grab the first value of the array for the pervious behavior
- Removing `options.ogImageFallback`, you can set `options.onlyGetOpenGraphInfo` to `true` for the pervious behavior
- ogImages/ogVideos/twitterImages/twitterPlayers/musicSongs will always be an array now, you can just grab the first value of the array for the pervious behavior
- Updating Dependencies

## 5.2.3

- Add in declaration files for typescript users.

## 5.2.2

- Specify true/false to distinguish `SuccessResult` and `ErrorResult` by `error` field.

## 5.2.1

- Adding the importsNotUsedAsValues flag and fixing type import issues

## 5.2.0

- Remove the `charset` lib and just use `chardet` for finding the html encoding
- Remove `peekSize` option since that was used by `charset`
- Updating the `charset` fallback to be more reliable
- Adding support for `article:published_date` and `article:modified_date` meta tags
- Updating Dependencies

## 5.1.1

- Fix issue where using `import` would cause typescript errors
- Updating the `urlValidatorSettings` defaults to match `validatorjs`
- Updating Dependencies

## 5.1.0

- Convert source code to typescript
- Changing `response.body` to be a `string` and `response.rawBody` to be a `buffer`. They now match the `node` type for `response`.
- Updating Dependencies

## 5.0.5

- Adding `twitterImageObject` and `twitterPlayerObject` types
- Updating Dependencies

## 5.0.4

- The `options.downloadLimit` type now allows for `false`
- Updating Dependencies

## 5.0.3

- Adding successResult and errorResult types

## 5.0.2

- TS export now has common GOT options.
- Updating Dependencies

## 5.0.1

- TS export run as a Promise
- Updating Docs
- Updating Dependencies

## 5.0.0

- Updating to `got` version 12!
- Adding typescript support.
- The `retry` option is now a object -> https://github.com/sindresorhus/got/blob/main/documentation/7-retry.md#retry
- The `timeout` option is now a object -> https://github.com/sindresorhus/got/blob/main/documentation/6-timeout.md#timeout-options
- Dropping callback support. If you still want to use callbacks, you can use `callbackify` -> https://nodejs.org/api/util.html#util_util_callbackify_original
- Auth errors will now be passed back to the clint and will no long just be `Page not found` errors.
- Dropping support for node12 since `got` no longer supports it.
- Removing `options.encoding`.
- Updating Dependencies

## 4.11.1

- Updating Dependencies to fix a security vulnerability

## 4.11.0

- Adding support for fetching the favicon
- Updating Dependencies

## 4.10.0

- Adding a check for the `content-type` header, it has to contain `text/html`
- Adding `options.downloadLimit`, it sets the maximum size of the content downloaded from the server, in bytes
- Updating Dependencies

## 4.9.2

- Updating Dependencies to fix a security vulnerability

## 4.9.1

- Updating Dependencies to fix a security vulnerability

## 4.9.0

- Dropping support for Node10 since it has reach it's end of life
- Setting response.rawBody to the parsed body since response.body is a buffer
- Updating Dependencies

## 4.8.2

- Adding support for Node16
- Updating Dependencies

## 4.8.1

- Fixing bug where the title fallback would return multiple titles

## 4.8.0

- Adding support for Proxies
- Updating Dependencies

## 4.7.1

- Updating Dependencies to fix a security vulnerability

## 4.7.0

- Adding `options.urlValidatorSettings`, it sets the options used by validator.js for testing the URL
- Updating Dependencies

## 4.6.0

- Fixing issue where you would get a false positive errors with pages that have `.tar` in it like `www.target.com`
- Split extract and request into their own files
- Updating Dependencies

## 4.5.1

- Fixing issue where you couldn't set the `ogImageFallback` option to false
- Fixing image type fallback so it works with arrays

## 4.5.0

- Adding support for custom meta tags you want to scrape
- If ogs thinks the URL isn't a HTML page, it will return a 'Must scrape an HTML page' error.
- Updating Dependencies

## 4.4.0

- Adding support for app links meta data
- Removed the `withCharset` option, you can use `onlyGetOpenGraphInfo` now if you do not want charset
- Removed the `runChar` option, this will always be turned on
- `options.encoding === null` is now deprecated
- Updating image fallback to only send back valid URLs
- Updating Dependencies

## 4.3.1

- Small code clean up and adding tests
- Updating Dependencies

## 4.3.0

- Adding support for request headers

## 4.2.1

- Make sure item.fieldName exists before trying to use it
- Updating devDependencies
- Updating eslint rule set to be more simple
- Fixed the badge icon in the readme

## 4.2.0

- Checking for new tags like article, book, profile, business and restaurant
- Adding support for Dublin Core tags!
- Updating image fallback to send back width/height/type
- Adding more title/description/locale/audio/other fallbacks
- Fixed bug where if there was a weird casing on a meta, ogs would skip it
- Will no longer return undefined values in some cases
- Updating dependencies and removed lodash

## 4.1.1

- Updating to use github actions for CI!

## 4.1.0

- Updating to use `validators.js`'s `isURL` to check user input URLs
- Moving snyk to be under devDependencies

## 4.0.0 (has breaking changes!)

- Dropping support for any node version under 10
- Open Graph values are no longer nested in a data object.
- Stop using request.js(deprecated) and start using got.js
- Using promises will now send the error/result/response back in one object.
- Options.gzip is now options.decompress
- Options.followAllRedirects is now options.followRedirect
- Drop support for options.jar
- Options.timeout must be a number value
- Updating error messaging
- Updating dependencies

## 3.6.2

- Updating lodash.

## 3.6.1

- Updating dependencies to vulnerabilities.

## 3.6.0

- Replaced jschardet with charde.

## 3.5.1

- Updating dependencies.

## 3.5.0

- Adding Open Graph music tags!

## 3.4.0

- Adding a new option for the 'jar' setting for requests. It will now be turned off by default.

## 3.3.0

- Code refactor to work in an es5 environment!

## 3.2.0

- Website that don't have Open Graph images will now return an array of all of the images on the site

## 3.1.5

- Updating lodash to fix vulnerable

## 3.1.4

- Returns more info on the error occurred when using promises

## 3.1.3

- Catch iconv exception to prevent unexpected charset

## 3.1.2

- Checking for Open Graph price and availability info

## 3.1.1

- Updating packages

## 3.1.0

- Adding ability to extract meta from HTML string

## 3.0.2

- Adding CHANGELOG.md

## 3.0.1

- Fixing coverage reporter
- Fixing tests

## 3.0.0

- Updated dependencies to their latest version(s)
- Officially now support Node.js v4 and up
- Adds unit tests to ensure code quality
- Adds options for encoding, blacklist, followAllRedirects, and maxRedirects
- Module can now be used a promise
- `err` is now `error`
- Adds check for Open Graph product info
