const cheerio = require('cheerio');
const tunnel = require('tunnel');
const ogs = require('../../index');

describe('proxy', function () {
  it('example of how to use a proxy', function () {
    this.timeout(30000);
    return ogs({
      url: 'http://whatismyipaddress.com/',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      const $ = cheerio.load(response.body);
      const ipWithoutProxy = $('.address a').attr('href');
      console.log('ip:', ipWithoutProxy);
      return ogs({
        url: 'http://whatismyipaddress.com/',
        agent: {
          https: tunnel.httpsOverHttp({
            // proxy was found here: https://hidemy.name/en/proxy-list/?country=US&type=h#list
            proxy: {
              host: '67.205.190.164',
              port: 8080,
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
        expect(ipWithoutProxy).to.be.not.eql(ipWithProxy);
      });
    });
  });
});
