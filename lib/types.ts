/* eslint-disable max-len */

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
export type ValidatorSettings = {
  allow_fragments: boolean;
  allow_protocol_relative_urls: boolean;
  allow_query_components: boolean;
  allow_trailing_dot: boolean;
  protocols: string[];
  require_host: boolean;
  require_port: boolean;
  require_protocol: boolean;
  require_tld: boolean;
  require_valid_protocol: boolean;
  validate_length: boolean;
};
