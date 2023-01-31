declare const extractMetaTags: any;
declare const requestAndResultsFormatter: any;
declare const charset: any;
declare const utils: any;
/**
 * sets up options for the got request and calls extract on html
 *
 * @param {object} options - options for ogs
 * @return {object} object with ogs results
 *
 */
declare const setOptionsAndReturnOpenGraphResults: (options: any) => Promise<{
    ogObject: any;
    response: any;
}>;
