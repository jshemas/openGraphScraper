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

  // Get all of images if there is no og:image info
  const validImageTypes = ['apng', 'bmp', 'gif', 'ico', 'cur', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'tif', 'tiff', 'webp'];
  if (!ogObject.ogImage && options.ogImageFallback) {
    ogObject.ogImage = [];
    $('img').map((index, imageElement) => {
      if ($(imageElement).attr('src') && $(imageElement).attr('src').length > 0) {
        ogObject.ogImage.push({
          url: $(imageElement).attr('src'),
          width: $(imageElement).attr('width') || null,
          height: $(imageElement).attr('height') || null,
          type: $(imageElement).attr('src').split('.').pop(),
        });
      }
      return false;
    });
  } else if (ogObject.ogImage && ogObject.ogImage.url && !ogObject.ogImage.type) {
    // if there isn't a type, try to pull it from the URL
    let type = ogObject.ogImage.url.split('.').pop();
    [type] = type.split('?');
    if (validImageTypes.includes(type)) ogObject.ogImage.type = type;
  }

  return ogObject;
};

module.exports = fallback;
