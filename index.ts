/* eslint-disable max-len, import/no-import-module-exports */
import setOptionsAndReturnOpenGraphResults from './lib/openGraphScraper';
import {
  OpenGraphScraperOptions,
  OgObject,
} from './lib/types';

/**
 * `open-graph-scraper` uses [got](https://github.com/sindresorhus/got) for requests and most of
 * [got's options](https://github.com/sindresorhus/got/blob/main/documentation/2-options.md)
 * should work as `open-graph-scraper` options.
 *
 * @param {object} options - The options used by Open Graph Scraper
 * @param {string} options.url - URL of the site. (Required)
 * @param {string} [options.html] - You can pass in an HTML string to run ogs on it. (use without options.url)
 * @param {string[]} [options.blacklist] - Pass in an array of sites you don't want ogs to run on.
 * @param {boolean} [options.onlyGetOpenGraphInfo] - Only fetch open graph info and don't fall back on anything else.
 * @param {boolean} [options.ogImageFallback] - Fetch other images if no open graph ones are found.
 * @param {object} [options.customMetaTags] - Here you can define custom meta tags you want to scrape.
 * @param {boolean} [options.allMedia] - By default, OGS will only send back the first image/video it finds.
 * @param {number} [options.peekSize] - Sets the peekSize for the request.
 * @param {number | false} [options.downloadLimit] - Maximum size of the content downloaded from the server, in bytes.
 * @param {object} [options.ValidatorSettings] - Sets the options used by validator.js for testing the URL
 * @param {boolean} [options.decompress] - Set the accept-encoding to `gzip, deflate, br` (default: `true`).
 * @param {boolean} [options.followRedirect] - Defines if redirect responses should be followed automatically. (default: `true`).
 * @param {Object<string, string>} [options.headers] - An object containing request headers. Useful for setting the user-agent.
 * @param {number} [options.maxRedirects] - If exceeded, the request will be aborted and a MaxRedirectsError will be thrown. (default: `10`).
 * @param {object} [options.retry] - Number of times `og`s will retry the request (default: `2`).
 * @param {object} [options.timeout] - Timeout of the request.
 * @returns {Promise} Promise Object with the Open Graph results
 */
export default async function run(options: OpenGraphScraperOptions): Promise<ErrorResult | SuccessResult> {
  let results;
  try {
    results = await setOptionsAndReturnOpenGraphResults(options);
  } catch (error) {
    const exception = error as Error;
    const returnError:ErrorResult = {
      error: true,
      result: {
        success: false,
        requestUrl: options.url,
        error: exception.message,
        errorDetails: exception,
      },
      response: undefined,
    };
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw returnError;
  }
  const returnSuccess: SuccessResult = {
    error: false,
    result: results.ogObject,
    response: results.response,
  };
  return returnSuccess;
}

module.exports = run;

type SuccessResult = {
  error: boolean;
  result: OgObject;
  response: object;
};

type ErrorResult = {
  error: boolean;
  result: ErrorResultObject;
  response: undefined;
};

