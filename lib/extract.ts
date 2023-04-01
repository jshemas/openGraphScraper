import { load } from 'cheerio';

import fallback from './fallback';
import fields from './fields';
import * as media from './media';
import * as utils from './utils';

import type { OgObject, OpenGraphScraperOptions } from './types';

/**
 * extract all of the meta tags needed for ogs
 *
 * @param {sting} body - the body of the fetch request
 * @param {object} options - options for ogs
 * @return {object} object with ogs results
 *
 */
export default function extractMetaTags(body: string, options: OpenGraphScraperOptions) {
  let ogObject: OgObject = {};
  const $ = load(body);
  const metaFields = fields.concat(options.customMetaTags);

  // find all of the open graph info in the meta tags
  $('meta').each((index, meta) => {
    if (!meta.attribs || (!meta.attribs.property && !meta.attribs.name)) return;
    const property = meta.attribs.property || meta.attribs.name;
    const content = meta.attribs.content || meta.attribs.value;
    metaFields.forEach((item) => {
      if (item && property.toLowerCase() === item.property.toLowerCase()) {
        if (!item.multiple) {
          ogObject[item.fieldName] = content;
        } else if (!ogObject[item.fieldName]) {
          ogObject[item.fieldName] = [content];
        } else if (Array.isArray(ogObject[item.fieldName])) {
          ogObject[item.fieldName].push(content);
        }
      }
    });
  });

  // set ogImageProperty to ogImageSecureURL/ogImageURL if there is no ogImage
  if (!ogObject.ogImageProperty && ogObject.ogImageSecureURL) {
    ogObject.ogImageProperty = ogObject.ogImageSecureURL;
  } else if (!ogObject.ogImageProperty && ogObject.ogImageURL) {
    ogObject.ogImageProperty = ogObject.ogImageURL;
  }

  // formats the multiple media values
  ogObject = media.mediaSetup(ogObject);

  // if onlyGetOpenGraphInfo isn't set, run the open graph fallbacks
  if (!options.onlyGetOpenGraphInfo) {
    ogObject = fallback(ogObject, options, $, body);
  }

  // TODO: Is this still needed?
  // removes any undefs
  ogObject = utils.removeNestedUndefinedValues(ogObject);

  return ogObject;
}
