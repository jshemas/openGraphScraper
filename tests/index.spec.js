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
}

// testing 304 page
var options18 = {
	'url': 'http://www.wemeanbusinesslondon.com/blog/2016/5/10/the-entrepreneur-spiration-series-going-nuts-for-pip-nut'
}

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

describe('GET OG', function () {
	this.timeout(10000); // should wait at least ten seconds before failing
	it('Valid Call - ogp.me should return open graph data', function (done) {
		app(options1, function (err, result) {
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
			expect(result.data.ogTitle).to.be('Twitter');
			expect(result.data.ogDescription).to.be('Connect with your friends &#8212; and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.');
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
	it('Valid Call - Test Youtube Video - Should Return correct Open Graph Info', function (done) {
		app(optionsYoutube, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogSiteName).to.be('YouTube');
			expect(result.data.ogTitle).to.be('Rick Astley - Never Gonna Give You Up');
			expect(result.data.ogUrl).to.be('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
			expect(result.data.ogDescription).to.be('Music video by Rick Astley performing Never Gonna Give You Up. YouTube view counts pre-VEVO: 2,573,462 (C) 1987 PWL');
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
			expect(result.data.ogType).to.be('video.other');
			expect(result.data.ogImage.url).to.be('https://static-cdn.jtvnw.net/v1/AUTH_system/vods_1138/warcraft_22339636096_485121236/thumb/thumb0-480x320.jpg');
			expect(result.data.ogVideo.url).to.be('http://www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf?videoId=v78039967&playerType=facebook');
			expect(result.data.ogVideo.type).to.be('application/x-shockwave-flash');
			expect(result.data.ogVideo.width).to.be('620');
			expect(result.data.ogVideo.height).to.be('378');
			done();
		});
	});
	it('Valid Call - Test Flickr Image - Should Return correct Open Graph Info', function (done) {
		app(optionsFlickr, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogSiteName).to.be('Flickr - Photo Sharing!');
			expect(result.data.ogTitle).to.be('Heimgarten');
			expect(result.data.ogUrl).to.be('https://www.flickr.com/photos/travelgraph/18791678505/');
			expect(result.data.ogType).to.be('flickr_photos:photo');
			expect(result.data.ogImage.url).to.be('https://c1.staticflickr.com/1/499/18791678505_5886fefcf7_b.jpg');
			expect(result.data.ogImage.width).to.be('1024');
			expect(result.data.ogImage.height).to.be('375');
			done();
		});
	});
	it('Valid Call - Test Twitter Tags - Should Return correct Open Graph Info + Some Twitter Info', function (done) {
		app(optionTwitter, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.twitterTitle).to.be('Twitter Developers');
			expect(result.data.twitterCard).to.be('summary');
			expect(result.data.twitterDescription).to.be('The Twitter platform connects your website or application with the worldwide conversation happening on Twitter.');
			expect(result.data.ogSiteName).to.be('Twitter Developers');
			expect(result.data.ogTitle).to.be('Twitter Developers');
			expect(result.data.ogUrl).to.be('https://dev.twitter.com/');
			expect(result.data.ogType).to.be('website');
			expect(result.data.ogImage.url).to.be('https://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3.png');
			expect(result.data.twitterImage.url).to.be('https://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3.png');
			expect(result.data.twitterImage.width).to.be('500');
			expect(result.data.twitterImage.height).to.be('500');
			done();
		});
	});
});
