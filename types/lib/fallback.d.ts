import type { CheerioAPI } from 'cheerio';
import type { OpenGraphScraperOptions, OgObjectInternal } from './types';
/**
 * ogs fallbacks
 *
 * @param {object} ogObject - the current ogObject
 * @param {object} options - options for ogs
 * @param {object} $ - cheerio.load() of the current html
 * @return {object} object with ogs results with updated fallback values
 *
 */
export declare function fallback(ogObject: OgObjectInternal, options: OpenGraphScraperOptions, $: CheerioAPI, body: string): OgObjectInternal;
export default fallback;
