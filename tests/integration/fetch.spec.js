const cheerio = require('cheerio');

const ogs = require('../../index');

describe('fetch', function () {
  it('setting the fetch headers', function () {
    // userAgent is undici by default
    const userAgent = 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.5563.57 Mobile Safari/537.36';
    const headers = new Headers({
      'user-agent': userAgent,
    });
    return ogs({ url: 'https://www.whatsmyua.info/', fetchOptions: { headers } }).then(async function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('What\'s my user agent?');
      expect(result.ogDescription).to.be.eql('Detect user-agent, operating system, browser, and device using several libraries, including ua-parser, ua-parser-js, and platform.');
      expect(result.ogImage).to.be.eql([{
        url: 'https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png',
        width: null,
        height: null,
        type: 'png',
      }]);
      expect(result.requestUrl).to.be.eql('https://www.whatsmyua.info/');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'ogTitle',
        'ogDescription',
        'ogImage',
        'requestUrl',
        'charset',
        'success',
      );
      expect(response).to.be.an('Response');
      const body = await response.text();
      const $ = cheerio.load(body);
      const rawUa = $('li#rawUa').text();
      expect(rawUa).to.be.eql(`rawUa: ${userAgent}`);
    });
  });
  it('setting a timeout', function () {
    return ogs({ url: 'https://releases.ubuntu.com/20.04.3/ubuntu-20.04.3-desktop-amd64.iso', timeout: 1 })
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('https://releases.ubuntu.com/20.04.3/ubuntu-20.04.3-desktop-amd64.iso');
        expect(result.error).to.eql('The operation was aborted due to timeout');
        expect(result.errorDetails.toString()).to.eql('Error: The operation was aborted due to timeout');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
});
