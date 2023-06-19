import { expect } from 'chai';
import { load } from 'cheerio';

import ogs from '../../index';

describe('fetch', function () {
  // TODO: Site keeps going offline, will need to find a new site
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('setting the fetch headers', function () {
    // userAgent is undici by default
    const userAgent = 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.5563.57 Mobile Safari/537.36';
    return ogs({ url: 'https://www.whatsmyua.info/', fetchOptions: { headers: { 'user-agent': userAgent } } })
      .then(async function ({
        error, result, response, html,
      }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('What\'s my user agent?');
        expect(result.ogDescription).to.be.eql('Detect user-agent, operating system, browser, and device using several libraries, including ua-parser, ua-parser-js, and platform.');
        expect(result.requestUrl).to.be.eql('https://www.whatsmyua.info/');
        expect(result.charset).to.be.eql('utf-8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogTitle',
          'ogDescription',
          'requestUrl',
          'charset',
          'success',
        );
        expect(response).to.be.an('Response');
        const $ = load(html || '');
        const rawUa = $('li#rawUa').text();
        expect(rawUa).to.be.eql(`rawUa: ${userAgent}`);
      });
  });
  it('setting a timeout', function () {
    return ogs({ url: 'https://releases.ubuntu.com/23.04/ubuntu-23.04-desktop-amd64.iso', timeout: 3 })
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('https://releases.ubuntu.com/23.04/ubuntu-23.04-desktop-amd64.iso');
        expect(result.error).to.eql('The operation was aborted due to timeout');
        expect(result.errorDetails.toString()).to.eql('Error: The operation was aborted due to timeout');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
  // https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('setting a timeout - using AbortSignal.timeout()', function () {
    return ogs({ url: 'https://releases.ubuntu.com/23.04/ubuntu-23.04-desktop-amd64.iso', fetchOptions: { signal: AbortSignal.timeout(3000) } })
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('https://releases.ubuntu.com/23.04/ubuntu-23.04-desktop-amd64.iso');
        expect(result.error).to.eql('The operation was aborted due to timeout');
        expect(result.errorDetails.toString()).to.eql('Error: The operation was aborted due to timeout');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
  // https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/abort
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('setting a timeout - using controller.abort()', function () {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 3000);
    return ogs({ url: 'https://releases.ubuntu.com/23.04/ubuntu-23.04-desktop-amd64.iso', fetchOptions: { signal: controller.signal } })
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('https://releases.ubuntu.com/23.04/ubuntu-23.04-desktop-amd64.iso');
        expect(result.error).to.eql('The operation was aborted due to timeout');
        expect(result.errorDetails.toString()).to.eql('Error: The operation was aborted due to timeout');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
});
