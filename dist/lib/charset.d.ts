declare const CHARTSET_RE: RegExp;
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
declare function charset(obj: any, data: any, peekSize: any): any;
