/*
* Awesome Password Generator aka HashPass
* Copyright (c) Macarthur Inbody 2011-2017
* https://github.com/133794m3r/hashpass
* Licensed AGPLv3 or Later
* version 2.0.0b
*/
function ucrypt(password, salt, log_n, r, p,dk_len, encoding) {

    "use strict";
function bcrypt_one_iter(password,salt){



    var obj= {};

    function utf8Length(string) {
      var len = 0,
          c = 0;
      for (var i = 0; i < string.length; ++i) {
          c = string.charCodeAt(i);
          if (c < 128)
              len += 1;
          else if (c < 2048)
              len += 2;
          else if (
            (c & 0xFC00) === 0xD800 &&
            (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00
          ) {
              ++i;
              len += 4;
          } else
              len += 3;
      }
      return len;
    }


    function utf8Array(string) {
        var offset = 0,
        c1, c2;
        var max=string.length;
      var buffer = new Array(utf8Length(string));
      for (var i = 0; i < max; ++i) {
          c1 = string.charCodeAt(i);
          if (c1 < 128) {
              buffer[offset++] = c1;
          } else if (c1 < 2048) {
              buffer[offset++] = c1 >> 6 | 192;
              buffer[offset++] = c1 & 63 | 128;
          } else if (
            ( c1                             & 0xFC00) === 0xD800 &&
            ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00
          ) {
              c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
              ++i;
              buffer[offset++] = c1 >> 18 | 240;
              buffer[offset++] = c1 >> 12 & 63 | 128;
              buffer[offset++] = c1 >> 6  & 63 | 128;
              buffer[offset++] = c1 & 63 | 128;
          } else {
              buffer[offset++] = c1 >> 12 | 224;
              buffer[offset++] = c1 >> 6 & 63 | 128;
              buffer[offset++] = c1 & 63 | 128;
          }
      }
      return buffer;
    }

    function b64_encode(b, len) {
        var b64_alphabet=[".", "/", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
                          "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h",
                          "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                          "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        var off = 0,
            rs = [],
            rs_len=0,
            c1, c2;
        if (len <= 0 || len > b.length)
            throw Error("Illegal len: "+len);
        while (off < len) {
            c1 = b[off++] & 0xff;
            rs[rs_len++]=b64_alphabet[(c1 >> 2) & 0x3f];
            c1 = (c1 & 0x03) << 4;
            if (off >= len) {
                rs[rs_len++]=b64_alphabet[c1 & 0x3f];
                break;
            }
            c2 = b[off++] & 0xff;
            c1 |= (c2 >> 4) & 0x0f;
            rs[rs_len++]=b64_alphabet[c1 & 0x3f];
            c1 = (c2 & 0x0f) << 2;
            if (off >= len) {
                rs[rs_len++]=b64_alphabet[c1 & 0x3f];
                break;
            }
            c2 = b[off++] & 0xff;
            c1 |= (c2 >> 6) & 0x03;
            rs[rs_len++]=(b64_alphabet[c1 & 0x3f]);
            rs[rs_len++]=(b64_alphabet[c2 & 0x3f]);
        }
        return rs.join('');
    }


    function b64_decode(s, len) {
        var b64_index = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0,
            1, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1,
            -1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, 28, 29, 30,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
            48, 49, 50, 51, 52, 53, -1, -1, -1, -1, -1];
        var b64_index_len=b64_index.length;
        var off = 0,
            slen = s.length,
            olen = 0,
            rs = [],
            rs_len=0,
            c1, c2, c3, c4, o, code;
        if (len <= 0)
            throw Error("Illegal len: "+len);
        while (off < slen - 1 && olen < len) {
            code = s.charCodeAt(off++);
            c1 = code < b64_index_len ? b64_index[code] : -1;
            code = s.charCodeAt(off++);
            c2 = code < b64_index_len ? b64_index[code] : -1;
            if (c1 == -1 || c2 == -1)
                break;
            o = (c1 << 2) >>> 0;
            o |= (c2 & 0x30) >> 4;
            rs[rs_len++]=String.fromCharCode(o);
            if (++olen >= len || off >= slen)
                break;
            code = s.charCodeAt(off++);
            c3 = code < b64_index_len ? b64_index[code] : -1;
            if (c3 == -1)
                break;
            o = ((c2 & 0x0f) << 4) >>> 0;
            o |= (c3 & 0x3c) >> 2;
            rs[rs_len++]=String.fromCharCode(o);
            if (++olen >= len || off >= slen)
                break;
            code = s.charCodeAt(off++);
            c4 = code < b64_index_len ? b64_index[code] : -1;
            o = ((c3 & 0x03) << 6) >>> 0;
            o |= c4;
            rs[rs_len++]=String.fromCharCode(o);
            ++olen;
        }
        var res = [];
        rs_len=0;
        for (off = 0; off<olen; off++){
            res[rs_len++]=rs[off].charCodeAt(0);
        }
        return res;
    }

    var BCRYPT_SALT_LEN = 16;




    var BLOWFISH_NUM_ROUNDS = 16;


    var P_ORIG = new Int32Array([0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344, 0xa4093822, 0x299f31d0, 0x082efa98,
        0xec4e6c89, 0x452821e6, 0x38d01377, 0xbe5466cf, 0x34e90c6c, 0xc0ac29b7, 0xc97c50dd, 0x3f84d5b5,0xb5470917,
        0x9216d5d9,0x8979fb1b]);

    var S_ORIG = new Int32Array([0xd1310ba6, 0x98dfb5ac, 0x2ffd72db, 0xd01adfb7, 0xb8e1afed, 0x6a267e96, 0xba7c9045, 0xf12c7f99,
    0x24a19947, 0xb3916cf7, 0x0801f2e2, 0x858efc16, 0x636920d8, 0x71574e69, 0xa458fea3, 0xf4933d7e, 0x0d95748f, 0x728eb658, 0x718bcd58,
    0x82154aee, 0x7b54a41d, 0xc25a59b5, 0x9c30d539, 0x2af26013, 0xc5d1b023, 0x286085f0, 0xca417918, 0xb8db38ef, 0x8e79dcb0, 0x603a180e,
    0x6c9e0e8b, 0xb01e8a3e, 0xd71577c1, 0xbd314b27, 0x78af2fda, 0x55605c60, 0xe65525f3, 0xaa55ab94, 0x57489862, 0x63e81440, 0x55ca396a,
    0x2aab10b6, 0xb4cc5c34, 0x1141e8ce, 0xa15486af, 0x7c72e993, 0xb3ee1411, 0x636fbc2a, 0x2ba9c55d, 0x741831f6, 0xce5c3e16, 0x9b87931e,
    0xafd6ba33, 0x6c24cf5c, 0x7a325381, 0x28958677, 0x3b8f4898, 0x6b4bb9af, 0xc4bfe81b, 0x66282193, 0x61d809cc, 0xfb21a991, 0x487cac60,
    0x5dec8032, 0xef845d5d, 0xe98575b1, 0xdc262302, 0xeb651b88, 0x23893e81, 0xd396acc5, 0x0f6d6ff3, 0x83f44239, 0x2e0b4482, 0xa4842004,
    0x69c8f04a, 0x9e1f9b5e, 0x21c66842, 0xf6e96c9a, 0x670c9c61, 0xabd388f0, 0x6a51a0d2, 0xd8542f68, 0x960fa728, 0xab5133a3, 0x6eef0b6c,
    0x137a3be4, 0xba3bf050, 0x7efb2a98, 0xa1f1651d, 0x39af0176, 0x66ca593e, 0x82430e88, 0x8cee8619, 0x456f9fb4, 0x7d84a5c3, 0x3b8b5ebe,
    0xe06f75d8, 0x85c12073, 0x401a449f, 0x56c16aa6, 0x4ed3aa62, 0x363f7706, 0x1bfedf72, 0x429b023d, 0x37d0d724, 0xd00a1248, 0xdb0fead3,
    0x49f1c09b, 0x075372c9, 0x80991b7b, 0x25d479d8, 0xf6e8def7, 0xe3fe501a, 0xb6794c3b, 0x976ce0bd, 0x04c006ba, 0xc1a94fb6, 0x409f60c4,
    0x5e5c9ec2, 0x196a2463, 0x68fb6faf, 0x3e6c53b5, 0x1339b2eb, 0x3b52ec6f, 0x6dfc511f, 0x9b30952c, 0xcc814544, 0xaf5ebd09, 0xbee3d004,
    0xde334afd, 0x660f2807, 0x192e4bb3, 0xc0cba857, 0x45c8740f, 0xd20b5f39, 0xb9d3fbdb, 0x5579c0bd, 0x1a60320a, 0xd6a100c6, 0x402c7279,
    0x679f25fe, 0xfb1fa3cc, 0x8ea5e9f8, 0xdb3222f8, 0x3c7516df, 0xfd616b15, 0x2f501ec8, 0xad0552ab, 0x323db5fa, 0xfd238760, 0x53317b48,
    0x3e00df82, 0x9e5c57bb, 0xca6f8ca0, 0x1a87562e, 0xdf1769db, 0xd542a8f6, 0x287effc3, 0xac6732c6, 0x8c4f5573, 0x695b27b0, 0xbbca58c8,
    0xe1ffa35d, 0xb8f011a0, 0x10fa3d98, 0xfd2183b8, 0x4afcb56c, 0x2dd1d35b, 0x9a53e479, 0xb6f84565, 0xd28e49bc, 0x4bfb9790, 0xe1ddf2da,
    0xa4cb7e33, 0x62fb1341, 0xcee4c6e8, 0xef20cada, 0x36774c01, 0xd07e9efe, 0x2bf11fb4, 0x95dbda4d, 0xae909198, 0xeaad8e71, 0x6b93d5a0,
    0xd08ed1d0, 0xafc725e0, 0x8e3c5b2f, 0x8e7594b7, 0x8ff6e2fb, 0xf2122b64, 0x8888b812, 0x900df01c, 0x4fad5ea0, 0x688fc31c, 0xd1cff191,
    0xb3a8c1ad, 0x2f2f2218, 0xbe0e1777, 0xea752dfe, 0x8b021fa1, 0xe5a0cc0f, 0xb56f74e8, 0x18acf3d6, 0xce89e299, 0xb4a84fe0, 0xfd13e0b7,
    0x7cc43b81, 0xd2ada8d9, 0x165fa266, 0x80957705, 0x93cc7314, 0x211a1477, 0xe6ad2065, 0x77b5fa86, 0xc75442f5, 0xfb9d35cf, 0xebcdaf0c,
    0x7b3e89a0, 0xd6411bd3, 0xae1e7e49, 0x00250e2d, 0x2071b35e, 0x226800bb, 0x57b8e0af, 0x2464369b, 0xf009b91e, 0x5563911d, 0x59dfa6aa,
    0x78c14389, 0xd95a537f, 0x207d5ba2, 0x02e5b9c5, 0x83260376, 0x6295cfa9, 0x11c81968, 0x4e734a41, 0xb3472dca, 0x7b14a94a, 0x1b510052,
    0x9a532915, 0xd60f573f, 0xbc9bc6e4, 0x2b60a476, 0x81e67400, 0x08ba6fb5, 0x571be91f, 0xf296ec6b, 0x2a0dd915, 0xb6636521, 0xe7b9f9b6,
    0xff34052e, 0xc5855664, 0x53b02d5d, 0xa99f8fa1, 0x08ba4799, 0x6e85076a, 0x4b7a70e9, 0xb5b32944, 0xdb75092e, 0xc4192623, 0xad6ea6b0,
    0x49a7df7d, 0x9cee60b8, 0x8fedb266, 0xecaa8c71, 0x699a17ff, 0x5664526c, 0xc2b19ee1, 0x193602a5, 0x75094c29, 0xa0591340, 0xe4183a3e,
    0x3f54989a, 0x5b429d65, 0x6b8fe4d6, 0x99f73fd6, 0xa1d29c07, 0xefe830f5, 0x4d2d38e6, 0xf0255dc1, 0x4cdd2086, 0x8470eb26, 0x6382e9c6,
    0x021ecc5e, 0x09686b3f, 0x3ebaefc9, 0x3c971814, 0x6b6a70a1, 0x687f3584, 0x52a0e286, 0xb79c5305, 0xaa500737, 0x3e07841c, 0x7fdeae5c,
    0x8e7d44ec, 0x5716f2b8, 0xb03ada37, 0xf0500c0d, 0xf01c1f04, 0x0200b3ff, 0xae0cf51a, 0x3cb574b2, 0x25837a58, 0xdc0921bd, 0xd19113f9,
    0x7ca92ff6, 0x94324773, 0x22f54701, 0x3ae5e581, 0x37c2dadc, 0xc8b57634, 0x9af3dda7, 0xa9446146, 0x0fd0030e, 0xecc8c73e, 0xa4751e41,
    0xe238cd99, 0x3bea0e2f, 0x3280bba1, 0x183eb331, 0x4e548b38, 0x4f6db908, 0x6f420d03, 0xf60a04bf, 0x2cb81290, 0x24977c79, 0x5679b072,
    0xbcaf89af, 0xde9a771f, 0xd9930810, 0xb38bae12, 0xdccf3f2e, 0x5512721f, 0x2e6b7124, 0x501adde6, 0x9f84cd87, 0x7a584718, 0x7408da17,
    0xbc9f9abc, 0xe94b7d8c, 0xec7aec3a, 0xdb851dfa, 0x63094366, 0xc464c3d2, 0xef1c1847, 0x3215d908, 0xdd433b37, 0x24c2ba16, 0x12a14d43,
    0x2a65c451, 0x50940002, 0x133ae4dd, 0x71dff89e, 0x10314e55, 0x81ac77d6, 0x5f11199b, 0x043556f1, 0xd7a3c76b, 0x3c11183b, 0x5924a509,
    0xf28fe6ed, 0x97f1fbfa, 0x9ebabf2c, 0x1e153c6e, 0x86e34570, 0xeae96fb1, 0x860e5e0a, 0x5a3e2ab3, 0x771fe71c, 0x4e3d06fa, 0x2965dcb9,
    0x99e71d0f, 0x803e89d6, 0x5266c825, 0x2e4cc978, 0x9c10b36a, 0xc6150eba, 0x94e2ea78, 0xa5fc3c53, 0x1e0a2df4, 0xf2f74ea7, 0x361d2b3d,
    0x1939260f, 0x19c27960, 0x5223a708, 0xf71312b6, 0xebadfe6e, 0xeac31f66, 0xe3bc4595, 0xa67bc883, 0xb17f37d1, 0x018cff28, 0xc332ddef,
    0xbe6c5aa5, 0x65582185, 0x68ab9802, 0xeecea50f, 0xdb2f953b, 0x2aef7dad, 0x5b6e2f84, 0x1521b628, 0x29076170, 0xecdd4775, 0x619f1510,
    0x13cca830, 0xeb61bd96, 0x0334fe1e, 0xaa0363cf, 0xb5735c90, 0x4c70a239, 0xd59e9e0b, 0xcbaade14, 0xeecc86bc, 0x60622ca7, 0x9cab5cab,
    0xb2f3846e, 0x648b1eaf, 0x19bdf0ca, 0xa02369b9, 0x655abb50, 0x40685a32, 0x3c2ab4b3, 0x319ee9d5, 0xc021b8f7, 0x9b540b19, 0x875fa099,
    0x95f7997e, 0x623d7da8, 0xf837889a, 0x97e32d77, 0x11ed935f, 0x16681281, 0x0e358829, 0xc7e61fd6, 0x96dedfa1, 0x7858ba99, 0x57f584a5,
    0x1b227263, 0x9b83c3ff, 0x1ac24696, 0xcdb30aeb, 0x532e3054, 0x8fd948e4, 0x6dbc3128, 0x58ebf2ef, 0x34c6ffea, 0xfe28ed61, 0xee7c3c73,
    0x5d4a14d9, 0xe864b7e3, 0x42105d14, 0x203e13e0, 0x45eee2b6, 0xa3aaabea, 0xdb6c4f15, 0xfacb4fd0, 0xc742f442, 0xef6abbb5, 0x654f3b1d,
    0x41cd2105, 0xd81e799e, 0x86854dc7, 0xe44b476a, 0x3d816250, 0xcf62a1f2, 0x5b8d2646, 0xfc8883a0, 0xc1c7b6a3, 0x7f1524c3, 0x69cb7492,
    0x47848a0b, 0x5692b285, 0x095bbf00, 0xad19489d, 0x1462b174, 0x23820e00, 0x58428d2a, 0x0c55f5ea, 0x1dadf43e, 0x233f7061, 0x3372f092,
    0x8d937e41, 0xd65fecf1, 0x6c223bdb, 0x7cde3759, 0xcbee7460, 0x4085f2a7, 0xce77326e, 0xa6078084, 0x19f8509e, 0xe8efd855, 0x61d99735,
    0xa969a7aa, 0xc50c06c2, 0x5a04abfc, 0x800bcadc, 0x9e447a2e, 0xc3453484, 0xfdd56705, 0x0e1e9ec9, 0xdb73dbd3, 0x105588cd, 0x675fda79,
    0xe3674340, 0xc5c43465, 0x713e38d8, 0x3d28f89e, 0xf16dff20, 0x153e21e7, 0x8fb03d4a, 0xe6e39f2b, 0xdb83adf7, 0xe93d5a68, 0x948140f7,
    0xf64c261c, 0x94692934, 0x411520f7, 0x7602d4f7, 0xbcf46b2e, 0xd4a20068, 0xd4082471, 0x3320f46a, 0x43b7d4b7, 0x500061af, 0x1e39f62e,
    0x97244546, 0x14214f74, 0xbf8b8840, 0x4d95fc1d, 0x96b591af, 0x70f4ddd3, 0x66a02f45, 0xbfbc09ec, 0x03bd9785, 0x7fac6dd0, 0x31cb8504,
    0x96eb27b3, 0x55fd3941, 0xda2547e6, 0xabca0a9a, 0x28507825, 0x530429f4, 0x0a2c86da, 0xe9b66dfb, 0x68dc1462, 0xd7486900, 0x680ec0a4,
    0x27a18dee, 0x4f3ffea2, 0xe887ad8c, 0xb58ce006, 0x7af4d6b6, 0xaace1e7c, 0xd3375fec, 0xce78a399, 0x406b2a42, 0x20fe9e35, 0xd9f385b9,
    0xee39d7ab, 0x3b124e8b, 0x1dc9faf7, 0x4b6d1856, 0x26a36631, 0xeae397b2, 0x3a6efa74, 0xdd5b4332, 0x6841e7f7, 0xca7820fb, 0xfb0af54e,
    0xd8feb397, 0x454056ac, 0xba489527, 0x55533a3a, 0x20838d87, 0xfe6ba9b7, 0xd096954b, 0x55a867bc, 0xa1159a58, 0xcca92963, 0x99e1db33,
    0xa62a4a56, 0x3f3125f9, 0x5ef47e1c, 0x9029317c, 0xfdf8e802, 0x04272f70, 0x80bb155c, 0x05282ce3, 0x95c11548, 0xe4c66d22, 0x48c1133f,
    0xc70f86dc, 0x07f9c9ee, 0x41041f0f, 0x404779a4, 0x5d886e17, 0x325f51eb, 0xd59bc0d1, 0xf2bcc18f, 0x41113564, 0x257b7834, 0x602a9c60,
    0xdff8e8a3, 0x1f636c1b, 0x0e12b4c2, 0x02e1329e, 0xaf664fd1, 0xcad18115, 0x6b2395e0, 0x333e92e1, 0x3b240b62, 0xeebeb922, 0x85b2a20e,
    0xe6ba0d99, 0xde720c8c, 0x2da2f728, 0xd0127845, 0x95b794fd, 0x647d0862, 0xe7ccf5f0, 0x5449a36f, 0x877d48fa, 0xc39dfd27, 0xf33e8d1e,
    0x0a476341, 0x992eff74, 0x3a6f6eab, 0xf4f8fd37, 0xa812dc60, 0xa1ebddf8, 0x991be14c, 0xdb6e6b0d, 0xc67b5510, 0x6d672c37, 0x2765d43b,
    0xdcd0e804, 0xf1290dc7, 0xcc00ffa3, 0xb5390f92, 0x690fed0b, 0x667b9ffb, 0xcedb7d9c, 0xa091cf0b, 0xd9155ea3, 0xbb132f88, 0x515bad24,
    0x7b9479bf, 0x763bd6eb, 0x37392eb3, 0xcc115979, 0x8026e297, 0xf42e312d, 0x6842ada7, 0xc66a2b3b, 0x12754ccc, 0x782ef11c, 0x6a124237,
    0xb79251e7, 0x06a1bbe6, 0x4bfb6350, 0x1a6b1018, 0x11caedfa, 0x3d25bdd8, 0xe2e1c3c9, 0x44421659, 0x0a121386, 0xd90cec6e, 0xd5abea2a,
    0x64af674e, 0xda86a85f, 0xbebfe988, 0x64e4c3fe, 0x9dbc8057, 0xf0f7c086, 0x60787bf8, 0x6003604d, 0xd1fd8346, 0xf6381fb0, 0x7745ae04,
    0xd736fccc, 0x83426b33, 0xf01eab71, 0xb0804187, 0x3c005e5f, 0x77a057be, 0xbde8ae24, 0x55464299, 0xbf582e61, 0x4e58f48f, 0xf2ddfda2,
    0xf474ef38, 0x8789bdc2, 0x5366f9c3, 0xc8b38e74, 0xb475f255, 0x46fcd9b9, 0x7aeb2661, 0x8b1ddf84, 0x846a0e79, 0x915f95e2, 0x466e598e,
    0x20b45770, 0x8cd55591, 0xc902de4c, 0xb90bace1, 0xbb8205d0, 0x11a86248, 0x7574a99e, 0xb77f19b6, 0xe0a9dc09, 0x662d09a1, 0xc4324633,
    0xe85a1f02, 0x09f0be8c, 0x4a99a025, 0x1d6efe10, 0x1ab93d1d, 0x0ba5a4df, 0xa186f20f, 0x2868f169, 0xdcb7da83, 0x573906fe, 0xa1e2ce9b,
    0x4fcd7f52, 0x50115e01, 0xa70683fa, 0xa002b5c4, 0x0de6d027, 0x9af88c27, 0x773f8641, 0xc3604c06, 0x61a806b5, 0xf0177a28, 0xc0f586e0,
    0x006058aa, 0x30dc7d62, 0x11e69ed7, 0x2338ea63, 0x53c2dd94, 0xc2c21634, 0xbbcbee56, 0x90bcb6de, 0xebfc7da1, 0xce591d76, 0x6f05e409,
    0x4b7c0188, 0x39720a3d, 0x7c927c24, 0x86e3725f, 0x724d9db9, 0x1ac15bb4, 0xd39eb8fc, 0xed545578, 0x08fca5b5, 0xd83d7cd3, 0x4dad0fc4,
    0x1e50ef5e, 0xb161e6f8, 0xa28514d9, 0x6c51133c, 0x6fd5c7e7, 0x56e14ec4, 0x362abfce, 0xddc6c837, 0xd79a3234, 0x92638212, 0x670efa8e,
    0x406000e0, 0x3a39ce37, 0xd3faf5cf, 0xabc27737, 0x5ac52d1b, 0x5cb0679e, 0x4fa33742, 0xd3822740, 0x99bc9bbe, 0xd5118e9d, 0xbf0f7315,
    0xd62d1c7e, 0xc700c47b, 0xb78c1b6b, 0x21a19045, 0xb26eb1be, 0x6a366eb4, 0x5748ab2f, 0xbc946e79, 0xc6a376d2, 0x6549c2c8, 0x530ff8ee,
    0x468dde7d, 0xd5730a1d, 0x4cd04dc6, 0x2939bbdb, 0xa9ba4650, 0xac9526e8, 0xbe5ee304, 0xa1fad5f0, 0x6a2d519a, 0x63ef8ce2, 0x9a86ee22,
    0xc089c2b8, 0x43242ef6, 0xa51e03aa, 0x9cf2d0a4, 0x83c061ba, 0x9be96a4d, 0x8fe51550, 0xba645bd6, 0x2826a2f9, 0xa73a3ae1, 0x4ba99586,
    0xef5562e9, 0xc72fefd3, 0xf752f7da, 0x3f046f69, 0x77fa0a59, 0x80e4a915, 0x87b08601, 0x9b09e6ad, 0x3b3ee593, 0xe990fd5a, 0x9e34d797,
    0x2cf0b7d9, 0x022b8b51, 0x96d5ac3a, 0x017da67d, 0xd1cf3ed6, 0x7c7d2d28, 0x1f9f25cf, 0xadf2b89b, 0x5ad6b472, 0x5a88f54c, 0xe029ac71,
    0xe019a5e6, 0x47b0acfd, 0xed93fa9b, 0xe8d3c48d, 0x283b57cc, 0xf8d56629, 0x79132e28, 0x785f0191, 0xed756055, 0xf7960e44, 0xe3d35e8c,
    0x15056dd4, 0x88f46dba, 0x03a16125, 0x0564f0bd, 0xc3eb9e15, 0x3c9057a2, 0x97271aec, 0xa93a072a, 0x1b3f6d9b, 0x1e6321f5, 0xf59c66fb,
    0x26dcf319, 0x7533d928, 0xb155fdf5, 0x03563482, 0x8aba3cbb, 0x28517711, 0xc20ad9f8, 0xabcc5167, 0xccad925f, 0x4de81751, 0x3830dc8e,
    0x379d5862, 0x9320f991, 0xea7a90c2, 0xfb3e7bce, 0x5121ce64, 0x774fbe32, 0xa8b6e37e, 0xc3293d46, 0x48de5369, 0x6413e680, 0xa2ae0810,
    0xdd6db224, 0x69852dfd, 0x09072166, 0xb39a460a, 0x6445c0dd, 0x586cdecf, 0x1c20c8ae, 0x5bbef7dd, 0x1b588d40, 0xccd2017f, 0x6bb4e3bb,
    0xdda26a7e, 0x3a59ff45, 0x3e350a44, 0xbcb4cdd5, 0x72eacea8, 0xfa6484bb, 0x8d6612ae, 0xbf3c6f47, 0xd29be463, 0x542f5d9e, 0xaec2771b,
    0xf64e6370, 0x740e0d8d, 0xe75b1357, 0xf8721671, 0xaf537d5d, 0x4040cb08, 0x4eb4e2cc, 0x34d2466a, 0x0115af84, 0xe1b00428, 0x95983a1d,
    0x06b89fb4, 0xce6ea048, 0x6f3f3b82, 0x3520ab82, 0x011a1d4b, 0x277227f8, 0x611560b1, 0xe7933fdc, 0xbb3a792b, 0x344525bd, 0xa08839e1,
    0x51ce794b, 0x2f32c9b7, 0xa01fbac9, 0xe01cc87e, 0xbcc7d1f6, 0xcf0111c3, 0xa1e8aac7, 0x1a908749, 0xd44fbd9a, 0xd0dadecb, 0xd50ada38,
    0x0339c32a, 0xc6913667, 0x8df9317c, 0xe0b12b4f, 0xf79e59b7, 0x43f5bb3a, 0xf2d519ff, 0x27d9459c, 0xbf97222c, 0x15e6fc2a, 0x0f91fc71,
    0x9b941525, 0xfae59361, 0xceb69ceb, 0xc2a86459, 0x12baa8d1, 0xb6c1075e, 0xe3056a0c, 0x10d25065, 0xcb03a442, 0xe0ec6e0e, 0x1698db3b,
    0x4c98a0be, 0x3278e964, 0x9f1f9532, 0xe0d392df, 0xd3a0342b, 0x8971f21e, 0x1b0a7441, 0x4ba3348c, 0xc5be7120, 0xc37632d8, 0xdf359f8d,
    0x9b992f2e, 0xe60b6f47, 0x0fe3f11d, 0xe54cda54, 0x1edad891, 0xce6279cf, 0xcd3e7e6f, 0x1618b166, 0xfd2c1d05, 0x848fd2c5, 0xf6fb2299,
    0xf523f357, 0xa6327623, 0x93a83531, 0x56cccd02, 0xacf08162, 0x5a75ebb5, 0x6e163697, 0x88d273cc, 0xde966292, 0x81b949d0, 0x4c50901b,
    0x71c65614, 0xe6c6c7bd, 0x327a140a, 0x45e1d006, 0xc3f27b9a, 0xc9aa53fd, 0x62a80f00, 0xbb25bfe2, 0x35bdd2f6, 0x71126905, 0xb2040222,
    0xb6cbcf7c, 0xcd769c2b, 0x53113ec0, 0x1640e3d3, 0x38abbd60, 0x2547adf0, 0xba38209c, 0xf746ce76, 0x77afa1c5, 0x20756060, 0x85cbfe4e,
    0x8ae88dd8, 0x7aaaf9b0, 0x4cf9aa7e, 0x1948c25c, 0x02fb8a8c, 0x01c36ae4, 0xd6ebe1f9, 0x90d4f869, 0xa65cdea0, 0x3f09252d, 0xc208e69f,
    0xb74e6132, 0xce77e25b, 0x578fdfe3, 0x3ac372e6]);

//  use top one to require a very slight increase in the custom algorithm.
    var C_ORIG = [0x6D797365, 0x63726574, 0x656E6372, 0x79707469, 0x6F6E7374, 0x72696E67];
    //var C_ORIG = [0x4f727068, 0x65616e42, 0x65686f6c, 0x64657253, 0x63727944,0x6f756274];

    //18
    var P_orig_length=18;
    //1024
    var S_orig_length=1024;
    //6
    var C_orig_length=6;

    function encipher(lr, off, P, S) {
        var n,
            l = lr[off],
            r = lr[off + 1];
//change lr to lr.l and lr.r
//to avoid having to do the whole off thing
//lr to lr={l:0,r:0};
//so that l=lr.l and r=lr.r
        l ^= P[0];

        // 0
        n  =( ( S[l >>> 24] + (S[0x100 | ((l >> 16) & 0xff)]) ) ^ (S[0x200 | ((l >> 8) & 0xff)]) ) + (S[0x300 | (l & 0xff)]);

        r ^= n ^ P[1];
        n  = ( (S[r >>> 24] + S[0x100 | ((r >> 16) & 0xff)]) ^ S[0x200 | ((r >> 8) & 0xff)] ) + (S[0x300 | (r & 0xff)]) ;

        l ^= n ^ P[2];
        // 1
        n  =( ( S[l >>> 24] + (S[0x100 | ((l >> 16) & 0xff)]) ) ^ (S[0x200 | ((l >> 8) & 0xff)]) ) + (S[0x300 | (l & 0xff)]);

        r ^= n ^ P[3];
        n  = ( (S[r >>> 24] + S[0x100 | ((r >> 16) & 0xff)]) ^ S[0x200 | ((r >> 8) & 0xff)] ) + (S[0x300 | (r & 0xff)]) ;

        l ^= n ^ P[4];
        // 2
        n  =( ( S[l >>> 24] + (S[0x100 | ((l >> 16) & 0xff)]) ) ^ (S[0x200 | ((l >> 8) & 0xff)]) ) + (S[0x300 | (l & 0xff)]);

        r ^= n ^ P[5];
        n  = ( (S[r >>> 24] + S[0x100 | ((r >> 16) & 0xff)]) ^ S[0x200 | ((r >> 8) & 0xff)] ) + (S[0x300 | (r & 0xff)]) ;

        l ^= n ^ P[6];
        // 3
        n  =( ( S[l >>> 24] + (S[0x100 | ((l >> 16) & 0xff)]) ) ^ (S[0x200 | ((l >> 8) & 0xff)]) ) + (S[0x300 | (l & 0xff)]);

        r ^= n ^ P[7];
        n  = ( (S[r >>> 24] + S[0x100 | ((r >> 16) & 0xff)]) ^ S[0x200 | ((r >> 8) & 0xff)] ) + (S[0x300 | (r & 0xff)]) ;

        l ^= n ^ P[8];
        // 4
        n  =( ( S[l >>> 24] + (S[0x100 | ((l >> 16) & 0xff)]) ) ^ (S[0x200 | ((l >> 8) & 0xff)]) ) + (S[0x300 | (l & 0xff)]);

        r ^= n ^ P[9];
        n  = ( (S[r >>> 24] + S[0x100 | ((r >> 16) & 0xff)]) ^ S[0x200 | ((r >> 8) & 0xff)] ) + (S[0x300 | (r & 0xff)]) ;

        l ^= n ^ P[10];
        // 5
        n  =( ( S[l >>> 24] + (S[0x100 | ((l >> 16) & 0xff)]) ) ^ (S[0x200 | ((l >> 8) & 0xff)]) ) + (S[0x300 | (l & 0xff)]);

        r ^= n ^ P[11];
        n  = ( (S[r >>> 24] + S[0x100 | ((r >> 16) & 0xff)]) ^ S[0x200 | ((r >> 8) & 0xff)] ) + (S[0x300 | (r & 0xff)]) ;

        l ^= n ^ P[12];
        // 6
        n  =( ( S[l >>> 24] + (S[0x100 | ((l >> 16) & 0xff)]) ) ^ (S[0x200 | ((l >> 8) & 0xff)]) ) + (S[0x300 | (l & 0xff)]);

        r ^= n ^ P[13];
        n  = ( (S[r >>> 24] + S[0x100 | ((r >> 16) & 0xff)]) ^ S[0x200 | ((r >> 8) & 0xff)] ) + (S[0x300 | (r & 0xff)]) ;

        l ^= n ^ P[14];
        // 7
        n  =( ( S[l >>> 24] + (S[0x100 | ((l >> 16) & 0xff)]) ) ^ (S[0x200 | ((l >> 8) & 0xff)]) ) + (S[0x300 | (l & 0xff)]);

        r ^= n ^ P[15];
        n  = ( (S[r >>> 24] + S[0x100 | ((r >> 16) & 0xff)]) ^ S[0x200 | ((r >> 8) & 0xff)] ) + (S[0x300 | (r & 0xff)]) ;

        l ^= n ^ P[16];

        lr[off] = r ^ P[17];
        lr[off + 1] = l;
        return lr;
    }


    function streamtoword(data, off,data_len) {
        //var off=offp;
        var word=0;

        word = data[off++]&0xff;
//		off = off % data_len;
		if(off>=data_len){
            off=0;
        }
        //2
		word = (word << 8) | (data[off++] & 0xff);
		//off = off % data_len;
		if(off>=data_len){
            off=0;
        }
        //3
		word = (word << 8) | (data[off++] & 0xff);
		//off = off % data_len;
		if(off>=data_len){
            off=0;
        }
        //4
		word = (word << 8) | (data[off++] & 0xff);
		if(off>=data_len){
            off=0;
        }
//        offp=off;
        return { key: word, offp: off };
    }


    function key(key, P, S,key_len) {
        var offset = 0,
            lr = [0, 0],
            plen = P_orig_length,
            slen = S_orig_length,
            sw;
        var i=0;

//try changing lr to an object to make refernces passed around
//insteda of modifying contents and returning to that again.
//lr to lr={l:0,r:0};

        //18i 0
        sw = streamtoword(key, 0,key_len);
        //offset = sw.offp,
        P[0] = P[0] ^ sw.key;

        //18i 1
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[1] = P[1] ^ sw.key;

        //18i 2
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[2] = P[2] ^ sw.key;

        //18i 3
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[3] = P[3] ^ sw.key;

        //18i 4
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[4] = P[4] ^ sw.key;

        //18i 5
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[5] = P[5] ^ sw.key;

        //18i 6
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[6] = P[6] ^ sw.key;

        //18i 7
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[7] = P[7] ^ sw.key;

        //18i 8
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[8] = P[8] ^ sw.key;

        //18i 9
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[9] = P[9] ^ sw.key;

        //18i 10
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[10] = P[10] ^ sw.key;

        //18i 11
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[11] = P[11] ^ sw.key;

        //18i 12
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[12] = P[12] ^ sw.key;

        //18i 13
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[13] = P[13] ^ sw.key;

        //18i 14
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[14] = P[14] ^ sw.key;

        //18i 15
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[15] = P[15] ^ sw.key;

        //18i 16
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[16] = P[16] ^ sw.key;

        //18i 17
        sw = streamtoword(key, sw.offp,key_len);
        //offset = sw.offp,
        P[17] = P[17] ^ sw.key;

        //9i 0
        lr=encipher(lr,0,P,S);
        P[0]=lr[0];
        P[1]=lr[1];
        //9i 1
        lr=encipher(lr,0,P,S);
        P[2]=lr[0];
        P[3]=lr[1];
        //9i 2
        lr=encipher(lr,0,P,S);
        P[4]=lr[0];
        P[5]=lr[1];

        //9i 3
        lr=encipher(lr,0,P,S);
        P[6]=lr[0];
        P[7]=lr[1];

        //9i 4
        lr=encipher(lr,0,P,S);
        P[8]=lr[0];
        P[9]=lr[1];

        //9i 5
        lr=encipher(lr,0,P,S);
        P[10]=lr[0];
        P[11]=lr[1];

        //9i 6
        lr=encipher(lr,0,P,S);
        P[12]=lr[0];
        P[13]=lr[1];

        //9i 7
        lr=encipher(lr,0,P,S);
        P[14]=lr[0];
        P[15]=lr[1];

        //9i 8
        lr=encipher(lr,0,P,S);
        P[16]=lr[0];
        P[17]=lr[1];

        //512 iterations not worth it.
        for (i = 0; i < slen; i += 2){
            lr = encipher(lr, 0, P, S),
            S[i] = lr[0],
            S[i + 1] = lr[1];
        }
    }


    function ekskey(data, key, P, S,data_len,key_len) {
        var offp = 0,
            lr = [0, 0],
            plen = P_orig_length,
            slen = S_orig_length,
            sw;
        var i=0;
//try changing lr to an object to make refernces passed around
//insteda of modifying contents and returning to that again.

//lr to lr={l:0,r:0};
        //18i 0
        sw = streamtoword(key, 0);
        //offp = sw.offp,
        P[0] = P[0] ^ sw.key;

        //18i 1
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[1] = P[1] ^ sw.key;

        //18i 2
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[2] = P[2] ^ sw.key;

        //18i 3
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[3] = P[3] ^ sw.key;

        //18i 4
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[4] = P[4] ^ sw.key;

        //18i 5
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[5] = P[5] ^ sw.key;

        //18i 6
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[6] = P[6] ^ sw.key;

        //18i 7
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[7] = P[7] ^ sw.key;

        //18i 8
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[8] = P[8] ^ sw.key;

        //18i 9
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[9] = P[9] ^ sw.key;

        //18i 10
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[10] = P[10] ^ sw.key;

        //18i 11
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[11] = P[11] ^ sw.key;

        //18i 12
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[12] = P[12] ^ sw.key;

        //18i 13
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[13] = P[13] ^ sw.key;

        //18i 14
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[14] = P[14] ^ sw.key;

        //18i 15
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[15] = P[15] ^ sw.key;

        //18i 16
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[16] = P[16] ^ sw.key;

        //18i 17
        sw = streamtoword(key, sw.offp,key_len);
        //offp = sw.offp,
        P[17] = P[17] ^ sw.key;

        offp = 0;

        //9i 0
        sw = streamtoword(data, 0);
       // offp = sw.offp,
        lr[0] ^= sw.key,
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[1] ^= sw.key,
        lr = encipher(lr, 0, P, S),
        P[0] = lr[0],
        P[1] = lr[1];

        //9i 1
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[0] ^= sw.key,
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[1] ^= sw.key,
        lr = encipher(lr, 0, P, S),
        P[2] = lr[0],
        P[3] = lr[1];

        //9i 2
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[0] ^= sw.key,
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[1] ^= sw.key,
        lr = encipher(lr, 0, P, S),
        P[4] = lr[0],
        P[5] = lr[1];

        //9i 3
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[0] ^= sw.key,
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[1] ^= sw.key,
        lr = encipher(lr, 0, P, S),
        P[6] = lr[0],
        P[7] = lr[1];

        //9i 4
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[0] ^= sw.key,
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[1] ^= sw.key,
        lr = encipher(lr, 0, P, S),
        P[8] = lr[0],
        P[9] = lr[1];

        //9i 5
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[0] ^= sw.key,
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[1] ^= sw.key,
        lr = encipher(lr, 0, P, S),
        P[10] = lr[0],
        P[11] = lr[1];

        //9i 6
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[0] ^= sw.key,
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[1] ^= sw.key,
        lr = encipher(lr, 0, P, S),
        P[12] = lr[0],
        P[13] = lr[1];

        //9i 7
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[0] ^= sw.key,
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[1] ^= sw.key,
        lr = encipher(lr, 0, P, S),
        P[14] = lr[0],
        P[15] = lr[1];

        //9i 8
        sw = streamtoword(data, sw.offp,data_len);
       // offp = sw.offp,
        lr[0] ^= sw.key,
        sw = streamtoword(data, sw.offp,data_len);
        //offp = sw.offp,
        lr[1] ^= sw.key,
        lr = encipher(lr, 0, P, S),
        P[16] = lr[0],
        P[17] = lr[1];

        //512 iterations
        for (i = 0; i < slen; i += 2){
            sw = streamtoword(data, sw.offp,data_len);
            //offp = sw.offp,
            lr[0] ^= sw.key,
            sw = streamtoword(data, sw.offp,data_len);
           // offp = sw.offp,
            lr[1] ^= sw.key,
            lr = encipher(lr, 0, P, S),
            S[i] = lr[0],
            S[i + 1] = lr[1];
        }
    }


    function crypt(bytes, salt, rounds) {
        var cdata = C_ORIG,
            clen = C_orig_length,
            err;
        var ret_len=0;
        var ret=[];
        var clen_1=clen>>1;
        rounds = (1 << rounds) >>> 0;
        var bytes_len=bytes.length;
        var salt_len=salt.length;
        var P, S, i = 0, j,k=0;
        P=P_ORIG;
        S=S_ORIG;
        ekskey(salt, bytes, P, S,salt_len,bytes_len);


        while(k<=rounds){
            if (i < rounds) {
                for (; i < rounds;) {
                    i = i + 1;
                    key(bytes, P, S,bytes_len);
                    key(salt, P, S,salt_len);
                    k=i;
                }
            } else {
                for (i = 0; i < 64; i++){
                    //3 iterations
                    encipher(cdata,0,P,S);
                    encipher(cdata,2,P,S);
                    encipher(cdata,4,P,S);
                }

                for (i = 0; i < clen; i++){
                    ret[ret_len++]=((cdata[i] >> 24) & 0xff) >>> 0;
                    ret[ret_len++]=((cdata[i] >> 16) & 0xff) >>> 0;
                    ret[ret_len++]=((cdata[i] >> 8) & 0xff) >>> 0;
                    ret[ret_len++]=(cdata[i] & 0xff) >>> 0;
                }
                k=rounds+1;
            }
        }
        return ret;
    }

    function hash(string, salt) {
        var err;
        if (salt.length !== BCRYPT_SALT_LEN) {
            err =Error("Illegal salt length: "+salt.length+" != "+BCRYPT_SALT_LEN);
                throw err;
        }
        var result=crypt(password,salt,2);

        return result.slice(0,23);
    }
    return hash(password,salt);
}


  function sha256_fast(data){
"use strict";
var exports=[];
exports.digest_length = 32;
exports.block_size = 64;
// SHA-256 constants
var K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
    0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
    0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
    0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
    0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
    0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
    0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
    0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
    0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);

     var digest_length = exports.digest_length;
         var block_size = exports.block_size;
        var state = new Int32Array(8); // hash state
        var temp = new Int32Array(64); // temporary state
        var buffer = new Uint8Array(128); // buffer for data to hash
        var buffer_length = 0; // number of bytes in buffer
        var bytes_hashed = 0; // number of total bytes hashed
        var finished = false; // indicates whether the hash was finalized
        //state[0] = 0x6a09e667;
        //state[1] = 0xbb67ae85;
        //state[2] = 0x3c6ef372;
        //state[3] = 0xa54ff53a;
        //state[4] = 0x510e527f;
        //state[5] = 0x9b05688c;
        //state[6] = 0x1f83d9ab;
        //state[7] = 0x5be0cd19;
        var buffer_length = 0;
        var bytes_hashed = 0;
        var finished = false;


function hash_blocks(w, v, p, pos, len) {
    var a, b, c, d, e, f, g, h, u, i, j, t1, t2,pos_tmp=0;
    while (len >= 64) {
        a = v[0];
        b = v[1];
        c = v[2];
        d = v[3];
        e = v[4];
        f = v[5];
        g = v[6];
        h = v[7];
 /*
       for (i = 0; i < 16; i++) {
            j = pos + i * 4;
            w[i] = (((p[j] & 0xff) << 24) | ((p[j + 1] & 0xff) << 16) |
                ((p[j + 2] & 0xff) << 8) | (p[j + 3] & 0xff));
        }

        */

        //0
        pos_tmp=pos+0;
        w[0] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));
        //1
        pos_tmp=pos+4;
        w[1] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));
        //2
        pos_tmp=pos+8;
        w[2] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));
        //3
        pos_tmp=pos+12;
        w[3] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));

        //4
        pos_tmp=pos+16;
        w[4] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));

        //5
        pos_tmp=pos+20;
        w[5] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));

        //6
        pos_tmp=pos+24;
        w[6] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));

        //7
        pos_tmp=pos+28;
        w[7] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));

        //8
        pos_tmp=pos+32;
        w[8] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));

        //9
        pos_tmp=pos+36;
        w[9] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));


        //10
        pos_tmp=pos+40;
        w[10] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));

        //11
        pos_tmp=pos+44;
        w[11] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));

        //12
        pos_tmp=pos+48;
        w[12] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));

        //13
        pos_tmp=pos+52;
        w[13] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));

        //14
        pos_tmp=pos+56;
        w[14] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));

        //15
        pos_tmp=pos+60;
        w[15] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));


        /*
        for (i = 16; i < 64; i++) {
            u = w[i - 2];
            t1 = (u >>> 17 | u << (32 - 17)) ^ (u >>> 19 | u << (32 - 19)) ^ (u >>> 10);
            u = w[i - 15];
            t2 = (u >>> 7 | u << (32 - 7)) ^ (u >>> 18 | u << (32 - 18)) ^ (u >>> 3);
            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
        }
        */

        //16
        u = w[14];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[1];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[16] = (t1 + w[9] | 0) + (t2 + w[0] | 0);

        //17  abbs todo
        u = w[15];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[2];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[17]=(t1 + w[10] | 0) + (t2 + w[1] | 0);

        //18
        u = w[16];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[3];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[18] = (t1 + w[11] | 0) + (t2 + w[2] | 0);
        //19


        u = w[17];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[4];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[19] = (t1 + w[12] | 0) + (t2 + w[3] | 0);



        //20
        u = w[18];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[5];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[20] = (t1 + w[13] | 0) + (t2 + w[4] | 0);



        //21
        u = w[19];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[6];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[21] = (t1 + w[14] | 0) + (t2 + w[5] | 0);



        //22
        u = w[20];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[7];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[22] = (t1 + w[15] | 0) + (t2 + w[6] | 0);


        //23
        u = w[21];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[8];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[23] = (t1 + w[16] | 0) + (t2 + w[7] | 0)

        //24
        u = w[22];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[9];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[24] = (t1 + w[17] | 0) + (t2 + w[8] | 0)
        //25
        u = w[23];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[10];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[25] = (t1 + w[18] | 0) + (t2 + w[9] | 0)

        //26
        u = w[24];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[11];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[26] = (t1 + w[19] | 0) + (t2 + w[10] | 0)

        //27
        u = w[25];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[12];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[27] = (t1 + w[20] | 0) + (t2 + w[11] | 0)


        //28
        u = w[26];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[13];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[28] = (t1 + w[21] | 0) + (t2 + w[12] | 0)


        //29
        u = w[27];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[14];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[29] = (t1 + w[22] | 0) + (t2 + w[13] | 0)


        //30
        u = w[28];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[15];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[30] = (t1 + w[23] | 0) + (t2 + w[14] | 0)

        //31
        u = w[29];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[16];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[31] = (t1 + w[24] | 0) + (t2 + w[15] | 0)

        //32
        u = w[30];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[17];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[32] = (t1 + w[25] | 0) + (t2 + w[16] | 0)

        //33
        u = w[31];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[18];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[33] = (t1 + w[26] | 0) + (t2 + w[17] | 0)

        //34
        u = w[32];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[19];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[34] = (t1 + w[27] | 0) + (t2 + w[18] | 0)

        //35
        u = w[33];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[20];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[35] = (t1 + w[28] | 0) + (t2 + w[19] | 0)

        //36
        u = w[34];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[21];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[36] = (t1 + w[29] | 0) + (t2 + w[20] | 0)

        //37
        u = w[35];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[22];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[37] = (t1 + w[30] | 0) + (t2 + w[21] | 0)

        //38
        u = w[36];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[23];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[38] = (t1 + w[31] | 0) + (t2 + w[22] | 0)

        //39
        u = w[37];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[24];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[39] = (t1 + w[32] | 0) + (t2 + w[23] | 0)

        //40
        u = w[38];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[25];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[40] = (t1 + w[33] | 0) + (t2 + w[24] | 0)

        //41
        u = w[39];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[26];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[41] = (t1 + w[34] | 0) + (t2 + w[25] | 0)

        //42
        u = w[40];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[27];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[42] = (t1 + w[35] | 0) + (t2 + w[26] | 0)

        //43
        u = w[41];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[28];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[43] = (t1 + w[36] | 0) + (t2 + w[27] | 0);


        //44
        u = w[42];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[29];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[44] = (t1 + w[37] | 0) + (t2 + w[28] | 0);


                       //45
        u = w[43];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[30];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[45] = (t1 + w[38] | 0) + (t2 + w[29] | 0);


                 //46
        u = w[44];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[31];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[46] = (t1 + w[39] | 0) + (t2 + w[30] | 0);


                 //47
        u = w[45];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[32];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[47] = (t1 + w[40] | 0) + (t2 + w[31] | 0);


                 //48
        u = w[46];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[33];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[48] = (t1 + w[41] | 0) + (t2 + w[32] | 0);


                 //49
        u = w[47];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[34];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[49] = (t1 + w[42] | 0) + (t2 + w[33] | 0);


                 //50
        u = w[48];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[35];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[50] = (t1 + w[43] | 0) + (t2 + w[34] | 0);


                 //51
        u = w[49];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[36];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[51] = (t1 + w[44] | 0) + (t2 + w[35] | 0);


                 //52
        u = w[50];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[37];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[52] = (t1 + w[45] | 0) + (t2 + w[36] | 0);


                 //53
        u = w[51];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[38];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[53] = (t1 + w[46] | 0) + (t2 + w[37] | 0);


                 //54
        u = w[52];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[39];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[54] = (t1 + w[47] | 0) + (t2 + w[38] | 0);


                 //55
        u = w[53];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[40];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[55] = (t1 + w[48] | 0) + (t2 + w[39] | 0);


                 //56
        u = w[54];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[41];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[56] = (t1 + w[49] | 0) + (t2 + w[40] | 0);


                 //57
        u = w[55];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[42];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[57] = (t1 + w[50] | 0) + (t2 + w[41] | 0);


                 //58
        u = w[56];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[43];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[58] = (t1 + w[51] | 0) + (t2 + w[42] | 0);


                 //59
        u = w[57];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[44];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[59] = (t1 + w[52] | 0) + (t2 + w[43] | 0);


                 //60
        u = w[58];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[45];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[60] = (t1 + w[53] | 0) + (t2 + w[44] | 0);


                 //61
        u = w[59];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[46];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[61] = (t1 + w[54] | 0) + (t2 + w[45] | 0);


                 //62
        u = w[60];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[47];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[62] = (t1 + w[55] | 0) + (t2 + w[46] | 0);


                 //63
        u = w[61];
        t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
        u = w[48];
        t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
        w[63] = (t1 + w[56] | 0) + (t2 + w[47] | 0);


        //64 loop part 2
        //starts here

        //0
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[0] + w[0]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //0

        //1
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[1] + w[1]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //1

        //2
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[2] + w[2]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //2

        //3
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[3] + w[3]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //3

        //4
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[4] + w[4]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //4

        //5
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[5] + w[5]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //5

        //6
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[6] + w[6]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //6

        //7
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[7] + w[7]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //7


        //8
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[8] + w[8]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //8

        //9
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[9] + w[9]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //9

        //10
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[10] + w[10]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //10

        //11
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[11] + w[11]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //11

        //12
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[12] + w[12]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //12

        //13
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[13] + w[13]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //13

        //14
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[14] + w[14]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //14

        //15
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[15] + w[15]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //15

        //16
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[16] + w[16]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //16

        //17
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[17] + w[17]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //17

        //18
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[18] + w[18]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //18

        //19
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[19] + w[19]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //19

        //20
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[20] + w[20]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //20

        //21
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[21] + w[21]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //21

        //22
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[22] + w[22]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //22

        //23
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[23] + w[23]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //23

        //24
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[24] + w[24]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //24

        //25
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[25] + w[25]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //25

        //26
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[26] + w[26]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //26

        //27
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[27] + w[27]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //27

        //28
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[28] + w[28]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //28

        //29
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[29] + w[29]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //29

        //30
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[30] + w[30]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //30

        //31
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[31] + w[31]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //31

        //32
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[32] + w[32]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //32

        //33
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[33] + w[33]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //33

        //34
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[34] + w[34]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //34

        //35
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[35] + w[35]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //35

        //36
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[36] + w[36]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //36

        //37
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[37] + w[37]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //37

        //38
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[38] + w[38]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //38

        //39
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[39] + w[39]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //39

        //40
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[40] + w[40]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //40

        //41
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[41] + w[41]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //41

        //42
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[42] + w[42]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //42

        //43
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[43] + w[43]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //43

        //44
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[44] + w[44]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //44

        //45
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[45] + w[45]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //45

        //46
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[46] + w[46]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //46

        //47
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[47] + w[47]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //47

        //48
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[48] + w[48]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //48

        //49
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[49] + w[49]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //49

        //50
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[50] + w[50]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //50

        //51
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[51] + w[51]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //51

        //52
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[52] + w[52]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //52

        //53
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[53] + w[53]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //53

        //54
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[54] + w[54]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //54

        //55
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[55] + w[55]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //55

        //56
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[56] + w[56]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //56

        //57
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[57] + w[57]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //57

        //58
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[58] + w[58]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //58

        //59
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[59] + w[59]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //59

        //60
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[60] + w[60]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //60

        //61
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[61] + w[61]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //61

        //62
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[62] + w[62]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //62

        //63
        t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
         (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
         ((h + ((K[63] + w[63]) | 0)) | 0)) | 0;
        t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
         (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
        //63

            ////64
            //t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
            //    (e >>> 25 | e << (7))) + ((e & f) ^ (~e & g))) | 0) +
            //    ((h + ((K[64] + w[64]) | 0)) | 0)) | 0;
            //t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
            //    (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
            //h = g;
            //g = f;
            //f = e;
            //e = (d + t1) | 0;
            //d = c;
            //c = b;
            //b = a;
            //a = (t1 + t2) | 0;
            ////64









        v[0] += a;
        v[1] += b;
        v[2] += c;
        v[3] += d;
        v[4] += e;
        v[5] += f;
        v[6] += g;
        v[7] += h;
        pos += 64;
        len -= 64;
    }



    return pos;
}




