/*

This software is licensed under the MIT License.

Copyright (C) 2012 - 2015 fengmk2 <fengmk2@gmail.com>
Copyright (c) node-modules and other contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

// note: this was pull at version 1.0.1 from https://github.com/node-modules/charset

const CHARTSET_RE = /(?:charset|encoding)\s{0,10}=\s{0,10}['"]? {0,10}([\w-]{1,100})/i;

/**
 * guest data charset from req.headers, xml, html content-type meta tag
 * headers:
 *  'content-type': 'text/html;charset=gbk'
 * meta tag:
 *  <meta http-equiv="Content-Type" content="text/html; charset=xxxx"/>
 * xml file:
 *  <?xml version="1.0" encoding="UTF-8"?>
 *
 * @param {Object} obj `Content-Type` String, or `res.headers`, or `res` Object
 * @param {Buffer} [data] content buffer
 * @param {Number} [peekSize] max content peek size, default is 512
 * @return {String} charset, lower case, e.g.: utf8, gbk, gb2312, ....
 *  If can\'t guest, return null
 * @api public
 */
function charset(obj, data, peekSize) {
  let matchs = null;
  let end = 0;
  if (data) {
    peekSize = peekSize || 512;
    // https://github.com/node-modules/charset/issues/4
    end = data.length > peekSize ? peekSize : data.length;
  }
  // charset('text/html;charset=gbk')
  let contentType = obj;
  if (contentType && typeof contentType !== 'string') {
    // charset(res.headers)
    let headers = obj;
    if (obj.headers) {
      // charset(res)
      headers = obj.headers;
    }
    contentType = headers['content-type'] || headers['Content-Type'];
  }
  if (contentType) {
    // guest from obj first
    matchs = CHARTSET_RE.exec(contentType);
  }
  if (!matchs && end > 0) {
    // guest from content body (html/xml) header
    contentType = data.slice(0, end).toString();
    matchs = CHARTSET_RE.exec(contentType);
  }
  let cs = null;
  if (matchs) {
    cs = matchs[1].toLowerCase();
    if (cs === 'utf-8') {
      cs = 'utf8';
    }
  }
  return cs;
}

module.exports.find = charset;
