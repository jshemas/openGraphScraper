/* eslint-disable no-param-reassign */

const fallback = (ogObject, options, $) => {
  // Get title tag if og title was not provided
  if (!ogObject.ogTitle && $('head > title').text() && $('head > title').text().length > 0) {
    ogObject.ogTitle = $('head > title').text();
  }

  // Get meta description tag if og description was not provided
  if (!ogObject.ogDescription && $('head > meta[name="description"]').attr('content') && $('head > meta[name="description"]').attr('content').length > 0) {
    ogObject.ogDescription = $('head > meta[name="description"]').attr('content');
  }

  // Get first image as og:image if there is no og:image tag.
  const ogImageFallback = options.ogImageFallback === undefined ? true : options.ogImageFallback;
  if (!ogObject.ogImage && ogImageFallback) {
    ogObject.ogImage = [];
    const supportedImageExts = ['jpg', 'jpeg', 'png'];
    // TODO: need to clean this up
    $('img').map((i, elem) => {
      if ($(elem).attr('src') && $(elem).attr('src').length > 0 && supportedImageExts.indexOf($(elem).attr('src').split('.').pop()) !== -1) {
        ogObject.ogImage.push({
          url: $(elem).attr('src'),
        });
      }
      return false;
    });
  }

  return ogObject;
};

module.exports = fallback;
