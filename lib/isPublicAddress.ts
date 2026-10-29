import { isIP } from 'node:net';
import { lookup } from 'node:dns/promises';

function isBlockedIPv4(address: string) {
  const octets = address.split('.').map(Number);
  const [first, second, third] = octets;

  return first === 0
    || first === 10
    || (first === 100 && second >= 64 && second <= 127)
    || first === 127
    || (first === 169 && second === 254)
    || (first === 172 && second >= 16 && second <= 31)
    || (first === 192 && second === 0 && third === 0)
    || (first === 192 && second === 0 && third === 2)
    || (first === 192 && second === 88 && third === 99)
    || (first === 192 && second === 168)
    || (first === 198 && (second === 18 || second === 19))
    || (first === 198 && second === 51 && third === 100)
    || (first === 203 && second === 0 && third === 113)
    || first >= 224;
}

function parseIPv6(address: string) {
  let normalized = address.toLowerCase();
  const ipv4Suffix = normalized.match(/(\d{1,3}(?:\.\d{1,3}){3})$/)?.[1];

  if (ipv4Suffix) {
    const octets = ipv4Suffix.split('.').map(Number);
    if (octets.some((octet) => octet > 255)) return undefined;
    const high = ((octets[0] ?? 0) * 256) + (octets[1] ?? 0);
    const low = ((octets[2] ?? 0) * 256) + (octets[3] ?? 0);
    normalized = normalized.replace(ipv4Suffix, `${high.toString(16)}:${low.toString(16)}`);
  }

  const halves = normalized.split('::');
  if (halves.length > 2) return undefined;
  const left = halves[0] ? halves[0].split(':') : [];
  const right = halves[1] ? halves[1].split(':') : [];
  const zeroCount = 8 - left.length - right.length;
  if ((halves.length === 1 && zeroCount !== 0) || (halves.length === 2 && zeroCount < 1)) return undefined;

  const groups = [
    ...left,
    ...Array.from({ length: zeroCount }, () => '0'),
    ...right,
  ].map((group) => Number.parseInt(group, 16));
  if (groups.length !== 8 || groups.some((group) => !Number.isInteger(group) || group < 0 || group > 0xffff)) {
    return undefined;
  }

  return groups;
}

function isBlockedIPv6(address: string) {
  const groups = parseIPv6(address);
  if (!groups) return true;

  const first = groups[0] ?? 0;
  const second = groups[1] ?? 0;

  return Math.floor(first / 0x2000) !== 1
    || (first === 0x2001 && second <= 0x01ff)
    || (first === 0x2001 && second === 0x0db8)
    || first === 0x2002
    || (first === 0x3fff && second <= 0x0fff);
}

export function isPublicAddress(address: string) {
  const version = isIP(address);
  if (version === 4) return !isBlockedIPv4(address);
  if (version === 6) return !isBlockedIPv6(address);
  return false;
}

export async function assertPublicUrl(input: string) {
  const url = new URL(input);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Only HTTP and HTTPS URLs are allowed');
  }

  const hostname = url.hostname.replace(/^\[|\]$/g, '');
  if (hostname.includes('%')) throw new Error('URL must not contain a scoped IP address');

  const version = isIP(hostname);
  if (version) {
    if (!isPublicAddress(hostname)) throw new Error('Requests to non-public IP addresses are not allowed');
    return;
  }

  const addresses = await lookup(hostname, { all: true, verbatim: true });
  if (addresses.length === 0 || addresses.some(({ address }) => !isPublicAddress(address))) {
    throw new Error('Requests to hosts resolving to non-public IP addresses are not allowed');
  }
}
