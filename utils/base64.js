/**
 * Encode a string into Base64 format.
 * @param {string} input - The string to be encoded.
 * @returns {string} - The Base64 encoded string.
 */
export function encode(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    let base64 = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const padding = '=';

    let p = 0;
    const len = data.length;
    let s = '';

    while (p < len) {
        s += characters[data[p] >> 2];
        s += characters[((data[p] & 3) << 4) | (data[p + 1] >> 4)];
        s += characters[((data[p + 1] & 15) << 2) | (data[p + 2] >> 6)];
        s += characters[data[p + 2] & 63];
        p += 3;
    }

    if (len % 3 === 2) {
        s = s.substring(0, s.length - 1) + padding;
    } else if (len % 3 === 1) {
        s = s.substring(0, s.length - 2) + padding + padding;
    }

    base64 = s;

    return base64;
}