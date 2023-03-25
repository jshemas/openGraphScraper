import type { OpenGraphScraperOptions } from './types';
/**
 * sets up options for the fetch request and calls extract on html
 *
 * @param {object} options - options for ogs
 * @return {object} object with ogs results
 *
 */
export default function setOptionsAndReturnOpenGraphResults(ogsOptions: OpenGraphScraperOptions): Promise<{
    ogObject: import("./types").OgObject;
    response: any;
    html: any;
}>;
