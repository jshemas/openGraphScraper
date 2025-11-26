import type { RequestInit } from 'undici';
export interface SuccessResult {
    error: false;
    html: string;
    response: object;
    result: OgObject;
}
export interface ErrorResult {
    error: true;
    html: undefined;
    response: undefined;
    result: OgObject;
}
export type OnlyGetOpenGraphInfoItem = 'image' | 'title' | 'description' | 'locale' | 'logo' | 'url' | 'favicon' | 'audioUrl' | 'date';
/**
 * The options used by Open Graph Scraper
 *
 * @typeParam {string} url - URL of the site. (Required)
 * @typeParam {string} [html] - You can pass in an HTML string to run ogs on it. (use without options.url)
 * @typeParam {string[]} [blacklist] - Pass in an array of sites you don't want ogs to run on.
 * @typeParam {boolean | OnlyGetOpenGraphInfoItem[]} [onlyGetOpenGraphInfo] - Only fetch open graph info and don't fall back on anything else.
 * @typeParam {CustomMetaTags} [customMetaTags] - Here you can define custom meta tags you want to scrape.
 * @typeParam {Request} [fetchOptions] - The options passed into fetch.
 * @typeParam {number} [timeout] - Number of seconds before the fetch request ends. (default is 10 seconds)
 * @typeParam {ValidatorSettings} [urlValidatorSettings] - Sets the options used by validator.js for testing the URL
 */
export interface OpenGraphScraperOptions {
    blacklist?: string[];
    customMetaTags?: CustomMetaTags[];
    fetchOptions?: RequestInit;
    html?: string;
    onlyGetOpenGraphInfo?: boolean | OnlyGetOpenGraphInfoItem[];
    timeout?: number;
    url?: string;
    urlValidatorSettings?: ValidatorSettings;
    jsonLDOptions?: JSONLDOptions;
}
/**
 * Options for isURL method in Validator.js
 *
 * @typeParam allow_protocol_relative_urls - if set as true protocol relative URLs will be allowed
 * @typeParam protocols - valid protocols can be modified with this option
 * @typeParam require_host - if set as false isURL will not check if host is present in the URL
 * @typeParam require_port - if set as true isURL will check if port is present in the URL
 * @typeParam require_protocol - if set as true isURL will return false if protocol is not present in the URL
 * @typeParam require_valid_protocol - isURL will check if the URL's protocol is present in the protocols option
 * @typeParam validate_length - if set as false isURL will skip string length validation (IE maximum is 2083)
 *
 */
export interface ValidatorSettings {
    allow_fragments: boolean;
    allow_protocol_relative_urls: boolean;
    allow_query_components: boolean;
    allow_trailing_dot: boolean;
    allow_underscores: boolean;
    protocols: string[];
    require_host: boolean;
    require_port: boolean;
    require_protocol: boolean;
    require_tld: boolean;
    require_valid_protocol: boolean;
    validate_length: boolean;
}
/**
 * Options for the JSON-LD parser
 */
export interface JSONLDOptions {
    throwOnJSONParseError?: boolean;
    logOnJSONParseError?: boolean;
}
/**
 * The type for user defined custom meta tags you want to scrape.
 *
 * @typeParam {boolean} multiple - is there more than one of these tags on a page (normally this is false)
 * @typeParam {string} property - meta tag name/property attribute
 * @typeParam {string} fieldName - name of the result variable
 */
