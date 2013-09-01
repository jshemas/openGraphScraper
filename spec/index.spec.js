var request = require('supertest'),
	expect = require('expect.js');
console.log("Starting Tests");

//enter your domain
var baseURL = "http://localhost:8080/";

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

//sometimes error don't show in the log...
//http://stackoverflow.com/questions/8794008/no-stack-trace-for-jasmine-node-errors
process.on('uncaughtException',function(e) {
	console.log("Caught unhandled exception: " + e);
	console.log(" ---> : " + e.stack);
});

describe('GET - GET OG', function (done) {
	it('Valid get og - url1', function(done) {
		request(baseURL)
			.get('getOG?url='+url1)
			.end( function(err, result) {
				expect(result.res.statusCode).to.be(200);
				expect(result.res.body.success).to.be(true);
				done();
			});
	});
	it('Valid get og - url2', function(done) {
		request(baseURL)
			.get('getOG?url='+url2)
			.end( function(err, result) {
				expect(result.res.statusCode).to.be(200);
				expect(result.res.body.success).to.be(true);
				done();
			});
	});
	it('Valid get og - url3', function(done) {
		request(baseURL)
			.get('getOG?url='+url3)
			.end( function(err, result) {
				expect(result.res.statusCode).to.be(200);
				expect(result.res.body.success).to.be(true);
				done();
			});
	});
	it('Valid get og - url4', function(done) {
		request(baseURL)
			.get('getOG?url='+url4)
			.end( function(err, result) {
				expect(result.res.statusCode).to.be(200);
				expect(result.res.body.success).to.be(true);
				done();
			});
	});
	it('Valid get og - url5', function(done) {
		request(baseURL)
			.get('getOG?url='+url5)
			.end( function(err, result) {
				expect(result.res.statusCode).to.be(200);
				expect(result.res.body.success).to.be(true);
				done();
			});
	});
	it('Valid get og - url6', function(done) {
		request(baseURL)
			.get('getOG?url='+url6)
			.end( function(err, result) {
				expect(result.res.statusCode).to.be(200);
				expect(result.res.body.success).to.be(true);
				done();
			});
	});
	it('Invalid get og - url7', function(done) {
		request(baseURL)
			.get('getOG?url='+url7)
			.end( function(err, result) {
				expect(result.res.statusCode).to.be(200);
				expect(result.res.body.success).to.be(false);
				expect(result.res.body.error).to.be('Page Not Found');
				done();
			});
	});
	it('Invalid get og - empty', function(done) {
		request(baseURL)
			.get('getOG?url='+empty)
			.end( function(err, result) {
				expect(result.res.statusCode).to.be(200);
				expect(result.res.body.success).to.be(false);
				expect(result.res.body.error).to.be('Invalid URL');
				done();
			});
	});
});
