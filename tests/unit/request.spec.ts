import { expect } from 'chai';
import sinon from 'sinon';
import undici = require('undici');
import requestAndResultsFormatter from '../../lib/request';

const sandbox = sinon.createSandbox();

describe('request and results formatter', function () {
  afterEach(function () {
    sandbox.restore();
  });

  it('returns a redirect response when redirect mode is manual', async function () {
    const fetchStub = sandbox.stub(undici, 'fetch').resolves(new Response('redirect body', {
      status: 302,
      headers: { location: 'http://8.8.8.8/next' },
    }));

    const { response } = await requestAndResultsFormatter({
      url: 'http://1.1.1.1',
      fetchOptions: { redirect: 'manual' },
    });

    expect(response.status).to.equal(302);
    expect(fetchStub.calledOnce).to.equal(true);
  });

  it('rejects redirects when redirect mode is error', async function () {
    sandbox.stub(undici, 'fetch').resolves(new Response('', {
      status: 302,
      headers: { location: 'http://8.8.8.8/next' },
    }));

    let error: Error | undefined;
    try {
      await requestAndResultsFormatter({
        url: 'http://1.1.1.1',
        fetchOptions: { redirect: 'error' },
      });
    } catch (caught) {
      error = caught as Error;
    }

    expect(error?.message).to.equal('Request was redirected');
  });

  it('follows cross-origin POST redirects without forwarding sensitive headers or the body', async function () {
    const fetchStub = sandbox.stub(undici, 'fetch');
    fetchStub.onFirstCall().resolves(new Response('', {
      status: 302,
      headers: { location: 'https://8.8.8.8/next' },
    }));
    fetchStub.onSecondCall().resolves(new Response('<html><body>ok</body></html>'));

    await requestAndResultsFormatter({
      url: 'http://1.1.1.1',
      fetchOptions: {
        method: 'POST',
        body: 'request body',
        headers: {
          authorization: 'secret',
          cookie: 'session=secret',
          cookie2: 'legacy=secret',
          host: '1.1.1.1',
          'proxy-authorization': 'proxy-secret',
          'content-type': 'text/plain',
          'x-custom-header': 'retained',
        },
      },
    });

    expect(fetchStub.calledTwice).to.equal(true);
    const secondOptions = fetchStub.secondCall.args[1];
    const headers = new Headers(secondOptions?.headers);
    expect(secondOptions?.method).to.equal('GET');
    expect(secondOptions?.body).to.equal(undefined);
    [
      'authorization',
      'cookie',
      'cookie2',
      'host',
      'proxy-authorization',
      'content-type',
    ].forEach((header) => expect(headers.has(header), header).to.equal(false));
    expect(headers.get('x-custom-header')).to.equal('retained');
  });

  it('changes non-GET and non-HEAD methods to GET for 303 redirects', async function () {
    const fetchStub = sandbox.stub(undici, 'fetch');
    fetchStub.onFirstCall().resolves(new Response('', {
      status: 303,
      headers: { location: '/next' },
    }));
    fetchStub.onSecondCall().resolves(new Response('<html><body>ok</body></html>'));

    await requestAndResultsFormatter({
      url: 'http://1.1.1.1',
      fetchOptions: { method: 'PUT', body: 'request body' },
    });

    const secondOptions = fetchStub.secondCall.args[1];
    expect(secondOptions?.method).to.equal('GET');
    expect(secondOptions?.body).to.equal(undefined);
  });

  it('stops after the maximum number of redirects', async function () {
    const fetchStub = sandbox.stub(undici, 'fetch').callsFake(async () => new Response('', {
      status: 302,
      headers: { location: 'http://1.1.1.1/next' },
    }));

    let error: Error | undefined;
    try {
      await requestAndResultsFormatter({ url: 'http://1.1.1.1' });
    } catch (caught) {
      error = caught as Error;
    }

    expect(error?.message).to.equal('Maximum redirect count exceeded');
    expect(fetchStub.callCount).to.equal(21);
  });

  it('uses the charset from a named charset meta tag', async function () {
    const body = Buffer.from(
      '<html><head><meta name="charset" content="windows-1252"></head><body>caf\xe9</body></html>',
      'latin1',
    );
    sandbox.stub(undici, 'fetch').resolves(new Response(body));

    const { body: decodedBody } = await requestAndResultsFormatter({ url: 'http://1.1.1.1' });

    expect(decodedBody).to.contain('café');
  });
});
