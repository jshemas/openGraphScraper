const charset = require('../../lib/charset');

describe('charset', function () {
  it('find charset from content-type', function () {
    const results = charset.find({
      'content-type': 'text/html; charset=windows-1251',
    }, '<html><head><title>тестовая страница</title></head><body><h1>привет тестовая страница</h2></body></html>', 1024);

    expect(results).to.eql('windows-1251');
  });

  it('find charset from Content-Type', function () {
    const results = charset.find({
      'Content-Type': 'text/html; charset=windows-1251',
    }, '<html><head><title>тестовая страница</title></head><body><h1>привет тестовая страница</h2></body></html>', 1024);

    expect(results).to.eql('windows-1251');
  });

  it('find charset without peeksize', function () {
    const results = charset.find({
      'content-type': 'text/html; charset=windows-1251',
    }, '<html><head><title>тестовая страница</title></head><body><h1>привет тестовая страница</h2></body></html>');

    expect(results).to.eql('windows-1251');
  });

  it('find charset when its utf-8', function () {
    const results = charset.find({
      'content-type': 'text/html; charset=utf-8',
    }, '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>', 1024);

    expect(results).to.eql('utf8');
  });

  it('find charset when its not set', function () {
    const results = charset.find({
      'content-type': 'text/html;',
    }, '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>', 1024);

    expect(results).to.eql(null);
  });

  it('find charset when there is no headers', function () {
    const results = charset.find({}, '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>', 1024);

    expect(results).to.eql(null);
  });

  it('find charset when headers is nested', function () {
    const results = charset.find({
      headers: { 'content-type': 'text/html; charset=utf-8' },
    }, '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>', 1024);

    expect(results).to.eql('utf8');
  });

  it('find charset when there is no data', function () {
    const results = charset.find({
      'content-type': 'text/html; charset=windows-1251',
    }, null, 1024);

    expect(results).to.eql('windows-1251');
  });

  it('find charset when obj param is a sting', function () {
    const results = charset.find('text/html; charset=windows-1251', '<html><head><title>тестовая страница</title></head><body><h1>привет тестовая страница</h2></body></html>', 1024);

    expect(results).to.eql('windows-1251');
  });

  it('find charset when peeksize is small then data', function () {
    const results = charset.find({
      'content-type': 'text/html; charset=windows-1251',
    }, '<html><head><title>тестовая страница</title></head><body><h1>привет тестовая страница</h2></body></html>', 1);

    expect(results).to.eql('windows-1251');
  });
});
