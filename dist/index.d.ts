export = run;
/**
 * @typedef {object} imageObject
 * @property {string | number} [height]
 * @property {string} type
 * @property {string} url
 * @property {string | number} [width]
 */
/**
 * @typedef {object} successResult
 * @property {boolean} error
 * @property {successResultObject} result
 * @property {object} response
 */
/**
 * @typedef {object} successResultObject
 * @property {undefined} [error]
 * @property {undefined} [errorDetails]
 * @property {string | undefined} [alAndroidAppName]
 * @property {string | undefined} [alAndroidClass]
 * @property {string | undefined} [alAndroidPackage]
 * @property {string | undefined} [alAndroidUrl]
 * @property {string | undefined} [alIosAppName]
 * @property {string | undefined} [alIosAppStoreId]
 * @property {string | undefined} [alIosUrl]
 * @property {string | undefined} [alIpadAppName]
 * @property {string | undefined} [alIpadAppStoreId]
 * @property {string | undefined} [alIpadUrl]
 * @property {string | undefined} [alIphoneAppName]
 * @property {string | undefined} [alIphoneAppStoreId]
 * @property {string | undefined} [alIphoneUrl]
 * @property {string | undefined} [alWebShouldFallback]
 * @property {string | undefined} [alWebUrl]
 * @property {string | undefined} [alWindowsAppId]
 * @property {string | undefined} [alWindowsAppName]
 * @property {string | undefined} [alWindowsPhoneAppId]
 * @property {string | undefined} [alWindowsPhoneAppName]
 * @property {string | undefined} [alWindowsPhoneUrl]
 * @property {string | undefined} [alWindowsUniversalAppId]
 * @property {string | undefined} [alWindowsUniversalAppName]
 * @property {string | undefined} [alWindowsUniversalUrl]
 * @property {string | undefined} [alWindowsUrl]
 * @property {string | undefined} [articleAuthor]
 * @property {string | undefined} [articleExpirationTime]
 * @property {string | undefined} [articleModifiedTime]
 * @property {string | undefined} [articlePublishedTime]
 * @property {string | undefined} [articlePublisher]
 * @property {string | undefined} [articleSection]
 * @property {string | undefined} [articleTag]
 * @property {string | undefined} [author]
 * @property {string | undefined} [bookAuthor]
 * @property {string | undefined} [bookCanonicalName]
 * @property {string | undefined} [bookIsbn]
 * @property {string | undefined} [bookReleaseDate]
 * @property {string | undefined} [booksBook]
 * @property {string | undefined} [booksRatingScale]
 * @property {string | undefined} [booksRatingValue]
 * @property {string | undefined} [bookTag]
 * @property {string | undefined} [businessContactDataCountryName]
 * @property {string | undefined} [businessContactDataLocality]
 * @property {string | undefined} [businessContactDataPostalCode]
 * @property {string | undefined} [businessContactDataRegion]
 * @property {string | undefined} [businessContactDataStreetAddress]
 * @property {string | undefined} [dcContributor]
 * @property {string | undefined} [dcCoverage]
 * @property {string | undefined} [dcCreator]
 * @property {string | undefined} [dcDate]
 * @property {string | undefined} [dcDateCreated]
 * @property {string | undefined} [dcDateIssued]
 * @property {string | undefined} [dcDescription]
 * @property {string | undefined} [dcFormatMedia]
 * @property {string | undefined} [dcFormatSize]
 * @property {string | undefined} [dcIdentifier]
 * @property {string | undefined} [dcLanguage]
 * @property {string | undefined} [dcPublisher]
 * @property {string | undefined} [dcRelation]
 * @property {string | undefined} [dcRights]
 * @property {string | undefined} [dcSource]
 * @property {string | undefined} [dcSubject]
 * @property {string | undefined} [dcTitle]
 * @property {string | undefined} [dcType]
 * @property {string | undefined} [modifiedTime]
 * @property {string | undefined} [musicAlbum]
 * @property {string | undefined} [musicAlbumDisc]
 * @property {string | undefined} [musicAlbumTrack]
 * @property {string | undefined} [musicAlbumUrl]
 * @property {string | undefined} [musicCreator]
 * @property {string | undefined} [musicDuration]
 * @property {string | undefined} [musicMusician]
 * @property {string | undefined} [musicReleaseDate]
 * @property {string | undefined} [musicSong]
 * @property {string | undefined} [musicSongDisc]
 * @property {string | undefined} [musicSongTrack]
 * @property {string | undefined} [musicSongUrl]
 * @property {string | undefined} [ogArticleAuthor]
 * @property {string | undefined} [ogArticleExpirationTime]
 * @property {string | undefined} [ogArticleModifiedTime]
 * @property {string | undefined} [ogArticlePublishedTime]
 * @property {string | undefined} [ogArticlePublisher]
 * @property {string | undefined} [ogArticleSection]
 * @property {string | undefined} [ogArticleTag]
 * @property {string | undefined} [ogAudio]
 * @property {string | undefined} [ogAudioSecureURL]
 * @property {string | undefined} [ogAudioType]
 * @property {string | undefined} [ogAudioURL]
 * @property {string | undefined} [ogAvailability]
 * @property {string | undefined} [ogDate]
 * @property {string | undefined} [ogDescription]
 * @property {string | undefined} [ogDeterminer]
 * @property {string | imageObject | imageObject[] | undefined} [ogImage]
 * @property {string | undefined} [ogImageHeight]
 * @property {string | undefined} [ogImageSecureURL]
 * @property {string | undefined} [ogImageType]
 * @property {string | undefined} [ogImageURL]
 * @property {string | undefined} [ogImageWidth]
 * @property {string | undefined} [ogLocale]
 * @property {string | undefined} [ogLocaleAlternate]
 * @property {string | undefined} [ogLogo]
 * @property {string | undefined} [ogPriceAmount]
 * @property {string | undefined} [ogPriceCurrency]
 * @property {string | undefined} [ogProductAvailability]
 * @property {string | undefined} [ogProductCondition]
 * @property {string | undefined} [ogProductPriceAmount]
 * @property {string | undefined} [ogProductPriceCurrency]
 * @property {string | undefined} [ogProductRetailerItemId]
 * @property {string | undefined} [ogSiteName]
 * @property {string | undefined} [ogTitle]
 * @property {string | undefined} [ogType]
 * @property {string | undefined} [ogUrl]
 * @property {string | undefined} [ogVideo]
 * @property {string | undefined} [ogVideoActorId]
 * @property {string | undefined} [ogVideoHeight]
 * @property {string | undefined} [ogVideoSecureURL]
 * @property {string | undefined} [ogVideoType]
 * @property {string | undefined} [ogVideoWidth]
 * @property {string | undefined} [placeLocationLatitude]
 * @property {string | undefined} [placeLocationLongitude]
 * @property {string | undefined} [profileFirstName]
 * @property {string | undefined} [profileGender]
 * @property {string | undefined} [profileLastName]
 * @property {string | undefined} [profileUsername]
 * @property {string | undefined} [publishedTime]
 * @property {string | undefined} [releaseDate]
 * @property {string | undefined} [restaurantContactInfoCountryName]
 * @property {string | undefined} [restaurantContactInfoEmail]
 * @property {string | undefined} [restaurantContactInfoLocality]
 * @property {string | undefined} [restaurantContactInfoPhoneNumber]
 * @property {string | undefined} [restaurantContactInfoPostalCode]
 * @property {string | undefined} [restaurantContactInfoRegion]
 * @property {string | undefined} [restaurantContactInfoStreetAddress]
 * @property {string | undefined} [restaurantContactInfoWebsite]
 * @property {string | undefined} [restaurantMenu]
 * @property {string | undefined} [restaurantRestaurant]
 * @property {string | undefined} [restaurantSection]
 * @property {string | undefined} [restaurantVariationPriceAmount]
 * @property {string | undefined} [restaurantVariationPriceCurrency]
 * @property {string | undefined} [twitterAppIdGooglePlay]
 * @property {string | undefined} [twitterAppIdiPad]
 * @property {string | undefined} [twitterAppIdiPhone]
 * @property {string | undefined} [twitterAppNameGooglePlay]
 * @property {string | undefined} [twitterAppNameiPad]
 * @property {string | undefined} [twitterAppNameiPhone]
 * @property {string | undefined} [twitterAppUrlGooglePlay]
 * @property {string | undefined} [twitterAppUrliPad]
 * @property {string | undefined} [twitterAppUrliPhone]
 * @property {string | undefined} [twitterCard]
 * @property {string | undefined} [twitterCreator]
 * @property {string | undefined} [twitterCreatorId]
 * @property {string | undefined} [twitterDescription]
 * @property {string | undefined} [twitterImage]
 * @property {string | undefined} [twitterImageAlt]
 * @property {string | undefined} [twitterImageHeight]
 * @property {string | undefined} [twitterImageSrc]
 * @property {string | undefined} [twitterImageWidth]
 * @property {string | undefined} [twitterPlayer]
 * @property {string | undefined} [twitterPlayerHeight]
 * @property {string | undefined} [twitterPlayerStream]
 * @property {string | undefined} [twitterPlayerStreamContentType]
 * @property {string | undefined} [twitterPlayerWidth]
 * @property {string | undefined} [twitterSite]
 * @property {string | undefined} [twitterSiteId]
 * @property {string | undefined} [twitterTitle]
 * @property {string | undefined} [twitterUrl]
 * @property {string | undefined} [updatedTime]
 * @property {string} requestUrl
 * @property {boolean} success
 * @property {string | undefined} [charset]
 * @property {string | undefined} [favicon]
 */
