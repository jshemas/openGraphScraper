var app = require('../app'), 
	request = require('supertest'),
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
	'url':'http://testtesttest45656468.com'
};

//empty value 
var optionsEmpty = {
	'url':''
};

describe('GET - GET OG', function (done) {
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
			expect(result.err).to.be('Page Not Found');
			expect(result.success).to.be(false);
			done();
		});
	});
	it('Invalid get og - empty', function(done) {
		app(optionsEmpty, function(err, result){
			expect(result.err).to.be('Invalid URL');
			expect(result.success).to.be(false);
			done();
		});
	});
});
