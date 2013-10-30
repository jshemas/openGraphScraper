var app = require('../app'), 
	request = require('supertest'),
	expect = require('expect.js');

//test url - this has alot of OG info
var url1 = "http://ogp.me/";

//test url formats
var	url2 = "http://www.google.com/",
	url3 = "https://www.google.com/",
	url4 = "www.google.com/",
	url5 = "google.com/",
	url6 = "http://google.com/";

//invaild url
var url7 = "http://testtesttest45656465.com";

//empty value 
var empty = '';

describe('GET - GET OG', function (done) {
	it('Valid call og - url1', function(done) {
		app(url1, function(err, result){
			expect(err).to.be(null);
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url2', function(done) {
		app(url2, function(err, result){
			expect(err).to.be(null);
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url3', function(done) {
		app(url3, function(err, result){
			expect(err).to.be(null);
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url4', function(done) {
		app(url4, function(err, result){
			expect(err).to.be(null);
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url5', function(done) {
		app(url5, function(err, result){
			expect(err).to.be(null);
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Valid call og - url6', function(done) {
		app(url6, function(err, result){
			expect(err).to.be(null);
			expect(result.success).to.be(true);
			done();
		});
	});
	it('Invalid call og - url7', function(done) {
		app(url7, function(err, result){
			expect(result.err).to.be('Page Not Found');
			expect(result.success).to.be(false);
			done();
		});
	});
	it('Invalid get og - empty', function(done) {
		app(empty, function(err, result){
			expect(result.err).to.be('Invalid URL');
			expect(result.success).to.be(false);
			done();
		});
	});
});
