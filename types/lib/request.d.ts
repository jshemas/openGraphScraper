import type { OpenGraphScraperOptions } from './types';
/**
 * performs the fetch request and formats the body for ogs
 *
 * @param {object} options - options for ogs
 * @return {object} formatted request body and response
 *
 */
export default function requestAndResultsFormatter(options: OpenGraphScraperOptions): Promise<{
    body: string;
    response: import("undici").Response;
}>;
