import type { IEncoder } from './type';
import { Latin1 } from './Latin1';
import type { Word32Array } from './Word32Array';

export const Utf8: IEncoder = {
    /**
     * Converts a word array to a UTF-8 string.
     *
     * @param {Word32Array} w An array of 32-bit words.
     * @return {string} The UTF-8 string.
     * @example
     *   var utf8String = Utf8.stringify(new Word32Array([0x293892]));
     */
    stringify(w: Word32Array) {
        try {
            return decodeURIComponent(escape(Latin1.stringify(w)));
        } catch (e) {
            throw new Error('Malformed UTF-8 data');
        }
    },

    /**
     * Converts a UTF-8 string to a word array.
     *
     * @param {string} utf8Str The UTF-8 string.
     * @return {Word32Array} The word array.
     * @example
     *   var wordArray = Utf8.parse(utf8Str);
     */
    parse(utf8Str: string) {
        return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
    },
};
