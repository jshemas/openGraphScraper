import type { OgObject, OpenGraphScraperOptions } from './types';
/**
 * extract all of the meta tags needed for ogs
 *
 * @param {sting} body - the body of the got request
 * @param {object} options - options for ogs
 * @return {object} object with ogs results
 *
 */
export default function extractMetaTags(body: string, options: OpenGraphScraperOptions, rawBody: any): OgObject;
