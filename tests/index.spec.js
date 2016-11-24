var app = require('../app'),
	expect = require('expect.js');

// test url - this has alot of OG info
var options1 = {
	'url': 'http://ogp.me/'
};

// test url formats
var	options2 = {
		'url': 'http://www.wikipedia.org/'
	},
	options3 = {
		'url': 'https://www.wikipedia.org/'
	},
	options4 = {
		'url': 'www.wikipedia.org/'
	},
	options5 = {
		'url': 'wikipedia.org/'
	},
	options6 = {
		'url': 'http://wikipedia.org/'
	};

// invaild url
var options7 = {
	'url': 'http://testtesttest4564568.com'
};

// empty value
var optionsNoUrl = {
	'url': ''
};

// no url
var optionsEmpty = { };

// test timeout
var options8 = {
		'url': 'http://www.wikipedia.org/',
		'timeout': 2000
	},
	options9 = {
		'url': 'http://www.wikipedia.org/',
		'timeout': ''
	},
	options10 = {
		'url': 'http://www.wikipedia.org/',
		'timeout': '2000'
	},
	options11 = {
		'url': 'http://www.wikipedia.org/',
		'timeout': 'sdsdds'
	};

// some bad urls
var options12 = {
		'url': 23233
	},
	options13 = {
		'url': '2323233'
	},
	options14 = {
		'url': 'this is a testt'
	},
	options15 = {
		'url': 'https://github.com/jshemas/notOpenGraphScraper'
	};

// test getting only open graph tags
var options16 = {
	'url': 'http://www.wikipedia.org/',
	'onlyGetOpenGraphInfo': true
};

// test getting the description from meta tags
var options17 = {
	'url': 'https://twitter.com/'
};

// testing 304 page
var options18 = {
	'url': 'http://www.wemeanbusinesslondon.com/blog/2016/5/10/the-entrepreneur-spiration-series-going-nuts-for-pip-nut'
};

// testing all media
var options19 = {
	'url': 'http://ogp.me',
	'allMedia': true
};

// test videos
var optionsYoutube = {
		'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
	},
	optionsTwitch = {
		'url': 'https://www.twitch.tv/warcraft/v/78039967'
	};

// test image
var optionsFlickr = {
		'url': 'https://www.flickr.com/photos/travelgraph/18791678505/in/gallery-flickr-72157663638192642/'
	};

// test twitter tags
var optionTwitter = {
		'url': 'https://dev.twitter.com/'
	};

// test OG and twitter tags
var optionsGithub = {
		'url': 'https://github.com'
	},
	optionsAtom = {
		'url': 'https://atom.io'
	};

// test charset utf-8
var optionCharset1 = {
		'url': 'http://ogp.me/',
		'withCharset': true
	};

// test charset windows-1251
var optionCharset2 = {
		'url': 'http://www.gazeta.ru/',
		'encoding': null,
		'withCharset': true
	};