type ErrorResultObject = {
  alAndroidAppName?: undefined;
  alAndroidClass?: undefined;
  alAndroidPackage?: undefined;
  alAndroidUrl?: undefined;
  alIosAppName?: undefined;
  alIosAppStoreId?: undefined;
  alIosUrl?: undefined;
  alIpadAppName?: undefined;
  alIpadAppStoreId?: undefined;
  alIpadUrl?: undefined;
  alIphoneAppName?: undefined;
  alIphoneAppStoreId?: undefined;
  alIphoneUrl?: undefined;
  alWebShouldFallback?: undefined;
  alWebUrl?: undefined;
  alWindowsAppId?: undefined;
  alWindowsAppName?: undefined;
  alWindowsPhoneAppId?: undefined;
  alWindowsPhoneAppName?: undefined;
  alWindowsPhoneUrl?: undefined;
  alWindowsUniversalAppId?: undefined;
  alWindowsUniversalAppName?: undefined;
  alWindowsUniversalUrl?: undefined;
  alWindowsUrl?: undefined;
  articleAuthor?: undefined;
  articleExpirationTime?: undefined;
  articleModifiedTime?: undefined;
  articlePublishedTime?: undefined;
  articlePublisher?: undefined;
  articleSection?: undefined;
  articleTag?: undefined;
  author?: undefined;
  bookAuthor?: undefined;
  bookCanonicalName?: undefined;
  bookIsbn?: undefined;
  bookReleaseDate?: undefined;
  booksBook?: undefined;
  booksRatingScale?: undefined;
  booksRatingValue?: undefined;
  bookTag?: undefined;
  businessContactDataCountryName?: undefined;
  businessContactDataLocality?: undefined;
  businessContactDataPostalCode?: undefined;
  businessContactDataRegion?: undefined;
  businessContactDataStreetAddress?: undefined;
  charset?: undefined;
  dcContributor?: undefined;
  dcCoverage?: undefined;
  dcCreator?: undefined;
  dcDate?: undefined;
  dcDateCreated?: undefined;
  dcDateIssued?: undefined;
  dcDescription?: undefined;
  dcFormatMedia?: undefined;
  dcFormatSize?: undefined;
  dcIdentifier?: undefined;
  dcLanguage?: undefined;
  dcPublisher?: undefined;
  dcRelation?: undefined;
  dcRights?: undefined;
  dcSource?: undefined;
  dcSubject?: undefined;
  dcTitle?: undefined;
  dcType?: undefined;
  error: string;
  errorDetails: Error;
  favicon?: undefined;
  modifiedTime?: undefined;
  musicAlbum?: undefined;
  musicAlbumDisc?: undefined;
  musicAlbumTrack?: undefined;
  musicAlbumUrl?: undefined;
  musicCreator?: undefined;
  musicDuration?: undefined;
  musicMusician?: undefined;
  musicReleaseDate?: undefined;
  musicSong?: undefined;
  musicSongDisc?: undefined;
  musicSongTrack?: undefined;
  musicSongUrl?: undefined;
  ogArticleAuthor?: undefined;
  ogArticleExpirationTime?: undefined;
  ogArticleModifiedTime?: undefined;
  ogArticlePublishedTime?: undefined;
  ogArticlePublisher?: undefined;
  ogArticleSection?: undefined;
  ogArticleTag?: undefined;
  ogAudio?: undefined;
  ogAudioSecureURL?: undefined;
  ogAudioType?: undefined;
  ogAudioURL?: undefined;
  ogAvailability?: undefined;
  ogDate?: undefined;
  ogDescription?: undefined;
  ogDeterminer?: undefined;
  ogImage?: undefined;
  ogImageHeight?: undefined;
  ogImageSecureURL?: undefined;
  ogImageType?: undefined;
  ogImageURL?: undefined;
  ogImageWidth?: undefined;
  ogLocale?: undefined;
  ogLocaleAlternate?: undefined;
  ogLogo?: undefined;
  ogPriceAmount?: undefined;
  ogPriceCurrency?: undefined;
  ogProductAvailability?: undefined;
  ogProductCondition?: undefined;
  ogProductPriceAmount?: undefined;
  ogProductPriceCurrency?: undefined;
  ogProductRetailerItemId?: undefined;
  ogSiteName?: undefined;
  ogTitle?: undefined;
  ogType?: undefined;
  ogUrl?: undefined;
  ogVideo?: undefined;
  ogVideoActorId?: undefined;
  ogVideoHeight?: undefined;
  ogVideoSecureURL?: undefined;
  ogVideoType?: undefined;
  ogVideoWidth?: undefined;
  placeLocationLatitude?: undefined;
  placeLocationLongitude?: undefined;
  profileFirstName?: undefined;
  profileGender?: undefined;
  profileLastName?: undefined;
  profileUsername?: undefined;
  publishedTime?: undefined;
  releaseDate?: undefined;
  requestUrl: string;
  restaurantContactInfoCountryName?: undefined;
  restaurantContactInfoEmail?: undefined;
  restaurantContactInfoLocality?: undefined;
  restaurantContactInfoPhoneNumber?: undefined;
  restaurantContactInfoPostalCode?: undefined;
  restaurantContactInfoRegion?: undefined;
  restaurantContactInfoStreetAddress?: undefined;
  restaurantContactInfoWebsite?: undefined;
  restaurantMenu?: undefined;
  restaurantRestaurant?: undefined;
  restaurantSection?: undefined;
  restaurantVariationPriceAmount?: undefined;
  restaurantVariationPriceCurrency?: undefined;
  success: boolean;
  twitterAppIdGooglePlay?: undefined;
  twitterAppIdiPad?: undefined;
  twitterAppIdiPhone?: undefined;
  twitterAppNameGooglePlay?: undefined;
  twitterAppNameiPad?: undefined;
  twitterAppNameiPhone?: undefined;
  twitterAppUrlGooglePlay?: undefined;
  twitterAppUrliPad?: undefined;
  twitterAppUrliPhone?: undefined;
  twitterCard?: undefined;
  twitterCreator?: undefined;
  twitterCreatorId?: undefined;
  twitterDescription?: undefined;
  twitterImage?: undefined;
  twitterImageAlt?: undefined;
  twitterImageHeight?: undefined;
  twitterImageSrc?: undefined;
  twitterImageWidth?: undefined;
  twitterPlayer?: undefined;
  twitterPlayerHeight?: undefined;
  twitterPlayerStream?: undefined;
  twitterPlayerStreamContentType?: undefined;
  twitterPlayerWidth?: undefined;
  twitterSite?: undefined;
  twitterSiteId?: undefined;
  twitterTitle?: undefined;
  twitterUrl?: undefined;
  updatedTime?: undefined;
};
