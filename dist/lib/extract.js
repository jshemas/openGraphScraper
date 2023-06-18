"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const fallback_1 = __importDefault(require("./fallback"));
const fields_1 = __importDefault(require("./fields"));
const media_1 = __importDefault(require("./media"));
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
    const metaFields = fields_1.default.concat(options.customMetaTags || []);
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
    // take all of the customMetaTags out of base of ogObject and store them into ogObject.customMetaTags
    if (options.customMetaTags) {
        options.customMetaTags.forEach((customMetaTag) => {
            if (ogObject[customMetaTag.fieldName]) {
                ogObject.customMetaTags = {
                    ...ogObject.customMetaTags,
                    [customMetaTag.fieldName]: ogObject[customMetaTag.fieldName],
                };
                delete ogObject[customMetaTag.fieldName];
            }
        });
    }
    // formats the multiple media values
    ogObject = (0, media_1.default)(ogObject);
    // if onlyGetOpenGraphInfo isn't set, run the open graph fallbacks
    if (!options.onlyGetOpenGraphInfo) {
        ogObject = (0, fallback_1.default)(ogObject, options, $, body);
    }
    return ogObject;
}
exports.default = extractMetaTags;
