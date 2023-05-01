"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const fallback_1 = __importDefault(require("./fallback"));
const fields_1 = __importDefault(require("./fields"));
const media = __importStar(require("./media"));
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
    // formats the multiple media values
    ogObject = media.mediaSetup(ogObject);
    // if onlyGetOpenGraphInfo isn't set, run the open graph fallbacks
    if (!options.onlyGetOpenGraphInfo) {
        ogObject = (0, fallback_1.default)(ogObject, options, $, body);
    }
    return ogObject;
}
exports.default = extractMetaTags;
