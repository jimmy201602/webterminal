/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Zmodem = module.exports;

const
    ZDLE = 0x18,
    XON = 0x11,
    XOFF = 0x13,
    XON_HIGH = 0x80 | XON,
    XOFF_HIGH = 0x80 | XOFF,
    CAN = 0x18     //NB: same character as ZDLE
;

/**
 * Tools and constants that are useful for ZMODEM.
 *
 * @exports ZMLIB
 */
Zmodem.ZMLIB = {

    /**
     * @property {number} The ZDLE constant, which ZMODEM uses for escaping
     */
    ZDLE: ZDLE,

    /**
     * @property {number} XON - ASCII XON
     */
    XON: XON,

    /**
     * @property {number} XOFF - ASCII XOFF
     */
    XOFF: XOFF,

    /**
     * @property {number[]} ABORT_SEQUENCE - ZMODEM’s abort sequence
     */
    ABORT_SEQUENCE: [ CAN, CAN, CAN, CAN, CAN ],

    /**
     * Remove octet values from the given array that ZMODEM always ignores.
     * This will mutate the given array.
     *
     * @param {number[]} octets - The octet values to transform.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *      This object is mutated in the function.
     *
     * @returns {number[]} The passed-in array. This is the same object that is
     *      passed in.
     */
    strip_ignored_bytes: function strip_ignored_bytes(octets) {
        for (var o=octets.length-1; o>=0; o--) {
            switch (octets[o]) {
                case XON:
                case XON_HIGH:
                case XOFF:
                case XOFF_HIGH:
                    octets.splice(o, 1);
                    continue;
            }
        }

        return octets;
    },

    /**
     * Like Array.prototype.indexOf, but searches for a subarray
     * rather than just a particular value.
     *
     * @param {Array} haystack - The array to search, i.e., the bigger.
     *
     * @param {Array} needle - The array whose values to find,
     *      i.e., the smaller.
     *
     * @returns {number} The position in “haystack” where “needle”
     *      first appears—or, -1 if “needle” doesn’t appear anywhere
     *      in “haystack”.
     */
    find_subarray: function find_subarray(haystack, needle) {
        var h=0, n;

        var start = Date.now();

        HAYSTACK:
        while (h !== -1) {
            h = haystack.indexOf( needle[0], h );
            if (h === -1) break HAYSTACK;

            for (n=1; n<needle.length; n++) {
                if (haystack[h + n] !== needle[n]) {
                    h++;
                    continue HAYSTACK;
                }
            }

            return h;
        }

        return -1;
    },
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Zmodem = module.exports;

function _crc_message(got, expected) {
    this.got = got.slice(0);
    this.expected = expected.slice(0);
    return "CRC check failed! (got: " + got.join() + "; expected: " + expected.join() + ")";
}

function _pass(val) { return val }

const TYPE_MESSAGE = {
    aborted: "Session aborted",
    peer_aborted: "Peer aborted session",
    already_aborted: "Session already aborted",
    crc: _crc_message,
    validation: _pass,
};

function _generate_message(type) {
    const msg = TYPE_MESSAGE[type];
    switch (typeof msg) {
        case "string":
            return msg;
        case "function":
            var args_after_type = [].slice.call(arguments).slice(1);
            return msg.apply(this, args_after_type);
    }

    return null;
}

Zmodem.Error = class ZmodemError extends Error {
    constructor(msg_or_type) {
        super();

        var generated = _generate_message.apply(this, arguments);
        if (generated) {
            this.type = msg_or_type;
            this.message = generated;
        }
        else {
            this.message = msg_or_type;
        }
    }
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Zmodem = module.exports;

const HEX_DIGITS = [ 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102 ];

const HEX_OCTET_VALUE = {};
for (var hd=0; hd<HEX_DIGITS.length; hd++) {
    HEX_OCTET_VALUE[ HEX_DIGITS[hd] ] = hd;
}

/**
 * General, non-ZMODEM-specific encoding logic.
 *
 * @exports ENCODELIB
 */
Zmodem.ENCODELIB = {

    /**
     * Return an array with the given number as 2 big-endian bytes.
     *
     * @param {number} number - The number to encode.
     *
     * @returns {number[]} The octet values.
     */
    pack_u16_be: function pack_u16_be(number) {
        if (number > 0xffff) throw( "Number cannot exceed 16 bits: " + number )

        return [ number >> 8, number & 0xff ];
    },

    /**
     * Return an array with the given number as 4 little-endian bytes.
     *
     * @param {number} number - The number to encode.
     *
     * @returns {number[]} The octet values.
     */
    pack_u32_le: function pack_u32_le(number) {
        //Can’t bit-shift because that runs into JS’s bit-shift problem.
        //(See _updcrc32() for an example.)
        var high_bytes = number / 65536;   //fraction is ok

        //a little-endian 4-byte sequence
        return [
            number & 0xff,
            (number & 65535) >> 8,
            high_bytes & 0xff,
            high_bytes >> 8,
        ];
    },

    /**
     * The inverse of pack_u16_be() - i.e., take in 2 octet values
     * and parse them as an unsigned, 2-byte big-endian number.
     *
     * @param {number[]} octets - The octet values (2 of them).
     *
     * @returns {number} The decoded number.
     */
    unpack_u16_be: function unpack_u16_be(bytes_arr) {
        return (bytes_arr[0] << 8) + bytes_arr[1];
    },

    /**
     * The inverse of pack_u32_le() - i.e., take in a 4-byte sequence
     * and parse it as an unsigned, 4-byte little-endian number.
     *
     * @param {number[]} octets - The octet values (4 of them).
     *
     * @returns {number} The decoded number.
     */
    unpack_u32_le: function unpack_u32_le(octets) {
        //<sigh> … (254 << 24 is -33554432, according to JavaScript)
        return octets[0] + (octets[1] << 8) + (octets[2] << 16) + (octets[3] * 16777216);
    },

    /**
     * Encode a series of octet values to be the octet values that
     * correspond to the ASCII hex characters for each octet. The
     * returned array is suitable for use as binary data.
     *
     * For example:
     *
     *      Original    Hex     Returned
     *      254         fe      102, 101
     *       12         0c      48, 99
     *      129         81      56, 49
     *
     * @param {number[]} octets - The original octet values.
     *
     * @returns {number[]} The octet values that correspond to an ASCII
     *  representation of the given octets.
     */
    octets_to_hex: function octets_to_hex(octets) {
        var hex = [];
        for (var o=0; o<octets.length; o++) {
            hex.push(
                HEX_DIGITS[ octets[o] >> 4 ],
                HEX_DIGITS[ octets[o] & 0x0f ]
            );
        }

        return hex;
    },

    /**
     * The inverse of octets_to_hex(): takes an array
     * of hex octet pairs and returns their octet values.
     *
     * @param {number[]} hex_octets - The hex octet values.
     *
     * @returns {number[]} The parsed octet values.
     */
    parse_hex_octets: function parse_hex_octets(hex_octets) {
        var octets = new Array(hex_octets.length / 2);

        for (var i=0; i<octets.length; i++) {
            octets[i] = (HEX_OCTET_VALUE[ hex_octets[2 * i] ] << 4) + HEX_OCTET_VALUE[ hex_octets[1 + 2 * i] ];
        }

        return octets;
    },
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Zmodem = module.exports;

Object.assign(
    Zmodem,
    __webpack_require__(0)
);

//encode() variables - declare them here so we don’t
//create them in the function.
var encode_cur, encode_todo;

const ZDLE = Zmodem.ZMLIB.ZDLE;

/**
 * Class that handles ZDLE encoding and decoding.
 * Encoding is subject to a given configuration--specifically, whether
 * we want to escape all control characters. Decoding is static; however
 * a given string is encoded we can always decode it.
 */
Zmodem.ZDLE = class ZmodemZDLE {
    /**
     * Create a ZDLE encoder.
     *
     * @param {object} [config] - The initial configuration.
     * @param {object} config.escape_ctrl_chars - Whether the ZDLE encoder
     *  should escape control characters.
     */
    constructor(config) {
        this._config = {};
        if (config) {
            this.set_escape_ctrl_chars(!!config.escape_ctrl_chars);
        }
    }

    /**
     * Enable or disable control-character escaping.
     * You should probably enable this for sender sessions.
     *
     * @param {boolean} value - Whether to enable (true) or disable (false).
     */
    set_escape_ctrl_chars(value) {
        if (typeof value !== "boolean") throw "need boolean!";

        if (value !== this._config.escape_ctrl_chars) {
            this._config.escape_ctrl_chars = value;
            this._setup_zdle_table();
        }
    }

    /**
     * Whether or not control-character escaping is enabled.
     *
     * @return {boolean} Whether the escaping is on (true) or off (false).
     */
    escapes_ctrl_chars() {
        return !!this._config.escape_ctrl_chars;
    }

    //I don’t know of any Zmodem implementations that use ZESC8
    //(“escape_8th_bit”)??

    /*
    ZMODEM software escapes ZDLE, 020, 0220, 021, 0221, 023, and 0223.  If
    preceded by 0100 or 0300 (@), 015 and 0215 are also escaped to protect the
    Telenet command escape CR-@-CR.
    */

    /**
     * Encode an array of octet values and return it.
     * This will mutate the given array.
     *
     * @param {number[]} octets - The octet values to transform.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *      This object is mutated in the function.
     *
     * @returns {number[]} The passed-in array, transformed. This is the
     *  same object that is passed in.
     */
    encode(octets) {
        //NB: Performance matters here!

        if (!this._zdle_table) throw "No ZDLE encode table configured!";

        var zdle_table = this._zdle_table;

        var last_code = this._lastcode;

        var arrbuf = new ArrayBuffer( 2 * octets.length );
        var arrbuf_uint8 = new Uint8Array(arrbuf);

        var escctl_yn = this._config.escape_ctrl_chars;

        var arrbuf_i = 0;

        for (encode_cur=0; encode_cur<octets.length; encode_cur++) {

            encode_todo = zdle_table[octets[encode_cur]];
            if (!encode_todo) {
                console.trace();
                console.error("bad encode() call:", JSON.stringify(octets));
                this._lastcode = last_code;
                throw( "Invalid octet: " + octets[encode_cur] );
            }

            last_code = octets[encode_cur];

            if (encode_todo === 1) {
                //Do nothing; we append last_code below.
            }

            //0x40 = '@'; i.e., only escape if the last
            //octet was '@'.
            else if (escctl_yn || (encode_todo === 2) || ((last_code & 0x7f) === 0x40)) {
                arrbuf_uint8[arrbuf_i] = ZDLE;
                arrbuf_i++;

                last_code ^= 0x40;   //0100
            }

            arrbuf_uint8[arrbuf_i] = last_code;

            arrbuf_i++;
        }

        this._lastcode = last_code;

        octets.splice(0);
        octets.push.apply(octets, new Uint8Array( arrbuf, 0, arrbuf_i ));

        return octets;
    }

    /**
     * Decode an array of octet values and return it.
     * This will mutate the given array.
     *
     * @param {number[]} octets - The octet values to transform.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *      This object is mutated in the function.
     *
     * @returns {number[]} The passed-in array.
     *  This is the same object that is passed in.
     */
    static decode(octets) {
        for (var o=octets.length-1; o>=0; o--) {
            if (octets[o] === ZDLE) {
                octets.splice( o, 2, octets[o+1] - 64 );
            }
        }

        return octets;
    }

    /**
     * Remove, ZDLE-decode, and return bytes from the passed-in array.
     * If the requested number of ZDLE-encoded bytes isn’t available,
     * then the passed-in array is unmodified (and the return is undefined).
     *
     * @param {number[]} octets - The octet values to transform.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *      This object is mutated in the function.
     *
     * @param {number} offset - The number of (undecoded) bytes to skip
     *      at the beginning of the “octets” array.
     *
     * @param {number} count - The number of bytes (octet values) to return.
     *
     * @returns {number[]|undefined} An array with the requested number of
     *      decoded octet values, or undefined if that number of decoded
     *      octets isn’t available (given the passed-in offset).
     */
    static splice(octets, offset, count) {
        var so_far = 0;

        if (!offset) offset = 0;

        for (var i = offset; i<octets.length && so_far<count; i++) {
            so_far++;

            if (octets[i] === ZDLE) i++;
        }

        if (so_far === count) {

            //Don’t accept trailing ZDLE. This check works
            //because of the i++ logic above.
            if (octets.length === (i - 1)) return;

            octets.splice(0, offset);
            return ZmodemZDLE.decode( octets.splice(0, i - offset) );
        }

        return;
    }

    _setup_zdle_table() {
        var zsendline_tab = new Array(256);
        for (var i=0; i<zsendline_tab.length; i++) {

            //1 = never escape
            //2 = always escape
            //3 = escape only if the previous byte was '@'

            //Never escape characters from 0x20 (32) to 0x7f (127).
            //This is the range of printable characters, plus DEL.
            //I guess ZMODEM doesn’t consider DEL to be a control character?
            if ( i & 0x60 ) {
                zsendline_tab[i] = 1;
            }
            else {
                switch(i) {
                    case ZDLE:  //NB: no (ZDLE | 0x80)
                    case Zmodem.ZMLIB.XOFF:
                    case Zmodem.ZMLIB.XON:
                    case (Zmodem.ZMLIB.XOFF | 0x80):
                    case (Zmodem.ZMLIB.XON | 0x80):
                        zsendline_tab[i] = 2;
                        break;

                    case 0x10:  // 020
                    case 0x90:  // 0220
                        zsendline_tab[i] = this._config.turbo_escape ? 1 : 2;
                        break;

                    case 0x0d:  // 015
                    case 0x8d:  // 0215
                        zsendline_tab[i] = this._config.escape_ctrl_chars ? 2 : !this._config.turbo_escape ? 3 : 1;
                        break;

                    default:
                        zsendline_tab[i] = this._config.escape_ctrl_chars ? 2 : 1;
                }
            }
        }

        this._zdle_table = zsendline_tab;
    }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CRC32_MOD = __webpack_require__(12);

var Zmodem = module.exports;

Object.assign(
    Zmodem,
    __webpack_require__(1),
    __webpack_require__(2)
);

//----------------------------------------------------------------------
// BEGIN adapted from crc-js by Johannes Rudolph

var _crctab;

const
    crc_width = 16,
    crc_polynomial = 0x1021,
    crc_castmask = 0xffff,
    crc_msbmask = 1 << (crc_width - 1)
;

function _compute_crctab() {
    _crctab = new Array(256);

    var divident_shift = crc_width - 8;

    for (var divident = 0; divident < 256; divident++) {
        var currByte = (divident << divident_shift) & crc_castmask;

        for (var bit = 0; bit < 8; bit++) {

            if ((currByte & crc_msbmask) !== 0) {
                currByte <<= 1;
                currByte ^= crc_polynomial;
            }
            else {
                currByte <<= 1;
            }
        }

        _crctab[divident] = (currByte & crc_castmask);
    }
}

// END adapted from crc-js by Johannes Rudolph
//----------------------------------------------------------------------

function _updcrc(cp, crc) {
    if (!_crctab) _compute_crctab();

    return(
        _crctab[((crc >> 8) & 255)]
        ^ ((255 & crc) << 8)
        ^ cp
    );
}

function __verify(expect, got) {
    var err;

    if ( expect.join() !== got.join() ) {
        throw new Zmodem.Error("crc", got, expect);
    }
}

//TODO: use external implementation(s)
Zmodem.CRC = {

    //https://www.lammertbies.nl/comm/info/crc-calculation.html
    //CRC-CCITT (XModem)

    /**
     * Deduce a given set of octet values’ CRC16, as per the CRC16
     * variant that ZMODEM uses (CRC-CCITT/XModem).
     *
     * @param {Array} octets - The array of octet values.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *
     * @returns {Array} crc - The CRC, expressed as an array of octet values.
     */
    crc16: function crc16(octet_nums) {
        var crc = octet_nums[0];
        for (var b=1; b<octet_nums.length; b++) {
            crc = _updcrc( octet_nums[b], crc );
        }

        crc = _updcrc( 0, _updcrc(0, crc) );

        //a big-endian 2-byte sequence
        return Zmodem.ENCODELIB.pack_u16_be(crc);
    },

    /**
     * Deduce a given set of octet values’ CRC32.
     *
     * @param {Array} octets - The array of octet values.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *
     * @returns {Array} crc - The CRC, expressed as an array of octet values.
     */
    crc32: function crc32(octet_nums) {
        return Zmodem.ENCODELIB.pack_u32_le(
            CRC32_MOD.buf(octet_nums) >>> 0     //bit-shift to get unsigned
        );
    },

    /**
     * Verify a given set of octet values’ CRC16.
     * An exception is thrown on failure.
     *
     * @param {Array} bytes_arr - The array of octet values.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *
     * @param {Array} crc - The CRC to check against, expressed as
     *      an array of octet values.
     */
    verify16: function verify16(bytes_arr, got) {
        return __verify( this.crc16(bytes_arr), got );
    },

    /**
     * Verify a given set of octet values’ CRC32.
     * An exception is thrown on failure.
     *
     * @param {Array} bytes_arr - The array of octet values.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *
     * @param {Array} crc - The CRC to check against, expressed as
     *      an array of octet values.
     */
    verify32: function verify32(bytes_arr, crc) {
        try {
            __verify( this.crc32(bytes_arr), crc );
        }
        catch(err) {
            err.input = bytes_arr.slice(0);
            throw err;
        }
    },
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Zmodem = module.exports;

//TODO: Make this usable without require.js or what not.
window.Zmodem = Zmodem;

Object.assign(
    Zmodem,
    __webpack_require__(7)
);

function _check_aborted(session) {
    if (session.aborted()) {
        throw new Zmodem.Error("aborted");
    }
}

/** Browser-specific tools
 *
 * @exports Browser
 */
Zmodem.Browser = {

    /**
     * Send a batch of files in sequence. The session is left open
     * afterward, which allows for more files to be sent if desired.
     *
     * @param {Zmodem.Session} session - The send session
     *
     * @param {FileList|Array} files - A list of File objects
     *
     * @param {Object} [options]
     * @param {Function} [options.on_offer_response] - Called when an
     * offer response arrives. Arguments are:
     *
     * - (File) - The File object that corresponds to the offer.
     * - (Transfer|undefined) - If the receiver accepts the offer, then
     * this is a Transfer object; otherwise it’s undefined.
     *
     * @param {Function} [options.on_progress] - Called immediately
     * after a chunk of a file is sent. Arguments are:
     *
     * - (File) - The File object that corresponds to the file.
     * - (Transfer) - The Transfer object for the current transfer.
     * - (Uint8Array) - The chunk of data that was just loaded from disk
     * and sent to the receiver.
     *
     * @param {Function} [options.on_file_complete] - Called immediately
     * after the last file packet is sent. Arguments are:
     *
     * - (File) - The File object that corresponds to the file.
     * - (Transfer) - The Transfer object for the now-completed transfer.
     *
     * @return {Promise} A Promise that fulfills when the batch is done.
     *      Note that skipped files are not considered an error condition.
     */
    send_files: function send_files(session, files, options) {
        if (!options) options = {};

        //Populate the batch in reverse order to simplify sending
        //the remaining files/bytes components.
        var batch = [];
        var total_size = 0;
        for (var f=files.length - 1; f>=0; f--) {
            var fobj = files[f];
            total_size += fobj.size;
            batch[f] = {
                obj: fobj,
                name: fobj.name,
                size: fobj.size,
                mtime: new Date(fobj.lastModified),
                files_remaining: files.length - f,
                bytes_remaining: total_size,
            };
        }

        var file_idx = 0;
        function promise_callback() {
            var cur_b = batch[file_idx];

            if (!cur_b) {
                return Promise.resolve(); //batch done!
            }

            file_idx++;

            return session.send_offer(cur_b).then( function after_send_offer(xfer) {
                if (options.on_offer_response) {
                    options.on_offer_response(cur_b.obj, xfer);
                }

                if (xfer === undefined) {
                    return promise_callback();   //skipped
                }

                return new Promise( function(res) {
                    var reader = new FileReader();

                    //This really shouldn’t happen … so let’s
                    //blow up if it does.
                    reader.onerror = function reader_onerror(e) {
                        console.error("file read error", e);
                        throw("File read error: " + e);
                    };

                    var piece;
                    reader.onprogress = function reader_onprogress(e) {

                        //Some browsers (e.g., Chrome) give partial returns,
                        //while others (e.g., Firefox) don’t.
                        if (e.target.result) {
                            piece = new Uint8Array(e.target.result, xfer.get_offset())

                            _check_aborted(session);

                            xfer.send(piece);

                            if (options.on_progress) {
                                options.on_progress(cur_b.obj, xfer, piece);
                            }
                        }
                    };

                    reader.onload = function reader_onload(e) {
                        piece = new Uint8Array(e.target.result, xfer, piece)

                        _check_aborted(session);

                        xfer.end(piece).then( function() {
                            if (options.on_progress && piece.length) {
                                options.on_progress(cur_b.obj, xfer, piece);
                            }

                            if (options.on_file_complete) {
                                options.on_file_complete(cur_b.obj, xfer);
                            }

                            //Resolve the current file-send promise with
                            //another promise. That promise resolves immediately
                            //if we’re done, or with another file-send promise
                            //if there’s more to send.
                            res( promise_callback() );
                        } );
                    };

                    reader.readAsArrayBuffer(cur_b.obj);
                } );
            } );
        }

        return promise_callback();
    },

    /**
     * Prompt a user to save the given packets as a file by injecting an
     * `<a>` element (with `display: none` styling) into the page and
     * calling the element’s `click()`
     * method. The element is removed immediately after.
     *
     * @param {Array} packets - Same as the first argument to [Blob’s constructor](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
     * @param {string} name - The name to give the file.
     */
    save_to_disk: function save_to_disk(packets, name) {
        var blob = new Blob(packets);
        var url = URL.createObjectURL(blob);

        var el = document.createElement("a");
        el.style.display = "none";
        el.href = url;
        el.download = name;
        document.body.appendChild(el);

        //It seems like a security problem that this actually works;
        //I’d think there would need to be some confirmation before
        //a browser could save arbitrarily many bytes onto the disk.
        //But, hey.
        el.click();

        document.body.removeChild(el);
    },
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

Object.assign(
    module.exports,
    __webpack_require__(8),
);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Zmodem = module.exports;

Object.assign(
    Zmodem,
    __webpack_require__(0),
    __webpack_require__(9)
);

const
    MIN_ZM_HEX_START_LENGTH = 20,
    MAX_ZM_HEX_START_LENGTH = 21,

    // **, ZDLE, 'B0'
    //ZRQINIT’s next byte will be '0'; ZRINIT’s will be '1'.
    COMMON_ZM_HEX_START = [ 42, 42, 24, 66, 48 ],

    SENTRY_CONSTRUCTOR_REQUIRED_ARGS = [
        "to_terminal",
        "on_detect",
        "on_retract",
        "sender",
    ],

    ASTERISK = 42
;

/**
 * An instance of this object is passed to the Sentry’s on_detect
 * callback each time the Sentry object sees what looks like the
 * start of a ZMODEM session.
 *
 * Note that it is possible for a detection to be “retracted”
 * if the Sentry consumes bytes afterward that are not ZMODEM.
 * When this happens, the Sentry’s `retract` event will fire,
 * after which the Detection object is no longer usable.
 */
class Detection {

    /**
     * Not called directly.
     */
    constructor(session_type, accepter, denier, checker) {

        //confirm() - user confirms that ZMODEM is desired
        this._confirmer = accepter;

        //deny() - user declines ZMODEM; send abort sequence
        //
        //TODO: It might be ideal to forgo the session “peaceably”,
        //i.e., such that the peer doesn’t end in error. That’s
        //possible if we’re the sender, we accept the session,
        //then we just send a close(), but it doesn’t seem to be
        //possible for a receiver. Thus, let’s just leave it so
        //it’s at least consistent (and simpler, too).
        this._denier = denier;

        this._is_valid = checker;

        this._session_type = session_type;
    }

    /**
     * Confirm that the detected ZMODEM sequence indicates the
     * start of a ZMODEM session.
     *
     * @return {Session} The ZMODEM Session object (i.e., either a
     *  Send or Receive instance).
     */
    confirm() {
        return this._confirmer.apply(this, arguments);
    }

    /**
     * Tell the Sentry that the detected bytes sequence is
     * **NOT** intended to be the start of a ZMODEM session.
     */
    deny() {
        return this._denier.apply(this, arguments);
    }

    /**
     * Tells whether the Detection is still valid; i.e., whether
     * the Sentry has `consume()`d bytes that invalidate the
     * Detection.
     *
     * @returns {boolean} Whether the Detection is valid.
     */
    is_valid() {
        return this._is_valid.apply(this, arguments);
    }

    /**
     * Gives the session’s role.
     *
     * @returns {string} One of:
     * - `receive`
     * - `send`
     */
    get_session_role() { return this._session_type }
}

/**
 * Class that parses an input stream for the beginning of a
 * ZMODEM session. We look for the tell-tale signs
 * of a ZMODEM transfer and allow the client to determine whether
 * it’s really ZMODEM or not.
 *
 * This is the “mother” class for zmodem.js;
 * all other class instances are created, directly or indirectly,
 * by an instance of this class.
 *
 * This logic is not unlikely to need tweaking, and it can never
 * be fully bulletproof; if it could be bulletproof it would be
 * simpler since there wouldn’t need to be the .confirm()/.deny()
 * step.
 *
 * One thing you could do to make things a bit simpler *is* just
 * to make that assumption for your users--i.e., to .confirm()
 * Detection objects automatically. That’ll be one less step
 * for the user, but an unaccustomed user might find that a bit
 * confusing. It’s also then possible to have a “false positive”:
 * a text stream that contains a ZMODEM initialization string but
 * isn’t, in fact, meant to start a ZMODEM session.
 *
 * Workflow:
 *  - parse all input with .consume(). As long as nothing looks
 *      like ZMODEM, all the traffic will go to to_terminal().
 *
 *  - when a “tell-tale” sequence of bytes arrives, we create a
 *      Detection object and pass it to the “on_detect” handler.
 *
 *  - Either .confirm() or .deny() with the Detection object.
 *      This is the user’s chance to say, “yeah, I know those
 *      bytes look like ZMODEM, but they’re not. So back off!”
 *
 *      If you .confirm(), the Session object is returned, and
 *      further input that goes to the Sentry’s .consume() will
 *      go to the (now-active) Session object.
 *
 *  - Sometimes additional traffic arrives that makes it apparent
 *      that no ZMODEM session is intended to start; in this case,
 *      the Sentry marks the Detection as “stale” and calls the
 *      `on_retract` handler. Any attempt from here to .confirm()
 *      on the Detection object will prompt an exception.
 *
 *      (This “retraction” behavior will only happen prior to
 *      .confirm() or .deny() being called on the Detection object.
 *      Beyond that point, either the Session has to deal with the
 *      “garbage”, or it’s back to the terminal anyway.
 *
 *  - Once the Session object is done, the Sentry will again send
 *      all traffic to to_terminal().
 */
Zmodem.Sentry = class ZmodemSentry {

    /**
     * Invoked directly. Creates a new Sentry that inspects all
     * traffic before it goes to the terminal.
     *
     * @param {Object} options - The Sentry parameters
     *
     * @param {Function} options.to_terminal - Handler that sends
     * traffic to the terminal object. Receives an iterable object
     * (e.g., an Array) that contains octet numbers.
     *
     * @param {Function} options.on_detect - Handler for new
     * detection events. Receives a new Detection object.
     *
     * @param {Function} options.on_retract - Handler for retraction
     * events. Receives no input.
     *
     * @param {Function} options.sender - Handler that sends traffic to
     * the peer. If, for example, your application uses WebSocket to talk
     * to the peer, use this to send data to the WebSocket instance.
     */
    constructor(options) {
        if (!options) throw "Need options!";

        var sentry = this;
        SENTRY_CONSTRUCTOR_REQUIRED_ARGS.forEach( function(arg) {
            if (!options[arg]) {
                throw "Need “" + arg + "”!";
            }
            sentry["_" + arg] = options[arg];
        } );

        this._cache = [];
    }

    _after_session_end() {
        this._zsession = null;
    }

    /**
     * “Consumes” a piece of input:
     *
     *  - If there is no active or pending ZMODEM session, the text is
     *      all output. (This is regardless of whether we’ve got a new
     *      Detection.)
     *
     *  - If there is no active ZMODEM session and the input **ends** with
     *      a ZRINIT or ZRQINIT, then a new Detection object is created,
     *      and it is passed to the “on_detect” function.
     *      If there was another pending Detection object, it is retracted.
     *
     *  - If there is no active ZMODEM session and the input does NOT end
     *      with a ZRINIT or ZRQINIT, then any pending Detection object is
     *      retracted.
     *
     *  - If there is an active ZMODEM session, the input is passed to it.
     *      Any non-ZMODEM data (i.e., “garbage”) parsed from the input
     *      is sent to output.
     *      If the ZMODEM session ends, any post-ZMODEM part of the input
     *      is sent to output.
     *
     *  @param {number[] | ArrayBuffer} input - Octets to parse as input.
     */
    consume(input) {
        if (!(input instanceof Array)) {
            input = Array.prototype.slice.call( new Uint8Array(input) );
        }

        if (this._zsession) {
            var session_before_consume = this._zsession;

            session_before_consume.consume(input);

            if (session_before_consume.has_ended()) {
                if (session_before_consume.type === "receive") {
                    input = session_before_consume.get_trailing_bytes();
                }
                else {
                    input = [];
                }
            }
            else return;
        }

        var new_session = this._parse(input);
        var to_terminal = input;

        if (new_session) {
            let replacement_detect = !!this._parsed_session;

            if (replacement_detect) {
                //no terminal output if the new session is of the
                //same type as the old
                if (this._parsed_session.type === new_session.type) {
                    to_terminal = [];
                }

                this._on_retract();
            }

            this._parsed_session = new_session;

            var sentry = this;

            function checker() {
                return sentry._parsed_session === new_session;
            }

            //This runs with the Sentry object as the context.
            function accepter() {
                if (!this.is_valid()) {
                    throw "Stale ZMODEM session!";
                }

                new_session.on("garbage", sentry._to_terminal);

                new_session.on(
                    "session_end",
                    sentry._after_session_end.bind(sentry)
                );

                new_session.set_sender(sentry._sender);

                delete sentry._parsed_session;

                return sentry._zsession = new_session;
            };

            function denier() {
                if (!this.is_valid()) return;
            };

            this._on_detect( new Detection(
                new_session.type,
                accepter,
                this._send_abort.bind(this),
                checker
            ) );
        }
        else {
            /*
            if (this._parsed_session) {
                this._session_stale_because = 'Non-ZMODEM output received after ZMODEM initialization.';
            }
            */

            var expired_session = this._parsed_session;

            this._parsed_session = null;

            if (expired_session) {

                //If we got a single “C” after parsing a session,
                //that means our peer is trying to downgrade to YMODEM.
                //That won’t work, so we just send the ABORT_SEQUENCE
                //right away.
                if (to_terminal.length === 1 && to_terminal[0] === 67) {
                    this._send_abort();
                }

                this._on_retract();
            }
        }

        this._to_terminal(to_terminal);
    }

    /**
     * @return {Session|null} The sentry’s current Session object, or
     *      null if there is none.
     */
    get_confirmed_session() {
        return this._zsession || null;
    }

    _send_abort() {
        this._sender( Zmodem.ZMLIB.ABORT_SEQUENCE );
    }

    /**
     * Parse an input stream and decide how much of it goes to the
     * terminal or to a new Session object.
     *
     * This will accommodate input strings that are fragmented
     * across calls to this function; e.g., if you send the first
     * two bytes at the end of one parse() call then send the rest
     * at the beginning of the next, parse() will recognize it as
     * the beginning of a ZMODEM session.
     *
     * In order to keep from blocking any actual useful data to the
     * terminal in real-time, this will send on the initial
     * ZRINIT/ZRQINIT bytes to the terminal. They’re meant to go to the
     * terminal anyway, so that should be fine.
     *
     * @private
     *
     * @param {Array|Uint8Array} array_like - The input bytes.
     *      Each member should be a number between 0 and 255 (inclusive).
     *
     * @return {Array} A two-member list:
     *      0) the bytes that should be printed on the terminal
     *      1) the created Session object (if any)
     */
    _parse(array_like) {
        var cache = this._cache;

        cache.push.apply( cache, array_like );

        while (true) {
            let common_hex_at = Zmodem.ZMLIB.find_subarray( cache, COMMON_ZM_HEX_START );
            if (-1 === common_hex_at) break;

            let before_common_hex = cache.splice(0, common_hex_at);
            let zsession;
            try {
                zsession = Zmodem.Session.parse(cache);
            } catch(err) {     //ignore errors
                //console.log(err);
            }

            if (!zsession) break;

            //Don’t need to parse the trailing XON.
            if ((cache.length === 1) && (cache[0] === Zmodem.ZMLIB.XON)) {
                cache.shift();
            }

            //If there are still bytes in the cache,
            //then we don’t have a ZMODEM session. This logic depends
            //on the sender only sending one initial header.
            return cache.length ? null : zsession;
        }

        cache.splice( MAX_ZM_HEX_START_LENGTH );

        return null;
    }
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Zmodem = module.exports;

/**
 * This is where the protocol-level logic lives: the interaction of ZMODEM
 * headers and subpackets. The logic here is not unlikely to need tweaking
 * as little edge cases crop up.
 */

Object.assign(
    Zmodem,
    __webpack_require__(2),
    __webpack_require__(10),
    __webpack_require__(3),
    __webpack_require__(0),
    __webpack_require__(11),
    __webpack_require__(13),
    __webpack_require__(14),
    __webpack_require__(1)
);

const
    //pertinent to this module
    KEEPALIVE_INTERVAL = 5000,

    //We ourselves don’t need ESCCTL, so we don’t send it;
    //however, we always expect to receive it in ZRINIT.
    //See _ensure_receiver_escapes_ctrl_chars() for more details.
    ZRINIT_FLAGS = [
        "CANFDX",   //full duplex
        "CANOVIO",  //overlap I/O

        //lsz has a buffer overflow bug that shows itself when:
        //
        //  - 16-bit CRC is used, and
        //  - lsz receives the abort sequence while sending a file
        //
        //To avoid this, we just tell lsz to use 32-bit CRC
        //even though there is otherwise no reason. This ensures that
        //unfixed lsz versions will avoid the buffer overflow.
        "CANFC32",
    ],

    //We do this because some WebSocket shell servers
    //(e.g., xterm.js’s demo server) enable the IEXTEN termios flag,
    //which bars 0x0f and 0x16 from reaching the shell process,
    //which results in transmission errors.
    FORCE_ESCAPE_CTRL_CHARS = true,

    DEFAULT_RECEIVE_INPUT_MODE = "spool_uint8array",

    //pertinent to ZMODEM
    MAX_CHUNK_LENGTH = 8192,    //1 KiB officially, but lrzsz allows 8192
    BS = 0x8,
    OVER_AND_OUT = [ 79, 79 ],
    ABORT_SEQUENCE = Zmodem.ZMLIB.ABORT_SEQUENCE
;

/**
 * A base class for objects that have events.
 *
 * @private
 */
class _Eventer {

    /**
     * Not called directly.
     */
    constructor() {
        this._on_evt = {};
        this._evt_once_index = {};
    }

    _Add_event(evt_name) {
        this._on_evt[evt_name] = [];
        this._evt_once_index[evt_name] = [];
    }

    _get_evt_queue(evt_name) {
        if (!this._on_evt[evt_name]) {
            throw( "Bad event: " + evt_name );
        }

        return this._on_evt[evt_name];
    }

    /**
     * Register a callback for a given event.
     *
     * @param {string} evt_name - The name of the event.
     *
     * @param {Function} todo - The function to execute when the event happens.
     */
    on(evt_name, todo) {
        var queue = this._get_evt_queue(evt_name);

        queue.push(todo);

        return this;
    }

    /**
     * Unregister a callback for a given event.
     *
     * @param {string} evt_name - The name of the event.
     *
     * @param {Function} [todo] - The function to execute when the event
     *  happens. If not given, the last event registered for the event
     *  is unregistered.
     */
    off(evt_name, todo) {
        var queue = this._get_evt_queue(evt_name);

        if (todo) {
            var at = queue.indexOf(todo);
            if (at === -1) {
                throw("“" + todo + "” is not in the “" + evt_name + "” queue.");
            }
            queue.splice(at, 1);
        }
        else {
            queue.pop();
        }

        return this;
    }

    _Happen(evt_name /*, arg0, arg1, .. */) {
        var queue = this._get_evt_queue(evt_name);   //might as well validate

        //console.info("EVENT", this, arguments);

        var args = Array.apply(null, arguments);
        args.shift();

        var sess = this;

        queue.forEach( function(cb) { cb.apply(sess, args) } );

        return queue.length;
    }
}

/**
 * The Session classes handle the protocol-level logic.
 * These shield the user from dealing with headers and subpackets.
 * This is a base class with functionality common to both Receive
 * and Send subclasses.
 *
 * @extends _Eventer
*/
Zmodem.Session = class ZmodemSession extends _Eventer {

    /**
     * Parse out a hex header from the given array.
     * If there’s a ZRQINIT or ZRINIT at the beginning,
     * we’ll return it. If the input isn’t a header,
     * for whatever reason, we return undefined.
     *
     * @param {number[]} octets - The bytes to parse.
     *
     * @return {Session|undefined} A Session object if the beginning
     *      of a session was parsable in “octets”; otherwise undefined.
     */
    static parse( octets ) {

        //Will need to trap errors.
        var hdr;
        try {
            hdr = Zmodem.Header.parse_hex(octets);
        }
        catch(e) {     //Don’t report since we aren’t in session

            //debug
            //console.warn("No hex header: ", e);

            return;
        }

        if (!hdr) return;

        switch (hdr.NAME) {
            case "ZRQINIT":
                //throw if ZCOMMAND
                return new Zmodem.Session.Receive();
            case "ZRINIT":
                return new Zmodem.Session.Send(hdr);
        }

        //console.warn("Invalid first Zmodem header", hdr);
    }

    /**
     * Sets the sender function that a Session object will use.
     *
     * @param {Function} sender_func - The function to call.
     *      It will receive an Array with the relevant octets.
     *
     * @return {Session} The session object (for chaining).
     */
    set_sender(sender_func) {
        this._sender = sender_func;
        return this;
    }

    /**
     * Whether the current Session has ended.
     *
     * @returns {boolean} The ended state.
     */
    has_ended() { return this._has_ended() }

    /**
     * Consumes an array of octets as ZMODEM session input.
     *
     * @param {number[]} octets - The input octets.
     */
    consume(octets) {
        this._before_consume(octets);

        if (this._aborted) throw new Zmodem.Error('already_aborted');

        if (!octets.length) return;

        this._strip_and_enqueue_input(octets);

        if (!this._check_for_abort_sequence(octets)) {
            this._consume_first();
        }

        return;
    }

    /**
     * Whether the current Session has been `abort()`ed.
     *
     * @returns {boolean} The aborted state.
     */
    aborted() { return !!this._aborted }

    /**
     * Not called directly.
     */
    constructor() {
        super();
        //if (!sender_func) throw "Need sender!";

        //this._first_header = first_header;
        //this._sender = sender_func;
        this._config = {};

        //this._input = new ZInput();

        this._input_buffer = [];

        //This is mostly for debugging.
        this._Add_event("receive");
        this._Add_event("garbage");
        this._Add_event("session_end");
    }

    /**
     * Returns the Session object’s role.
     *
     * @returns {string} One of:
     * - `receive`
     * - `send`
     */
    get_role() { return this.type }

    _trim_leading_garbage_until_header() {
        var garbage = Zmodem.Header.trim_leading_garbage(this._input_buffer);

        if (garbage.length) {
            if (this._Happen("garbage", garbage) === 0) {
                console.debug(
                    "Garbage: ",
                    String.fromCharCode.apply(String, garbage),
                    garbage
                );
            }
        }
    }

    _parse_and_consume_header() {
        this._trim_leading_garbage_until_header();

        var new_header_and_crc = Zmodem.Header.parse(this._input_buffer);
        if (!new_header_and_crc) return;

        //console.log("RECEIVED HEADER", new_header_and_crc[0]);

        this._consume_header(new_header_and_crc[0]);

        this._last_header_name = new_header_and_crc[0].NAME;
        this._last_header_crc = new_header_and_crc[1];

        return new_header_and_crc[0];
    }

    _consume_header(new_header) {
        this._on_receive(new_header);

        var handler = this._next_header_handler[ new_header.NAME ];
        if (!handler) {
            console.error("Unhandled header!", new_header, this._next_header_handler);
            throw new Zmodem.Error( "Unhandled header: " + new_header.NAME );
        }

        this._next_header_handler = null;

        handler.call(this, new_header);
    }

    //TODO: strip out the abort sequence
    _check_for_abort_sequence() {
        var abort_at = Zmodem.ZMLIB.find_subarray( this._input_buffer, ABORT_SEQUENCE );

        if (abort_at !== -1) {

            //TODO: expose this to caller
            this._input_buffer.splice( 0, abort_at + ABORT_SEQUENCE.length );

            this._aborted = true;

            //TODO compare response here to lrzsz.
            this._on_session_end();

            //We shouldn’t ever expect to receive an abort. Even if we
            //have sent an abort ourselves, the Sentry should have stopped
            //directing input to this Session object.
            //if (this._expect_abort) {
            //    return true;
            //}

            throw new Zmodem.Error("peer_aborted");
        }
    }

    _send_header(name /*, args */) {
        if (!this._sender) throw "Need sender!";

        var args = Array.apply( null, arguments );

        var bytes_hdr = this._create_header_bytes(args);

        this._sender(bytes_hdr[0]);

        this._last_sent_header = bytes_hdr[1];
    }

    _create_header_bytes(name_and_args) {

        var hdr = Zmodem.Header.build.apply( Zmodem.Header, name_and_args );

        //console.log( this.type, "SENDING HEADER", hdr );

        var formatter = this._get_header_formatter(name_and_args[0]);

        return [
            hdr[formatter](this._zencoder),
            hdr
        ];
    }

    _strip_and_enqueue_input(input) {
        Zmodem.ZMLIB.strip_ignored_bytes(input);

        //It’s possible that “input” is empty at this point.
        //It doesn’t seem to hurt anything to keep processing, though.

        this._input_buffer.push.apply( this._input_buffer, input );
    }

    /**
     * **STOP!** You probably want to `skip()` an Offer rather than
     * `abort()`. See below.
     *
     * Abort the current session by sending the ZMODEM abort sequence.
     * This function will cause the Session object to refuse to send
     * any further data.
     *
     * Zmodem.Sentry is configured to send all output to the terminal
     * after a session’s `abort()`. That could result in lots of
     * ZMODEM garble being sent to the JavaScript terminal, which you
     * probably don’t want.
     *
     * `skip()` on an Offer is better because Session will continue to
     * discard data until we reach either another file or the
     * sender-initiated end of the ZMODEM session. So no ZMODEM garble,
     * and the session will end successfully.
     *
     * The behavior of `abort()` is subject to change since it’s not
     * very useful as currently implemented.
     */
    abort() {

        //this._expect_abort = true;

        //From Forsberg:
        //
        //The Cancel sequence consists of eight CAN characters
        //and ten backspace characters. ZMODEM only requires five
        //Cancel characters; the other three are "insurance".
        //The trailing backspace characters attempt to erase
        //the effects of the CAN characters if they are
        //received by a command interpreter.
        //
        //FG: Since we assume our connection is reliable, there’s
        //no reason to send more than 5 CANs.
        this._sender(
            ABORT_SEQUENCE.concat([ BS, BS, BS, BS, BS ])
        );

        this._aborted = true;
        this._sender = function() {
            throw new Zmodem.Error('already_aborted');
        };

        this._on_session_end();

        return;
    }

    //----------------------------------------------------------------------
    _on_session_end() {
        this._Happen("session_end");
    }

    _on_receive(hdr_or_pkt) {
        this._Happen("receive", hdr_or_pkt);
    }

    _before_consume() {}
}

function _trim_OO(array) {
    if (0 === Zmodem.ZMLIB.find_subarray(array, OVER_AND_OUT)) {
        array.splice(0, OVER_AND_OUT.length);
    }

    //TODO: This assumes OVER_AND_OUT is 2 bytes long. No biggie, but.
    else if ( array[0] === OVER_AND_OUT[ OVER_AND_OUT.length - 1 ] ) {
        array.splice(0, 1);
    }

    return array;
}

/** A class for ZMODEM receive sessions.
 *
 * @extends Session
 */
Zmodem.Session.Receive = class ZmodemReceiveSession extends Zmodem.Session {
    //We only get 1 file at a time, so on each consume() either
    //continue state for the current file or start a new one.

    /**
     * Not called directly.
     */
    constructor() {
        super();

        this._Add_event("offer");
        this._Add_event("data_in");
        this._Add_event("file_end");
    }

    /**
     * Consume input bytes from the sender.
     *
     * @private
     * @param {number[]} octets - The bytes to consume.
     */
    _before_consume(octets) {
        if (this._bytes_after_OO) {
            throw "PROTOCOL: Session is completed!";
        }

        //Put this here so that our logic later on has access to the
        //input string and can populate _bytes_after_OO when the
        //session ends.
        this._bytes_being_consumed = octets;
    }

    /**
     * Return any bytes that have been `consume()`d but
     * came after the end of the ZMODEM session.
     *
     * @returns {number[]} The trailing bytes.
     */
    get_trailing_bytes() {
        if (this._aborted) return [];

        if (!this._bytes_after_OO) {
            throw "PROTOCOL: Session is not completed!";
        }

        return this._bytes_after_OO.slice(0);
    }

    _has_ended() { return this.aborted() || !!this._bytes_after_OO }

    //Receiver always sends hex headers.
    _get_header_formatter() { return "to_hex" }

    _parse_and_consume_subpacket() {
        var parse_func;
        if (this._last_header_crc === 16) {
            parse_func = "parse16";
        }
        else {
            parse_func = "parse32";
        }

        var subpacket = Zmodem.Subpacket[parse_func](this._input_buffer);

        //console.log("RECEIVED SUBPACKET", subpacket);

        if (subpacket) {
            this._consume_data(subpacket);

            //What state are we in if the subpacket indicates frame end
            //but we haven’t gotten ZEOF yet? Can anything other than ZEOF
            //follow after a ZDATA?
            if (subpacket.frame_end()) {
                this._next_subpacket_handler = null;
            }
        }

        return subpacket;
    }

    _consume_first() {
        if (this._got_ZFIN) {
            if (this._input_buffer.length < 2) return;

            //if it’s OO, then set this._bytes_after_OO
            if (Zmodem.ZMLIB.find_subarray(this._input_buffer, OVER_AND_OUT) === 0) {

                //This doubles as an indication that the session has ended.
                //We need to set this right away so that handlers like
                //"session_end" will have access to it.
                this._bytes_after_OO = _trim_OO(this._bytes_being_consumed.slice(0));
                this._on_session_end();

                return;
            }
            else {
                throw( "PROTOCOL: Only thing after ZFIN should be “OO” (79,79), not: " + array_buf.join() );
            }
        }

        var parsed;
        do {
            if (this._next_subpacket_handler) {
                parsed = this._parse_and_consume_subpacket();
            }
            else {
                parsed = this._parse_and_consume_header();
            }
        } while (parsed && this._input_buffer.length);
    }

    _consume_data(subpacket) {
        this._on_receive(subpacket);

        if (!this._next_subpacket_handler) {
            throw( "PROTOCOL: Received unexpected data packet after " + this._last_header_name + " header: " + subpacket.get_payload().join() );
        }

        this._next_subpacket_handler.call(this, subpacket);
    }

    _octets_to_string(octets) {
        if (!this._textdecoder) {
            this._textdecoder = new Zmodem.Text.Decoder();
        }

        return this._textdecoder.decode( new Uint8Array(octets) );
    }

    _consume_ZFILE_data(hdr, subpacket) {
        if (this._file_info) {
            throw "PROTOCOL: second ZFILE data subpacket received";
        }

        var packet_payload = subpacket.get_payload();
        var nul_at = packet_payload.indexOf(0);

        //
        var fname = this._octets_to_string( packet_payload.slice(0, nul_at) );
        var the_rest = this._octets_to_string( packet_payload.slice( 1 + nul_at ) ).split(" ");

        var mtime = the_rest[1] && parseInt( the_rest[1], 8 ) || undefined;
        if (mtime) {
            mtime = new Date(mtime * 1000);
        }

        this._file_info = {
            name: fname,
            size: the_rest[0] ? parseInt( the_rest[0], 10 ) : null,
            mtime: mtime || null,
            mode: the_rest[2] && parseInt( the_rest[2], 8 ) || null,
            serial: the_rest[3] && parseInt( the_rest[3], 10 ) || null,

            files_remaining: the_rest[4] ? parseInt( the_rest[4], 10 ) : null,
            bytes_remaining: the_rest[5] ? parseInt( the_rest[5], 10 ) : null,
        };

        //console.log("ZFILE", hdr);

        var xfer = new Offer(
            hdr.get_options(),
            this._file_info,
            this._accept.bind(this),
            this._skip.bind(this)
        );
        this._current_transfer = xfer;

        //this._Happen("offer", xfer);
    }

    _consume_ZDATA_data(subpacket) {
        if (!this._accepted_offer) {
            throw "PROTOCOL: Received data without accepting!";
        }

        //TODO: Probably should include some sort of preventive against
        //infinite loop here: if the peer hasn’t sent us what we want after,
        //say, 10 ZRPOS headers then we should send ZABORT and just end.
        if (!this._offset_ok) {
            console.warn("offset not ok!");
            _send_ZRPOS();
            return;
        }

        this._file_offset += subpacket.get_payload().length;
        this._on_data_in(subpacket);

        /*
        console.warn("received error from data_in callback; retrying", e);
        throw "unimplemented";
        */

        if (subpacket.ack_expected() && !subpacket.frame_end()) {
            this._send_header( "ZACK", Zmodem.ENCODELIB.pack_u32_le(this._file_offset) );
        }
    }

    _make_promise_for_between_files() {
        var sess = this;

        return new Promise( function(res) {
            var between_files_handler = {
                ZFILE: function(hdr) {
                    this._next_subpacket_handler = function(subpacket) {
                        this._next_subpacket_handler = null;
                        this._consume_ZFILE_data(hdr, subpacket);
                        this._Happen("offer", this._current_transfer);
                        res(this._current_transfer);
                    };
                },

                //We use this as a keep-alive. Maybe other
                //implementations do, too?
                ZSINIT: function(hdr) {
                    //The content of this header doesn’t affect us
                    //since all it does is tell us details of how
                    //the sender will ZDLE-encode binary data. Our
                    //ZDLE parser doesn’t need to know in advance.

                    sess._next_subpacket_handler = function(spkt) {
                        sess._next_subpacket_handler = null;
                        sess._consume_ZSINIT_data(spkt);
                        sess._send_header('ZACK');
                        sess._next_header_handler = between_files_handler;
                    };
                },

                ZFIN: function() {
                    this._consume_ZFIN();
                    res();
                },
            };

            sess._next_header_handler = between_files_handler;
        } );
    }

    _consume_ZSINIT_data(spkt) {

        //TODO: Should this be used when we signal a cancellation?
        this._attn = spkt.get_payload();
    }

    /**
     * Start the ZMODEM session by signaling to the sender that
     * we are ready for the first file offer.
     *
     * @returns {Promise} A promise that resolves with an Offer object
     * or, if the sender closes the session immediately without offering
     * anything, nothing.
     */
    start() {
        if (this._started) throw "Already started!";
        this._started = true;

        var ret = this._make_promise_for_between_files();

        this._send_ZRINIT();

        return ret;
    }

    //Returns a promise that’s fulfilled when the file
    //transfer is done.
    //
    //  That ZEOF promise return is another promise that’s
    //  fulfilled when we get either ZFIN or another ZFILE.
    _accept(offset) {
        this._accepted_offer = true;
        this._file_offset = offset || 0;

        var sess = this;

        var ret = new Promise( function(resolve_accept) {
            var last_ZDATA;

            sess._next_header_handler = {
                ZDATA: function on_ZDATA(hdr) {
                    this._consume_ZDATA(hdr);

                    this._next_subpacket_handler = this._consume_ZDATA_data;

                    this._next_header_handler = {
                        ZEOF: function on_ZEOF(hdr) {
                            this._next_subpacket_handler = null;
                            this._consume_ZEOF(hdr);

                            var next_promise = this._make_promise_for_between_files();
                            resolve_accept(next_promise);
                        },
                    };
                },
            };
        } );

        this._send_ZRPOS();

        return ret;
    }

    _skip() {
        var ret = this._make_promise_for_between_files();

        if (this._accepted_offer) {
            //For cancel of an in-progress transfer from lsz,
            //it’s necessary to avoid this buffer overflow bug:
            //
            //  https://github.com/gooselinux/lrzsz/blob/master/lrzsz-0.12.20.patch
            //
            //… which we do by asking for CRC32 from lsz.

            //We might or might not have consumed ZDATA.
            //The sender also might or might not send a ZEOF before it
            //parses the ZSKIP. Thus, we want to ignore the following:
            //
            //  - ZDATA
            //  - ZDATA then ZEOF
            //  - ZEOF
            //
            //… and just look for the next between-file header.

            var bound_make_promise_for_between_files = function() {

                //Once this happens we fail on any received data packet.
                //So it needs not to happen until we’ve received a header.
                this._accepted_offer = false;
                this._next_subpacket_handler = null;

                this._make_promise_for_between_files();
            }.bind(this);

            Object.assign(
                this._next_header_handler,
                {
                    ZEOF: bound_make_promise_for_between_files,
                    ZDATA: function() {
                        bound_make_promise_for_between_files();
                        this._next_header_handler.ZEOF = bound_make_promise_for_between_files;
                    }.bind(this),
                }
            );
        }

        //this._accepted_offer = false;

        this._file_info = null;

        this._send_header( "ZSKIP" );

        return ret;
    }

    _send_ZRINIT() {
        this._send_header( "ZRINIT", ZRINIT_FLAGS );
    }

    _consume_ZFIN() {
        this._got_ZFIN = true;
        this._send_header( "ZFIN" );
    }

    _consume_ZEOF(header) {
        if (this._file_offset !== header.get_offset()) {
            throw( "ZEOF offset mismatch; unimplemented (local: " + this._file_offset + "; ZEOF: " + header.get_offset() + ")" );
        }

        this._send_ZRINIT();

        this._on_file_end();

        //Preserve these two so that file_end callbacks
        //will have the right information.
        this._file_info = null;
        this._current_transfer = null;
    }

    _consume_ZDATA(header) {
        if ( this._file_offset === header.get_offset() ) {
            this._offset_ok = true;
        }
        else {
            throw "Error correction is unimplemented.";
        }
    }

    _send_ZRPOS() {
        this._send_header( "ZRPOS", this._file_offset );
    }

    //----------------------------------------------------------------------
    //events

    _on_file_end() {
        this._Happen("file_end");

        if (this._current_transfer) {
            this._current_transfer._Happen("complete");
            this._current_transfer = null;
        }
    }

    _on_data_in(subpacket) {
        this._Happen("data_in", subpacket);

        if (this._current_transfer) {
            this._current_transfer._Happen("input", subpacket.get_payload());
        }
    }
}

Object.assign(
    Zmodem.Session.Receive.prototype,
    {
        type: "receive",
    }
);

//----------------------------------------------------------------------

/**
 * @typedef {Object} FileDetails
 *
 * @property {string} name - The name of the file.
 *
 * @property {number} [size] - The file size, in bytes.
 *
 * @property {number} [mode] - The file mode (e.g., 0100644).
 *
 * @property {Date|number} [mtime] - The file’s modification time.
 *  When expressed as a number, the unit is epoch seconds.
 *
 * @property {number} [files_remaining] - Inclusive of the current file,
 *  so this value is never less than 1.
 *
 * @property {number} [bytes_remaining] - Inclusive of the current file.
 */

/**
 * Common methods for Transfer and Offer objects.
 *
 * @mixin
 */
var Transfer_Offer_Mixin = {
    /**
     * Returns the file details object.
     * @returns {FileDetails} `mtime` is a Date.
     */
    get_details: function get_details() {
        return Object.assign( {}, this._file_info );
    },

    /**
     * Returns a parse of the ZFILE header’s payload.
     *
     * @returns {Object} Members are:
     *
     * - `conversion` (string | undefined)
     * - `management` (string | undefined)
     * - `transfer` (string | undefined)
     * - `sparse` (boolean)
     */
    get_options: function get_options() {
        return Object.assign( {}, this._zfile_opts );
    },

    /**
     * Returns the offset based on the last transferred chunk.
     * @returns {number} The file offset (i.e., number of bytes after
     *  the start of the file).
     */
    get_offset: function get_offset() {
        return this._file_offset;
    },
};

/**
 * A class to represent a sender’s interaction with a single file
 * transfer within a batch. When a receiver accepts an offer, the
 * Session instantiates this class and passes the instance as the
 * promise resolution from send_offer().
 *
 * @mixes Transfer_Offer_Mixin
 */
class Transfer {

    /**
     * Not called directly.
     */
    constructor(file_info, offset, send_func, end_func) {
        this._file_info = file_info;
        this._file_offset = offset || 0;

        this._send = send_func;
        this._end = end_func;
    }

    /**
     * Send a (non-terminal) piece of the file.
     *
     * @param { number[] | Uint8Array } array_like - The bytes to send.
     */
    send(array_like) {
        this._send(array_like);
        this._file_offset += array_like.length;
    }

    /**
     * Complete the file transfer.
     *
     * @param { number[] | Uint8Array } [array_like] - The last bytes to send.
     *
     * @return { Promise } Resolves when the receiver has indicated
     *      acceptance of the end of the file transfer.
     */
    end(array_like) {
        var ret = this._end(array_like || []);
        if (array_like) this._file_offset += array_like.length;
        return ret;
    }
}
Object.assign( Transfer.prototype, Transfer_Offer_Mixin );

/**
 * A class to represent a receiver’s interaction with a single file
 * transfer offer within a batch. There is functionality here to
 * skip or accept offered files and either to spool the packet
 * payloads or to handle them yourself.
 *
 * @mixes Transfer_Offer_Mixin
 */
class Offer extends _Eventer {

    /**
     * Not called directly.
     */
    constructor(zfile_opts, file_info, accept_func, skip_func) {
        super();

        this._zfile_opts = zfile_opts;
        this._file_info = file_info;

        this._accept_func = accept_func;
        this._skip_func = skip_func;

        this._Add_event("input");
        this._Add_event("complete");

        //Register this first so that application handlers receive
        //the updated offset.
        this.on("input", this._input_handler);
    }

    _verify_not_skipped() {
        if (this._skipped) {
            throw new Zmodem.Error("Already skipped!");
        }
    }

    /**
     * Tell the sender that you don’t want the offered file.
     *
     * You can send this in lieu of `accept()` or after it, e.g.,
     * if you find that the transfer is taking too long. Note that,
     * if you `skip()` after you `accept()`, you’ll likely have to
     * wait for buffers to clear out.
     *
     */
    skip() {
        this._verify_not_skipped();
        this._skipped = true;

        return this._skip_func.apply(this, arguments);
    }

    /**
     * Tell the sender to send the offered file.
     *
     * @param {Object} [opts] - Can be:
     * @param {string} [opts.oninput=spool_uint8array] - Can be:
     *
     * - `spool_uint8array`: Stores the ZMODEM
     *     packet payloads as Uint8Array instances.
     *     This makes for an easy transition to a Blob,
     *     which JavaScript can use to save the file to disk.
     *
     * - `spool_array`: Stores the ZMODEM packet payloads
     *     as Array instances. Each value is an octet value.
     *
     * - (function): A handler that receives each payload
     *     as it arrives. The Offer object does not store
     *     the payloads internally when thus configured.
     *
     * @return { Promise } Resolves when the file is fully received.
     *      If the Offer has been spooling
     *      the packet payloads, the promise resolves with an Array
     *      that contains those payloads.
     */
    accept(opts) {
        this._verify_not_skipped();

        if (this._accepted) {
            throw new Zmodem.Error("Already accepted!");
        }
        this._accepted = true;

        if (!opts) opts = {};

        this._file_offset = opts.offset || 0;

        switch (opts.on_input) {
            case null:
            case undefined:
            case "spool_array":
            case DEFAULT_RECEIVE_INPUT_MODE:    //default
                this._spool = [];
                break;
            default:
                if (typeof opts.on_input !== "function") {
                    throw "Invalid “on_input”: " + opts.on_input;
                }
        }

        this._input_handler_mode = opts.on_input || DEFAULT_RECEIVE_INPUT_MODE;

        return this._accept_func(this._file_offset).then( this._get_spool.bind(this) );
    }

    _input_handler(payload) {
        this._file_offset += payload.length;

        if (typeof this._input_handler_mode === "function") {
            this._input_handler_mode(payload);
        }
        else {
            if (this._input_handler_mode === DEFAULT_RECEIVE_INPUT_MODE) {
                payload = new Uint8Array(payload);
            }

            //sanity
            else if (this._input_handler_mode !== "spool_array") {
                throw new Zmodem.Error("WTF?? _input_handler_mode = " + this._input_handler_mode);
            }

            this._spool.push(payload);
        }
    }

    _get_spool() {
        return this._spool;
    }
}
Object.assign( Offer.prototype, Transfer_Offer_Mixin );

//Curious that ZSINIT isn’t here … but, lsz sends it as hex.
const SENDER_BINARY_HEADER = {
    ZFILE: true,
    ZDATA: true,
};

/**
 * A class that encapsulates behavior for a ZMODEM sender.
 *
 * @extends Session
 */
Zmodem.Session.Send = class ZmodemSendSession extends Zmodem.Session {

    /**
     * Not called directly.
     */
    constructor(zrinit_hdr) {
        super();

        if (!zrinit_hdr) {
            throw "Need first header!";
        }
        else if (zrinit_hdr.NAME !== "ZRINIT") {
            throw("First header should be ZRINIT, not " + zrinit_hdr.NAME);
        }

        this._last_header_name = 'ZRINIT';

        //We don’t need to send crc32. Even if the other side can grok it,
        //there’s no point to sending it since, for now, we assume we’re
        //on a reliable connection, e.g., TCP. Ideally we’d just forgo
        //CRC checks completely, but ZMODEM doesn’t allow that.
        //
        //If we *were* to start using crc32, we’d update this every time
        //we send a header.
        this._subpacket_encode_func = 'encode16';

        this._zencoder = new Zmodem.ZDLE();

        this._consume_ZRINIT(zrinit_hdr);

        this._file_offset = 0;

        var zrqinit_count = 0;

        this._start_keepalive_on_set_sender = true;

        //lrzsz will send ZRINIT until it gets an offer. (keep-alive?)
        //It sends 4 additional ones after the initial ZRINIT and, if
        //no response is received, starts sending “C” (0x43, 67) as if to
        //try to downgrade to XMODEM or YMODEM.
        //var sess = this;
        //this._prepare_to_receive_ZRINIT( function keep_alive() {
        //    sess._prepare_to_receive_ZRINIT(keep_alive);
        //} );

        //queue up the ZSINIT flag to send -- but seems useless??

        /*
        Object.assign(
            this._on_evt,
            {
                file_received: [],
            },
        };
        */
    }

    /**
     * Sets the sender function. The first time this is called,
     * it will also initiate a keepalive using ZSINIT until the
     * first file is sent.
     *
     * @param {Function} func - The function to call.
     *  It will receive an Array with the relevant octets.
     *
     * @return {Session} The session object (for chaining).
     */
    set_sender(func) {
        super.set_sender(func);

        if (this._start_keepalive_on_set_sender) {
            this._start_keepalive_on_set_sender = false;
            this._start_keepalive();
        }

        return this;
    }

    //7.3.3 .. The sender also uses hex headers when they are
    //not followed by binary data subpackets.
    //
    //FG: … or when the header is ZSINIT? That’s what lrzsz does, anyway.
    //Then it sends a single NUL byte as the payload to an end_ack subpacket.
    _get_header_formatter(name) {
        return SENDER_BINARY_HEADER[name] ? "to_binary16" : "to_hex";
    }

    //In order to keep lrzsz from timing out, we send ZSINIT every 5 seconds.
    //Maybe make this configurable?
    _start_keepalive() {
        //if (this._keepalive_promise) throw "Keep-alive already started!";
        if (!this._keepalive_promise) {
            var sess = this;

            this._keepalive_promise = new Promise(function(resolve) {
                //console.log("SETTING KEEPALIVE TIMEOUT");
                sess._keepalive_timeout = setTimeout(resolve, KEEPALIVE_INTERVAL);
            }).then( function() {
                sess._next_header_handler = {
                    ZACK: function() {

                        //We’re going to need to ensure that the
                        //receiver is ready for all control characters
                        //to be escaped. If we’ve already sent a ZSINIT
                        //and gotten a response, then we know that that
                        //work is already done later on when we actually
                        //send an offer.
                        sess._got_ZSINIT_ZACK = true;
                    },
                };
                sess._send_ZSINIT();

                sess._keepalive_promise = null;
                sess._start_keepalive();
            });
        }
    }

    _stop_keepalive() {
        if (this._keepalive_promise) {
            //console.log("STOPPING KEEPALIVE");
            clearTimeout(this._keepalive_timeout);
            this._keep_alive_promise = null;
        }
    }

    _send_ZSINIT() {
        //See note at _ensure_receiver_escapes_ctrl_chars()
        //for why we have to pass ESCCTL.

        var zsinit_flags = [];
        if (this._zencoder.escapes_ctrl_chars()) {
            zsinit_flags.push("ESCCTL");
        }

        this._send_header_and_data(
            ["ZSINIT", zsinit_flags],
            [0],
            "end_ack"
        );
    }

    _consume_ZRINIT(hdr) {
        this._last_ZRINIT = hdr;

        if (hdr.get_buffer_size()) {
            throw( "Buffer size (" + hdr.get_buffer_size() + ") is unsupported!" );
        }

        if (!hdr.can_full_duplex()) {
            throw( "Half-duplex I/O is unsupported!" );
        }

        if (!hdr.can_overlap_io()) {
            throw( "Non-overlap I/O is unsupported!" );
        }

        if (hdr.escape_8th_bit()) {
            throw( "8-bit escaping is unsupported!" );
        }

        if (FORCE_ESCAPE_CTRL_CHARS) {
            this._zencoder.set_escape_ctrl_chars(true);
            if (!hdr.escape_ctrl_chars()) {
                console.debug("Peer didn’t request escape of all control characters. Will send ZSINIT to force recognition of escaped control characters.");
            }
        }
        else {
            this._zencoder.set_escape_ctrl_chars(hdr.escape_ctrl_chars());
        }
    }

    //https://stackoverflow.com/questions/23155939/missing-0xf-and-0x16-when-binary-data-through-virtual-serial-port-pair-created-b
    //^^ Because of that, we always escape control characters.
    //The alternative would be that lrz would never receive those
    //two bytes from zmodem.js.
    _ensure_receiver_escapes_ctrl_chars() {
        var promise;

        var needs_ZSINIT = !this._last_ZRINIT.escape_ctrl_chars() && !this._got_ZSINIT_ZACK;

        if (needs_ZSINIT) {
            var sess = this;
            promise = new Promise( function(res) {
                sess._next_header_handler = {
                    ZACK: (hdr) => {
                        res();
                    },
                };
                sess._send_ZSINIT();
            } );
        }
        else {
            promise = Promise.resolve();
        }

        return promise;
    }

    _convert_params_to_offer_payload_array(params) {
        params = Zmodem.Validation.offer_parameters(params);

        var subpacket_payload = params.name + "\x00";

        var subpacket_space_pieces = [
            (params.size || 0).toString(10),
            params.mtime ? params.mtime.toString(8) : "0",
            params.mode ? (0x8000 | params.mode).toString(8) : "0",
            "0",    //serial
        ];

        if (params.files_remaining) {
            subpacket_space_pieces.push( params.files_remaining );

            if (params.bytes_remaining) {
                subpacket_space_pieces.push( params.bytes_remaining );
            }
        }

        subpacket_payload += subpacket_space_pieces.join(" ");
        return this._string_to_octets(subpacket_payload);
    }

    /**
     * Send an offer to the receiver.
     *
     * @param {FileDetails} params - All about the file you want to transfer.
     *
     * @returns {Promise} If the receiver accepts the offer, then the
     * resolution is a Transfer object; otherwise the resolution is
     * undefined.
     */
    send_offer(params) {
        if (!params) throw "need file params!";

        if (this._sending_file) throw "Already sending file!";

        var payload_array = this._convert_params_to_offer_payload_array(params);

        this._stop_keepalive();

        var sess = this;

        var doer_func = function() {

            //return Promise object that is fulfilled when the ZRPOS or ZSKIP arrives.
            //The promise value is the byte offset, or undefined for ZSKIP.
            //If ZRPOS arrives, then send ZDATA(0) and set this._sending_file.
            var handler_setter_promise = new Promise( function(res) {
                sess._next_header_handler = {
                    ZSKIP: function() {
                        sess._start_keepalive();
                        res();
                    },
                    ZRPOS: function(hdr) {
                        sess._sending_file = true;
                        res(
                            new Transfer(
                                params,
                                hdr.get_offset(),
                                sess._send_interim_file_piece.bind(sess),
                                sess._end_file.bind(sess)
                            )
                        );
                    },
                };
            } );

            sess._send_header_and_data( ["ZFILE"], payload_array, "end_ack" );

            delete sess._sent_ZDATA;

            return handler_setter_promise;
        };

        if (FORCE_ESCAPE_CTRL_CHARS) {
            return this._ensure_receiver_escapes_ctrl_chars().then(doer_func);
        }

        return doer_func();
    }

    _send_header_and_data( hdr_name_and_args, data_arr, frameend ) {
        var bytes_hdr = this._create_header_bytes(hdr_name_and_args);

        var data_bytes = this._build_subpacket_bytes(data_arr, frameend);

        bytes_hdr[0].push.apply( bytes_hdr[0], data_bytes );

        this._sender( bytes_hdr[0] );

        this._last_sent_header = bytes_hdr[1];
    }

    _build_subpacket_bytes( bytes_arr, frameend ) {
        var subpacket = Zmodem.Subpacket.build(bytes_arr, frameend);

        return subpacket[this._subpacket_encode_func]( this._zencoder );
    }

    _build_and_send_subpacket( bytes_arr, frameend ) {
        this._sender( this._build_subpacket_bytes(bytes_arr, frameend) );
    }

    _string_to_octets(string) {
        if (!this._textencoder) {
            this._textencoder = new Zmodem.Text.Encoder();
        }

        var uint8arr = this._textencoder.encode(string);
        return Array.prototype.slice.call(uint8arr);
    }

    /*
    Potential future support for responding to ZRPOS:
    send_file_offset(offset) {
    }
    */

    /*
        Sending logic works thus:
            - ASSUME the receiver can overlap I/O (CANOVIO)
                (so fail if !CANFDX || !CANOVIO)
            - Sender opens the firehose … all ZCRCG (!end/!ack)
                until the end, when we send a ZCRCE (end/!ack)
                NB: try 8k/32k/64k chunk sizes? Looks like there’s
                no need to change the packet otherwise.
    */
    //TODO: Put this on a Transfer object similar to what Receive uses?
    _send_interim_file_piece(bytes_obj) {

        //We don’t ask the receiver to confirm because there’s no need.
        this._send_file_part(bytes_obj, "no_end_no_ack");

        //This pattern will allow
        //error-correction without buffering the entire stream in JS.
        //For now the promise is always resolved, but in the future we
        //can make it only resolve once we’ve gotten acknowledgement.
        return Promise.resolve();
    }

    _ensure_we_are_sending() {
        if (!this._sending_file) throw "Not sending a file currently!";
    }

    //This resolves once we receive ZEOF.
    _end_file(bytes_obj) {
        this._ensure_we_are_sending();

        //Is the frame-end-ness of this last packet redundant
        //with the ZEOF packet?? - No. It signals the receiver that
        //the next thing to expect is a header, not a packet.

        //no-ack, following lrzsz’s example
        this._send_file_part(bytes_obj, "end_no_ack");

        var sess = this;

        //Register this before we send ZEOF in case of local round-trip.
        //(Basically just for synchronous testing, but.)
        var ret = new Promise( function(res) {
            //console.log("UNSETTING SENDING FLAG");
            sess._sending_file = false;
            sess._prepare_to_receive_ZRINIT(res);
        } );

        this._send_header( "ZEOF", this._file_offset );

        this._file_offset = 0;

        return ret;
    }

    //Called at the beginning of our session
    //and also when we’re done sending a file.
    _prepare_to_receive_ZRINIT(after_consume) {
        this._next_header_handler = {
            ZRINIT: function(hdr) {
                this._consume_ZRINIT(hdr);
                if (after_consume) after_consume();
            },
        };
    }

    /**
     * Signal to the receiver that the ZMODEM session is wrapping up.
     *
     * @returns {Promise} Resolves when the receiver has responded to
     * our signal that the session is over.
     */
    close() {
        var ok_to_close = (this._last_header_name === "ZRINIT")
        if (!ok_to_close) {
            ok_to_close = (this._last_header_name === "ZSKIP");
        }
        if (!ok_to_close) {
            ok_to_close = (this._last_sent_header.name === "ZSINIT") &&  (this._last_header_name === "ZACK");
        }

        if (!ok_to_close) {
            throw( "Can’t close; last received header was “" + this._last_header_name + "”" );
        }

        var sess = this;

        var ret = new Promise( function(res, rej) {
            sess._next_header_handler = {
                ZFIN: function() {
                    sess._sender( OVER_AND_OUT );
                    sess._sent_OO = true;
                    sess._on_session_end();
                    res();
                },
            };
        } );

        this._send_header("ZFIN");

        return ret;
    }

    _has_ended() {
        return this.aborted() || !!this._sent_OO;
    }

    _send_file_part(bytes_obj, final_packetend) {
        if (!this._sent_ZDATA) {
            this._send_header( "ZDATA", this._file_offset );
            this._sent_ZDATA = true;
        }

        var obj_offset = 0;

        var bytes_count = bytes_obj.length;

        //We have to go through at least once in event of an
        //empty buffer, e.g., an empty end_file.
        while (true) {
            var chunk_size = Math.min(obj_offset + MAX_CHUNK_LENGTH, bytes_count) - obj_offset;

            var at_end = (chunk_size + obj_offset) >= bytes_count;

            var chunk = bytes_obj.slice( obj_offset, obj_offset + chunk_size );
            if (!(chunk instanceof Array)) {
                chunk = Array.prototype.slice.call(chunk);
            }

            this._build_and_send_subpacket(
                chunk,
                at_end ? final_packetend : "no_end_no_ack"
            );

            this._file_offset += chunk_size;
            obj_offset += chunk_size;

            if (obj_offset >= bytes_count) break;
        }
    }

    _consume_first() {
        if (!this._parse_and_consume_header()) {

            //When the ZMODEM receive program starts, it immediately sends
            //a ZRINIT header to initiate ZMODEM file transfers, or a
            //ZCHALLENGE header to verify the sending program. The receive
            //program resends its header at response time (default 10 second)
            //intervals for a suitable period of time (40 seconds total)
            //before falling back to YMODEM protocol.
            if (this._input_buffer.join() === "67") {
                throw "Receiver has fallen back to YMODEM.";
            }
        }
    }

    _on_session_end() {
        this._stop_keepalive();
        super._on_session_end();
    }
}

Object.assign(
    Zmodem.Session.Send.prototype,
    {
        type: "send",
    }
);


/***/ }),
/* 10 */
/***/ (function(module, exports) {

class _my_TextEncoder {
    encode(text) {
        text = unescape(encodeURIComponent(text));

        var bytes = new Array( text.length );

        for (var b = 0; b < text.length; b++) {
            bytes[b] = text.charCodeAt(b);
        }

        return new Uint8Array(bytes);
    }
}

class _my_TextDecoder {
    decode(bytes) {
        return decodeURIComponent( escape( String.fromCharCode.apply(String, bytes) ) );
    }
}

var Zmodem = module.exports;

/**
 * A limited-use compatibility shim for TextEncoder and TextDecoder.
 * Useful because both Edge and node.js still lack support for these
 * as of October 2017.
 *
 * @exports Text
 */
Zmodem.Text = {
    Encoder: (typeof TextEncoder !== "undefined") ? TextEncoder : _my_TextEncoder,
    Decoder: (typeof TextDecoder !== "undefined") ? TextDecoder : _my_TextDecoder,
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Zmodem = module.exports;

Object.assign(
    Zmodem,
    __webpack_require__(2),
    __webpack_require__(3),
    __webpack_require__(0),
    __webpack_require__(4),
    __webpack_require__(1)
);

const ZPAD = '*'.charCodeAt(0),
    ZBIN = 'A'.charCodeAt(0),
    ZHEX = 'B'.charCodeAt(0),
    ZBIN32 = 'C'.charCodeAt(0)
;

//NB: lrzsz uses \x8a rather than \x0a where the specs
//say to use LF. For simplicity, we avoid that and just use
//the 7-bit LF character.
const HEX_HEADER_CRLF = [ 0x0d, 0x0a ];
const HEX_HEADER_CRLF_XON = HEX_HEADER_CRLF.slice(0).concat( [Zmodem.ZMLIB.XON] );

//These are more or less duplicated by the logic in trim_leading_garbage().
//
//"**" + ZDLE_CHAR + "B"
const HEX_HEADER_PREFIX = [ ZPAD, ZPAD, Zmodem.ZMLIB.ZDLE, ZHEX ];
const BINARY16_HEADER_PREFIX = [ ZPAD, Zmodem.ZMLIB.ZDLE, ZBIN ];
const BINARY32_HEADER_PREFIX = [ ZPAD, Zmodem.ZMLIB.ZDLE, ZBIN32 ];

/** Class that represents a ZMODEM header. */
Zmodem.Header = class ZmodemHeader {

    //lrzsz’s “sz” command sends a random (?) CR/0x0d byte
    //after ZEOF. Let’s accommodate 0x0a, 0x0d, 0x8a, and 0x8d.
    //
    //Also, when you skip a file, sz outputs a message about it.
    //
    //It appears that we’re supposed to ignore anything until
    //[ ZPAD, ZDLE ] when we’re looking for a header.

    /**
     * Weed out the leading bytes that aren’t valid to start a ZMODEM header.
     *
     * @param {number[]} ibuffer - The octet values to parse.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *      This object is mutated in the function.
     *
     * @returns {number[]} The octet values that were removed from the start
     *      of “ibuffer”. Order is preserved.
     */
    static trim_leading_garbage(ibuffer) {
        //Since there’s no escaping of the output it’s possible
        //that the garbage could trip us up, e.g., by having a filename
        //be a legit ZMODEM header. But that’s pretty unlikely.

        //Everything up to the first ZPAD: garbage
        //If first ZPAD has asterisk + ZDLE

        var garbage = [];

        var discard_all, parser, next_ZPAD_at_least = 0;

      TRIM_LOOP:
        while (ibuffer.length && !parser) {
            var first_ZPAD = ibuffer.indexOf(ZPAD);

            //No ZPAD? Then we purge the input buffer cuz it’s all garbage.
            if (first_ZPAD === -1) {
                discard_all = true;
                break TRIM_LOOP;
            }
            else {
                garbage.push.apply( garbage, ibuffer.splice(0, first_ZPAD) );

                //buffer has only an asterisk … gotta see about more
                if (ibuffer.length < 2) {
                    break TRIM_LOOP;
                }
                else if (ibuffer[1] === ZPAD) {
                    //Two leading ZPADs should be a hex header.

                    //We’re assuming the length of the header is 4 in
                    //this logic … but ZMODEM isn’t likely to change, so.
                    if (ibuffer.length < HEX_HEADER_PREFIX.length) {
                        if (ibuffer.join() === HEX_HEADER_PREFIX.slice(0, ibuffer.length).join()) {
                            //We have an incomplete fragment that matches
                            //HEX_HEADER_PREFIX. So don’t trim any more.
                            break TRIM_LOOP;
                        }

                        //Otherwise, we’ll discard one.
                    }
                    else if ((ibuffer[2] === HEX_HEADER_PREFIX[2]) && (ibuffer[3] === HEX_HEADER_PREFIX[3])) {
                        parser = _parse_hex;
                    }
                }
                else if (ibuffer[1] === Zmodem.ZMLIB.ZDLE) {
                    //ZPAD + ZDLE should be a binary header.
                    if (ibuffer.length < BINARY16_HEADER_PREFIX.length) {
                        break TRIM_LOOP;
                    }

                    if (ibuffer[2] === BINARY16_HEADER_PREFIX[2]) {
                        parser = _parse_binary16;
                    }
                    else if (ibuffer[2] === BINARY32_HEADER_PREFIX[2]) {
                        parser = _parse_binary32;
                    }
                }

                if (!parser) {
                    garbage.push( ibuffer.shift() );
                }
            }
        }

        if (discard_all) {
            garbage.push.apply( garbage, ibuffer.splice(0) );
        }

        //For now we’ll throw away the parser.
        //It’s not hard for parse() to discern anyway.

        return garbage;
    }

    /**
     * Parse out a Header object from a given array of octet values.
     *
     * An exception is thrown if the given bytes are definitively invalid
     * as header values.
     *
     * @param {number[]} octets - The octet values to parse.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *      This object is mutated in the function.
     *
     * @returns {Header|undefined} An instance of the appropriate Header
     *      subclass, or undefined if not enough octet values are given
     *      to determine whether there is a valid header here or not.
     */
    static parse(octets) {
        var hdr;
        if (octets[1] === ZPAD) {
            hdr = _parse_hex(octets);
            return hdr && [ hdr, 16 ];
        }

        else if (octets[2] === ZBIN) {
            hdr = _parse_binary16(octets, 3);
            return hdr && [ hdr, 16 ];
        }

        else if (octets[2] === ZBIN32) {
            hdr = _parse_binary32(octets);
            return hdr && [ hdr, 32 ];
        }

        if (octets.length < 3) return;

        throw( "Unrecognized/unsupported octets: " + octets.join() );
    }

    /**
     * Build a Header subclass given a name and arguments.
     *
     * @param {string} name - The header type name, e.g., “ZRINIT”.
     *
     * @param {...*} args - The arguments to pass to the appropriate
     *      subclass constructor. These aren’t documented currently
     *      but are pretty easy to glean from the code.
     *
     * @returns {Header} An instance of the appropriate Header subclass.
     */
    static build(name /*, args */) {
        var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));

        //TODO: make this better
        var Ctr = FRAME_NAME_CREATOR[name];
        if (!Ctr) throw("No frame class “" + name + "” is defined!");

        args.shift();

        //Plegh!
        //https://stackoverflow.com/questions/33193310/constr-applythis-args-in-es6-classes
        var hdr = new (Ctr.bind.apply(Ctr, [null].concat(args)));

        return hdr;
    }

    /**
     * Return the octet values array that represents the object
     * in ZMODEM hex encoding.
     *
     * @returns {number[]} An array of octet values suitable for sending
     *      as binary data.
     */
    to_hex() {
        var to_crc = this._crc_bytes();

        return HEX_HEADER_PREFIX.concat(
            Zmodem.ENCODELIB.octets_to_hex( to_crc.concat( Zmodem.CRC.crc16(to_crc) ) ),
            this._hex_header_ending
        );
    }

    /**
     * Return the octet values array that represents the object
     * in ZMODEM binary encoding with a 16-bit CRC.
     *
     * @param {ZDLE} zencoder - A ZDLE instance to use for
     *      ZDLE encoding.
     *
     * @returns {number[]} An array of octet values suitable for sending
     *      as binary data.
     */
    to_binary16(zencoder) {
        return this._to_binary(zencoder, BINARY16_HEADER_PREFIX, Zmodem.CRC.crc16);
    }

    /**
     * Return the octet values array that represents the object
     * in ZMODEM binary encoding with a 32-bit CRC.
     *
     * @param {ZDLE} zencoder - A ZDLE instance to use for
     *      ZDLE encoding.
     *
     * @returns {number[]} An array of octet values suitable for sending
     *      as binary data.
     */
    to_binary32(zencoder) {
        return this._to_binary(zencoder, BINARY32_HEADER_PREFIX, Zmodem.CRC.crc32);
    }

    //This is never called directly, but only as super().
    constructor() {
        if (!this._bytes4) {
            this._bytes4 = [0, 0, 0, 0];
        }
    }

    _to_binary(zencoder, prefix, crc_func) {
        var to_crc = this._crc_bytes();

        //Both the 4-byte payload and the CRC bytes are ZDLE-encoded.
        var octets = prefix.concat(
            zencoder.encode( to_crc.concat( crc_func(to_crc) ) )
        );

        return octets;
    }

    _crc_bytes() {
        return [ this.TYPENUM ].concat(this._bytes4);
    }
}
Zmodem.Header.prototype._hex_header_ending = HEX_HEADER_CRLF_XON;

class ZRQINIT_HEADER extends Zmodem.Header {};

//----------------------------------------------------------------------

const ZRINIT_FLAG = {

    //----------------------------------------------------------------------
    // Bit Masks for ZRINIT flags byte ZF0
    //----------------------------------------------------------------------
    CANFDX: 0x01,  // Rx can send and receive true FDX
    CANOVIO: 0x02, // Rx can receive data during disk I/O
    CANBRK: 0x04,  // Rx can send a break signal
    CANCRY: 0x08,  // Receiver can decrypt -- nothing does this
    CANLZW: 0x10,  // Receiver can uncompress -- nothing does this
    CANFC32: 0x20, // Receiver can use 32 bit Frame Check
    ESCCTL: 0x40,  // Receiver expects ctl chars to be escaped
    ESC8: 0x80,    // Receiver expects 8th bit to be escaped
};

function _get_ZRINIT_flag_num(fl) {
    if (!ZRINIT_FLAG[fl]) {
        throw new Zmodem.Error("Invalid ZRINIT flag: " + fl);
    }
    return ZRINIT_FLAG[fl];
}

class ZRINIT_HEADER extends Zmodem.Header {
    constructor(flags_arr, bufsize) {
        super();
        var flags_num = 0;
        if (!bufsize) bufsize = 0;

        flags_arr.forEach( function(fl) {
            flags_num |= _get_ZRINIT_flag_num(fl);
        } );

        this._bytes4 = [
            bufsize & 0xff,
            bufsize >> 8,
            0,
            flags_num,
        ];
    }

    //undefined if nonstop I/O is allowed
    get_buffer_size() {
        return Zmodem.ENCODELIB.unpack_u16_be( this._bytes4.slice(0, 2) ) || undefined;
    }

    //Unimplemented:
    //  can_decrypt
    //  can_decompress

    //----------------------------------------------------------------------
    //function names taken from Jacques Mattheij’s implementation,
    //as used in syncterm.

    can_full_duplex() {
        return !!( this._bytes4[3] & ZRINIT_FLAG.CANFDX );
    }

    can_overlap_io() {
        return !!( this._bytes4[3] & ZRINIT_FLAG.CANOVIO );
    }

    can_break() {
        return !!( this._bytes4[3] & ZRINIT_FLAG.CANBRK );
    }

    can_fcs_32() {
        return !!( this._bytes4[3] & ZRINIT_FLAG.CANFC32 );
    }

    escape_ctrl_chars() {
        return !!( this._bytes4[3] & ZRINIT_FLAG.ESCCTL );
    }

    //Is this used? I don’t see it used in lrzsz or syncterm
    //Looks like it was a “foreseen” feature that Forsberg
    //never implemented. (The need for it went away, maybe?)
    escape_8th_bit() {
        return !!( this._bytes4[3] & ZRINIT_FLAG.ESC8 );
    }
};

//----------------------------------------------------------------------

//Since context makes clear what’s going on, we use these
//rather than the T-prefixed constants in the specification.
const ZSINIT_FLAG = {
    ESCCTL: 0x40,  // Transmitter will escape ctl chars
    ESC8: 0x80,    // Transmitter will escape 8th bit
};

function _get_ZSINIT_flag_num(fl) {
    if (!ZSINIT_FLAG[fl]) {
        throw("Invalid ZSINIT flag: " + fl);
    }
    return ZSINIT_FLAG[fl];
}

class ZSINIT_HEADER extends Zmodem.Header {
    constructor( flags_arr, attn_seq_arr ) {
        super();
        var flags_num = 0;

        flags_arr.forEach( function(fl) {
            flags_num |= _get_ZSINIT_flag_num(fl);
        } );

        this._bytes4 = [ 0, 0, 0, flags_num ];

        if (attn_seq_arr) {
            if (attn_seq_arr.length > 31) {
                throw("Attn sequence must be <= 31 bytes");
            }
            if (attn_seq_arr.some( function(num) { return num > 255 } )) {
                throw("Attn sequence (" + attn_seq_arr + ") must be <256");
            }
            this._data = attn_seq_arr.concat([0]);
        }
    }

    escape_ctrl_chars() {
        return !!( this._bytes4[3] & ZSINIT_FLAG.ESCCTL );
    }

    //Is this used? I don’t see it used in lrzsz or syncterm
    escape_8th_bit() {
        return !!( this._bytes4[3] & ZSINIT_FLAG.ESC8 );
    }
}

//Thus far it doesn’t seem we really need this header except to respond
//to ZSINIT, which doesn’t require a payload.
class ZACK_HEADER extends Zmodem.Header {
    constructor(payload4) {
        super();

        if (payload4) {
            this._bytes4 = payload4.slice();
        }
    }
}
ZACK_HEADER.prototype._hex_header_ending = HEX_HEADER_CRLF;

//----------------------------------------------------------------------

const ZFILE_VALUES = {

    //ZF3 (i.e., first byte)
    extended: {
        sparse: 0x40,   //ZXSPARS
    },

    //ZF2
    transport: [
        undefined,
        "compress",         //ZTLZW
        "encrypt",          //ZTCRYPT
        "rle",              //ZTRLE
    ],

    //ZF1
    management: [
        undefined,
        "newer_or_longer",  //ZF1_ZMNEWL
        "crc",              //ZF1_ZMCRC
        "append",           //ZF1_ZMAPND
        "clobber",          //ZF1_ZMCLOB
        "newer",            //ZF1_ZMNEW
        "mtime_or_length",  //ZF1_ZMNEW
        "protect",          //ZF1_ZMPROT
        "rename",           //ZF1_ZMPROT
    ],

    //ZF0 (i.e., last byte)
    conversion: [
        undefined,
        "binary",           //ZCBIN
        "text",             //ZCNL
        "resume",           //ZCRESUM
    ],
};

const ZFILE_ORDER = ["extended", "transport", "management", "conversion"];

const ZMSKNOLOC = 0x80,
    MANAGEMENT_MASK = 0x1f,
    ZXSPARS = 0x40
;

class ZFILE_HEADER extends Zmodem.Header {

    //TODO: allow options on instantiation
    get_options() {
        var opts = {
            sparse: !!(this._bytes4[0] & ZXSPARS),
        };

        var bytes_copy = this._bytes4.slice(0);

        ZFILE_ORDER.forEach( function(key, i) {
            if (ZFILE_VALUES[key] instanceof Array) {
                if (key === "management") {
                    opts.skip_if_absent = !!(bytes_copy[i] & ZMSKNOLOC);
                    bytes_copy[i] &= MANAGEMENT_MASK;
                }

                opts[key] = ZFILE_VALUES[key][ bytes_copy[i] ];
            }
            else {
                for (var extkey in ZFILE_VALUES[key]) {
                    opts[extkey] = !!(bytes_copy[i] & ZFILE_VALUES[key][extkey]);
                    if (opts[extkey]) {
                        bytes_copy[i] ^= ZFILE_VALUES[key][extkey]
                    }
                }
            }

            if (!opts[key] && bytes_copy[i]) {
                opts[key] = "unknown:" + bytes_copy[i];
            }
        } );

        return opts;
    }
}

//----------------------------------------------------------------------

//Empty headers - in addition to ZRQINIT
class ZSKIP_HEADER extends Zmodem.Header {}
//No need for ZNAK
class ZABORT_HEADER extends Zmodem.Header {}
class ZFIN_HEADER extends Zmodem.Header {}
class ZFERR_HEADER extends Zmodem.Header {}

ZFIN_HEADER.prototype._hex_header_ending = HEX_HEADER_CRLF;

class ZOffsetHeader extends Zmodem.Header {
    constructor(offset) {
        super();
        this._bytes4 = Zmodem.ENCODELIB.pack_u32_le(offset);
    }

    get_offset() {
        return Zmodem.ENCODELIB.unpack_u32_le(this._bytes4);
    }
}

class ZRPOS_HEADER extends ZOffsetHeader {};
class ZDATA_HEADER extends ZOffsetHeader {};
class ZEOF_HEADER extends ZOffsetHeader {};

//As request, receiver creates.
/* UNIMPLEMENTED FOR NOW
class ZCRC_HEADER extends ZHeader {
    constructor(crc_le_bytes) {
        super();
        if (crc_le_bytes) {  //response, sender creates
            this._bytes4 = crc_le_bytes;
        }
    }
}
*/

//No ZCHALLENGE implementation

//class ZCOMPL_HEADER extends ZHeader {}
//class ZCAN_HEADER extends Zmodem.Header {}

//As described, this header represents an information disclosure.
//It could be interpreted, I suppose, merely as “this is how much space
//I have FOR YOU.”
//TODO: implement if needed/requested
//class ZFREECNT_HEADER extends ZmodemHeader {}

//----------------------------------------------------------------------

const FRAME_CLASS_TYPES = [
    [ ZRQINIT_HEADER, "ZRQINIT" ],
    [ ZRINIT_HEADER, "ZRINIT" ],
    [ ZSINIT_HEADER, "ZSINIT" ],
    [ ZACK_HEADER, "ZACK" ],
    [ ZFILE_HEADER, "ZFILE" ],
    [ ZSKIP_HEADER, "ZSKIP" ],
    undefined, // [ ZNAK_HEADER, "ZNAK" ],
    [ ZABORT_HEADER, "ZABORT" ],
    [ ZFIN_HEADER, "ZFIN" ],
    [ ZRPOS_HEADER, "ZRPOS" ],
    [ ZDATA_HEADER, "ZDATA" ],
    [ ZEOF_HEADER, "ZEOF" ],
    [ ZFERR_HEADER, "ZFERR" ],  //see note
    undefined, //[ ZCRC_HEADER, "ZCRC" ],
    undefined, //[ ZCHALLENGE_HEADER, "ZCHALLENGE" ],
    undefined, //[ ZCOMPL_HEADER, "ZCOMPL" ],
    undefined, //[ ZCAN_HEADER, "ZCAN" ],
    undefined, //[ ZFREECNT_HEADER, "ZFREECNT" ],
    undefined, //[ ZCOMMAND_HEADER, "ZCOMMAND" ],
    undefined, //[ ZSTDERR_HEADER, "ZSTDERR" ],
];

/*
ZFERR is described as “error in reading or writing file”. It’s really
not a good idea from a security angle for the endpoint to expose this
information. We should parse this and handle it as ZABORT but never send it.

Likewise with ZFREECNT: the sender shouldn’t ask how much space is left
on the other box; rather, the receiver should decide what to do with the
file size as the sender reports it.
*/

var FRAME_NAME_CREATOR = {};

for (var fc=0; fc<FRAME_CLASS_TYPES.length; fc++) {
    if (!FRAME_CLASS_TYPES[fc]) continue;

    FRAME_NAME_CREATOR[ FRAME_CLASS_TYPES[fc][1] ] = FRAME_CLASS_TYPES[fc][0];

    Object.assign(
        FRAME_CLASS_TYPES[fc][0].prototype,
        {
            TYPENUM: fc,
            NAME: FRAME_CLASS_TYPES[fc][1],
        }
    );
}

//----------------------------------------------------------------------

const CREATORS = [
    ZRQINIT_HEADER,
    ZRINIT_HEADER,
    ZSINIT_HEADER,
    ZACK_HEADER,
    ZFILE_HEADER,
    ZSKIP_HEADER,
    'ZNAK',
    ZABORT_HEADER,
    ZFIN_HEADER,
    ZRPOS_HEADER,
    ZDATA_HEADER,
    ZEOF_HEADER,
    ZFERR_HEADER,
    'ZCRC', //ZCRC_HEADER, -- leaving unimplemented?
    'ZCHALLENGE',
    'ZCOMPL',
    'ZCAN',
    'ZFREECNT', // ZFREECNT_HEADER,
    'ZCOMMAND',
    'ZSTDERR',
];

function _get_blank_header(typenum) {
    var creator = CREATORS[typenum];
    if (typeof(creator) === "string") {
        throw( "Received unsupported header: " + creator );
    }

    /*
    if (creator === ZCRC_HEADER) {
        return new creator([0, 0, 0, 0]);
    }
    */

    return _get_blank_header_from_constructor(creator);
}

//referenced outside TODO
function _get_blank_header_from_constructor(creator) {
    if (creator.prototype instanceof ZOffsetHeader) {
        return new creator(0);
    }

    return new creator([]);
}

function _parse_binary16(bytes_arr) {

    //The max length of a ZDLE-encoded binary header w/ 16-bit CRC is:
    //  3 initial bytes, NOT ZDLE-encoded
    //  2 typenum bytes     (1 decoded)
    //  8 data bytes        (4 decoded)
    //  4 CRC bytes         (2 decoded)

    //A 16-bit payload has 7 ZDLE-encoded octets.
    //The ZDLE-encoded octets follow the initial prefix.
    var zdle_decoded = Zmodem.ZDLE.splice( bytes_arr, BINARY16_HEADER_PREFIX.length, 7 );

    return zdle_decoded && _parse_non_zdle_binary16(zdle_decoded);
}

function _parse_non_zdle_binary16(decoded) {
    Zmodem.CRC.verify16(
        decoded.slice(0, 5),
        decoded.slice(5)
    );

    var typenum = decoded[0];
    var hdr = _get_blank_header(typenum);
    hdr._bytes4 = decoded.slice( 1, 5 );

    return hdr;
}

function _parse_binary32(bytes_arr) {

    //Same deal as with 16-bit CRC except there are two more
    //potentially ZDLE-encoded bytes, for a total of 9.
    var zdle_decoded = Zmodem.ZDLE.splice(
        bytes_arr,     //omit the leading "*", ZDLE, and "C"
        BINARY32_HEADER_PREFIX.length,
        9
    );

    if (!zdle_decoded) return;

    Zmodem.CRC.verify32(
        zdle_decoded.slice(0, 5),
        zdle_decoded.slice(5)
    );

    var typenum = zdle_decoded[0];
    var hdr = _get_blank_header(typenum);
    hdr._bytes4 = zdle_decoded.slice( 1, 5 );

    return hdr;
}

function _parse_hex(bytes_arr) {

    //A hex header always has:
    //  4 bytes for the ** . ZDLE . 'B'
    //  2 hex bytes for the header type
    //  8 hex bytes for the header content
    //  4 hex bytes for the CRC
    //  1-2 bytes for (CR/)LF
    //  (...and at this point the trailing XON is already stripped)
    //
    //----------------------------------------------------------------------
    //A carriage return and line feed are sent with HEX headers.  The
    //receive routine expects to see at least one of these characters, two
    //if the first is CR.
    //----------------------------------------------------------------------
    //
    //^^ I guess it can be either CR/LF or just LF … though those two
    //sentences appear to be saying contradictory things.

    var lf_pos = bytes_arr.indexOf( 0x8a );     //lrzsz sends this

    if (-1 === lf_pos) {
        lf_pos = bytes_arr.indexOf( 0x0a );
    }

    var hdr_err, hex_bytes;

    if (-1 === lf_pos) {
        if (bytes_arr.length > 11) {
            hdr_err = "Invalid hex header - no LF detected within 12 bytes!";
        }

        //incomplete header
        return;
    }
    else {
        hex_bytes = bytes_arr.splice( 0, lf_pos );

        //Trim off the LF
        bytes_arr.shift();

        if ( hex_bytes.length === 19 ) {

            //NB: The spec says CR but seems to treat high-bit variants
            //of control characters the same as the regulars; should we
            //also allow 0x8d?
            var preceding = hex_bytes.pop();
            if ( preceding !== 0x0d && preceding !== 0x8d ) {
                hdr_err = "Invalid hex header: (CR/)LF doesn’t have CR!";
            }
        }
        else if ( hex_bytes.length !== 18 ) {
            hdr_err = "Invalid hex header: invalid number of bytes before LF!";
        }
    }

    if (hdr_err) {
        hdr_err += " (" + hex_bytes.length + " bytes: " + hex_bytes.join() + ")";
        throw hdr_err;
    }

    hex_bytes.splice(0, 4);

    //Should be 7 bytes ultimately:
    //  1 for typenum
    //  4 for header data
    //  2 for CRC
    var octets = Zmodem.ENCODELIB.parse_hex_octets(hex_bytes);

    return _parse_non_zdle_binary16(octets);
}

Zmodem.Header.parse_hex = _parse_hex;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
/*exported CRC32 */
var CRC32;
(function (factory) {
	/*jshint ignore:start */
	if(typeof DO_NOT_EXPORT_CRC === 'undefined') {
		if(true) {
			factory(exports);
		} else if ('function' === typeof define && define.amd) {
			define(function () {
				var module = {};
				factory(module);
				return module;
			});
		} else {
			factory(CRC32 = {});
		}
	} else {
		factory(CRC32 = {});
	}
	/*jshint ignore:end */
}(function(CRC32) {
CRC32.version = '1.1.1';
/* see perf/crc32table.js */
/*global Int32Array */
function signed_crc_table() {
	var c = 0, table = new Array(256);

	for(var n =0; n != 256; ++n){
		c = n;
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		table[n] = c;
	}

	return typeof Int32Array !== 'undefined' ? new Int32Array(table) : table;
}

var T = signed_crc_table();
function crc32_bstr(bstr, seed) {
	var C = seed ^ -1, L = bstr.length - 1;
	for(var i = 0; i < L;) {
		C = (C>>>8) ^ T[(C^bstr.charCodeAt(i++))&0xFF];
		C = (C>>>8) ^ T[(C^bstr.charCodeAt(i++))&0xFF];
	}
	if(i === L) C = (C>>>8) ^ T[(C ^ bstr.charCodeAt(i))&0xFF];
	return C ^ -1;
}

function crc32_buf(buf, seed) {
	if(buf.length > 10000) return crc32_buf_8(buf, seed);
	var C = seed ^ -1, L = buf.length - 3;
	for(var i = 0; i < L;) {
		C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
		C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
		C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
		C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
	}
	while(i < L+3) C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
	return C ^ -1;
}

function crc32_buf_8(buf, seed) {
	var C = seed ^ -1, L = buf.length - 7;
	for(var i = 0; i < L;) {
		C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
		C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
		C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
		C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
		C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
		C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
		C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
		C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
	}
	while(i < L+7) C = (C>>>8) ^ T[(C^buf[i++])&0xFF];
	return C ^ -1;
}

function crc32_str(str, seed) {
	var C = seed ^ -1;
	for(var i = 0, L=str.length, c, d; i < L;) {
		c = str.charCodeAt(i++);
		if(c < 0x80) {
			C = (C>>>8) ^ T[(C ^ c)&0xFF];
		} else if(c < 0x800) {
			C = (C>>>8) ^ T[(C ^ (192|((c>>6)&31)))&0xFF];
			C = (C>>>8) ^ T[(C ^ (128|(c&63)))&0xFF];
		} else if(c >= 0xD800 && c < 0xE000) {
			c = (c&1023)+64; d = str.charCodeAt(i++)&1023;
			C = (C>>>8) ^ T[(C ^ (240|((c>>8)&7)))&0xFF];
			C = (C>>>8) ^ T[(C ^ (128|((c>>2)&63)))&0xFF];
			C = (C>>>8) ^ T[(C ^ (128|((d>>6)&15)|((c&3)<<4)))&0xFF];
			C = (C>>>8) ^ T[(C ^ (128|(d&63)))&0xFF];
		} else {
			C = (C>>>8) ^ T[(C ^ (224|((c>>12)&15)))&0xFF];
			C = (C>>>8) ^ T[(C ^ (128|((c>>6)&63)))&0xFF];
			C = (C>>>8) ^ T[(C ^ (128|(c&63)))&0xFF];
		}
	}
	return C ^ -1;
}
CRC32.table = T;
CRC32.bstr = crc32_bstr;
CRC32.buf = crc32_buf;
CRC32.str = crc32_str;
}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Zmodem = module.exports;

Object.assign(
    Zmodem,
    __webpack_require__(4),
    __webpack_require__(3),
    __webpack_require__(0),
    __webpack_require__(1)
);

const
    ZCRCE = 0x68,    // 'h', 104, frame ends, header packet follows
    ZCRCG = 0x69,    // 'i', 105, frame continues nonstop
    ZCRCQ = 0x6a,    // 'j', 106, frame continues, ZACK expected
    ZCRCW = 0x6b     // 'k', 107, frame ends, ZACK expected
;

var SUBPACKET_BUILDER;

/** Class that represents a ZMODEM data subpacket. */
Zmodem.Subpacket = class ZmodemSubpacket {

    /**
     * Build a Subpacket subclass given a payload and frame end string.
     *
     * @param {Array} octets - The octet values to parse.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *
     * @param {string} frameend - One of:
     * - `no_end_no_ack`
     * - `end_no_ack`
     * - `no_end_ack` (unused currently)
     * - `end_ack`
     *
     * @returns {Subpacket} An instance of the appropriate Subpacket subclass.
     */
    static build(octets, frameend) {

        //TODO: make this better
        var Ctr = SUBPACKET_BUILDER[frameend];
        if (!Ctr) {
            throw("No subpacket type “" + frameend + "” is defined! Try one of: " + Object.keys(SUBPACKET_BUILDER).join(", "));
        }

        return new Ctr(octets);
    }

    /**
     * Return the octet values array that represents the object
     * encoded with a 16-bit CRC.
     *
     * @param {ZDLE} zencoder - A ZDLE instance to use for ZDLE encoding.
     *
     * @returns {number[]} An array of octet values suitable for sending
     *      as binary data.
     */
    encode16(zencoder) {
        return this._encode( zencoder, Zmodem.CRC.crc16 );
    }

    /**
     * Return the octet values array that represents the object
     * encoded with a 32-bit CRC.
     *
     * @param {ZDLE} zencoder - A ZDLE instance to use for ZDLE encoding.
     *
     * @returns {number[]} An array of octet values suitable for sending
     *      as binary data.
     */
    encode32(zencoder) {
        return this._encode( zencoder, Zmodem.CRC.crc32 );
    }

    /**
     * Return the subpacket payload’s octet values.
     *
     * NOTE: For speed, this returns the actual data in the subpacket;
     * if you mutate this return value, you alter the Subpacket object
     * internals. This is OK if you won’t need the Subpacket anymore, but
     * just be careful.
     *
     * @returns {number[]} The subpacket’s payload, represented as an
     * array of octet values. **DO NOT ALTER THIS ARRAY** unless you
     * no longer need the Subpacket.
     */
    get_payload() { return this._payload }

    /**
     * Parse out a Subpacket object from a given array of octet values,
     * assuming a 16-bit CRC.
     *
     * An exception is thrown if the given bytes are definitively invalid
     * as subpacket values with 16-bit CRC.
     *
     * @param {number[]} octets - The octet values to parse.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *      This object is mutated in the function.
     *
     * @returns {Subpacket|undefined} An instance of the appropriate Subpacket
     *      subclass, or undefined if not enough octet values are given
     *      to determine whether there is a valid subpacket here or not.
     */
    static parse16(octets) {
        return ZmodemSubpacket._parse(octets, 2);
    }

    //parse32 test:
    //[102, 105, 108, 101, 110, 97, 109, 101, 119, 105, 116, 104, 115, 112, 97, 99, 101, 115, 0, 49, 55, 49, 51, 49, 52, 50, 52, 51, 50, 49, 55, 50, 49, 48, 48, 54, 52, 52, 48, 49, 49, 55, 0, 43, 8, 63, 115, 23, 17]

    /**
     * Same as parse16(), but assuming a 32-bit CRC.
     *
     * @param {number[]} octets - The octet values to parse.
     *      Each array member should be an 8-bit unsigned integer (0-255).
     *      This object is mutated in the function.
     *
     * @returns {Subpacket|undefined} An instance of the appropriate Subpacket
     *      subclass, or undefined if not enough octet values are given
     *      to determine whether there is a valid subpacket here or not.
     */
    static parse32(octets) {
        return ZmodemSubpacket._parse(octets, 4);
    }

    /**
     * Not used directly.
     */
    constructor(payload) {
        this._payload = payload;
    }

    _encode(zencoder, crc_func) {
        return zencoder.encode( this._payload.slice(0) ).concat(
            [ Zmodem.ZMLIB.ZDLE, this._frameend_num ],
            zencoder.encode( crc_func( this._payload.concat(this._frameend_num) ) )
        );
    }

    //Because of ZDLE encoding, we’ll never see any of the frame-end octets
    //in a stream except as the ends of data payloads.
    static _parse(bytes_arr, crc_len) {

        var end_at;
        var creator;

        //These have to be written in decimal since they’re lookup keys.
        var _frame_ends_lookup = {
            104: ZEndNoAckSubpacket,
            105: ZNoEndNoAckSubpacket,
            106: ZNoEndAckSubpacket,
            107: ZEndAckSubpacket,
        };

        var zdle_at = 0;
        while (zdle_at < bytes_arr.length) {
            zdle_at = bytes_arr.indexOf( Zmodem.ZMLIB.ZDLE, zdle_at );
            if (zdle_at === -1) return;

            var after_zdle = bytes_arr[ zdle_at + 1 ];
            creator = _frame_ends_lookup[ after_zdle ];
            if (creator) {
                end_at = zdle_at + 1;
                break;
            }

            zdle_at++;
        }

        if (!creator) return;

        var frameend_num = bytes_arr[end_at];

        //sanity check
        if (bytes_arr[end_at - 1] !== Zmodem.ZMLIB.ZDLE) {
            throw( "Byte before frame end should be ZDLE, not " + bytes_arr[end_at - 1] );
        }

        var zdle_encoded_payload = bytes_arr.splice( 0, end_at - 1 );

        var got_crc = Zmodem.ZDLE.splice( bytes_arr, 2, crc_len );
        if (!got_crc) {
            //got payload but no CRC yet .. should be rare!

            //We have to put the ZDLE-encoded payload back before returning.
            bytes_arr.unshift.apply(bytes_arr, zdle_encoded_payload);

            return;
        }

        var payload = Zmodem.ZDLE.decode(zdle_encoded_payload);

        //We really shouldn’t need to do this, but just for good measure.
        //I suppose it’s conceivable this may run over UDP or something?
        Zmodem.CRC[ (crc_len === 2) ? "verify16" : "verify32" ](
            payload.concat( [frameend_num] ),
            got_crc
        );

        return new creator(payload, got_crc);
    }
}

class ZEndSubpacketBase extends Zmodem.Subpacket {
    frame_end() { return true }
}
class ZNoEndSubpacketBase extends Zmodem.Subpacket {
    frame_end() { return false }
}

//Used for end-of-file.
class ZEndNoAckSubpacket extends ZEndSubpacketBase {
    ack_expected() { return false }
}
ZEndNoAckSubpacket.prototype._frameend_num = ZCRCE;

//Used for ZFILE and ZSINIT payloads.
class ZEndAckSubpacket extends ZEndSubpacketBase {
    ack_expected() { return true }
}
ZEndAckSubpacket.prototype._frameend_num = ZCRCW;

//Used for ZDATA, prior to end-of-file.
class ZNoEndNoAckSubpacket extends ZNoEndSubpacketBase {
    ack_expected() { return false }
}
ZNoEndNoAckSubpacket.prototype._frameend_num = ZCRCG;

//only used if receiver can full-duplex
class ZNoEndAckSubpacket extends ZNoEndSubpacketBase {
    ack_expected() { return true }
}
ZNoEndAckSubpacket.prototype._frameend_num = ZCRCQ;

SUBPACKET_BUILDER = {
    end_no_ack: ZEndNoAckSubpacket,
    end_ack: ZEndAckSubpacket,
    no_end_no_ack: ZNoEndNoAckSubpacket,
    no_end_ack: ZNoEndAckSubpacket,
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Zmodem = module.exports;

Object.assign(
    Zmodem,
    __webpack_require__(1)
);

const LOOKS_LIKE_ZMODEM_HEADER = /\*\x18[AC]|\*\*\x18B/;

function _validate_number(key, value) {
    if (value < 0) {
        throw new Zmodem.Error("validation", "“" + key + "” (" + value + ") must be nonnegative.");
    }

    if (value !== Math.floor(value)) {
        throw new Zmodem.Error("validation", "“" + key + "” (" + value + ") must be an integer.");
    }
}

/** Validation logic for zmodem.js
 *
 * @exports Validation
 */
Zmodem.Validation = {

    /**
     * Validates and normalizes a set of parameters for an offer to send.
     * NOTE: This returns “mtime” as epoch seconds, not a Date. This is
     * inconsistent with the get_details() method in Session, but it’s
     * more useful for sending over the wire.
     *
     * @param {FileDetails} params - The file details. Some fairly trivial
     * variances from the specification are allowed.
     *
     * @return {FileDetails} The parameters that should be sent. `mtime`
     * will be a Date rather than a number.
     */
    offer_parameters: function offer_parameters(params) {
        if (!params.name) {
            throw new Zmodem.Error("validation", "Need “name”!");
        }

        if (typeof params.name !== "string") {
            throw new Zmodem.Error("validation", "“name” (" + params.name + ") must be a string!");
        }

        //So that we can override values as is useful
        //without affecting the passed-in object.
        params = Object.assign({}, params);

        if (LOOKS_LIKE_ZMODEM_HEADER.test(params.name)) {
            console.warn("The filename " + JSON.stringify(name) + " contains characters that look like a ZMODEM header. This could corrupt the ZMODEM session; consider renaming it so that the filename doesn’t contain control characters.");
        }

        if (params.serial !== null && params.serial !== undefined) {
            throw new Zmodem.Error("validation", "“serial” is meaningless.");
        }

        params.serial = null;

        ["size", "mode", "files_remaining", "bytes_remaining"].forEach(
            function(k) {
                var ok;
                switch (typeof params[k]) {
                    case "object":
                        ok = (params[k] === null);
                        break;
                    case "undefined":
                        params[k] = null;
                        ok = true;
                        break;
                    case "number":
                        _validate_number(k, params[k]);

                        ok = true;
                        break;
                }

                if (!ok) {
                    throw new Zmodem.Error("validation", "“" + k + "” (" + params[k] + ") must be null, undefined, or a number.");
                }
            }
        );

        if (typeof params.mode === "number") {
            params.mode |= 0x8000;
        }

        if (params.files_remaining === 0) {
            throw new Zmodem.Error("validation", "“files_remaining”, if given, must be positive.");
        }

        var mtime_ok;
        switch (typeof params.mtime) {
            case "object":
                mtime_ok = true;

                if (params.mtime instanceof Date) {

                    var date_obj = params.mtime;
                    params.mtime = Math.floor( date_obj.getTime() / 1000 );
                    if (params.mtime < 0) {
                        throw new Zmodem.Error("validation", "“mtime” (" + date_obj + ") must not be earlier than 1970.");
                    }
                }
                else if (params.mtime !== null) {
                    mtime_ok = false;
                }

                break;

            case "undefined":
                params.mtime = null;
                mtime_ok = true;
                break;
            case "number":
                _validate_number("mtime", params.mtime);
                mtime_ok = true;
                break;
        }

        if (!mtime_ok) {
            throw new Zmodem.Error("validation", "“mtime” (" + params.mtime + ") must be null, undefined, a Date, or a number.");
        }

        return params;
    },
};


/***/ })
/******/ ]);