const ogs = require('../../index');

describe('onlyGetOpenGraphInfo', function () {
  it('should only get open graph info', function () {
    return ogs({
      url: 'http://www.wikipedia.org/',
      onlyGetOpenGraphInfo: true,
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.eql(undefined);
      expect(result.ogDescription).to.eql(undefined);
      expect(result.ogImage).to.eql(undefined);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.success).to.be.eql(true);
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('should get all open graph info', function () {
    return ogs({
      url: 'http://www.wikipedia.org/',
      onlyGetOpenGraphInfo: false,
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogImage).to.be.eql([{ url: 'portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png' }]);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.success).to.be.eql(true);
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
});
