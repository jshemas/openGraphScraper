import { expect } from 'chai';

/* eslint-disable mocha/no-setup-in-describe */
import {
  findImageTypeFromUrl,
  isCustomMetaTagsValid,
  isImageTypeValid,
  isThisANonHTMLUrl,
  optionSetup,
  removeNestedUndefinedValues,
  unescapeScriptText,
  validateAndFormatURL,
} from '../../lib/utils';

const validateUrl = (urls, valid, message, urlValidatorSettings) => {
  for (let index = 0; index < urls.length; index += 1) {
    // eslint-disable-next-line no-loop-func
    it(`${urls[index]} ${message}`, function () {
      const formattedUrl = validateAndFormatURL(urls[index], urlValidatorSettings);
      if (valid) {
        return expect(formattedUrl.url).to.not.be.eql(null);
      }
      return expect(formattedUrl.url).to.be.eql(null);
    });
  }
};

describe('utils', function () {
  describe('validateAndFormatURL', function () {
    context('validing URLs', function () {
      const defaultUrlValidatorSettings = {
        allow_fragments: true,
        allow_protocol_relative_urls: false,
        allow_query_components: true,
        allow_trailing_dot: false,
        allow_underscores: false,
        protocols: ['http', 'https'],
        require_host: true,
        require_port: false,
        require_protocol: false,
        require_tld: true,
        require_valid_protocol: true,
        validate_length: true,
      };

      validateUrl([
        'foobar.com',
        'foobar.com/',
        'http://[::192.9.5.5]/ipng',
        'http://[::FFFF:129.144.52.38]:80/index.html',
        'http://[1080::8:800:200C:417A]/foo',
        'http://[1080:0:0:0:8:800:200C:417A]/index.html',
        'http://[2010:836B:4179::836B:4179]',
        'http://[3ffe:2a00:100:7031::1]',
        'http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html',
        'http://10.0.0.0/',
        'http://127.0.0.1/',
        'http://189.123.14.13/',
        'http://duckduckgo.com/?q=%2F',
        'http://example.com/example.json#/foo/bar',
        'http://foo--bar.com',
        'http://foobar.com?foo=bar',
        'http://foobar.com/?foo=bar#baz=qux',
        'http://foobar.com/t$-_.+!*\'(),',
        'http://foobar.com#baz=qux',
        'http://høyfjellet.no',
        'http://user:@www.foobar.com/',
        'http://user:pass@www.foobar.com/',
        'http://www.foobar.com:23/',
        'http://www.foobar.com:5/',
        'http://www.foobar.com:65535/',
        'http://www.foobar.com/',
        'HTTP://WWW.FOOBAR.COM/',
        'http://www.foobar.com/~foobar',
        'http://www.xn--froschgrn-x9a.net/',
        'http://xn------eddceddeftq7bvv7c4ke4c.xn--p1ai',
        'http://xn--froschgrn-x9a.com/',
        'http://xn--j1aac5a4g.xn--j1amh',
        'http://кулік.укр',
        'https://www.foobar.com/',
        'https://www.foobar.com/',
        'HTTPS://WWW.FOOBAR.COM/',
        'test.com?ref=http://test2.com',
        'valid.au',
        'www.foobar.com',
      ], true, 'should be valid', defaultUrlValidatorSettings);

      validateUrl([
        '!.foo.com',
        '.com',
        '',
        '*.foo.com',
        '////foobar.com',
        '//foobar.com',
        'ftp://www.foobar.com/',
        'http://*.foo.com',
        'http:////foobar.com',
        'http://\n@www.foobar.com/',
        'http://300.0.0.1/',
        'http://com/',
        'http://example.com.',
        'http://foobar/ lol/',
        'http://foobar/? lol',
        'http://foobar/# lol',
        'http://localhost:3000/',
        'http://localhost:61500this is an invalid url!!!!',
        'http://lol @foobar.com/',
        'http://lol: @foobar.com/',
        'http://lol:lol @foobar.com/',
        'http://lol:lol:lol@foobar.com/',
        'http://www.-foobar.com/',
        'http://www.foo_bar.com/',
        'http://www.foobar-.com/',
        'http://www.foobar.com:0/',
        'http://www.foobar.com:70000/',
        'http://www.foobar.com:99999/',
        'http://www.foobar.com/\t',
        'http://www.xn--.com/',
        'http://xn--.com/',
        'https://example.com/foo/<script>alert(\'XSS\')</script>/',
        'invalid.',
        'invalid.x',
        'invalid/',
        'mailto:foo@bar.com',
        'rtmp://foobar.com',
        'xyz://foobar.com',
        `http://foobar.com/${new Array(2083).join('f')}`,
      ], false, 'should be invalid', defaultUrlValidatorSettings);
    });

    context('validing URLs with options.urlValidatorSettings (https is invalid)', function () {
      const noHTTPSUrlValidatorSettings = {
        allow_fragments: true,
        allow_protocol_relative_urls: false,
        allow_query_components: true,
        allow_trailing_dot: false,
        allow_underscores: false,
        protocols: ['http'],
        require_host: true,
        require_port: false,
        require_protocol: false,
        require_tld: true,
        require_valid_protocol: true,
        validate_length: true,
      };

      validateUrl([
        'http://www.foobar.com/',
        'http://www.foobar.com/',
        'HTTP://WWW.FOOBAR.COM/',
      ], true, 'should be valid', noHTTPSUrlValidatorSettings);

      validateUrl([
        'https://www.foobar.com/',
        'https://www.foobar.com/',
        'HTTPS://WWW.FOOBAR.COM/',
      ], false, 'should be invalid', noHTTPSUrlValidatorSettings);
    });
  });

  describe('findImageTypeFromUrl', function () {
    it('foobar.com/image.png?test=true', function () {
      const type = findImageTypeFromUrl('foobar.com/image.png?test=true');
      expect(type).to.eql('png');
    });

    it('foobar.com/image.png', function () {
      const type = findImageTypeFromUrl('foobar.com/image.png');
      expect(type).to.eql('png');
    });

    it('image.png', function () {
      const type = findImageTypeFromUrl('image.png');
      expect(type).to.eql('png');
    });

    it('image', function () {
      const type = findImageTypeFromUrl('image');
      expect(type).to.eql('image');
    });

    it('empty string', function () {
      const type = findImageTypeFromUrl('');
      expect(type).to.eql('');
    });
  });

  describe('isImageTypeValid', function () {
    it('when type is png', function () {
      const valid = isImageTypeValid('png');
      expect(valid).to.eql(true);
    });

    it('when type is foo', function () {
      const valid = isImageTypeValid('foo');
      expect(valid).to.eql(false);
    });
  });

  describe('isThisANonHTMLUrl', function () {
    it('when url is type .png', function () {
      const valid = isThisANonHTMLUrl('www.foo.com/bar.png');
      expect(valid).to.eql(true);
    });

    it('when url is type .html', function () {
      const valid = isThisANonHTMLUrl('www.foo.com/bar.html');
      expect(valid).to.eql(false);
    });

    it('when url is type .pdf and has params', function () {
      const valid = isThisANonHTMLUrl('www.foo.com/bar.pdf?123');
      expect(valid).to.eql(true);
    });

    it('when domain in url contains a non HTML string (.txt)', function () {
      const valid = isThisANonHTMLUrl('www.txt.com/bar.html');
      expect(valid).to.eql(false);
    });

    it('when domain in url contains a non HTML string (.mov) no extension on path', function () {
      const valid = isThisANonHTMLUrl('www.mov.com/bar');
      expect(valid).to.eql(false);
    });
  });

  describe('removeNestedUndefinedValues', function () {
    it('when there is no undef values', function () {
      const object = removeNestedUndefinedValues({ one: 1 });
      expect(object).to.eql({ one: 1 });
    });

    it('when there is undef values', function () {
      const object = removeNestedUndefinedValues({ one: 1, two: undefined });
      expect(object).to.eql({ one: 1 });
    });

    it('when there is a nested undef value', function () {
      const object = removeNestedUndefinedValues({ one: 1, two: { three: undefined } });
      expect(object).to.eql({ one: 1, two: {} });
    });
  });

  describe('optionSetup', function () {
    it('when passing nothing into optionSetup', function () {
      const { options } = optionSetup({});
      expect(options).to.eql({ onlyGetOpenGraphInfo: false });
    });

    it('when passing onlyGetOpenGraphInfo into optionSetup', function () {
      const { options } = optionSetup({ onlyGetOpenGraphInfo: true });
      expect(options).to.eql({ onlyGetOpenGraphInfo: true });
    });
  });

  describe('isCustomMetaTagsValid', function () {
    it('when passing a valid custom tag into isCustomMetaTagsValid', function () {
      const response = isCustomMetaTagsValid([{
        multiple: false,
        property: 'foo',
        fieldName: 'fooTag',
      }]);
      expect(response).to.eql(true);
    });

    it('when passing a enpty array into isCustomMetaTagsValid', function () {
      const response = isCustomMetaTagsValid([]);
      expect(response).to.eql(true);
    });

    it('when passing a custom tag missing property into isCustomMetaTagsValid', function () {
      // @ts-ignore
      const response = isCustomMetaTagsValid([{
        multiple: false,
        fieldName: 'fooTag',
      }]);
      expect(response).to.eql(false);
    });

    it('when passing a custom tag invalid property into isCustomMetaTagsValid', function () {
      const response = isCustomMetaTagsValid([{
        multiple: false,
        property: 'foo',
        // @ts-ignore
        fieldName: true,
      }]);
      expect(response).to.eql(false);
    });

    it('when passing a valid and invalid custom tag into isCustomMetaTagsValid', function () {
      // @ts-ignore
      const response = isCustomMetaTagsValid([{
        multiple: false,
        property: 'foo',
      }, {
        multiple: false,
        property: 'foo',
        fieldName: 'fooTag',
      }]);
      expect(response).to.eql(false);
    });

    it('when passing a invalid array into isCustomMetaTagsValid', function () {
      // @ts-ignore
      const response = isCustomMetaTagsValid(['foo', 'bar']);
      expect(response).to.eql(false);
    });
  });

  describe('unescapeScriptText', function () {
    it('is needed because `JSON.parse()` is not able to parse string with \\xHH', function () {
      expect(JSON.parse('"\\u2611"')).to.eql('☑');
      expect(() => {
        JSON.parse('"\\x26"');
      }).to.throw(SyntaxError);
    });

    it('should unescape script text', function () {
      expect(unescapeScriptText('"\\x27"')).to.eql('"\'"');
      expect(unescapeScriptText('"\\x26"')).to.eql('"&"');
      expect(unescapeScriptText('"\\x22"')).to.eql('"\\""');
    });
  });
});
