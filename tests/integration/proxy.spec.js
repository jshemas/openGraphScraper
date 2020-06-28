const cheerio = require('cheerio');
const ogs = require('../../index');

// proxy was found here: https://hidemy.name/en/proxy-list/?country=US&type=h#list
describe('proxy', function () {
  it.only('example of how to use a proxy', function () {
    return ogs({
      url: 'http://whatismyipaddress.com/ip-lookup',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      const $ = cheerio.load(response.body);
      const ipWithoutProxy = $('input[name="LOOKUPADDRESS"]').attr('value');
      console.log('ip:', ipWithoutProxy);
      return ogs({
        url: 'http://whatismyipaddress.com/ip-lookup',
        proxy: {
          url: 'http://1.0.0.89:80',
        },
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        },
      }, function (errorWithProxy, resultWithProxy, responseWithProxy) {
        console.log('errorWithProxy:', errorWithProxy);
        console.log('resultWithProxy:', resultWithProxy);
        expect(errorWithProxy).to.be.eql(false);
        expect(resultWithProxy.success).to.be.eql(true);
        const $$ = cheerio.load(responseWithProxy.body);
        const ipWithProxy = $$('input[name="LOOKUPADDRESS"]').attr('value');
        console.log('proxyIp:', ipWithProxy);
        expect(ipWithoutProxy).to.be.not.eql(ipWithProxy);
      });
    });
  });
});
