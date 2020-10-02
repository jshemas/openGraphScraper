const ogs = require('../../index');

describe('twitter', function () {
  context('Should Return correct Open Graph Info + Some Twitter Info ', function () {
    it('On Twitter Site', function () {
      return ogs({
        url: 'https://jshemas.github.io/openGraphScraperPages/twitter-dev',
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.twitterTitle).to.be.eql('Twitter Developers');
        expect(result.ogTitle).to.be.eql('Twitter Developers');
        expect(result.ogType).to.be.eql('website');
        expect(result.ogUrl).to.be.eql('https://web.archive.org/web/20160303190414im_/https://dev.twitter.com/');
        expect(result.twitterCard).to.be.eql('summary');
        expect(result.ogSiteName).to.be.eql('Twitter Developers');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterUrl).to.be.eql('https://web.archive.org/web/20160303190414im_/https://dev.twitter.com/');
        expect(result.twitterDescription).to.be.eql('The Twitter platform connects your website or application with the worldwide conversation happening on Twitter.');
        expect(result.ogImage).to.be.eql({
          url: 'https://web.archive.org/web/20160303190414im_/https://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3.png',
          width: null,
          height: null,
          type: 'png',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://web.archive.org/web/20160303190414im_/https://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3.png',
          width: '500',
          height: '500',
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/twitter-dev');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogLocale',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterTitle',
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('On Github Site', function () {
      return ogs({
        url: 'https://jshemas.github.io/openGraphScraperPages/github',
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogUrl).to.be.eql('https://web.archive.org/web/20170113081103/https://github.com/');
        expect(result.ogSiteName).to.be.eql('GitHub');
        expect(result.ogTitle).to.be.eql('Build software better, together');
        expect(result.ogDescription).to.be.eql('GitHub is where people build software. More than 19 million people use GitHub to discover, fork, and contribute to over 50 million projects.');
        expect(result.twitterSite).to.be.eql('github');
        expect(result.twitterSiteId).to.be.eql('13334762');
        expect(result.twitterCreator).to.be.eql('github');
        expect(result.twitterCreatorId).to.be.eql('13334762');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterTitle).to.be.eql('GitHub');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterDescription).to.be.eql('GitHub is where people build software. More than 19 million people use GitHub to discover, fork, and contribute to over 50 million projects.');
        expect(result.ogImage).to.be.eql({
          url: 'https://web.archive.org/web/20170113081103im_/https://assets-cdn.github.com/images/modules/open_graph/github-logo.png',
          width: '1200',
          height: '1200',
          type: 'image/png',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://web.archive.org/web/20170113081103im_/https://assets-cdn.github.com/images/modules/open_graph/github-logo.png',
          width: '1200',
          height: '1200',
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/github');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogLocale',
          'ogTitle',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterCreator',
          'twitterCreatorId',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterSiteId',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('On Atom Site', function () {
      return ogs({
        url: 'https://jshemas.github.io/openGraphScraperPages/atom.html',
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogUrl).to.be.eql('https://web.archive.org/web/20170913111314/https://atom.io/');
        expect(result.ogSiteName).to.be.eql('Atom');
        expect(result.ogTitle).to.be.eql('A hackable text editor for the 21st Century');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogDescription).to.be.eql('At GitHub, we’re building the text editor we’ve always wanted: hackable to the core, but approachable on the first day without ever touching a config file. We can’t wait to see what you build with it.');
        expect(result.ogType).to.be.eql('website');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@AtomEditor');
        expect(result.twitterCreator).to.be.eql('@github');
        expect(result.twitterTitle).to.be.eql('Atom');
        expect(result.twitterDescription).to.be.eql('A hackable text editor for the 21st Century');
        expect(result.ogImage).to.be.eql({
          url: 'https://web.archive.org/web/20170913111314im_/http://og.github.com/atom-mark/atom-mark@1200x630.png',
          width: '1200',
          height: '630',
          type: 'png',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://web.archive.org/web/20170913111314im_/http://og.github.com/atom-logo/atom-logo@1200x630.png',
          width: '1200',
          height: '630',
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/atom.html');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDescription',
          'ogImage',
          'ogLocale',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterCreator',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
  });
});
