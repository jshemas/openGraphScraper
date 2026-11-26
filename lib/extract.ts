import { load } from 'cheerio';

import fallback from './fallback';
import fields from './fields';
import mediaSetup from './media';
import { unescapeScriptText } from './utils';

import type { OgObjectInternal, OpenGraphScraperOptions } from './types';

type OgImageStructuredField = 'ogImageAlt' | 'ogImageHeight' | 'ogImageType' | 'ogImageWidth';

/**
 * extract all of the meta tags needed for ogs
 *
 * @param {sting} body - the body of the fetch request
 * @param {object} options - options for ogs
 * @return {object} object with ogs results
 *
 */
export default function extractMetaTags(body: string, options: OpenGraphScraperOptions) {
  let ogObject: OgObjectInternal = { success: true };
  const $ = load(body);
  const metaFields = fields;
  let ogImageRootIndex = -1;
  let lastOgImageRootField: 'ogImageProperty' | 'ogImageURL' | undefined;

  // find all of the open graph info in the meta tags
  $('meta').each((index, meta) => {
    if (!meta.attribs || (!meta.attribs.property && !meta.attribs.name)) return;
    const property = meta.attribs.property || meta.attribs.name;
    const content: any = meta.attribs.content || meta.attribs.value;
    metaFields.forEach((item) => {
      if (item && property.toLowerCase() === item.property.toLowerCase()) {
        if (item.fieldName === 'ogImageProperty' || item.fieldName === 'ogImageURL') {
          const previousRootValues = lastOgImageRootField === 'ogImageProperty'
            ? ogObject.ogImageProperty
            : ogObject.ogImageURL;
          const previousRootValue = previousRootValues?.[previousRootValues.length - 1];
          const isAliasOfPreviousRoot = lastOgImageRootField !== undefined
            && lastOgImageRootField !== item.fieldName
            && previousRootValue === content;

          if (!isAliasOfPreviousRoot) ogImageRootIndex += 1;
          lastOgImageRootField = item.fieldName;
        }

        const isOgImageStructuredProperty = item.fieldName === 'ogImageAlt'
          || item.fieldName === 'ogImageHeight'
          || item.fieldName === 'ogImageType'
          || item.fieldName === 'ogImageWidth';

        // Structured image properties are associated with the most recent image root.
        if (isOgImageStructuredProperty) {
          if (ogImageRootIndex >= 0) {
            const fieldName = item.fieldName as OgImageStructuredField;
            const imageValues = ogObject[fieldName] ?? [];
            imageValues[ogImageRootIndex] = content;
            ogObject[fieldName] = imageValues;
          }
        } else if (
          item.fieldName === 'musicSongDisc'
          || item.fieldName === 'musicSongProperty'
          || item.fieldName === 'musicSongTrack'
          || item.fieldName === 'musicSongUrl'
          || item.fieldName === 'ogImageProperty'
          || item.fieldName === 'ogImageSecureURL'
          || item.fieldName === 'ogImageURL'
          || item.fieldName === 'ogLocaleAlternate'
          || item.fieldName === 'ogVideoHeight'
          || item.fieldName === 'ogVideoProperty'
          || item.fieldName === 'ogVideoSecureURL'
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
          || item.fieldName === 'twitterPlayerWidth'
        ) {
          if (!ogObject[item.fieldName]) {
            ogObject[item.fieldName] = [content];
          } else {
            ogObject[item.fieldName]?.push(content);
          }
        } else {
          ogObject[item.fieldName] = content;
        }
      }
    });

    if (options.customMetaTags) {
      options.customMetaTags.forEach((item) => {
        if (!ogObject.customMetaTags) ogObject.customMetaTags = {};
        if (item && property.toLowerCase() === item.property.toLowerCase()) {
          if (!item.multiple) {
            ogObject.customMetaTags[item.fieldName] = content;
          } else if (!ogObject.customMetaTags[item.fieldName]) {
            ogObject.customMetaTags[item.fieldName] = [content];
          } else if (Array.isArray(ogObject.customMetaTags[item.fieldName])) {
            ogObject.customMetaTags[item.fieldName] = [
              ...ogObject.customMetaTags[item.fieldName],
              content,
            ];
          }
        }
      });
      if (ogObject.customMetaTags && Object.keys(ogObject.customMetaTags).length === 0) delete ogObject.customMetaTags;
    }
  });

  // formats the multiple media values
  ogObject = mediaSetup(ogObject);

  // if onlyGetOpenGraphInfo isn't set, run the open graph fallbacks
  if (!options.onlyGetOpenGraphInfo || Array.isArray(options.onlyGetOpenGraphInfo)) {
    ogObject = fallback(ogObject, options, $, body);

    $('script').each((index, script) => {
      if (script.attribs.type && script.attribs.type === 'application/ld+json') {
        if (!ogObject.jsonLD) ogObject.jsonLD = [];
        let scriptText = $(script).text().trim();
        if (scriptText) {
          scriptText = scriptText.replace(/(\r\n|\n|\r)/gm, ''); // remove newlines
          scriptText = unescapeScriptText(scriptText);
          try {
            ogObject.jsonLD.push(JSON.parse(scriptText));
          } catch (error: unknown) {
            if (options.jsonLDOptions?.logOnJSONParseError) {
              console.error('Error parsing JSON-LD script tag:', error);
            }
            if (options.jsonLDOptions?.throwOnJSONParseError) {
              throw error;
            }
          }
        }
      }
    });
  }

  return ogObject;
}