// Hash implements SHA256 hash algorithm.
function update(data,data_len){
    if(data_len === void 0){data_len=data.length}
    if(finished){
        throw new Error("SHA256: CAN'T UPDATE FINISHED");
    }
    var data_pos=0;
    bytes_hashed+=data_len;

    if(buffer_length > 0){
        while (buffer_length < 64 && data_len > 0){
            buffer[buffer_length++] = data[data_pos++];
            dataLength--;
        }

        if(buffer_length === 64){
            hash_blocks(temp,state,buffer,0,64);
            buffer_length = 0;
        }
    }

    if(data_len >= 64){
        data_pos = hash_blocks(temp,state,data,data_pos,data_len);
        data_len%=64;
    }

    while(data_len > 0){
        buffer[buffer_length++] = data[data_pos++];
        data_len--;
    }

    return data;
}
function finish(out){
    var i=0;
    if(!finished){
        var left=buffer_length;
        var bit_len_hi = (bytes_hashed / 0x20000000 )| 0;
        var bit_len_lo = bytes_hashed << 3;
        var pad_len=( (bytes_hashed % 64) < 56) ? 64 : 128;
        var tmp=pad_len-8;
        i=left+1;
        buffer[left] = 0x80;
        for (i;i<tmp; i++) {
            buffer[i]=0;
        }

        buffer[pad_len-8]= (bit_len_hi >>> 24) & 0xff;
        buffer[pad_len-7]= (bit_len_hi >>>16 )& 0xff;
        buffer[pad_len-6]= (bit_len_hi >>>8) &0xff;
        buffer[pad_len-5]= (bit_len_hi >>> 0) & 0xff;
        buffer[pad_len-4]= (bit_len_lo >>>24) & 0xff;
        buffer[pad_len-3]=(bit_len_lo >>> 16) & 0xff;
        buffer[pad_len-2]=(bit_len_lo >>> 8) &0xff;
        buffer[pad_len-1]=(bit_len_lo >>> 0 ) &0xff;
        hash_blocks(temp,state,buffer,0,pad_len);
        finished=true;
    }

    //0
        out[0] = (state[0] >>> 24) &0xff;
        out[1] = (state[0] >>> 16) &0xff;
        out[2] = (state[0] >>> 8) &0xff;
        out[3] = (state[0] >>> 0) &0xff;


    //1
        out[4] = (state[1] >>> 24) &0xff;
        out[5] = (state[1] >>> 16) &0xff;
        out[6] = (state[1] >>> 8) &0xff;
        out[7] = (state[1] >>> 0) &0xff;

    //2
        out[8] = (state[2] >>> 24) &0xff;
        out[9] = (state[2] >>> 16) &0xff;
        out[10] = (state[2] >>> 8) &0xff;
        out[11] = (state[2] >>> 0) &0xff;

    //3
        out[12] = (state[3] >>> 24) &0xff;
        out[13] = (state[3] >>> 16) &0xff;
        out[14] = (state[3] >>> 8) &0xff;
        out[15] = (state[3] >>> 0) &0xff;

    //4
        out[16] = (state[4] >>> 24) &0xff;
        out[17] = (state[4] >>> 16) &0xff;
        out[18] = (state[4] >>> 8) &0xff;
        out[19] = (state[4] >>> 0) &0xff;

    //5
        out[20] = (state[5] >>> 24) &0xff;
        out[21] = (state[5] >>> 16) &0xff;
        out[22] = (state[5] >>> 8) &0xff;
        out[23] = (state[5] >>> 0) &0xff;

    //6
        out[24] = (state[6] >>> 24) &0xff;
        out[25] = (state[6] >>> 16) &0xff;
        out[26] = (state[6] >>> 8) &0xff;
        out[27] = (state[6] >>> 0) &0xff;

    //7
        out[28] = (state[7] >>> 24) &0xff;
        out[29] = (state[7] >>> 16) &0xff;
        out[30] = (state[7] >>> 8) &0xff;
        out[31] = (state[7] >>> 0) &0xff;


    return out;
}

    state[0] = 0x6a09e667;
    state[1] = 0xbb67ae85;
    state[2] = 0x3c6ef372;
    state[3] = 0xa54ff53a;
    state[4] = 0x510e527f;
    state[5] = 0x9b05688c;
    state[6] = 0x1f83d9ab;
    state[7] = 0x5be0cd19;
    buffer_length = 0;
    bytes_hashed = 0;
    finished = false;


    update(data);
  var out=new Uint8Array(digest_length);
    return finish(out);
