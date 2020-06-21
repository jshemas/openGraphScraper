/* eslint-disable no-param-reassign */
const { findImageTypeFromUrl, isImageTypeValid } = require('./utils');

const doesElementExist = (selector, attribute, $) => {
  if ($(selector).attr(attribute) && $(selector).attr(attribute).length > 0) return true;
  return false;
};

const fallback = (ogObject, options, $) => {
  // Get title tag if og title was not provided
  if (!ogObject.ogTitle && $('head > title').text() && $('head > title').text().length > 0) {
    ogObject.ogTitle = $('head > title').text();
  }

  // Get meta description tag if og description was not provided
  if (!ogObject.ogDescription) {
    if (doesElementExist('head > meta[name="description"]', 'content', $)) {
      ogObject.ogDescription = $('head > meta[name="description"]').attr('content');
    } else if (doesElementExist('head > meta[itemprop="description"]', 'content', $)) {
      ogObject.ogDescription = $('head > meta[itemprop="description"]').attr('content');
    }
  }

  // Get all of images if there is no og:image info
  if (!ogObject.ogImage && options.ogImageFallback) {
    ogObject.ogImage = [];
    $('img').map((index, imageElement) => {
      if (doesElementExist(imageElement, 'src', $)) {
        const type = findImageTypeFromUrl($(imageElement).attr('src'));
        if (!isImageTypeValid(type)) return false;
        ogObject.ogImage.push({
          url: $(imageElement).attr('src'),
          width: $(imageElement).attr('width') || null,
          height: $(imageElement).attr('height') || null,
          type,
        });
      }
      return false;
    });
  } else if (ogObject.ogImage && ogObject.ogImage.url && !ogObject.ogImage.type) {
    // if there isn't a type, try to pull it from the URL
    const type = findImageTypeFromUrl(ogObject.ogImage.url);
    if (isImageTypeValid(type)) ogObject.ogImage.type = type;
  }

  // audio fallback
  if (!ogObject.ogAudioURL && !ogObject.ogAudioSecureURL) {
    const audioElementValue = $('audio').attr('src');
    const audioSourceElementValue = $('audio > source').attr('src');
    if (doesElementExist('audio', 'src', $)) {
      if (audioElementValue.startsWith('https')) {
        ogObject.ogAudioSecureURL = audioElementValue;
      } else {
        ogObject.ogAudioURL = audioElementValue;
      }
      const audioElementTypeValue = $('audio').attr('type');
      if (!ogObject.ogAudioType && doesElementExist('audio', 'type', $)) ogObject.ogAudioType = audioElementTypeValue;
    } else if (doesElementExist('audio > source', 'src', $)) {
      if (audioSourceElementValue.startsWith('https')) {
        ogObject.ogAudioSecureURL = audioSourceElementValue;
      } else {
        ogObject.ogAudioURL = audioSourceElementValue;
      }
      const audioSourceElementTypeValue = $('audio > source').attr('type');
      if (!ogObject.ogAudioType && doesElementExist('audio > source', 'type', $)) ogObject.ogAudioType = audioSourceElementTypeValue;
    }
  }

  // locale fallback
  if (!ogObject.ogLocale) {
    if (doesElementExist('html', 'lang', $)) {
      ogObject.ogLocale = $('html').attr('lang');
    } else if (doesElementExist('head > meta[itemprop="inLanguage"]', 'content', $)) {
      ogObject.ogLocale = $('head > meta[itemprop="inLanguage"]').attr('content');
    }
  }

  return ogObject;
};

module.exports = fallback;
