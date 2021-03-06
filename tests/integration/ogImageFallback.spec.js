const ogs = require('../../index');

describe('ogImageFallback', function () {
  it('should not use image fallback if there is no og image', function () {
    return ogs({
      url: 'https://jshemas.github.io/openGraphScraperPages/cloudinary',
      ogImageFallback: false,
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Cloudinary - Pricing');
      expect(result.ogDescription).to.be.eql('Cloudinary');
      expect(result.ogImage).to.eql(undefined);
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/cloudinary');
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'ogDescription',
        'ogTitle',
        'requestUrl',
        'success',
        'charset',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('should use image fallback', function () {
    return ogs({
      url: 'https://jshemas.github.io/openGraphScraperPages/cloudinary',
      ogImageFallback: true,
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Cloudinary - Pricing');
      expect(result.ogDescription).to.be.eql('Cloudinary');
      expect(result.ogImage).to.be.eql([
        {
          url: 'http://res-1.cloudinary.com/cloudinary/image/asset/dpr_2.0/logo-e0df892053afd966cc0bfe047ba93ca4.png',
          width: '172',
          height: '38',
          type: 'png',
        },
        {
          url: 'http://res-3.cloudinary.com/cloudinary/image/asset/dpr_2.0/logo-white-f1a9f401b60dd17a7629e663523b150e.png',
          width: '172',
          height: '38',
          type: 'png',
        },
      ]);
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/cloudinary');
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'ogDescription',
        'ogImage',
        'ogTitle',
        'requestUrl',
        'success',
        'charset',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
});
