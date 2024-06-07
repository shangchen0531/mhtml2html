/**
 * mhtml2html
 *
 * @Author : Mayank Sindwani
 * @Date   : 2016-09-05
 * @Description : Converts mhtml to html.
 *
 * Licensed under the MIT License
 * Copyright(c) 2016 Mayank Sindwani
 **/

const QuotedPrintable = require('quoted-printable');
const Base64 = require('base-64');

// Asserts a condition.
function assert(condition, error) {
    if (!condition) {
        throw new Error(error);
    }
    return true;
}

// Default DOM parser (browser only).
function defaultDOMParser(asset) {
    assert(typeof DOMParser !== 'undefined', 'No DOM parser available');
    return {
        window: {
            document: new DOMParser().parseFromString(asset, "text/html")
        }
    };
}

// Returns an absolute url from base and relative paths.
function absoluteURL(base, relative) {
    if (relative.indexOf('http://') === 0 || relative.indexOf('https://') === 0) {
        return relative;
    }

    const stack = base.split('/');
    const parts = relative.split('/');

    stack.pop();

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] == ".") {
            continue;
        } else if (parts[i] == "..") {
            stack.pop();
        } else {
            stack.push(parts[i]);
        }
    }

    return stack.join('/');
}

// Replace asset references with the corresponding data.
function replaceReferences(media, base, asset) {
    const CSS_URL_RULE = 'url(';
    let reference, i;

    for (i = 0; (i = asset.indexOf(CSS_URL_RULE, i)) > 0; i += reference.length) {
        i += CSS_URL_RULE.length;
        reference = asset.substring(i, asset.indexOf(')', i));

        // Get the absolute path of the referenced asset.
        const path = absoluteURL(base, reference.replace(/(\"|\')/g,''));
        if (media[path] != null) {
            if (media[path].type === 'text/css') {
                media[path].data = replaceReferences(media, base, media[path].data);
            }
            // Replace the reference with an encoded version of the resource.
            try {
                const embeddedAsset = `'data:${media[path].type};base64,${(
                    media[path].encoding === 'base64' ?
                        media[path].data :
                        Base64.encode(media[path].data)
                )}'`;
                asset = `${asset.substring(0, i)}${embeddedAsset}${asset.substring(i + reference.length)}`;
            } catch(e) {
                console.warn(e);
            }
        }
    }
    return asset;
}

// Converts the provided asset to a data URI based on the encoding.
function convertAssetToDataURI(asset) {
    switch(asset.encoding) {
        case 'quoted-printable':
            return `data:${asset.type};utf8,${escape(QuotedPrintable.decode(asset.data))}`;
        case 'base64':
            return `data:${asset.type};base64,${asset.data}`;
        default:
            return `data:${asset.type};base64,${Base64.encode(asset.data)}`;
    }
}

const utf_8Decodeer = new TextDecoder('utf-8');
const ibm866Decoder = new TextDecoder('ibm866');
const iso_8859_2Decoder = new TextDecoder('iso-8859-2');
const iso_8859_3Decoder = new TextDecoder('iso-8859-3');
const iso_8859_4Decoder = new TextDecoder('iso-8859-4');
const iso_8859_5Decoder = new TextDecoder('iso-8859-5');
const iso_8859_6Decoder = new TextDecoder('iso-8859-6');
const iso_8859_7Decoder = new TextDecoder('iso-8859-7');
const iso_8859_8Decoder = new TextDecoder('iso-8859-8');
const iso_8859_8_iDecoder = new TextDecoder('iso-8859-8-i');
const iso_8859_10Decoder = new TextDecoder('iso-8859-10');
const iso_8859_13Decoder = new TextDecoder('iso-8859-13');
const iso_8859_14Decoder = new TextDecoder('iso-8859-14');
const iso_8859_15Decoder = new TextDecoder('iso-8859-15');
const koi8_rDecoder = new TextDecoder('koi8-r');
const koi8_uDecoder = new TextDecoder('koi8-u');
const macintoshDecoder = new TextDecoder('macintosh');
const windows_874Decoder = new TextDecoder('windows-874');
const windows_1250Decoder = new TextDecoder('windows-1250');
const windows_1251Decoder = new TextDecoder('windows-1251');
const windows_1252Decoder = new TextDecoder('windows-1252');
const windows_1253Decoder = new TextDecoder('windows-1253');
const windows_1254Decoder = new TextDecoder('windows-1254');
const windows_1255Decoder = new TextDecoder('windows-1255');
const windows_1256Decoder = new TextDecoder('windows-1256');
const windows_1257Decoder = new TextDecoder('windows-1257');
const windows_1258Decoder = new TextDecoder('windows-1258');
const x_mac_cyrillicDecoder = new TextDecoder('x-mac-cyrillic');
const gbkDecoder = new TextDecoder('gbk');
const gb18030Decoder = new TextDecoder('gb18030');
const big5Decoder = new TextDecoder('big5');
const euc_jpDecoder = new TextDecoder('euc-jp');
const iso_2022_jpDecoder = new TextDecoder('iso-2022-jp');
const shift_jisDecoder = new TextDecoder('shift_jis');
const euc_krDecoder = new TextDecoder('euc-kr');

const decodeMap = {
    'UTF-8': utf_8Decodeer,
    'IBM866': ibm866Decoder,
    '866': ibm866Decoder,
    'CP866': ibm866Decoder,
    'CSIBM866': ibm866Decoder,
    'ISO-8859-2': iso_8859_2Decoder,
    'CSISOLATIN2': iso_8859_2Decoder,
    'ISO-IR-101': iso_8859_2Decoder,
    'ISO8859-2': iso_8859_2Decoder,
    'ISO88592': iso_8859_2Decoder,
    'ISO_8859-2': iso_8859_2Decoder,
    'ISO_8859-2:1987': iso_8859_2Decoder,
    'L2': iso_8859_2Decoder,
    'LATIN2': iso_8859_2Decoder,
    'ISO-8859-3': iso_8859_3Decoder,
    'CSISOLATIN3': iso_8859_3Decoder,
    'ISO-IR-109': iso_8859_3Decoder,
    'ISO8859-3': iso_8859_3Decoder,
    'ISO88593': iso_8859_3Decoder,
    'ISO_8859-3': iso_8859_3Decoder,
    'ISO_8859-3:1988': iso_8859_3Decoder,
    'L3': iso_8859_3Decoder,
    'LATIN3': iso_8859_3Decoder,
    'ISO-8859-4': iso_8859_4Decoder,
    'CSISOLATIN4': iso_8859_4Decoder,
    'ISO-IR-110': iso_8859_4Decoder,
    'ISO8859-4': iso_8859_4Decoder,
    'ISO88594': iso_8859_4Decoder,
    'ISO_8859-4': iso_8859_4Decoder,
    'ISO_8859-4:1988': iso_8859_4Decoder,
    'L4': iso_8859_4Decoder,
    'LATIN4': iso_8859_4Decoder,
    'ISO-8859-5': iso_8859_5Decoder,
    'CSISOLATINCYRILLIC': iso_8859_5Decoder,
    'CYRILLIC': iso_8859_5Decoder,
    'ISO-IR-144': iso_8859_5Decoder,
    'ISO8859-5': iso_8859_5Decoder,
    'ISO88595': iso_8859_5Decoder,
    'ISO_8859-5': iso_8859_5Decoder,
    'ISO_8859-5:1988': iso_8859_5Decoder,
    'ISO-8859-6': iso_8859_6Decoder,
    'ARABIC': iso_8859_6Decoder,
    'ASMO-708': iso_8859_6Decoder,
    'CSISO88596E': iso_8859_6Decoder,
    'CSISO88596I': iso_8859_6Decoder,
    'CSISOLATINARABIC': iso_8859_6Decoder,
    'ECMA-114': iso_8859_6Decoder,
    'ISO-8859-6-E': iso_8859_6Decoder,
    'ISO-8859-6-I': iso_8859_6Decoder,
    'ISO-IR-127': iso_8859_6Decoder,
    'ISO8859-6': iso_8859_6Decoder,
    'ISO88596': iso_8859_6Decoder,
    'ISO_8859-6': iso_8859_6Decoder,
    'ISO_8859-6:1987': iso_8859_6Decoder,
    'ISO-8859-7': iso_8859_7Decoder,
    'CSISOLATINGREEK': iso_8859_7Decoder,
    'ECMA-118': iso_8859_7Decoder,
    'ELOT_928': iso_8859_7Decoder,
    'GREEK': iso_8859_7Decoder,
    'GREEK8': iso_8859_7Decoder,
    'ISO-IR-126': iso_8859_7Decoder,
    'ISO8859-7': iso_8859_7Decoder,
    'ISO88597': iso_8859_7Decoder,
    'ISO_8859-7': iso_8859_7Decoder,
    'ISO_8859-7:1987': iso_8859_7Decoder,
    'SUN_EU_GREEK': iso_8859_7Decoder,
    'ISO-8859-8': iso_8859_8Decoder,
    'CSISO88598E': iso_8859_8Decoder,
    'CSISOLATINHEBREW': iso_8859_8Decoder,
    'HEBREW': iso_8859_8Decoder,
    'ISO-8859-8-E': iso_8859_8Decoder,
    'ISO-IR-138': iso_8859_8Decoder,
    'ISO8859-8': iso_8859_8Decoder,
    'ISO88598': iso_8859_8Decoder,
    'ISO_8859-8': iso_8859_8Decoder,
    'ISO_8859-8:1988': iso_8859_8Decoder,
    'VISUAL': iso_8859_8Decoder,
    'ISO-8859-8-I': iso_8859_8_iDecoder,
    'CSISO88598I': iso_8859_8_iDecoder,
    'LOGICAL': iso_8859_8_iDecoder,
    'ISO-8859-10': iso_8859_10Decoder,
    'CSISOLATIN6': iso_8859_10Decoder,
    'ISO-IR-157': iso_8859_10Decoder,
    'ISO8859-10': iso_8859_10Decoder,
    'ISO885910': iso_8859_10Decoder,
    'L6': iso_8859_10Decoder,
    'LATIN6': iso_8859_10Decoder,
    'ISO-8859-13': iso_8859_13Decoder,
    'ISO8859-13': iso_8859_13Decoder,
    'ISO885913': iso_8859_13Decoder,
    'ISO-8859-14': iso_8859_14Decoder,
    'ISO8859-14': iso_8859_14Decoder,
    'ISO885914': iso_8859_14Decoder,
    'ISO-8859-15': iso_8859_15Decoder,
    'CSISOLATIN9': iso_8859_15Decoder,
    'ISO8859-15': iso_8859_15Decoder,
    'ISO885915': iso_8859_15Decoder,
    'ISO_8859-15': iso_8859_15Decoder,
    'L9': iso_8859_15Decoder,
    'KOI8-R': koi8_rDecoder,
    'CSKOI8R': koi8_rDecoder,
    'KOI': koi8_rDecoder,
    'KOI8': koi8_rDecoder,
    'KOI8_R': koi8_rDecoder,
    'KOI8-U': koi8_uDecoder,
    'KOI8-RU': koi8_uDecoder,
    'MACINTOSH': macintoshDecoder,
    'CSMACINTOSH': macintoshDecoder,
    'MAC': macintoshDecoder,
    'X-MAC-ROMAN': macintoshDecoder,
    'WINDOWS-874': windows_874Decoder,
    'DOS-874': windows_874Decoder,
    'ISO-8859-11': windows_874Decoder,
    'ISO8859-11': windows_874Decoder,
    'ISO885911': windows_874Decoder,
    'TIS-620': windows_874Decoder,
    'WINDOWS-1250': windows_1250Decoder,
    'CP1250': windows_1250Decoder,
    'X-CP1250': windows_1250Decoder,
    'WINDOWS-1251': windows_1251Decoder,
    'CP1251': windows_1251Decoder,
    'X-CP1251': windows_1251Decoder,
    'WINDOWS-1252': windows_1252Decoder,
    'ANSI_X3.4-1968': windows_1252Decoder,
    'ASCII': windows_1252Decoder,
    'CP1252': windows_1252Decoder,
    'CP819': windows_1252Decoder,
    'CSISOLATIN1': windows_1252Decoder,
    'IBM819': windows_1252Decoder,
    'ISO-8859-1': windows_1252Decoder,
    'ISO-IR-100': windows_1252Decoder,
    'ISO8859-1': windows_1252Decoder,
    'ISO88591': windows_1252Decoder,
    'ISO_8859-1': windows_1252Decoder,
    'ISO_8859-1:1987': windows_1252Decoder,
    'L1': windows_1252Decoder,
    'LATIN1': windows_1252Decoder,
    'US-ASCII': windows_1252Decoder,
    'X-CP1252': windows_1252Decoder,
    'WINDOWS-1253': windows_1253Decoder,
    'CP1253': windows_1253Decoder,
    'X-CP1253': windows_1253Decoder,
    'WINDOWS-1254': windows_1254Decoder,
    'CP1254': windows_1254Decoder,
    'CSISOLATIN5': windows_1254Decoder,
    'ISO-8859-9': windows_1254Decoder,
    'ISO-IR-148': windows_1254Decoder,
    'ISO8859-9': windows_1254Decoder,
    'ISO88599': windows_1254Decoder,
    'ISO_8859-9': windows_1254Decoder,
    'ISO_8859-9:1989': windows_1254Decoder,
    'L5': windows_1254Decoder,
    'LATIN5': windows_1254Decoder,
    'X-CP1254': windows_1254Decoder,
    'WINDOWS-1255': windows_1255Decoder,
    'CP1255': windows_1255Decoder,
    'X-CP1255': windows_1255Decoder,
    'WINDOWS-1256': windows_1256Decoder,
    'CP1256': windows_1256Decoder,
    'X-CP1256': windows_1256Decoder,
    'WINDOWS-1257': windows_1257Decoder,
    'CP1257': windows_1257Decoder,
    'X-CP1257': windows_1257Decoder,
    'WINDOWS-1258': windows_1258Decoder,
    'CP1258': windows_1258Decoder,
    'X-CP1258': windows_1258Decoder,
    'X-MAC-CYRILLIC': x_mac_cyrillicDecoder,
    'X-MAC-UKRAINIAN': x_mac_cyrillicDecoder,
    'GBK': gbkDecoder,
    'CHINESE': gbkDecoder,
    'CSGB2312': gbkDecoder,
    'CSISO58GB231280': gbkDecoder,
    'GB2312': gbkDecoder,
    'GB_2312': gbkDecoder,
    'GB_2312-80': gbkDecoder,
    'ISO-IR-58': gbkDecoder,
    'X-GBK': gbkDecoder,
    'GB18030': gb18030Decoder,
    'BIG5': big5Decoder,
    'BIG5-HKSCS': big5Decoder,
    'CN-BIG5': big5Decoder,
    'CSBIG5': big5Decoder,
    'X-X-BIG5': big5Decoder,
    'EUC-JP': euc_jpDecoder,
    'CSEUCPKDFMTJAPANESE': euc_jpDecoder,
    'X-EUC-JP': euc_jpDecoder,
    'ISO-2022-JP': iso_2022_jpDecoder,
    'CSISO2022JP': iso_2022_jpDecoder,
    'SHIFT_JIS': shift_jisDecoder,
    'CSSHIFTJIS': shift_jisDecoder,
    'MS932': shift_jisDecoder,
    'MS_KANJI': shift_jisDecoder,
    'SHIFT-JIS': shift_jisDecoder,
    'SJIS': shift_jisDecoder,
    'WINDOWS-31J': shift_jisDecoder,
    'X-SJIS': shift_jisDecoder,
    'EUC-KR': euc_krDecoder,
    'CSEUCKR': euc_krDecoder,
    'CSKSC56011987': euc_krDecoder,
    'ISO-IR-149': euc_krDecoder,
    'KOREAN': euc_krDecoder,
    'KS_C_5601-1987': euc_krDecoder,
    'KS_C_5601-1989': euc_krDecoder,
    'KSC5601': euc_krDecoder,
    'KSC_5601': euc_krDecoder,
    'WINDOWS-949': euc_krDecoder,
}

/**
 * Strings like css will be saved as quoted-printable.
 * This function decodes quoted-printable with support for gbk encoding.
 * @license MIT
 * - edited from `quoted-printable` by Mathias Bynens
 * @see {@link https://github.com/mathiasbynens/quoted-printable/blob/master/src/quoted-printable.js}
 */
function decodeQuotedPrintable(input, enc = 'utf-8') {
    const oldEncoding = enc.toUpperCase();

    let decoder = decodeMap[oldEncoding];
    if (!decoder) {
        console.error("unknown encoding", enc);
        decoder = utf_8Decodeer;
    }

    return (
        input
            // https://tools.ietf.org/html/rfc2045#section-6.7, rule 3:
            // “Therefore, when decoding a `Quoted-Printable` body, any trailing white
            // space on a line must be deleted, as it will necessarily have been added
            // by intermediate transport agents.”
            .replace(/[\t\x20]$/gm, '')
            // Remove hard line breaks preceded by `=`. Proper `Quoted-Printable`-
            // encoded data only contains CRLF line  endings, but for compatibility
            // reasons we support separate CR and LF too.
            .replace(/=(?:\r\n?|\n|$)/g, '')
            // Decode escape sequences of the form `=XX` where `XX` is any
            // combination of two hexidecimal digits. For optimal compatibility,
            // lowercase hexadecimal digits are supported as well. See
            // https://tools.ietf.org/html/rfc2045#section-6.7, note 1.
            /**
             * @note The method above only supports utf-8 encoding
             * @edit Add support for gbk encoding by using TextDecoder
             * @condition input must contains full code points
             * @todo may cause performance issue with large input
             */
            .replace(/(=[a-fA-F0-9]{2}){1,}/g, function ($0, $1) {
                const array = $0
                    .split('=')
                    .slice(1)
                    .map((hex) => parseInt(hex, 16));
                const buffer = new Uint8Array(array);
                const utf8Str = decoder.decode(buffer);

                return utf8Str;
            })
    )
}


// Main module.
const mhtml2html = {

    /**
     * Parse
     *
     * Description: Returns an object representing the mhtml and its resources.
     * @param {mhtml} // The mhtml string.
     * @param {options.htmlOnly} // A flag to determine which parsed object to return.
     * @param {options.parseDOM} // The callback to parse an HTML string.
     * @returns an html document without resources if htmlOnly === true; an MHTML parsed object otherwise.
     */
    parse: (mhtml, { htmlOnly = false, parseDOM  = defaultDOMParser, enc = "utf-8" } = {}) => {
        const MHTML_FSM = {
            MHTML_HEADERS : 0,
            MTHML_CONTENT : 1,
            MHTML_DATA    : 2,
            MHTML_END     : 3
        };

        let asset, headers, content, media, frames;  // Record-keeping.
        let location, encoding, type, id;            // Content properties.
        let state, key, next, index, i, l;           // States.
        let boundary;                                // Boundaries.

        headers = { };
        content = { };
        media   = { };
        frames  = { };

        // Initial state and index.
        state = MHTML_FSM.MHTML_HEADERS;
        i = l = 0;

        // Discards characters until a non-whitespace character is encountered.
        function trim() {
            while (assert(i < mhtml.length - 1, 'Unexpected EOF') && /\s/.test(mhtml[i])) {
                if (mhtml[++i] == '\n') { l++; }
            }
        }

        // Returns the next line from the index.
        /**
         * @edit
         * @note merge quoted-printable multi-line content into one line
         * - this is required for gbk encoding
         */
        function getLine(encoding) {
            if (encoding === 'quoted-printable') {
                let line = mhtml[i];

                while (true) {
                    i++;
                    assert(i < mhtml.length, 'Unexpected EOF');

                    line += mhtml[i];

                    // 如果结尾是 =\n =\r\n 则删除行尾并继续读取下一行

                    // In older versions of Mac, line breaks are represented by '\r',
                    // while in Windows, line breaks are represented by '\r\n'.
                    // Since Mac is not commonly used as a server, we can ignore '\r'.
                    if (mhtml[i] === '\r') line = line.slice(0, -1)

                    if (line.endsWith('=\n')) {
                        line = line.slice(0, -2);
                        l++;
                        continue
                    }

                    if (line.endsWith('\n')) {
                        l++;
                        break
                    }
                }

                i++;
                var decoded = decodeQuotedPrintable(line, enc);
                return decoded;
            }

            const j = i

            // Wait until a newline character is encountered or when we exceed the str length.
            while (
                mhtml[i] !== '\n' &&
                assert(i++ < mhtml.length - 1, 'Unexpected EOF')
            );
            i++;
            l++;

            const line = mhtml.substring(j, i);

            if (encoding === 'base64') {
                return line.trim();
            }
            return line;
        }

        // Splits headers from the first instance of ':'.
        function splitHeaders(line, obj) {
            const m = line.indexOf(':');
            if (m > -1) {
                key = line.substring(0, m).trim();
                obj[key] = line.substring(m + 1, line.length).trim();
            } else {
                assert(typeof key !== 'undefined', `Missing MHTML headers; Line ${l}`);
                obj[key] += line.trim();
            }
        }

        while (state != MHTML_FSM.MHTML_END) {
            switch(state) {
                // Fetch document headers including the boundary to use.
                case MHTML_FSM.MHTML_HEADERS: {
                    next = getLine();
                    // Use a new line or null character to determine when we should
                    // stop processing headers.
                    if (next != 0 && next != '\n') {
                        splitHeaders(next, headers);
                    } else {
                        assert(typeof headers['Content-Type'] !== 'undefined', `Missing document content type; Line ${l}`);
                        const matches = headers['Content-Type'].match(/boundary=(.*)/m);

                        // Ensure the extracted boundary exists.
                        assert(matches != null, `Missing boundary from document headers; Line ${l}`);
                        boundary = matches[1].replace(/\"/g,'');

                        trim();
                        next = getLine();

                        // Expect the next boundary to appear.
                        assert(next.includes(boundary), `Expected boundary; Line ${l}`);
                        content = { };
                        state = MHTML_FSM.MTHML_CONTENT;
                    }
                    break;
                }

                // Parse and store content headers.
                case MHTML_FSM.MTHML_CONTENT: {
                    next = getLine();

                    // Use a new line or null character to determine when we should
                    // stop processing headers.
                    if (next != 0 && next != '\n') {
                        splitHeaders(next, content);
                    } else {
                        encoding = content['Content-Transfer-Encoding'];
                        type     = content['Content-Type'];
                        id       = content['Content-ID'];
                        location = content['Content-Location'];

                        // Assume the first boundary to be the document.
                        if (typeof index === 'undefined') {
                            index = location;
                            assert(typeof index !== 'undefined' && type === "text/html", `Index not found; Line ${l}`);
                        }

                        // Ensure the extracted information exists.
                        assert(typeof id !== 'undefined' || typeof location !== 'undefined',
                            `ID or location header not provided;  Line ${l}`);
                        assert(typeof encoding !== 'undefined', `Content-Transfer-Encoding not provided;  Line ${l}`);
                        assert(typeof type     !== 'undefined', `Content-Type not provided; Line ${l}`);

                        asset = {
                            encoding : encoding,
                            type : type,
                            data : '',
                            id : id
                        };

                        // Keep track of frames by ID.
                        if (typeof id !== 'undefined') {
                            frames[id] = asset;
                        }

                        // Keep track of resources by location.
                        if (typeof location !== 'undefined' && typeof media[location] === 'undefined') {
                            media[location] = asset;
                        }

                        trim();
                        content = { };
                        state = MHTML_FSM.MHTML_DATA;
                    }
                    break;
                }

                // Map data to content.
                case MHTML_FSM.MHTML_DATA: {
                    next = getLine(encoding);

                    // Build the decoded string.
                    while (!next.includes(boundary)) {
                        asset.data += next;
                        next = getLine(encoding);
                    }

                    try {
                        // Decode unicode.
                        asset.data = decodeURIComponent(escape(asset.data));
                    } catch (e) { e; }

                    // Ignore assets if 'htmlOnly' is set.
                    if (htmlOnly === true && typeof index !== 'undefined') {
                        return parseDOM(asset.data);
                    }

                    // Set the finishing state if there are no more characters.
                    state = (i >= mhtml.length - 1 ? MHTML_FSM.MHTML_END : MHTML_FSM.MTHML_CONTENT);
                    break;
                }
            }
        }

        return {
            frames: frames,
            media: media,
            index: index
        };
    },

    /**
     * Convert
     *
     * Description: Accepts an mhtml string or parsed object and returns the converted html.
     * @param {mhtml} // The mhtml string or object.
     * @param {options.convertIframes} // Whether or not to include iframes in the converted response (defaults to false).
     * @param {options.parseDOM} // The callback to parse an HTML string.
     * @returns an html document element.
     */
    convert: (mhtml, { convertIframes = false, parseDOM = defaultDOMParser, enc = "utf-8" } = {}) => {
        let index, media, frames;  // Record-keeping.
        let style, base, img;      // DOM objects.
        let href, src;             // References.

        if (typeof mhtml === "string") {
            mhtml = mhtml2html.parse(mhtml, { enc });
        } else {
            assert(typeof mhtml === "object", 'Expected argument of type string or object');
        }

        frames = mhtml.frames;
        media  = mhtml.media;
        index  = mhtml.index;

        assert(typeof frames === "object", 'MHTML error: invalid frames');
        assert(typeof media  === "object", 'MHTML error: invalid media' );
        assert(typeof index  === "string", 'MHTML error: invalid index' );
        assert(media[index] && media[index].type === "text/html", 'MHTML error: invalid index');

        const dom = parseDOM(media[index].data);
        const documentElem = dom.window.document;
        const nodes = [ documentElem ];

        // Merge resources into the document.
        while (nodes.length) {
            const childNode = nodes.shift();

            // Resolve each node.
            childNode.childNodes.forEach(function(child) {
                if (child.getAttribute) {
                    href = child.getAttribute('href');
                    src  = child.getAttribute('src');
                }
                if (child.removeAttribute) {
                    child.removeAttribute('integrity');
                }
                switch(child.tagName) {
                    case 'HEAD':
                        // Link targets should be directed to the outer frame.
                        base = documentElem.createElement("base");
                        base.setAttribute("target", "_parent");
                        child.insertBefore(base, child.firstChild);
                        break;

                    case 'LINK':
                        if (typeof media[href] !== 'undefined' && media[href].type === 'text/css') {
                            // Embed the css into the document.
                            style = documentElem.createElement('style');
                            style.type = 'text/css';
                            media[href].data = replaceReferences(media, href, media[href].data);
                            style.appendChild(documentElem.createTextNode(media[href].data));
                            childNode.replaceChild(style, child);
                        }
                        break;

                    case 'STYLE':
                        style = documentElem.createElement('style');
                        style.type = 'text/css';
                        style.appendChild(documentElem.createTextNode(replaceReferences(media, index, child.innerHTML)));
                        childNode.replaceChild(style, child);
                        break;

                    case 'IMG':
                        img = null;
                        if (typeof media[src] !== 'undefined' && media[src].type.includes('image')) {
                            // Embed the image into the document.
                            try {
                                img = convertAssetToDataURI(media[src]);
                            } catch(e) {
                                console.warn(e);
                            }
                            if (img !== null) {
                                child.setAttribute('src', img);
                            }
                        }
                        child.style.cssText = replaceReferences(media, index, child.style.cssText);
                        break;

                    case 'IFRAME':
                        if (convertIframes === true && src) {
                            const id = `<${src.split('cid:')[1]}>`;
                            const frame = frames[id];

                            if (frame && frame.type === 'text/html') {
                                const iframe = mhtml2html.convert({
                                    media: Object.assign({}, media, { [id] : frame }),
                                    frames: frames,
                                    index: id,
                                }, { convertIframes, parseDOM });
                                child.src = `data:text/html;charset=utf-8,${encodeURIComponent(
                                    iframe.window.document.documentElement.outerHTML
                                )}`;
                            }
                        }
                        break;

                    default:
                        if (child.style) {
                            child.style.cssText = replaceReferences(media, index, child.style.cssText);
                        }
                        break;
                }
                nodes.push(child);
            });
        }
        return dom;
    }
};

module.exports = mhtml2html;
