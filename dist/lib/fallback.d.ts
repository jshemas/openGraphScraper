declare const findImageTypeFromUrl: any, isImageTypeValid: any, isUrlValid: any;
declare const doesElementExist: (selector: any, attribute: any, $: any) => boolean;
/**
 * ogs fallbacks
 *
 * @param {object} ogObject - the current ogObject
 * @param {object} options - options for ogs
 * @param {object} $ - cheerio.load() of the current html
 * @return {object} object with ogs results with updated fallback values
 *
 */
declare const fallback: (ogObject: any, options: any, $: any) => any;