describe('GET OG', function () {
	this.timeout(10000); // should wait at least ten seconds before failing
	it('Valid Call - ogp.me should return open graph data', function (done) {
		app(options1, function (err, result, source) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('Open Graph protocol');
			expect(result.data.ogType).to.be('website');
			expect(result.data.ogUrl).to.be('http://ogp.me/');
			expect(result.data.ogDescription).to.be('The Open Graph protocol enables any web page to become a rich object in a social graph.');
			expect(result.data.ogImage.url).to.be('http://ogp.me/logo.png');
			expect(result.data.ogImage.width).to.be('300');
			expect(result.data.ogImage.height).to.be('300');
			expect(result.data.ogImage.type).to.be('image/png');
			expect(source.length > 0).to.be(true);
			done();
		});
	});
	it('Valid Call - http', function (done) {
		app(options2, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('Wikipedia');
			done();
		});
	});
	it('Valid Call - https', function (done) {
		app(options3, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('Wikipedia');
			done();
		});
	});
	it('Valid Call - no protocol', function (done) {
		app(options4, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('Wikipedia');
			done();
		});
	});
	it('Valid Call - no protocol and no wwww', function (done) {
		app(options5, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('Wikipedia');
			done();
		});
	});
	it('Valid Call - protocol with no wwww', function (done) {
		app(options6, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('Wikipedia');
			done();
		});
	});
	it('Invalid Call - fake page', function (done) {
		app(options7, function (err, result) {
			expect(err).to.be(true);
			expect(result.success).to.be(false);
			expect(result.err).to.be('Page Not Found');
			done();
		});
	});
	it('Invalid Call - empty url', function (done) {
		app(optionsNoUrl, function (err, result) {
			expect(err).to.be(true);
			expect(result.success).to.be(false);
			expect(result.err).to.be('Invalid URL');
			done();
		});
	});
	it('Invalid Call - empty options', function (done) {
		app(optionsEmpty, function (err, result) {
			expect(err).to.be(true);
			expect(result.err).to.be('Invalid URL');
			expect(result.success).to.be(false);
			done();
		});
	});
	it('Valid Call - timeout set to 2000', function (done) {
		app(options8, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('Wikipedia');
			done();
		});
	});
	it('Valid Call - timeout set to empty string', function (done) {
		app(options9, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('Wikipedia');
			done();
		});
	});
	it('Valid Call - timeout number is a string', function (done) {
		app(options10, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('Wikipedia');
			done();
		});
	});
	it('Valid Call - time is just a string of chars', function (done) {
		app(options11, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('Wikipedia');
			done();
		});
	});
	it('Invalid Call - url is just a number', function (done) {
		app(options12, function (err, result) {
			expect(err).to.be(true);
			expect(result.success).to.be(false);
			expect(result.err).to.be('Page Not Found');
			done();
		});
	});
	it('Invalid Call - url is a string of numbers', function (done) {
		app(options13, function (err, result) {
			expect(err).to.be(true);
			expect(result.success).to.be(false);
			expect(result.err).to.be('Page Not Found');
			done();
		});
	});
	it('Invalid Call - url is a string of words', function (done) {
		app(options14, function (err, result) {
			expect(err).to.be(true);
			expect(result.success).to.be(false);
			expect(result.err).to.be('Page Not Found');
			done();
		});
	});
	it('Invalid Call - response code is 404', function (done) {
		app(options15, function (err, result) {
			expect(err).to.be(true);
			expect(result.success).to.be(false);
			expect(result.err).to.be('Page Not Found');
			done();
		});
	});
	it('Valid Call - only get open graph info', function (done) {
		app(options16, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data).to.be.empty();
			done();
		});
	});
	it('Valid Call - test getting the description from meta tags', function (done) {
		app(options17, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('Twitter. It\'s what\'s happening.');
			expect(result.data.ogDescription).to.be('From breaking news and entertainment to sports and politics, get the full story with all the live commentary.');
			done();
		});
	});
	it('Valid Call - testing 304 page', function (done) {
		app(options18, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('The Entrepreneur-spiration Series: Going nuts for Pip & Nut');
			done();
		});
	});
	it('Valid Call - should contain array of images', function (done) {
		app(options19, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogImage[0].url).to.be('http://ogp.me/logo.png');
			expect(result.data.ogImage[0].width).to.be('300');
			expect(result.data.ogImage[0].height).to.be('300');
			expect(result.data.ogImage[0].type).to.be('image/png');
			done();
		});
	});
	it('Valid Call - Test Youtube Video - Should Return correct Open Graph Info', function (done) {
		app(optionsYoutube, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogSiteName).to.be('YouTube');
			expect(result.data.ogTitle).to.be('Rick Astley - Never Gonna Give You Up');
			expect(result.data.ogUrl).to.be('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
			expect(result.data.ogDescription).to.be('Rick Astley - Never Gonna Give You Up (Official Music Video) - Listen On Spotify: http://smarturl.it/AstleySpotify Download Rick\'s Number 1 album "50" - http...');
			expect(result.data.ogType).to.be('video');
			expect(result.data.ogImage.url).to.be('https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg');
			expect(result.data.ogVideo.url).to.be('https://www.youtube.com/embed/dQw4w9WgXcQ');
			expect(result.data.ogVideo.type).to.be('text/html');
			expect(result.data.ogVideo.width).to.be('1280');
			expect(result.data.ogVideo.height).to.be('720');
			done();
		});
	});
	it('Valid Call - Test Twitch.tv Video - Should Return correct Open Graph Info', function (done) {
		app(optionsTwitch, function (err, result) {
			// console.log('result', result);
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogSiteName).to.be('Twitch');
			expect(result.data.ogType).to.be('video');
			expect(result.data.ogImage.url).to.be('https://static-cdn.jtvnw.net/s3_vods/294d4c5c42_warcraft_22339636096_485121236/thumb/thumb0-480x320.jpg');
			expect(result.data.ogVideo.url).to.be('http://player.twitch.tv/?video=v78039967&player=facebook');
			expect(result.data.ogVideo.type).to.be('text/html');
			expect(result.data.ogVideo.width).to.be('620');
			expect(result.data.ogVideo.height).to.be('378');
			done();
		});
	});
	it('Valid Call - Test Flickr Image - Should Return correct Open Graph Info', function (done) {
		app(optionsFlickr, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogSiteName).to.be('Flickr');
			expect(result.data.ogTitle).to.be('Heimgarten');
			expect(result.data.ogUrl).to.be('https://www.flickr.com/photos/travelgraph/18791678505/');
			expect(result.data.ogType).to.be('flickr_photos:photo');
			expect(result.data.ogImage.url).to.be('https://c1.staticflickr.com/1/499/18791678505_5886fefcf7_b.jpg');
			expect(result.data.ogImage.width).to.be('1024');
			expect(result.data.ogImage.height).to.be('375');
			done();
		});
	});
	it('Valid Call - Test Twitter Tags - Should Return correct Open Graph Info + Some Twitter Info - Twitter Site', function (done) {
		app(optionTwitter, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.twitterTitle).to.be('Twitter Developers');
			expect(result.data.twitterCard).to.be('summary');
			expect(result.data.twitterDescription).to.be('The Twitter platform connects your website or application with the worldwide conversation happening on Twitter.');
			expect(result.data.twitterImage.url).to.be('https://ton.twimg.com/dtc/63872735-d8f2-4570-a7d3-b5876a62cb00/_static/imgs/twitterdev_gear.png');
			expect(result.data.ogSiteName).to.be('Twitter Developers');
			expect(result.data.ogTitle).to.be('Twitter Developers');
			expect(result.data.ogUrl).to.be('https://dev.twitter.com/');
			expect(result.data.ogType).to.be('website');
			expect(result.data.ogImage.url).to.be('https://ton.twimg.com/dtc/63872735-d8f2-4570-a7d3-b5876a62cb00/_static/imgs/twitterdev_gear.png');
			done();
		});
	});
	it('Valid Call - Test Twitter Tags - Should Return correct Open Graph Info + Some Twitter Info - Github Site', function (done) {
		app(optionsGithub, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogUrl).to.be('https://github.com');
			expect(result.data.ogSiteName).to.be('GitHub');
			expect(result.data.ogTitle).to.be('Build software better, together');
			expect(result.data.ogDescription).to.be('GitHub is where people build software. More than 18 million people use GitHub to discover, fork, and contribute to over 47 million projects.');
			expect(result.data.ogImage.url).to.be('https://assets-cdn.github.com/images/modules/open_graph/github-logo.png');
			expect(result.data.ogImage.width).to.be('1200');
			expect(result.data.ogImage.height).to.be('1200');
			expect(result.data.ogImage.type).to.be('image/png');
			expect(result.data.twitterSite).to.be('github');
			expect(result.data.twitterSiteId).to.be('13334762');
			expect(result.data.twitterCreator).to.be('github');
			expect(result.data.twitterCreatorId).to.be('13334762');
			expect(result.data.twitterCard).to.be('summary_large_image');
			expect(result.data.twitterTitle).to.be('GitHub');
			expect(result.data.twitterDescription).to.be('GitHub is where people build software. More than 18 million people use GitHub to discover, fork, and contribute to over 47 million projects.');
			expect(result.data.twitterImage.url).to.be('https://assets-cdn.github.com/images/modules/open_graph/github-logo.png');
			expect(result.data.twitterImage.width).to.be('1200');
			expect(result.data.twitterImage.height).to.be('1200');
			expect(result.data.twitterImage.alt).to.be(null);
			done();
		});
	});
	it('Valid Call - Test Twitter Tags - Should Return correct Open Graph Info + Some Twitter Info - Atom Site', function (done) {
		app(optionsAtom, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogUrl).to.be('https://atom.io/');
			expect(result.data.ogSiteName).to.be('Atom');
			expect(result.data.ogTitle).to.be('A hackable text editor for the 21st Century');
			expect(result.data.ogDescription).to.be('At GitHub, we’re building the text editor we’ve always wanted: hackable to the core, but approachable on the first day without ever touching a config file. We can’t wait to see what you build with it.');
			expect(result.data.ogType).to.be('website');
			expect(result.data.twitterCard).to.be('summary_large_image');
			expect(result.data.twitterSite).to.be('@AtomEditor');
			expect(result.data.twitterCreator).to.be('@github');
			expect(result.data.twitterTitle).to.be('Atom');
			expect(result.data.twitterDescription).to.be('A hackable text editor for the 21st Century');
			expect(result.data.ogImage.url).to.be('http://og.github.com/atom-mark/atom-mark@1200x630.png');
			expect(result.data.ogImage.width).to.be('1200');
			expect(result.data.ogImage.height).to.be('630');
			expect(result.data.ogImage.type).to.be(null);
			expect(result.data.twitterImage.url).to.be('http://og.github.com/atom-logo/atom-logo@1200x630.png');
			expect(result.data.twitterImage.width).to.be('1200');
			expect(result.data.twitterImage.height).to.be('630');
			expect(result.data.twitterImage.alt).to.be(null);
			done();
		});
	});
	it('Valid Call - Utf-8 charset - Should Return correct Open Graph Info + charset info', function (done) {
		app(optionCharset1, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.charset).to.be('utf8');
			done();
		});
	});
	it('Valid Call - windows-1251 charset - Should Return correct Open Graph Info + charset info', function (done) {
		app(optionCharset2, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.charset).to.be('windows-1251');
			expect(result.data.ogTitle).to.be('Главные новости - Газета.Ru');
			done();
		});
	});
});
