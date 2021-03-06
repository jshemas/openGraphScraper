const cheerio = require('cheerio');
const tunnel = require('tunnel');
const ogs = require('../../index');

describe('proxy', function () {
  it('example of how to use a proxy', function () {
    this.timeout(30000);
    // first do a normal request to get the local IP
    return ogs({
      url: 'https://whatismyipaddress.com/',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      const $ = cheerio.load(response.body);
      const ipWithoutProxy = $('.address a').attr('href');
      console.log('ip:', ipWithoutProxy);
      // second do a proxy request and compair the IPs
      return ogs({
        url: 'https://whatismyipaddress.com/',
        agent: {
          // proxy agent for https requests
          https: tunnel.httpsOverHttp({
            // proxy was found here: https://hidemy.name/en/proxy-list/?country=US&type=h#list
            proxy: {
              host: '45.82.245.34',
              port: 3128,
              rejectUnauthorized: false,
            },
          }),
        },
        timeout: 10000,
      }, function (errorWithProxy, resultWithProxy, responseWithProxy) {
        console.log('errorWithProxy:', errorWithProxy);
        console.log('resultWithProxy:', resultWithProxy);
        expect(errorWithProxy).to.be.eql(false);
        expect(resultWithProxy.success).to.be.eql(true);
        const $$ = cheerio.load(responseWithProxy.body);
        const ipWithProxy = $$('.address a').attr('href');
        console.log('proxyIp:', ipWithProxy);
        // if proxy agent is working, these IPs should be differnt
        expect(ipWithoutProxy).to.be.not.eql(ipWithProxy);
      });
    });
  });
});
