const openGraphScraper = require('./lib/openGraphScraper');
// import openGraphScraper from './lib/openGraphScraper';

async function run(options: OpenGraphScraperOptions) {
  let results;
  try {
    results = await openGraphScraper(options);
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
    };
    throw returnError;
  }
  const returnSuccess: SuccessResult = {
    error: false,
    result: results.ogObject,
    response: results.response,
  }
  return returnSuccess;
}

export default run;

// export run(options: {
//     url: string;
//     html?: string;
//     blacklist?: string[];
//     onlyGetOpenGraphInfo?: boolean;
//     ogImageFallback?: boolean;
//     customMetaTags?: customMetaTags[];
//     allMedia?: boolean;
//     peekSize?: number;
//     downloadLimit?: number;
//     urlValidatorSettings?: validatorSettings;
//     decompress?: boolean;
//     followRedirect?: boolean;
//     headers?: {
//         [x: string]: string;
//     };
//     maxRedirects?: number;
//     retry?: object;
//     timeout?: object;
// }): Promise<successResult | errorResult>;

// declare namespace run {
//     export { imageObject, successResult, successResultObject, errorResult, errorResultObject, customMetaTags, validatorSettings };
// }

type OpenGraphScraperOptions = {
  url: string;
  html?: string;
  blacklist?: string[];
  onlyGetOpenGraphInfo?: boolean;
  ogImageFallback?: boolean;
  customMetaTags?: customMetaTags[];
  allMedia?: boolean;
  peekSize?: number;
  downloadLimit?: number;
  urlValidatorSettings?: validatorSettings;
  decompress?: boolean;
  followRedirect?: boolean;
  headers?: {
      [x: string]: string;
  };
  maxRedirects?: number;
  retry?: object;
  timeout?: object;
}


type customMetaTags = {
    /**
     * - is there more than one of these tags on a page (normally this is false)
     */
    multiple: boolean;
    /**
     * - meta tag name/property attribute
     */
    property: string;
    /**
     * - name of the result variable
     */
    fieldName: string;
};

/**
 * You can find the `isUrl` settings details at https://github.com/validatorjs/validator.js
 */
type validatorSettings = {
    protocols: string[];
    require_tld: boolean;
    require_protocol: boolean;
    require_host: boolean;
    require_valid_protocol: boolean;
    allow_underscores: boolean;
    host_whitelist: boolean;
    host_blacklist: boolean;
    allow_trailing_dot: boolean;
    allow_protocol_relative_urls: boolean;
    disallow_auth: boolean;
};

type SuccessResult = {
    error: boolean;
    result: successResultObject;
    response: object;
};

type ErrorResult = {
    error: boolean;
    result: errorResultObject;
    // response: undefined;
};

type imageObject = {
    height?: string | number;
    type: string;
    url: string;
    width?: string | number;
};

type successResultObject = {
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
    ogImage?: string | imageObject | imageObject[] | undefined;
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
    twitterImage?: string | undefined;
    twitterImageAlt?: string | undefined;
    twitterImageHeight?: string | undefined;
    twitterImageSrc?: string | undefined;
    twitterImageWidth?: string | undefined;
    twitterPlayer?: string | undefined;
    twitterPlayerHeight?: string | undefined;
    twitterPlayerStream?: string | undefined;
    twitterPlayerStreamContentType?: string | undefined;
    twitterPlayerWidth?: string | undefined;
    twitterSite?: string | undefined;
    twitterSiteId?: string | undefined;
    twitterTitle?: string | undefined;
    twitterUrl?: string | undefined;
    updatedTime?: string | undefined;
    requestUrl: string;
    success: boolean;
    charset?: string | undefined;
    favicon?: string | undefined;
};

type errorResultObject = {
    error: string;
    errorDetails: Error;
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
    requestUrl: string;
    success: boolean;
    charset?: undefined;
    favicon?: undefined;
};
