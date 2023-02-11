import * as cheerio from 'cheerio';

import fallback from './fallback';
import fields from './fields';
import * as media from './media';
import * as utils from './utils';

/**
 * extract all of the meta tags needed for ogs
 *
 * @param {object} body - the body of the got request
 * @param {object} options - options for ogs
 * @return {object} object with ogs results
 *
 */
export default function extractMetaTags(body, options) {
  let ogObject:OgObject = {};
  const $ = cheerio.load(body);
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

  // set ogImage to ogImageSecureURL/ogImageURL if there is no ogImage
  if (!ogObject.ogImage && ogObject.ogImageSecureURL) {
    ogObject.ogImage = ogObject.ogImageSecureURL;
  } else if (!ogObject.ogImage && ogObject.ogImageURL) {
    ogObject.ogImage = ogObject.ogImageURL;
  }

  // formats the multiple media values
  ogObject = media.mediaSetup(ogObject, options);

  // if onlyGetOpenGraphInfo isn't set, run the open graph fallbacks
  if (!options.onlyGetOpenGraphInfo) {
    ogObject = fallback(ogObject, options, $);
  }

  // removes any undefs
  ogObject = utils.removeNestedUndefinedValues(ogObject);

  return ogObject;
}

type ImageObject = {
  height?: string | number;
  type: string;
  url: string;
  width?: string | number;
};

type TwitterImageObject = {
  height?: string | number;
  alt?: string;
  url: string;
  width?: string | number;
};

type TwitterPlayerObject = {
  height?: string | number;
  stream?: string;
  url?: string;
  width?: string | number;
};

