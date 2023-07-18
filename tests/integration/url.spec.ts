import { expect } from 'chai';

import ogs from '../../index';

describe('url', function () {
  it('http', function () {
    return ogs({ url: 'http://www.wikipedia.org/' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia, the free encyclopedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.favicon).to.be.eql('/static/favicon/wikipedia.ico');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.success).to.be.eql(true);
      expect(result.ogImage).to.be.eql([{
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/2244px-Wikipedia-logo-v2.svg.png',
        type: 'png',
      }]);
      expect(result.ogType).to.be.eql('website');
      expect(result).to.have.all.keys(
        'charset',
        'favicon',
        'ogDescription',
        'ogImage',
        'ogLocale',
        'ogTitle',
        'ogType',
        'requestUrl',
        'success',
      );
      expect(response).to.be.an('Response');
    });
  });
  it('https', function () {
    return ogs({ url: 'https://www.wikipedia.org/' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia, the free encyclopedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
      expect(result.favicon).to.be.eql('/static/favicon/wikipedia.ico');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.success).to.be.eql(true);
      expect(result.ogImage).to.be.eql([{
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/2244px-Wikipedia-logo-v2.svg.png',
        type: 'png',
      }]);
      expect(result.ogType).to.be.eql('website');
      expect(result).to.have.all.keys(
        'charset',
        'favicon',
        'ogDescription',
        'ogImage',
        'ogLocale',
        'ogTitle',
        'ogType',
        'requestUrl',
        'success',
      );
      expect(response).to.be.an('Response');
    });
  });
  it('no protocol', function () {
    return ogs({ url: 'www.wikipedia.org/' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia, the free encyclopedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.favicon).to.be.eql('/static/favicon/wikipedia.ico');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.success).to.be.eql(true);
      expect(result.ogImage).to.be.eql([{
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/2244px-Wikipedia-logo-v2.svg.png',
        type: 'png',
      }]);
      expect(result.ogType).to.be.eql('website');
      expect(result).to.have.all.keys(
        'charset',
        'favicon',
        'ogDescription',
        'ogImage',
        'ogLocale',
        'ogTitle',
        'ogType',
        'requestUrl',
        'success',
      );
      expect(response).to.be.an('Response');
    });
  });
  it('no protocol and no wwww', function () {
    return ogs({ url: 'wikipedia.org/' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia, the free encyclopedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.requestUrl).to.be.eql('http://wikipedia.org/');
      expect(result.favicon).to.be.eql('/static/favicon/wikipedia.ico');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.success).to.be.eql(true);
      expect(result.ogImage).to.be.eql([{
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/2244px-Wikipedia-logo-v2.svg.png',
        type: 'png',
      }]);
      expect(result.ogType).to.be.eql('website');
      expect(result).to.have.all.keys(
        'charset',
        'favicon',
        'ogDescription',
        'ogImage',
        'ogLocale',
        'ogTitle',
        'ogType',
        'requestUrl',
        'success',
      );
      expect(response).to.be.an('Response');
    });
  });
  it('protocol with no wwww', function () {
    return ogs({ url: 'http://wikipedia.org/' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia, the free encyclopedia');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.requestUrl).to.be.eql('http://wikipedia.org/');
      expect(result.favicon).to.be.eql('/static/favicon/wikipedia.ico');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.success).to.be.eql(true);
      expect(result.ogImage).to.be.eql([{
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/2244px-Wikipedia-logo-v2.svg.png',
        type: 'png',
      }]);
      expect(result.ogType).to.be.eql('website');
      expect(result).to.have.all.keys(
        'charset',
        'favicon',
        'ogDescription',
        'ogImage',
        'ogLocale',
        'ogTitle',
        'ogType',
        'requestUrl',
        'success',
      );
      expect(response).to.be.an('Response');
    });
  });
  it('fake page', function () {
    return ogs({ url: 'http://testtesttest4564568.com' })
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('http://testtesttest4564568.com');
        expect(result.error).to.eql('Page not found');
        expect(result.errorDetails.toString()).to.eql('Error: Page not found');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
  it('empty url', function () {
    return ogs({ url: '' })
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('');
        expect(result.error).to.eql('Invalid URL');
        expect(result.errorDetails.toString()).to.eql('Error: Invalid URL');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
  it('empty options', function () {
    return ogs({})
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.eql(undefined);
        expect(result.error).to.eql('Invalid URL');
        expect(result.errorDetails.toString()).to.eql('Error: Invalid URL');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
  it('url is a string of numbers', function () {
    return ogs({ url: '2323233' })
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('2323233');
        expect(result.error).to.eql('Invalid URL');
        expect(result.errorDetails.toString()).to.eql('Error: Invalid URL');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
  it('url is a string of words', function () {
    return ogs({ url: 'this is a test' })
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('this is a test');
        expect(result.error).to.eql('Invalid URL');
        expect(result.errorDetails.toString()).to.eql('Error: Invalid URL');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
  it('url is invalid because user disallows https with urlValidatorSettings', function () {
    return ogs({
      url: 'https://www.wikipedia.org/',
      urlValidatorSettings: {
        allow_fragments: true,
        allow_protocol_relative_urls: false,
        allow_query_components: true,
        allow_trailing_dot: false,
        allow_underscores: false,
        protocols: ['http'],
        require_host: true,
        require_port: false,
        require_protocol: false,
        require_tld: true,
        require_valid_protocol: true,
        validate_length: true,
      },
    })
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
        expect(result.error).to.eql('Invalid URL');
        expect(result.errorDetails.toString()).to.eql('Error: Invalid URL');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
  it('url is to a pdf', function () {
    return ogs({ url: 'test.pdf?123' })
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('test.pdf?123');
        expect(result.error).to.eql('Must scrape an HTML page');
        expect(result.errorDetails.toString()).to.eql('Error: Must scrape an HTML page');
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
