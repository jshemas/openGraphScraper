import { expect } from 'chai';

import ogs from '../../index';

describe('blacklist', function () {
  it('when website is on the blacklist', function () {
    return ogs({
      url: 'https://www.wikipedia.org/',
      blacklist: ['www.test.com', 'www.wikipedia.org'],
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
        expect(result.error).to.eql('Host name has been black listed');
        expect(result.errorDetails.toString()).to.eql('Error: Host name has been black listed');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
  it('when website is not on the blacklist', function () {
    return ogs({
      url: 'https://www.wikipedia.org/',
      blacklist: ['www.test.com', 'www.google.org'],
    }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia, the free encyclopedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.favicon).to.be.eql('/static/favicon/wikipedia.ico');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
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
  it('when blacklist empty', function () {
    return ogs({
      url: 'https://www.wikipedia.org/',
      blacklist: [],
    }).then(function ({ error, result, response }) {
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
});
