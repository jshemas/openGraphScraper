import type { OgObject, OpenGraphScraperOptions } from './types';
/**
 * formats the multiple media values
 *
 * @param {object} ogObject - the current ogObject
 * @param {object} options - options for ogs
 * @return {object} object with ogs results with updated media values
 *
 */
export declare function mediaSetup(ogObject: OgObject, options: OpenGraphScraperOptions): OgObject;
export default mediaSetup;
