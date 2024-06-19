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
    let ogObject = { success: true };
    const $ = (0, cheerio_1.load)(body);
    const metaFields = fields_1.default;
    // find all of the open graph info in the meta tags
    $('meta').each((index, meta) => {
        if (!meta.attribs || (!meta.attribs.property && !meta.attribs.name))
            return;
        const property = meta.attribs.property || meta.attribs.name;
        const content = meta.attribs.content || meta.attribs.value;
        metaFields.forEach((item) => {
            // if (item && property.toLowerCase() === item.property.toLowerCase()) {
            //   if (!item.multiple) {
            //     ogObject[item.fieldName] = content;
            //   // } else if (!ogObject[item.fieldName]) {
            //   } else if (!ogObject[item.fieldName] && mediaMapperProperties.includes(item.fieldName)) {
            //   // } else if (!ogObject[item.fieldName] && (item.fieldName === 'ogImageAlt')) {
            //   // } else if (!ogObject[item.fieldName] && item.multiple) {
            //     ogObject[item.fieldName] = [content];
            //   } else if (Array.isArray(ogObject[item.fieldName])) {
            //   // } else if (Array.isArray(ogObject[item.fieldName]) && item.fieldName === 'ogImageAlt') {
            //     ogObject[item.fieldName]?.push(content);
            //   }
            // }
            if (item && property.toLowerCase() === item.property.toLowerCase()) {
                // check if fieldName is one of mediaMapperProperties
                if (item.fieldName === 'musicSongDisc'
                    || item.fieldName === 'musicSongProperty'
                    || item.fieldName === 'musicSongTrack'
                    || item.fieldName === 'musicSongUrl'
                    || item.fieldName === 'ogImageAlt'
                    || item.fieldName === 'ogImageHeight'
                    || item.fieldName === 'ogImageProperty'
                    || item.fieldName === 'ogImageSecureURL'
                    || item.fieldName === 'ogImageType'
                    || item.fieldName === 'ogImageURL'
                    || item.fieldName === 'ogImageWidth'
                    || item.fieldName === 'ogVideoHeight'
                    || item.fieldName === 'ogVideoProperty'
                    || item.fieldName === 'ogVideoType'
                    || item.fieldName === 'ogVideoWidth'
                    || item.fieldName === 'twitterImageAlt'
                    || item.fieldName === 'twitterImageHeight'
                    || item.fieldName === 'twitterImageProperty'
                    || item.fieldName === 'twitterImageSrc'
                    || item.fieldName === 'twitterImageWidth'
                    || item.fieldName === 'twitterPlayerHeight'
                    || item.fieldName === 'twitterPlayerProperty'
                    || item.fieldName === 'twitterPlayerStream'
                    || item.fieldName === 'twitterPlayerWidth') {
                    if (!ogObject[item.fieldName]) {
                        ogObject[item.fieldName] = [content];
                    }
                    else {
                        ogObject[item.fieldName]?.push(content);
                    }
                }
                else {
                    ogObject[item.fieldName] = content;
                }
            }
        });
        if (options.customMetaTags) {
            options.customMetaTags.forEach((item) => {
                if (!ogObject.customMetaTags)
                    ogObject.customMetaTags = {};
                if (item && property.toLowerCase() === item.property.toLowerCase()) {
                    if (!item.multiple) {
                        ogObject.customMetaTags[item.fieldName] = content;
                    }
                    else if (!ogObject.customMetaTags[item.fieldName]) {
                        ogObject.customMetaTags[item.fieldName] = [content];
                    }
                    else if (Array.isArray(ogObject.customMetaTags[item.fieldName])) {
                        ogObject.customMetaTags[item.fieldName] = [
                            ...ogObject.customMetaTags[item.fieldName],
                            content,
                        ];
                    }
                }
            });
            if (ogObject.customMetaTags && Object.keys(ogObject.customMetaTags).length === 0)
                delete ogObject.customMetaTags;
        }
    });
    // formats the multiple media values
    ogObject = (0, media_1.default)(ogObject);
    // if onlyGetOpenGraphInfo isn't set, run the open graph fallbacks
    if (!options.onlyGetOpenGraphInfo) {
        ogObject = (0, fallback_1.default)(ogObject, options, $, body);
        $('script').each((index, script) => {
            if (script.attribs.type && script.attribs.type === 'application/ld+json') {
                if (!ogObject.jsonLD)
                    ogObject.jsonLD = [];
                ogObject.jsonLD.push(JSON.parse($(script).text()));
            }
        });
    }
    return ogObject;
}
exports.default = extractMetaTags;