/**
 * @typedef {object} errorResult
 * @property {boolean} error
 * @property {errorResultObject} result
 * @property {undefined} response
 */
/**
 * @typedef {object} errorResultObject
 * @property {string} error
 * @property {Error} errorDetails
 * @property {undefined} [alAndroidAppName]
 * @property {undefined} [alAndroidClass]
 * @property {undefined} [alAndroidPackage]
 * @property {undefined} [alAndroidUrl]
 * @property {undefined} [alIosAppName]
 * @property {undefined} [alIosAppStoreId]
 * @property {undefined} [alIosUrl]
 * @property {undefined} [alIpadAppName]
 * @property {undefined} [alIpadAppStoreId]
 * @property {undefined} [alIpadUrl]
 * @property {undefined} [alIphoneAppName]
 * @property {undefined} [alIphoneAppStoreId]
 * @property {undefined} [alIphoneUrl]
 * @property {undefined} [alWebShouldFallback]
 * @property {undefined} [alWebUrl]
 * @property {undefined} [alWindowsAppId]
 * @property {undefined} [alWindowsAppName]
 * @property {undefined} [alWindowsPhoneAppId]
 * @property {undefined} [alWindowsPhoneAppName]
 * @property {undefined} [alWindowsPhoneUrl]
 * @property {undefined} [alWindowsUniversalAppId]
 * @property {undefined} [alWindowsUniversalAppName]
 * @property {undefined} [alWindowsUniversalUrl]
 * @property {undefined} [alWindowsUrl]
 * @property {undefined} [articleAuthor]
 * @property {undefined} [articleExpirationTime]
 * @property {undefined} [articleModifiedTime]
 * @property {undefined} [articlePublishedTime]
 * @property {undefined} [articlePublisher]
 * @property {undefined} [articleSection]
 * @property {undefined} [articleTag]
 * @property {undefined} [author]
 * @property {undefined} [bookAuthor]
 * @property {undefined} [bookCanonicalName]
 * @property {undefined} [bookIsbn]
 * @property {undefined} [bookReleaseDate]
 * @property {undefined} [booksBook]
 * @property {undefined} [booksRatingScale]
 * @property {undefined} [booksRatingValue]
 * @property {undefined} [bookTag]
 * @property {undefined} [businessContactDataCountryName]
 * @property {undefined} [businessContactDataLocality]
 * @property {undefined} [businessContactDataPostalCode]
 * @property {undefined} [businessContactDataRegion]
 * @property {undefined} [businessContactDataStreetAddress]
 * @property {undefined} [dcContributor]
 * @property {undefined} [dcCoverage]
 * @property {undefined} [dcCreator]
 * @property {undefined} [dcDate]
 * @property {undefined} [dcDateCreated]
 * @property {undefined} [dcDateIssued]
 * @property {undefined} [dcDescription]
 * @property {undefined} [dcFormatMedia]
 * @property {undefined} [dcFormatSize]
 * @property {undefined} [dcIdentifier]
 * @property {undefined} [dcLanguage]
 * @property {undefined} [dcPublisher]
 * @property {undefined} [dcRelation]
 * @property {undefined} [dcRights]
 * @property {undefined} [dcSource]
 * @property {undefined} [dcSubject]
 * @property {undefined} [dcTitle]
 * @property {undefined} [dcType]
 * @property {undefined} [modifiedTime]
 * @property {undefined} [musicAlbum]
 * @property {undefined} [musicAlbumDisc]
 * @property {undefined} [musicAlbumTrack]
 * @property {undefined} [musicAlbumUrl]
 * @property {undefined} [musicCreator]
 * @property {undefined} [musicDuration]
 * @property {undefined} [musicMusician]
 * @property {undefined} [musicReleaseDate]
 * @property {undefined} [musicSong]
 * @property {undefined} [musicSongDisc]
 * @property {undefined} [musicSongTrack]
 * @property {undefined} [musicSongUrl]
 * @property {undefined} [ogArticleAuthor]
 * @property {undefined} [ogArticleExpirationTime]
 * @property {undefined} [ogArticleModifiedTime]
 * @property {undefined} [ogArticlePublishedTime]
 * @property {undefined} [ogArticlePublisher]
 * @property {undefined} [ogArticleSection]
 * @property {undefined} [ogArticleTag]
 * @property {undefined} [ogAudio]
 * @property {undefined} [ogAudioSecureURL]
 * @property {undefined} [ogAudioType]
 * @property {undefined} [ogAudioURL]
 * @property {undefined} [ogAvailability]
 * @property {undefined} [ogDate]
 * @property {undefined} [ogDescription]
 * @property {undefined} [ogDeterminer]
 * @property {undefined} [ogImage]
 * @property {undefined} [ogImageHeight]
 * @property {undefined} [ogImageSecureURL]
 * @property {undefined} [ogImageType]
 * @property {undefined} [ogImageURL]
 * @property {undefined} [ogImageWidth]
 * @property {undefined} [ogLocale]
 * @property {undefined} [ogLocaleAlternate]
 * @property {undefined} [ogLogo]
 * @property {undefined} [ogPriceAmount]
 * @property {undefined} [ogPriceCurrency]
 * @property {undefined} [ogProductAvailability]
 * @property {undefined} [ogProductCondition]
 * @property {undefined} [ogProductPriceAmount]
 * @property {undefined} [ogProductPriceCurrency]
 * @property {undefined} [ogProductRetailerItemId]
 * @property {undefined} [ogSiteName]
 * @property {undefined} [ogTitle]
 * @property {undefined} [ogType]
 * @property {undefined} [ogUrl]
 * @property {undefined} [ogVideo]
 * @property {undefined} [ogVideoActorId]
 * @property {undefined} [ogVideoHeight]
 * @property {undefined} [ogVideoSecureURL]
 * @property {undefined} [ogVideoType]
 * @property {undefined} [ogVideoWidth]
 * @property {undefined} [placeLocationLatitude]
 * @property {undefined} [placeLocationLongitude]
 * @property {undefined} [profileFirstName]
 * @property {undefined} [profileGender]
 * @property {undefined} [profileLastName]
 * @property {undefined} [profileUsername]
 * @property {undefined} [publishedTime]
 * @property {undefined} [releaseDate]
 * @property {undefined} [restaurantContactInfoCountryName]
 * @property {undefined} [restaurantContactInfoEmail]
 * @property {undefined} [restaurantContactInfoLocality]
 * @property {undefined} [restaurantContactInfoPhoneNumber]
 * @property {undefined} [restaurantContactInfoPostalCode]
 * @property {undefined} [restaurantContactInfoRegion]
 * @property {undefined} [restaurantContactInfoStreetAddress]
 * @property {undefined} [restaurantContactInfoWebsite]
 * @property {undefined} [restaurantMenu]
 * @property {undefined} [restaurantRestaurant]
 * @property {undefined} [restaurantSection]
 * @property {undefined} [restaurantVariationPriceAmount]
 * @property {undefined} [restaurantVariationPriceCurrency]
 * @property {undefined} [twitterAppIdGooglePlay]
 * @property {undefined} [twitterAppIdiPad]
 * @property {undefined} [twitterAppIdiPhone]
 * @property {undefined} [twitterAppNameGooglePlay]
 * @property {undefined} [twitterAppNameiPad]
 * @property {undefined} [twitterAppNameiPhone]
 * @property {undefined} [twitterAppUrlGooglePlay]
 * @property {undefined} [twitterAppUrliPad]
 * @property {undefined} [twitterAppUrliPhone]
 * @property {undefined} [twitterCard]
 * @property {undefined} [twitterCreator]
 * @property {undefined} [twitterCreatorId]
 * @property {undefined} [twitterDescription]
 * @property {undefined} [twitterImage]
 * @property {undefined} [twitterImageAlt]
 * @property {undefined} [twitterImageHeight]
 * @property {undefined} [twitterImageSrc]
 * @property {undefined} [twitterImageWidth]
 * @property {undefined} [twitterPlayer]
 * @property {undefined} [twitterPlayerHeight]
 * @property {undefined} [twitterPlayerStream]
 * @property {undefined} [twitterPlayerStreamContentType]
 * @property {undefined} [twitterPlayerWidth]
 * @property {undefined} [twitterSite]
 * @property {undefined} [twitterSiteId]
 * @property {undefined} [twitterTitle]
 * @property {undefined} [twitterUrl]
 * @property {undefined} [updatedTime]
 * @property {string} requestUrl
 * @property {boolean} success
 * @property {undefined} [charset]
 * @property {undefined} [favicon]
 */
