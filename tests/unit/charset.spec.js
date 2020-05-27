const charset = require('../../lib/charset');

describe('charset', function () {
  it('find charset from content-type', function (done) {
    const results = charset({
      'content-type': 'text/html; charset=windows-1251',
    }, '<html><head><title>тестовая страница</title></head><body><h1>привет тестовая страница</h2></body></html>', 1024);

    expect(results).to.eql('windows-1251');

    done();
  });

  it('find charset from Content-Type', function (done) {
    const results = charset({
      'Content-Type': 'text/html; charset=windows-1251',
    }, '<html><head><title>тестовая страница</title></head><body><h1>привет тестовая страница</h2></body></html>', 1024);

    expect(results).to.eql('windows-1251');

    done();
  });

  it('find charset without peeksize', function (done) {
    const results = charset({
      'content-type': 'text/html; charset=windows-1251',
    }, '<html><head><title>тестовая страница</title></head><body><h1>привет тестовая страница</h2></body></html>');

    expect(results).to.eql('windows-1251');

    done();
  });

  it('find charset when its utf-8', function (done) {
    const results = charset({
      'content-type': 'text/html; charset=utf-8',
    }, '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>', 1024);

    expect(results).to.eql('utf8');

    done();
  });

  it('find charset when its not set', function (done) {
    const results = charset({
      'content-type': 'text/html;',
    }, '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>', 1024);

    expect(results).to.eql(null);

    done();
  });

  it('find charset when there is no headers', function (done) {
    const results = charset({}, '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>', 1024);

    expect(results).to.eql(null);

    done();
  });

  it('find charset when headers is nested', function (done) {
    const results = charset({
      headers: { 'content-type': 'text/html; charset=utf-8' },
    }, '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>', 1024);

    expect(results).to.eql('utf8');

    done();
  });
});