//return hash(data);
}

function bcrypt_dk_one_iter(password,salt,dk_len){
    password=sha256_fast(password);
    salt=sha256_fast(salt);
    var j=0;
    var dk = new Uint8Array(dk_len);
    var tmp=new Uint8Array(32);
    salt=salt.slice(0,16);
    while(dk_len>=32){
      tmp=bcrypt_one_iter(password,salt);
      tmp=sha256_fast(tmp);
      password.set(tmp);
      salt=password.slice(0,16);
      dk.set(tmp,j*32);
      j++;
      dk_len -= 32;
    }
    
    if(dk_len > 0){
      tmp=bcrypt_one_iter(password,salt);
      tmp=sha256_fast(tmp);
      tmp=tmp.slice(0,dk_len);
      dk.set(tmp);
    }
    
    return tmp;
}

  function salsa_xor(tmp, B, bin, bout) {
    var j0  = tmp[0]  ^ B[bin++];
    var j1  = tmp[1]  ^ B[bin++];
    var j2  = tmp[2]  ^ B[bin++];
    var j3  = tmp[3]  ^ B[bin++];
    var j4  = tmp[4]  ^ B[bin++];
    var j5  = tmp[5]  ^ B[bin++];
    var j6  = tmp[6]  ^ B[bin++];
    var j7  = tmp[7]  ^ B[bin++];
    var j8  = tmp[8]  ^ B[bin++];
    var j9  = tmp[9]  ^ B[bin++];
    var j10 = tmp[10] ^ B[bin++];
    var j11 = tmp[11] ^ B[bin++];
    var j12 = tmp[12] ^ B[bin++];
    var j13 = tmp[13] ^ B[bin++];
    var j14 = tmp[14] ^ B[bin++];
    var j15 = tmp[15] ^ B[bin++];
    var u, i;

    var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
        x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
        x15 = j15;


         //0
    u =  x0 + x12;
    x4 ^= u<<7  | u>>>25;
    u =  x4 +  x0;
    x8 ^= u<<9  | u>>>23;
    u =  x8 +  x4;
    x12 ^= u<<13 | u>>>19;
    u = x12 +  x8;
    x0 ^= u<<18 | u>>>14;

    u =  x5 +  x1;
    x9 ^= u<<7  | u>>>25;
    u =  x9 +  x5;
    x13 ^= u<<9  | u>>>23;
    u = x13 +  x9;
    x1 ^= u<<13 | u>>>19;
    u =  x1 + x13;
    x5 ^= u<<18 | u>>>14;

    u = x10 +  x6;
    x14 ^= u<<7  | u>>>25;
    u = x14 + x10;
    x2 ^= u<<9  | u>>>23;
    u =  x2 + x14;
    x6 ^= u<<13 | u>>>19;
    u =  x6 +  x2;
    x10 ^= u<<18 | u>>>14;

    u = x15 + x11;
    x3 ^= u<<7  | u>>>25;
    u =  x3 + x15;
    x7 ^= u<<9  | u>>>23;
    u =  x7 +  x3;
    x11 ^= u<<13 | u>>>19;
    u = x11 +  x7;
    x15 ^= u<<18 | u>>>14;

    u =  x0 +  x3;
    x1 ^= u<<7  | u>>>25;
    u =  x1 +  x0;
    x2 ^= u<<9  | u>>>23;
    u =  x2 +  x1;
    x3 ^= u<<13 | u>>>19;
    u =  x3 +  x2;
    x0 ^= u<<18 | u>>>14;

    u =  x5 +  x4;
    x6 ^= u<<7  | u>>>25;
    u =  x6 +  x5;
    x7 ^= u<<9  | u>>>23;
    u =  x7 +  x6;
    x4 ^= u<<13 | u>>>19;
    u =  x4 +  x7;
    x5 ^= u<<18 | u>>>14;

    u = x10 +  x9;
    x11 ^= u<<7  | u>>>25;
    u = x11 + x10;
    x8 ^= u<<9  | u>>>23;
    u =  x8 + x11;
    x9 ^= u<<13 | u>>>19;
    u =  x9 +  x8;
    x10 ^= u<<18 | u>>>14;

    u = x15 + x14;
    x12 ^= u<<7  | u>>>25;
    u = x12 + x15;
    x13 ^= u<<9  | u>>>23;
    u = x13 + x12;
    x14 ^= u<<13 | u>>>19;
    u = x14 + x13;
    x15 ^= u<<18 | u>>>14;

  //0 end

      //1

      u =  x0 + x12;
  x4 ^= u<<7  | u>>>25;
      u =  x4 +  x0;
  x8 ^= u<<9  | u>>>23;
      u =  x8 +  x4;
x12 ^= u<<13 | u>>>19;
      u = x12 +  x8;
  x0 ^= u<<18 | u>>>14;

      u =  x5 +  x1;
  x9 ^= u<<7  | u>>>25;
      u =  x9 +  x5;
x13 ^= u<<9  | u>>>23;
      u = x13 +  x9;
  x1 ^= u<<13 | u>>>19;
      u =  x1 + x13;
  x5 ^= u<<18 | u>>>14;

      u = x10 +  x6;
x14 ^= u<<7  | u>>>25;
      u = x14 + x10;
  x2 ^= u<<9  | u>>>23;
      u =  x2 + x14;
  x6 ^= u<<13 | u>>>19;
      u =  x6 +  x2;
x10 ^= u<<18 | u>>>14;

      u = x15 + x11;
  x3 ^= u<<7  | u>>>25;
      u =  x3 + x15;
  x7 ^= u<<9  | u>>>23;
      u =  x7 +  x3;
x11 ^= u<<13 | u>>>19;
      u = x11 +  x7;
x15 ^= u<<18 | u>>>14;

      u =  x0 +  x3;
  x1 ^= u<<7  | u>>>25;
      u =  x1 +  x0;
  x2 ^= u<<9  | u>>>23;
      u =  x2 +  x1;
  x3 ^= u<<13 | u>>>19;
      u =  x3 +  x2;
  x0 ^= u<<18 | u>>>14;

      u =  x5 +  x4;
  x6 ^= u<<7  | u>>>25;
      u =  x6 +  x5;
  x7 ^= u<<9  | u>>>23;
      u =  x7 +  x6;
  x4 ^= u<<13 | u>>>19;
      u =  x4 +  x7;
  x5 ^= u<<18 | u>>>14;

      u = x10 +  x9;
x11 ^= u<<7  | u>>>25;
      u = x11 + x10;
  x8 ^= u<<9  | u>>>23;
      u =  x8 + x11;
  x9 ^= u<<13 | u>>>19;
      u =  x9 +  x8;
x10 ^= u<<18 | u>>>14;

      u = x15 + x14;
x12 ^= u<<7  | u>>>25;
      u = x12 + x15;
x13 ^= u<<9  | u>>>23;
      u = x13 + x12;
x14 ^= u<<13 | u>>>19;
      u = x14 + x13;
x15 ^= u<<18 | u>>>14;

//1 end

      //2

      u =  x0 + x12;
  x4 ^= u<<7  | u>>>25;
      u =  x4 +  x0;
  x8 ^= u<<9  | u>>>23;
      u =  x8 +  x4;
x12 ^= u<<13 | u>>>19;
      u = x12 +  x8;
  x0 ^= u<<18 | u>>>14;

      u =  x5 +  x1;
  x9 ^= u<<7  | u>>>25;
      u =  x9 +  x5;
x13 ^= u<<9  | u>>>23;
      u = x13 +  x9;
  x1 ^= u<<13 | u>>>19;
      u =  x1 + x13;
  x5 ^= u<<18 | u>>>14;

      u = x10 +  x6;
x14 ^= u<<7  | u>>>25;
      u = x14 + x10;
  x2 ^= u<<9  | u>>>23;
      u =  x2 + x14;
  x6 ^= u<<13 | u>>>19;
      u =  x6 +  x2;
x10 ^= u<<18 | u>>>14;

      u = x15 + x11;
  x3 ^= u<<7  | u>>>25;
      u =  x3 + x15;
  x7 ^= u<<9  | u>>>23;
      u =  x7 +  x3;
x11 ^= u<<13 | u>>>19;
      u = x11 +  x7;
x15 ^= u<<18 | u>>>14;

      u =  x0 +  x3;
  x1 ^= u<<7  | u>>>25;
      u =  x1 +  x0;
  x2 ^= u<<9  | u>>>23;
      u =  x2 +  x1;
  x3 ^= u<<13 | u>>>19;
      u =  x3 +  x2;
  x0 ^= u<<18 | u>>>14;

      u =  x5 +  x4;
  x6 ^= u<<7  | u>>>25;
      u =  x6 +  x5;
  x7 ^= u<<9  | u>>>23;
      u =  x7 +  x6;
  x4 ^= u<<13 | u>>>19;
      u =  x4 +  x7;
  x5 ^= u<<18 | u>>>14;

      u = x10 +  x9;
x11 ^= u<<7  | u>>>25;
      u = x11 + x10;
  x8 ^= u<<9  | u>>>23;
      u =  x8 + x11;
  x9 ^= u<<13 | u>>>19;
      u =  x9 +  x8;
x10 ^= u<<18 | u>>>14;

      u = x15 + x14;
x12 ^= u<<7  | u>>>25;
      u = x12 + x15;
x13 ^= u<<9  | u>>>23;
      u = x13 + x12;
x14 ^= u<<13 | u>>>19;
      u = x14 + x13;
x15 ^= u<<18 | u>>>14;

//2 end

      //3

      u =  x0 + x12;
  x4 ^= u<<7  | u>>>25;
      u =  x4 +  x0;
  x8 ^= u<<9  | u>>>23;
      u =  x8 +  x4;
x12 ^= u<<13 | u>>>19;
      u = x12 +  x8;
  x0 ^= u<<18 | u>>>14;

      u =  x5 +  x1;
  x9 ^= u<<7  | u>>>25;
      u =  x9 +  x5;
x13 ^= u<<9  | u>>>23;
      u = x13 +  x9;
  x1 ^= u<<13 | u>>>19;
      u =  x1 + x13;
  x5 ^= u<<18 | u>>>14;

      u = x10 +  x6;
x14 ^= u<<7  | u>>>25;
      u = x14 + x10;
  x2 ^= u<<9  | u>>>23;
      u =  x2 + x14;
  x6 ^= u<<13 | u>>>19;
      u =  x6 +  x2;
x10 ^= u<<18 | u>>>14;

      u = x15 + x11;
  x3 ^= u<<7  | u>>>25;
      u =  x3 + x15;
  x7 ^= u<<9  | u>>>23;
      u =  x7 +  x3;
x11 ^= u<<13 | u>>>19;
      u = x11 +  x7;
x15 ^= u<<18 | u>>>14;

      u =  x0 +  x3;
  x1 ^= u<<7  | u>>>25;
      u =  x1 +  x0;
  x2 ^= u<<9  | u>>>23;
      u =  x2 +  x1;
  x3 ^= u<<13 | u>>>19;
      u =  x3 +  x2;
  x0 ^= u<<18 | u>>>14;

      u =  x5 +  x4;
  x6 ^= u<<7  | u>>>25;
      u =  x6 +  x5;
  x7 ^= u<<9  | u>>>23;
      u =  x7 +  x6;
  x4 ^= u<<13 | u>>>19;
      u =  x4 +  x7;
  x5 ^= u<<18 | u>>>14;

      u = x10 +  x9;
x11 ^= u<<7  | u>>>25;
      u = x11 + x10;
  x8 ^= u<<9  | u>>>23;
      u =  x8 + x11;
  x9 ^= u<<13 | u>>>19;
      u =  x9 +  x8;
x10 ^= u<<18 | u>>>14;

      u = x15 + x14;
x12 ^= u<<7  | u>>>25;
      u = x12 + x15;
x13 ^= u<<9  | u>>>23;
      u = x13 + x12;
x14 ^= u<<13 | u>>>19;
      u = x14 + x13;
x15 ^= u<<18 | u>>>14;

//3 end



    B[bout++] = tmp[0]  = (x0  + j0)  | 0;
    B[bout++] = tmp[1]  = (x1  + j1)  | 0;
    B[bout++] = tmp[2]  = (x2  + j2)  | 0;
    B[bout++] = tmp[3]  = (x3  + j3)  | 0;
    B[bout++] = tmp[4]  = (x4  + j4)  | 0;
    B[bout++] = tmp[5]  = (x5  + j5)  | 0;
    B[bout++] = tmp[6]  = (x6  + j6)  | 0;
    B[bout++] = tmp[7]  = (x7  + j7)  | 0;
    B[bout++] = tmp[8]  = (x8  + j8)  | 0;
    B[bout++] = tmp[9]  = (x9  + j9)  | 0;
    B[bout++] = tmp[10] = (x10 + j10) | 0;
    B[bout++] = tmp[11] = (x11 + j11) | 0;
    B[bout++] = tmp[12] = (x12 + j12) | 0;
    B[bout++] = tmp[13] = (x13 + j13) | 0;
    B[bout++] = tmp[14] = (x14 + j14) | 0;
    B[bout++] = tmp[15] = (x15 + j15) | 0;
  }
  //convert to a version using subarray instead of looping over.
  // cannot do with block xor as its pointless.
  function block_copy(dst, di, src, si, len) {

    dst.set(src.subarray(si,(si+len)),di);
  }

  function block_xor(dst, di, src, si, len) {
    while (len--) dst[di++] ^= src[si++];
  }

  function block_mix(tmp, B, bin, bout, r) {
    var i=0;
    var i_16=0;
    var i_8=0;
    var bin_i_16=0;
    var bout_i_8=0;
    block_copy(tmp, 0, B, bin + (r_2_1_16), 16);
    for (i = 0; i < r_2; i += 2) {
      bin_i_16=bin+(i*16);
      bout_i_8=bout+(i*8);
      salsa_xor(tmp, B, bin_i_16,      bout_i_8);
      salsa_xor(tmp, B, bin_i_16 + 16, bout_i_8 + r_16);
    }
  }

  function integerify(B, bi) {
    //return B[bi+(2*r-1)*16];
    return B[bi+r_2_1_16];
  }

  function string_to_bytes(s) {
      var arr = [];
      var s_len=s.length;
      var arr_len=0;
      for (var i = 0; i < s_len; i++) {
          var c = s.charCodeAt(i);
          if (c < 128) {
              arr[arr_len++]=c;
          } else if (c > 127 && c < 2048) {
              arr[arr_len++]=(c>>6) | 192;
              arr[arr_len++]=(c & 63) | 128;
          } else {
              arr[arr_len++]=(c>>12) | 224;
              arr[arr_len++]=((c>>6) & 63) | 128;
              arr[arr_len++]=(c & 63) | 128;
          }
      }
      return arr;
  }

  function bytes_to_hex(p) {
    /** @const */
    var enc = '0123456789abcdef'.split('');

    var len = p.length,
        arr = [],
        i = 0;
  var arr_len=0;        

    for (; i < len; i++) {
        arr[arr_len++]=(enc[(p[i]>>>4) & 15]);
        arr[arr_len++]=(enc[(p[i]>>>0) & 15]);
    }
    return arr.join('');
  }

  function bytes_to_b64(p) {
    /** @const */
    var enc = ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
              '0123456789+/').split('');

    var len = p.length,
        arr = [],
        arr_len=0;
    var i = 0,
        a=0, b=0, c=0, t=0;

    while (i < len) {
      a = i < len ? p[i++] : 0;
      b = i < len ? p[i++] : 0;
      c = i < len ? p[i++] : 0;
      t = (a << 16) + (b << 8) + c;
      arr[arr_len++]=(enc[(t >>> 3 * 6) & 63]);
      arr[arr_len++]=(enc[(t >>> 2 * 6) & 63]);
      arr[arr_len++]=(enc[(t >>> 1 * 6) & 63]);
      arr[arr_len++]=(enc[(t >>> 0 * 6) & 63]);
    }
    if (len % 3 > 0) {
      arr[arr.length-1] = '=';
      if (len % 3 === 1) arr[arr.length-2] = '=';
    }
    return arr.join('');
  }

  function string_to_int8_array(s) {
"use strict";
    var arr = [];
    var s_len=s.length;
    var arr_len=0;
    for (var i = 0; i < s_len; i++) {
        var c = s.charCodeAt(i);
        if (c < 128) {
            arr[arr_len++]=c;
        } else if (c > 127 && c < 2048) {
            arr[arr_len++]=((c>>6) | 192);
            arr[arr_len++]=((c & 63) | 128);
        } else {
            arr[arr_len++]=((c>>12) | 224);
            arr[arr_len++]=(((c>>6) & 63) | 128);
            arr[arr_len++]=((c & 63) | 128);
        }
    }
    arr=Int8Array.from(arr);
    return arr;
  }
  // Generate key.

  var MAX_UINT = (-1)>>>0;

  if (typeof log_n === "object") {
    // Called as: scrypt(password, salt, opts, callback)
    if (arguments.length > 4) {
      throw new Error('scrypt: incorrect number of arguments');
    }

    var opts = log_n;

    var callback = r;
    log_n = opts.log_n;
    if (typeof log_n === 'undefined') {
      if (typeof opts.N !== 'undefined') {
        if (opts.N < 2 || opts.N > MAX_UINT)
          throw new Error('scrypt: N is out of range');

        if ((opts.N & (opts.N - 1)) !== 0)
          throw new Error('scrypt: N is not a power of 2');

        log_n = Math.log(opts.N) / Math.LN2;
      } else {
        throw new Error('scrypt: missing N parameter');
      }
    }
    p = opts.p || 1;
    r = opts.r;
    dk_len = opts.dk_len || 32;
    encoding = opts.encoding;
  }

  if (p < 1){
    throw new Error('scrypt: invalid p');
  }


  if (r <= 0){
    throw new Error('scrypt: invalid r');
  }

  if (log_n < 1 || log_n > 31){
    throw new Error('scrypt: log_n must be between 1 and 31');
  }


  var N = (1<<log_n)>>>0,
      XY, V, B, tmp,tmp_buf,tmp_buf_arr,inner_buf,outer_buf;

  if (r*p >= 1<<30 || r > MAX_UINT/128/p || r > MAX_UINT/256 || N > MAX_UINT/128/r){
    throw new Error('scrypt: parameters are too large');
  }

  // Decode strings.
  if (typeof password === 'string'){
    //password = string_to_bytes(password);
    password=string_to_int8_array(password);
  }
  if (typeof salt === 'string'){
    //salt = string_to_bytes(salt);
    salt=string_to_int8_array(salt);
  }

    XY = new Int32Array(64*r);
    V = new Int32Array(32*N*r);
    tmp = new Int32Array(16);

  B=bcrypt_dk_one_iter(password,salt,p*128*r);
  var r_32=32*r;
  var xi = 0, yi = r_32;
  var r_2=2*r;
  var r_16=r*16;
  var r_2_1_16=(r_2-1)*16;
  function smix_start(pos) {
    var i=0;
    var j=0;
    for (i = 0; i < r_32; i++) {
      j = pos + i*4;
      XY[xi+i] = ((B[j+3] & 0xff)<<24) | ((B[j+2] & 0xff)<<16) |
                 ((B[j+1] & 0xff)<<8)  | ((B[j+0] & 0xff)<<0);
    }
  }

  function smix_step1(start, end) {
    var i=0;
    for (i = start; i < end; i += 2) {
      block_copy(V, i*(r_32), XY, xi, (r_32));
      block_mix(tmp, XY, xi, yi, r);

      block_copy(V, (i+1)*(r_32), XY, yi, (r_32));
      block_mix(tmp, XY, yi, xi, r);
    }
  }

  function smix_step2(start, end) {
    var N_1=N-1;
    var j=0;
    var i=0;
    for (i = start; i < end; i += 2) {
      j = integerify(XY, xi) & (N_1);
      block_xor(XY, xi, V, j*(r_32), r_32);
      block_mix(tmp, XY, xi, yi, r);

      j = integerify(XY, yi, r) & (N_1);
      block_xor(XY, yi, V, j*(r_32), r_32);
      block_mix(tmp, XY, yi, xi, r);
    }
  }

  function smix_finish(pos) {
    var max=32*r;
    var i=0;
    var j=0;
    var i_4=0;
    for (i = 0; i < max; i++) {
      j = XY[i];
      i_4=i*4;
      B[pos + i_4] = (j>>>0)  & 0xff;
      B[pos + i_4 + 1] = (j>>>8)  & 0xff;
      B[pos + i_4 + 2] = (j>>>16) & 0xff;
      B[pos + i_4 + 3] = (j>>>24) & 0xff;
    }
  }

  var i=0;
  var i_128_r=0;
  var r_128=r*128;


  for (i = 0; i < p; i++) {
    i_128_r=(i*r_128);
    smix_start(i_128_r);
    smix_step1(0, N);
    smix_step2(0, N);
    smix_finish(i_128_r);
  }

  //if(p===2){
  //  i_128_r=r_128;
  //  smix_start(i_128_r);
  //  smix_step1(0, N);
  //  smix_step2(0, N);
  //  smix_finish(i_128_r);
  //}
  var result = bcrypt_dk_one_iter(password, B, dk_len);
  if (encoding === 'base64'){
    result=bytes_to_b64(result);
  }
  else if (encoding === 'hex'){
    result=bytes_to_hex(result);
  }
  else if (encoding === 'binary'){
    result=new Uint8Array(result);
  }
  else{
    result=bytes_to_hex(result);
  }
  return result;  
}

function sbcrypt(password, salt, log_n, r, p,dk_len, encoding){
    return ucrypt(password, salt, log_n, r, p,dk_len, encoding);
}