/**
 * @typedef {object} customMetaTags
 * @property {boolean} multiple - is there more than one of these tags on a page (normally this is false)
 * @property {string} property - meta tag name/property attribute
 * @property {string} fieldName - name of the result variable
 */
/**
 * You can find the `isUrl` settings details at https://github.com/validatorjs/validator.js
 * @typedef {object} validatorSettings
 * @property {string[]} protocols
 * @property {boolean} require_tld
 * @property {boolean} require_protocol
 * @property {boolean} require_host
 * @property {boolean} require_valid_protocol
 * @property {boolean} allow_underscores
 * @property {boolean} host_whitelist
 * @property {boolean} host_blacklist
 * @property {boolean} allow_trailing_dot
 * @property {boolean} allow_protocol_relative_urls
 * @property {boolean} disallow_auth
 */
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
 * @param {customMetaTags[]} [options.customMetaTags] - Here you can define custom meta tags you want to scrape.
 * @param {boolean} [options.allMedia] - By default, OGS will only send back the first image/video it finds.
 * @param {number} [options.peekSize] - Sets the peekSize for the request.
 * @param {number} [options.downloadLimit] - Maximum size of the content downloaded from the server, in bytes.
 * @param {validatorSettings} [options.urlValidatorSettings] - Sets the options used by validator.js for testing the URL
 * @param {boolean} [options.decompress] - Set the accept-encoding to `gzip, deflate, br` (default: `true`).
 * @param {boolean} [options.followRedirect] - Defines if redirect responses should be followed automatically. (default: `true`).
 * @param {Object<string, string>} [options.headers] - An object containing request headers. Useful for setting the user-agent.
 * @param {number} [options.maxRedirects] - If exceeded, the request will be aborted and a MaxRedirectsError will be thrown. (default: `10`).
 * @param {object} [options.retry] - Number of times `og`s will retry the request (default: `2`).
 * @param {object} [options.timeout] - Timeout of the request.
 * @returns {Promise<successResult | errorResult>} Promise Object with the Open Graph results
 */
declare function run(options: {
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
}): Promise<successResult | errorResult>;
declare namespace run {
    export { imageObject, successResult, successResultObject, errorResult, errorResultObject, customMetaTags, validatorSettings };
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
type successResult = {
    error: boolean;
    result: successResultObject;
    response: object;
};
type errorResult = {
    error: boolean;
    result: errorResultObject;
    response: undefined;
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
//# sourceMappingURL=index.d.ts.map