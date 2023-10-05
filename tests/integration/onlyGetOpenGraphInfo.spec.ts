import { expect } from 'chai';

import ogs from '../../index';

describe('onlyGetOpenGraphInfo', function () {
  // TODO: wikipedia now has og data by default, will need to find a replacement site for this test
  it.skip('should only get open graph info', function () {
    return ogs({
      url: 'http://www.wikipedia.org/',
      onlyGetOpenGraphInfo: true,
    }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.eql(undefined);
      expect(result.ogDescription).to.eql(undefined);
      expect(result.ogImage).to.eql(undefined);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'requestUrl',
        'success',
      );
      expect(response).to.be.an('Response');
    });
  });
  it('should get all open graph info', function () {
    return ogs({
      url: 'http://www.wikipedia.org/',
      onlyGetOpenGraphInfo: false,
    }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.favicon).to.be.eql('/static/favicon/wikipedia.ico');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'charset',
        'favicon',
        'ogDescription',
        'ogLocale',
        'ogTitle',
        'requestUrl',
        'success',
      );
      expect(response).to.be.an('Response');
    });
  });
});
