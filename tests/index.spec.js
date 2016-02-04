var app = require('../app'),
	expect = require('expect.js');

//test url - this has alot of OG info
var options1 = {
	'url':'http://ogp.me/'
};

//test url formats
var	options2 = {
		'url':'http://www.google.com/'
	},
	options3 = {
		'url':'https://www.google.com/'
	},
	options4 = {
		'url':'www.google.com/'
	},
	options5 = {
		'url':'google.com/'
	},
	options6 = {
		'url':'http://google.com/'
	};

//invaild url
var options7 = {
	'url':'http://testtesttest4564568.com'
};

//empty value
var optionsEmpty = {
	'url':''
};

// test timeout
var options8 = {
		'url':'http://www.google.com/',
		'timeout':2000
	},
	options9 = {
		'url':'http://www.google.com/',
		'timeout':''
	},
	options10 = {
		'url':'http://www.google.com/',
		'timeout':'2000'
	},
	options11 = {
		'url':'http://www.google.com/',
		'timeout':'sdsdds'
	};

// some bad urls
var options12 = {
		'url':23233
	},
	options13 = {
		'url':'2323233'
	},
	options14 = {
		'url':'this is a testt'
	};

//no url
var optionsNoUrl = { };

describe('GET OG', function (done) {
	this.timeout(3000); //shoudl wait atleast 3secs before failing
	it('Valid call og - url1', function(done) {
		app(options1, function(err, result){
			expect(err).to.be(null);
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url2', function(done) {
		app(options2, function(err, result){
			expect(err).to.be(null);
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url3', function(done) {
		app(options3, function(err, result){
			expect(err).to.be(null);
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url4', function(done) {
		app(options4, function(err, result){
			expect(err).to.be(null);
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url5', function(done) {
		app(options5, function(err, result){
			expect(err).to.be(null);
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url6', function(done) {
		app(options6, function(err, result){
			expect(err).to.be(null);
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Invalid call og - url7', function(done) {
		app(options7, function(err, result){
			expect(result.success).to.be(false);
			done();
		});
	});
	it('Invalid get og - empty url', function(done) {
		app(optionsEmpty, function(err, result){
			expect(result.err).to.be('Invalid URL');
			expect(result.success).to.be(false);
			done();
		});
	});
		it('Valid call og - url8', function(done) {
		app(options8, function(err, result){
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url9', function(done) {
		app(options9, function(err, result){
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url10', function(done) {
		app(options10, function(err, result){
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url11', function(done) {
		app(options11, function(err, result){
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url12', function(done) {
		app(options12, function(err, result){
			expect(result.success).to.be(false);
			expect(result.err).to.be('Page Not Found');
			done();
		});
	});
	it('Valid call og - url13', function(done) {
		app(options13, function(err, result){
			expect(result.success).to.be(false);
			expect(result.err).to.be('Page Not Found');
			done();
		});
	});
	it('Valid call og - url14', function(done) {
		app(options14, function(err, result){
			expect(result.success).to.be(false);
			expect(result.err).to.be('Page Not Found');
			done();
		});
	});
	it('Invalid get og - no url', function(done) {
		app(optionsNoUrl, function(err, result){
			expect(result.err).to.be('Invalid URL');
			expect(result.success).to.be(false);
			done();
		});
	});
});
