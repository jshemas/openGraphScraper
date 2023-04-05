import type { CheerioAPI } from 'cheerio';
import type { OpenGraphScraperOptions, OgObjectInteral } from './types';
/**
 * ogs fallbacks
 *
 * @param {object} ogObject - the current ogObject
 * @param {object} options - options for ogs
 * @param {object} $ - cheerio.load() of the current html
 * @return {object} object with ogs results with updated fallback values
 *
 */
export declare function fallback(ogObject: OgObjectInteral, options: OpenGraphScraperOptions, $: CheerioAPI, body: string): OgObjectInteral;
export default fallback;
