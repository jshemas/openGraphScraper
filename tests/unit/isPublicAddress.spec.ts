import { expect } from 'chai';
import { assertPublicUrl, isPublicAddress } from '../../lib/isPublicAddress';

describe('public address validation', function () {
  it('allows public IPv4 and IPv6 addresses', function () {
    expect(isPublicAddress('8.8.8.8')).to.equal(true);
    expect(isPublicAddress('2001:4860:4860::8888')).to.equal(true);
  });

  it('blocks private, loopback, link-local, reserved, and mapped IP addresses', function () {
    [
      '0.1.2.3',
      '10.0.0.1',
      '100.64.0.1',
      '127.0.0.1',
      '169.254.169.254',
      '172.16.0.1',
      '192.168.1.1',
      '198.18.0.1',
      '224.0.0.1',
      '::',
      '::1',
      '::ffff:127.0.0.1',
      'fc00::1',
      'fe80::1',
      '2001:db8::1',
      '2002::1',
      'ff02::1',
    ].forEach((address) => expect(isPublicAddress(address), address).to.equal(false));
  });

  it('rejects non-HTTP protocols and private IP literals', async function () {
    const protocolError = await assertPublicUrl('file:///etc/passwd')
      .then(() => undefined, (error: Error) => error.message);
    const addressError = await assertPublicUrl('http://127.0.0.1/')
      .then(() => undefined, (error: Error) => error.message);

    expect(protocolError).to.equal('Only HTTP and HTTPS URLs are allowed');
    expect(addressError).to.contain('non-public IP addresses');
  });
});