export interface CustomMetaTags {
    fieldName: string;
    multiple: boolean;
    property: string;
}
export interface TwitterImageObject {
    alt?: string;
    height?: number;
    url: string;
    width?: number;
}
export interface TwitterPlayerObject {
    height?: number;
    stream?: string;
    url: string;
    width?: number;
}
export interface ImageObject {
    height?: number;
    type?: string;
    url: string;
    width?: number;
    alt?: string;
}
export interface VideoObject {
    height?: number;
    type?: string;
    url: string;
    width?: number;
}
export interface MusicSongObject {
    disc?: string;
    track?: number;
    url: string;
}
export interface OgObjectInternal {
    alAndroidAppName?: string;
    alAndroidClass?: string;
    alAndroidPackage?: string;
    alAndroidUrl?: string;
    alIosAppName?: string;
    alIosAppStoreId?: string;
    alIosUrl?: string;
    alIpadAppName?: string;
    alIpadAppStoreId?: string;
    alIpadUrl?: string;
    alIphoneAppName?: string;
    alIphoneAppStoreId?: string;
    alIphoneUrl?: string;
    alWebShouldFallback?: string;
    alWebUrl?: string;
    alWindowsAppId?: string;
    alWindowsAppName?: string;
    alWindowsPhoneAppId?: string;
    alWindowsPhoneAppName?: string;
    alWindowsPhoneUrl?: string;
    alWindowsUniversalAppId?: string;
    alWindowsUniversalAppName?: string;
    alWindowsUniversalUrl?: string;
    alWindowsUrl?: string;
    articleAuthor?: string;
    articleExpirationTime?: string;
    articleModifiedTime?: string;
    articlePublishedDate?: string;
    articlePublishedTime?: string;
    articleModifiedDate?: string;
    articlePublisher?: string;
    articleSection?: string;
    articleTag?: string;
    author?: string;
    bookAuthor?: string;
    bookCanonicalName?: string;
    bookIsbn?: string;
    bookReleaseDate?: string;
    booksBook?: string;
    booksRatingScale?: string;
    booksRatingValue?: string;
    bookTag?: string;
    businessContactDataCountryName?: string;
    businessContactDataLocality?: string;
    businessContactDataPostalCode?: string;
    businessContactDataRegion?: string;
    businessContactDataStreetAddress?: string;
    charset?: string;
    customMetaTags?: Record<string, string | string[]>;
    dcContributor?: string;
    dcCoverage?: string;
    dcCreator?: string;
    dcDate?: string;
    dcDateCreated?: string;
    dcDateIssued?: string;
    dcDescription?: string;
    dcFormatMedia?: string;
    dcFormatSize?: string;
    dcIdentifier?: string;
    dcLanguage?: string;
    dcPublisher?: string;
    dcRelation?: string;
    dcRights?: string;
    dcSource?: string;
    dcSubject?: string;
    dcTitle?: string;
    dcType?: string;
    error?: string;
    errorDetails?: Error;
    favicon?: string;
    fbAppId?: string;
    jsonLD?: object[];
    modifiedTime?: string;
    musicAlbum?: string;
    musicAlbumDisc?: string;
    musicAlbumTrack?: string;
    musicAlbumUrl?: string;
    musicCreator?: string;
    musicDuration?: string;
    musicMusician?: string;
    musicPlaylist?: string;
    musicRadioStation?: string;
    musicReleaseDate?: string;
    musicSong?: MusicSongObject[];
    musicSongDisc?: string[];
    musicSongProperty?: string[];
    musicSongTrack?: string[];
    musicSongUrl?: string[];
    ogArticleAuthor?: string;
    ogArticleExpirationTime?: string;
    ogArticleModifiedTime?: string;
    ogArticlePublishedTime?: string;
    ogArticlePublisher?: string;
    ogArticleSection?: string;
    ogArticleTag?: string;
    ogAudio?: string;
    ogAudioSecureURL?: string;
    ogAudioType?: string;
    ogAudioURL?: string;
    ogAvailability?: string;
    ogDate?: string;
    ogDescription?: string;
    ogDeterminer?: string;
    ogEpisode?: string;
    ogImage?: ImageObject[];
    ogImageAlt?: string[];
    ogImageHeight?: string[];
    ogImageProperty?: string[];
    ogImageSecureURL?: string[];
    ogImageType?: string[];
    ogImageURL?: string[];
    ogImageWidth?: string[];
    ogLocale?: string;
    ogLocaleAlternate?: string;
    ogLogo?: string;
    ogMovie?: string;
    ogPriceAmount?: string;
    ogPriceCurrency?: string;
    ogProductAvailability?: string;
    ogProductCondition?: string;
    ogProductPriceAmount?: string;
    ogProductPriceCurrency?: string;
    ogProductRetailerItemId?: string;
    ogSiteName?: string;
    ogTitle?: string;
    ogType?: string;
    ogUrl?: string;
    ogVideo?: VideoObject[];
    ogVideoActor?: string;
    ogVideoActorId?: string;
    ogVideoActorRole?: string;
    ogVideoDirector?: string;
    ogVideoDuration?: string;
    ogVideoHeight?: string[];
    ogVideoOther?: string;
    ogVideoProperty?: string[];
    ogVideoReleaseDate?: string;
    ogVideoSecureURL?: string;
    ogVideoSeries?: string;
    ogVideoTag?: string;
    ogVideoTvShow?: string;
    ogVideoType?: string[];
    ogVideoWidth?: string[];
    ogVideoWriter?: string;
    ogWebsite?: string;
    placeLocationLatitude?: string;
    placeLocationLongitude?: string;
    profileFirstName?: string;
    profileGender?: string;
    profileLastName?: string;
    profileUsername?: string;
    publishedTime?: string;
    releaseDate?: string;
    requestUrl?: string;
    restaurantContactInfoCountryName?: string;
    restaurantContactInfoEmail?: string;
    restaurantContactInfoLocality?: string;
    restaurantContactInfoPhoneNumber?: string;
    restaurantContactInfoPostalCode?: string;
    restaurantContactInfoRegion?: string;
    restaurantContactInfoStreetAddress?: string;
    restaurantContactInfoWebsite?: string;
    restaurantMenu?: string;
    restaurantRestaurant?: string;
    restaurantSection?: string;
    restaurantVariationPriceAmount?: string;
    restaurantVariationPriceCurrency?: string;
    success?: boolean;
    twitterAccount?: string;
    twitterAppIdGooglePlay?: string;
    twitterAppIdiPad?: string;
    twitterAppIdiPhone?: string;
    twitterAppNameGooglePlay?: string;
    twitterAppNameiPad?: string;
    twitterAppNameiPhone?: string;
    twitterAppUrlGooglePlay?: string;
    twitterAppUrliPad?: string;
    twitterAppUrliPhone?: string;
    twitterCard?: string;
    twitterCreator?: string;
    twitterCreatorId?: string;
    twitterDescription?: string;
    twitterImage?: TwitterImageObject[];
    twitterImageAlt?: string[];
    twitterImageHeight?: string[];
    twitterImageProperty?: string[];
    twitterImageSrc?: string[];
    twitterImageWidth?: string[];
    twitterPlayer?: TwitterPlayerObject[];
    twitterPlayerHeight?: string[];
    twitterPlayerProperty?: string[];
    twitterPlayerStream?: string[];
    twitterPlayerStreamContentType?: string;
    twitterPlayerWidth?: string[];
    twitterSite?: string;
    twitterSiteId?: string;
    twitterTitle?: string;
    twitterUrl?: string;
    updatedTime?: string;
}
export type OgObject = Omit<OgObjectInternal, 'musicSongDisc' | 'musicSongProperty' | 'musicSongTrack' | 'musicSongUrl' | 'ogImageAlt' | 'ogImageHeight' | 'ogImageProperty' | 'ogImageSecureURL' | 'ogImageType' | 'ogImageURL' | 'ogImageWidth' | 'ogVideoHeight' | 'ogVideoProperty' | 'ogVideoType' | 'ogVideoWidth' | 'twitterImageAlt' | 'twitterImageHeight' | 'twitterImageProperty' | 'twitterImageSrc' | 'twitterImageWidth' | 'twitterPlayerHeight' | 'twitterPlayerProperty' | 'twitterPlayerStream' | 'twitterPlayerWidth'>;
