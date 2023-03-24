# Change Log

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