type OgObject = {
  error?: undefined;
  errorDetails?: undefined;
  alAndroidAppName?: string | undefined;
  alAndroidClass?: string | undefined;
  alAndroidPackage?: string | undefined;
  alAndroidUrl?: string | undefined;
  alIosAppName?: string | undefined;
  alIosAppStoreId?: string | undefined;
  alIosUrl?: string | undefined;
  alIpadAppName?: string | undefined;
  alIpadAppStoreId?: string | undefined;
  alIpadUrl?: string | undefined;
  alIphoneAppName?: string | undefined;
  alIphoneAppStoreId?: string | undefined;
  alIphoneUrl?: string | undefined;
  alWebShouldFallback?: string | undefined;
  alWebUrl?: string | undefined;
  alWindowsAppId?: string | undefined;
  alWindowsAppName?: string | undefined;
  alWindowsPhoneAppId?: string | undefined;
  alWindowsPhoneAppName?: string | undefined;
  alWindowsPhoneUrl?: string | undefined;
  alWindowsUniversalAppId?: string | undefined;
  alWindowsUniversalAppName?: string | undefined;
  alWindowsUniversalUrl?: string | undefined;
  alWindowsUrl?: string | undefined;
  articleAuthor?: string | undefined;
  articleExpirationTime?: string | undefined;
  articleModifiedTime?: string | undefined;
  articlePublishedTime?: string | undefined;
  articlePublisher?: string | undefined;
  articleSection?: string | undefined;
  articleTag?: string | undefined;
  author?: string | undefined;
  bookAuthor?: string | undefined;
  bookCanonicalName?: string | undefined;
  bookIsbn?: string | undefined;
  bookReleaseDate?: string | undefined;
  booksBook?: string | undefined;
  booksRatingScale?: string | undefined;
  booksRatingValue?: string | undefined;
  bookTag?: string | undefined;
  businessContactDataCountryName?: string | undefined;
  businessContactDataLocality?: string | undefined;
  businessContactDataPostalCode?: string | undefined;
  businessContactDataRegion?: string | undefined;
  businessContactDataStreetAddress?: string | undefined;
  dcContributor?: string | undefined;
  dcCoverage?: string | undefined;
  dcCreator?: string | undefined;
  dcDate?: string | undefined;
  dcDateCreated?: string | undefined;
  dcDateIssued?: string | undefined;
  dcDescription?: string | undefined;
  dcFormatMedia?: string | undefined;
  dcFormatSize?: string | undefined;
  dcIdentifier?: string | undefined;
  dcLanguage?: string | undefined;
  dcPublisher?: string | undefined;
  dcRelation?: string | undefined;
  dcRights?: string | undefined;
  dcSource?: string | undefined;
  dcSubject?: string | undefined;
  dcTitle?: string | undefined;
  dcType?: string | undefined;
  modifiedTime?: string | undefined;
  musicAlbum?: string | undefined;
  musicAlbumDisc?: string | undefined;
  musicAlbumTrack?: string | undefined;
  musicAlbumUrl?: string | undefined;
  musicCreator?: string | undefined;
  musicDuration?: string | undefined;
  musicMusician?: string | undefined;
  musicReleaseDate?: string | undefined;
  musicSong?: string | undefined;
  musicSongDisc?: string | undefined;
  musicSongTrack?: string | undefined;
  musicSongUrl?: string | undefined;
  ogArticleAuthor?: string | undefined;
  ogArticleExpirationTime?: string | undefined;
  ogArticleModifiedTime?: string | undefined;
  ogArticlePublishedTime?: string | undefined;
  ogArticlePublisher?: string | undefined;
  ogArticleSection?: string | undefined;
  ogArticleTag?: string | undefined;
  ogAudio?: string | undefined;
  ogAudioSecureURL?: string | undefined;
  ogAudioType?: string | undefined;
  ogAudioURL?: string | undefined;
  ogAvailability?: string | undefined;
  ogDate?: string | undefined;
  ogDescription?: string | undefined;
  ogDeterminer?: string | undefined;
  ogImage?: string | ImageObject | ImageObject[] | undefined;
  ogImageHeight?: string | undefined;
  ogImageSecureURL?: string | undefined;
  ogImageType?: string | undefined;
  ogImageURL?: string | undefined;
  ogImageWidth?: string | undefined;
  ogLocale?: string | undefined;
  ogLocaleAlternate?: string | undefined;
  ogLogo?: string | undefined;
  ogPriceAmount?: string | undefined;
  ogPriceCurrency?: string | undefined;
  ogProductAvailability?: string | undefined;
  ogProductCondition?: string | undefined;
  ogProductPriceAmount?: string | undefined;
  ogProductPriceCurrency?: string | undefined;
  ogProductRetailerItemId?: string | undefined;
  ogSiteName?: string | undefined;
  ogTitle?: string | undefined;
  ogType?: string | undefined;
  ogUrl?: string | undefined;
  ogVideo?: string | undefined;
  ogVideoActorId?: string | undefined;
  ogVideoHeight?: string | undefined;
  ogVideoSecureURL?: string | undefined;
  ogVideoType?: string | undefined;
  ogVideoWidth?: string | undefined;
  placeLocationLatitude?: string | undefined;
  placeLocationLongitude?: string | undefined;
  profileFirstName?: string | undefined;
  profileGender?: string | undefined;
  profileLastName?: string | undefined;
  profileUsername?: string | undefined;
  publishedTime?: string | undefined;
  releaseDate?: string | undefined;
  restaurantContactInfoCountryName?: string | undefined;
  restaurantContactInfoEmail?: string | undefined;
  restaurantContactInfoLocality?: string | undefined;
  restaurantContactInfoPhoneNumber?: string | undefined;
  restaurantContactInfoPostalCode?: string | undefined;
  restaurantContactInfoRegion?: string | undefined;
  restaurantContactInfoStreetAddress?: string | undefined;
  restaurantContactInfoWebsite?: string | undefined;
  restaurantMenu?: string | undefined;
  restaurantRestaurant?: string | undefined;
  restaurantSection?: string | undefined;
  restaurantVariationPriceAmount?: string | undefined;
  restaurantVariationPriceCurrency?: string | undefined;
  twitterAppIdGooglePlay?: string | undefined;
  twitterAppIdiPad?: string | undefined;
  twitterAppIdiPhone?: string | undefined;
  twitterAppNameGooglePlay?: string | undefined;
  twitterAppNameiPad?: string | undefined;
  twitterAppNameiPhone?: string | undefined;
  twitterAppUrlGooglePlay?: string | undefined;
  twitterAppUrliPad?: string | undefined;
  twitterAppUrliPhone?: string | undefined;
  twitterCard?: string | undefined;
  twitterCreator?: string | undefined;
  twitterCreatorId?: string | undefined;
  twitterDescription?: string | undefined;
  twitterImage?: string | TwitterImageObject | TwitterImageObject[] | undefined;
  twitterImageAlt?: string | undefined;
  twitterImageHeight?: string | undefined;
  twitterImageSrc?: string | undefined;
  twitterImageWidth?: string | undefined;
  twitterPlayer?: string | TwitterPlayerObject | TwitterPlayerObject[] | undefined;
  twitterPlayerHeight?: string | undefined;
  twitterPlayerStream?: string | undefined;
  twitterPlayerStreamContentType?: string | undefined;
  twitterPlayerWidth?: string | undefined;
  twitterSite?: string | undefined;
  twitterSiteId?: string | undefined;
  twitterTitle?: string | undefined;
  twitterUrl?: string | undefined;
  updatedTime?: string | undefined;
  requestUrl?: string;
  success?: boolean;
  charset?: string | undefined;
  favicon?: string | undefined;
};
