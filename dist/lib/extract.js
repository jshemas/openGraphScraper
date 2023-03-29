"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const fallback_1 = require("./fallback");
const fields_1 = require("./fields");
const media = require("./media");
const utils = require("./utils");
/**
 * extract all of the meta tags needed for ogs
 *
 * @param {sting} body - the body of the fetch request
 * @param {object} options - options for ogs
 * @return {object} object with ogs results
 *
 */
function extractMetaTags(body, options) {
    let ogObject = {};
    const $ = (0, cheerio_1.load)(body);
    const metaFields = fields_1.default.concat(options.customMetaTags);
    // find all of the open graph info in the meta tags
    $('meta').each((index, meta) => {
        if (!meta.attribs || (!meta.attribs.property && !meta.attribs.name))
            return;
        const property = meta.attribs.property || meta.attribs.name;
        const content = meta.attribs.content || meta.attribs.value;
        metaFields.forEach((item) => {
            if (item && property.toLowerCase() === item.property.toLowerCase()) {
                if (!item.multiple) {
                    ogObject[item.fieldName] = content;
                }
                else if (!ogObject[item.fieldName]) {
                    ogObject[item.fieldName] = [content];
                }
                else if (Array.isArray(ogObject[item.fieldName])) {
                    ogObject[item.fieldName].push(content);
                }
            }
        });
    });
    // set ogImage to ogImageSecureURL/ogImageURL if there is no ogImage
    if (!ogObject.ogImage && ogObject.ogImageSecureURL) {
        ogObject.ogImage = ogObject.ogImageSecureURL;
    }
    else if (!ogObject.ogImage && ogObject.ogImageURL) {
        ogObject.ogImage = ogObject.ogImageURL;
    }
    // formats the multiple media values
    ogObject = media.mediaSetup(ogObject);
    // if onlyGetOpenGraphInfo isn't set, run the open graph fallbacks
    if (!options.onlyGetOpenGraphInfo) {
        ogObject = (0, fallback_1.default)(ogObject, options, $, body);
    }
    // TODO: Is this still needed?
    // removes any undefs
    ogObject = utils.removeNestedUndefinedValues(ogObject);
    return ogObject;
}
exports.default = extractMetaTags;
