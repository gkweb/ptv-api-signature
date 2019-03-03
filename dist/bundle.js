(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  const crypto = require('crypto');

  /**
   * Generates sig based on path supplied
   * !important - Generated from the path ONLY
   * not the domain - http://timetableapi.ptv.vic.gov.au{This-is-the-path}
   * @param {String} path
   * @param {String} devId
   * @param {String} devKey
   * @returns {String} - Hex Signature for appending to url
   */
  const genSignature = (path, devKey) => {
    // https://nodejs.org/api/crypto.html
    const hash = crypto.createHmac('sha1', devKey).update(path).digest('hex');
    return hash.toUpperCase()
  };

  /**
   * Constructs a URL string from array of key val pairs
   * @param {Object} params
   * @param {String} [params.name]
   * @param {String} [params.value]
   */
  const appendParams = (params, hasParams) => {
    let all = (hasParams) ? '&' : '?'; // - If there are already params just append '&' instead for first run
    for (let p = 0; p < params.length; p++) {
      if ((p !== 0)) all += '&';
      all += `${params[p].name}=${params[p].value}`;
    }
    return all
  };

  /**
   * Append signature to path
   * @example
   * 
   *  pathWithSig('/v3/search/balaclava', [{ name: 'route_types', value: '0' }], '1111111', 'abcde-1234-5678-9101-ffffffffffff')
   * 
   * @param {String} path - Path
   * @param {Array} params - Supplied with object / key value pair for appending params
   * @param {String} params.name
   * @param {String} params.value
   * @param {String} devId
   * @param {String} devKey
   * @returns {String}
   */
  const pathWithSig = (path, params = [], devId, devKey) => {
    const reqPath = `${path}${appendParams([
    ].concat(
        params, [
          {name: 'devid', value: devId}
        ]
      )
    )}`;

    const sig = genSignature(reqPath, devKey);

    return `${reqPath}&signature=${sig}`
  };

  module.exports = {
    pathWithSig,
    appendParams,
    genSignature
  };

}));
