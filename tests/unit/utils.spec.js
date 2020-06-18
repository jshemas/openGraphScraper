const utils = require('../../lib/utils');

const validateUrl = (urls, valid, message) => {
  for (let index = 0; index < urls.length; index += 1) {
    // eslint-disable-next-line no-loop-func
    it(`${urls[index]} ${message}`, function () {
      const validate = utils.validate(urls[index], 2000);
      if (valid) {
        return expect(validate.returnInputUrl).to.not.be.empty;
      }
      return expect(validate.returnInputUrl).to.be.eql(null);
    });
  }
};

describe('validate utils', function () {
  context('validing URLs', function () {
    validateUrl([
      'foobar.com',
      'www.foobar.com',
      'foobar.com/',
      'valid.au',
      'http://www.foobar.com/',
      'HTTP://WWW.FOOBAR.COM/',
      'https://www.foobar.com/',
      'HTTPS://WWW.FOOBAR.COM/',
      'http://www.foobar.com:23/',
      'http://www.foobar.com:65535/',
      'http://www.foobar.com:5/',
      'https://www.foobar.com/',
      'ftp://www.foobar.com/',
      'http://www.foobar.com/~foobar',
      'http://user:pass@www.foobar.com/',
      'http://user:@www.foobar.com/',
      'http://127.0.0.1/',
      'http://10.0.0.0/',
      'http://189.123.14.13/',
      'http://duckduckgo.com/?q=%2F',
      'http://foobar.com/t$-_.+!*\'(),',
      'http://foobar.com/?foo=bar#baz=qux',
      'http://foobar.com?foo=bar',
      'http://foobar.com#baz=qux',
      'http://www.xn--froschgrn-x9a.net/',
      'http://xn--froschgrn-x9a.com/',
      'http://foo--bar.com',
      'http://høyfjellet.no',
      'http://xn--j1aac5a4g.xn--j1amh',
      'http://xn------eddceddeftq7bvv7c4ke4c.xn--p1ai',
      'http://кулік.укр',
      'test.com?ref=http://test2.com',
      'http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html',
      'http://[1080:0:0:0:8:800:200C:417A]/index.html',
      'http://[3ffe:2a00:100:7031::1]',
      'http://[1080::8:800:200C:417A]/foo',
      'http://[::192.9.5.5]/ipng',
      'http://[::FFFF:129.144.52.38]:80/index.html',
      'http://[2010:836B:4179::836B:4179]',
      'http://example.com/example.json#/foo/bar',
    ], true, 'should be valid');

    validateUrl([
      'http://localhost:3000/',
      '//foobar.com',
      'xyz://foobar.com',
      'invalid/',
      'invalid.x',
      'invalid.',
      '.com',
      'http://com/',
      'http://300.0.0.1/',
      'mailto:foo@bar.com',
      'rtmp://foobar.com',
      'http://www.xn--.com/',
      'http://xn--.com/',
      'http://www.foobar.com:0/',
      'http://www.foobar.com:70000/',
      'http://www.foobar.com:99999/',
      'http://www.-foobar.com/',
      'http://www.foobar-.com/',
      'http://foobar/# lol',
      'http://foobar/? lol',
      'http://foobar/ lol/',
      'http://lol @foobar.com/',
      'http://lol:lol @foobar.com/',
      'http://lol:lol:lol@foobar.com/',
      'http://lol: @foobar.com/',
      'http://www.foo_bar.com/',
      'http://www.foobar.com/\t',
      'http://\n@www.foobar.com/',
      '',
      `http://foobar.com/${new Array(2083).join('f')}`,
      'http://*.foo.com',
      '*.foo.com',
      '!.foo.com',
      'http://example.com.',
      'http://localhost:61500this is an invalid url!!!!',
      '////foobar.com',
      'http:////foobar.com',
      'https://example.com/foo/<script>alert(\'XSS\')</script>/',
    ], false, 'should be invalid');
  });

  context('validing Timeouts', function () {
    it('time out is 2000', function () {
      const validate = utils.validate('foobar.com', 2000);
      expect(validate.returnInputTimeout).to.eql(2000);
    });
    it('timeout is under 2000', function () {
      const validate = utils.validate('foobar.com', 1000);
      expect(validate.returnInputTimeout).to.eql(1000);
    });
    it('timeout is above 2000', function () {
      const validate = utils.validate('foobar.com', 3000);
      expect(validate.returnInputTimeout).to.eql(3000);
    });
    it('timeout is a string', function () {
      const validate = utils.validate('foobar.com', '123');
      expect(validate.returnInputTimeout).to.eql(2000);
    });
    it('timeout is a bool', function () {
      const validate = utils.validate('foobar.com', true);
      expect(validate.returnInputTimeout).to.eql(2000);
    });
    it('timeout is empty string', function () {
      const validate = utils.validate('foobar.com', '');
      expect(validate.returnInputTimeout).to.eql(2000);
    });
    it('timeout is missing', function () {
      const validate = utils.validate('foobar.com');
      expect(validate.returnInputTimeout).to.eql(2000);
    });
  });
});

describe('findImageTypeFromUrl', function () {
  it('foobar.com/image.png?test=true', function () {
    const type = utils.findImageTypeFromUrl('foobar.com/image.png?test=true');
    expect(type).to.eql('png');
  });
  it('foobar.com/image.png', function () {
    const type = utils.findImageTypeFromUrl('foobar.com/image.png');
    expect(type).to.eql('png');
  });
  it('image.png', function () {
    const type = utils.findImageTypeFromUrl('image.png');
    expect(type).to.eql('png');
  });
  it('image', function () {
    const type = utils.findImageTypeFromUrl('image');
    expect(type).to.eql('image');
  });
});

describe('isImageTypeValid', function () {
  it('when type is png', function () {
    const valid = utils.isImageTypeValid('png');
    expect(valid).to.eql(true);
  });
  it('when type is foo', function () {
    const valid = utils.isImageTypeValid('foo');
    expect(valid).to.eql(false);
  });
});
