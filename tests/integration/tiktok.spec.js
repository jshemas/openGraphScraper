const ogs = require('../../index');

// eslint-disable-next-line mocha/no-exclusive-tests
describe.only('tiktok', function () {
  context('Should Return correct Open Graph Info using user-agent', function () {
    // eslint-disable-next-line mocha/no-exclusive-tests
    it.only('Edge on Windows', function () {
      return ogs({
        url: 'https://vt.tiktok.com/ZSJ9GXELc/',
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36 Edg/91.0.864.37',
        },
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        console.log('response', response.rawBody);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('TikTok');
        expect(result.twitterSite).to.be.eql('@TikTok.com');
        expect(result.twitterCard).to.be.eql('player');
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('Internet-Explorer on Windows', function () {
      return ogs({
        url: 'https://vt.tiktok.com/ZSJ9GXELc/',
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
        },
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('TikTok');
        expect(result.twitterSite).to.be.eql('@TikTok.com');
        expect(result.twitterCard).to.be.eql('player');
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('Chrome on Windows - Type 1', function () {
      return ogs({
        url: 'https://vt.tiktok.com/ZSJ9GXELc/',
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
        },
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('TikTok');
        expect(result.twitterSite).to.be.eql('@TikTok.com');
        expect(result.twitterCard).to.be.eql('player');
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('Chrome on Windows - Type 2', function () {
      return ogs({
        url: 'https://vt.tiktok.com/ZSJ9GXELc/',
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
        },
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('TikTok');
        expect(result.twitterSite).to.be.eql('@TikTok.com');
        expect(result.twitterCard).to.be.eql('player');
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('Chrome on Windows - Type 3', function () {
      return ogs({
        url: 'https://vt.tiktok.com/ZSJ9GXELc/',
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
        },
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('TikTok');
        expect(result.twitterSite).to.be.eql('@TikTok.com');
        expect(result.twitterCard).to.be.eql('player');
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('Firefox on Windows', function () {
      return ogs({
        url: 'https://vt.tiktok.com/ZSJ9GXELc/',
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        },
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('TikTok');
        expect(result.twitterSite).to.be.eql('@TikTok.com');
        expect(result.twitterCard).to.be.eql('player');
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('Vivaldi on Windows - Type 1', function () {
      return ogs({
        url: 'https://vt.tiktok.com/ZSJ9GXELc/',
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36 Vivaldi/4.0',
        },
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('TikTok');
        expect(result.twitterSite).to.be.eql('@TikTok.com');
        expect(result.twitterCard).to.be.eql('player');
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('Vivaldi on Windows - Type 2', function () {
      return ogs({
        url: 'https://vt.tiktok.com/ZSJ9GXELc/',
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36 Vivaldi/4.0',
        },
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('TikTok');
        expect(result.twitterSite).to.be.eql('@TikTok.com');
        expect(result.twitterCard).to.be.eql('player');
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
  });
});
