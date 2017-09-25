/*
 * This is the one with my optimizations on it.
 * 
 * This optimized version of sha-1 is thanks to work by Jens Steube
 *  @ hashcat.net and his paper located at 
 *  https://hashcat.net/p12/js-sha1exp_169.pdf
 * 
 * It is still compatible with all of my test vectors(tested ~500 different 
 * strings of varying length to verify the correct output hash)
 */

function sha1_optimized_fast(msg,out_type) {
    var v=0,str='';
	function rotate_left(n,s) {
		var t4 = ( n<<s ) | (n>>>(32-s));
		return t4;
	};
        function r(n,s){
            return rotate_left(n,s);
        }
	function lsb_hex(val) {
		var str="";
		var i;
		var vh;
		var vl;
 
		for( i=0; i<=6; i+=2 ) {
			vh = (val>>>(i*4+4))&0x0f;
			vl = (val>>>(i*4))&0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	};
 
	function cvt_hex(val) {
		var str="";
		var i;
		var v;
 
		for( i=7; i>=0; i-- ) {
			v = (val>>>(i*4))&0x0f;
			str += v.toString(16);
		}
		return str;
	};
 
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};

	var blockstart;
	var i,j,k=0;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;
        var pw=new Array(80);
        var w_0=new Array(24);
        var tmp_shifts=0;
	msg = Utf8Encode(msg);
 
	var msg_len = msg.length;
 
	var word_array = new Array();
	for( i=0; i<msg_len-3; i+=4 ) {
		j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
		msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
		word_array[k++]=j;
	}
 
	switch( msg_len % 4 ) {
		case 0:
			i = 0x080000000;
		break;
		case 1:
			i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
		break;
 
		case 2:
			i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
		break;
 
		case 3:
			i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
		break;
	}
 
	word_array[k++]=i;
 
	while( (k % 16) !== 14 ){
            word_array[k++]=0;
        }
        
 
	word_array[k++]=msg_len>>>29;
	word_array[k++]=(msg_len<<3)&0x0ffffffff;
 
        var k_1=k-1;
	for ( blockstart=0; blockstart<k; blockstart+=16 ) {
 
		for( i=0; i<16; i++ ){
                    W[i] = word_array[blockstart+i];
                }
                
      
                //pw=precomputer_buffer(W);
     var pw_tmp=0;
     //( n<<s ) | (n>>>(32-s)));
    pw_tmp=(W[13]^W[8]^W[2]^W[0]);
    pw[16]=((pw_tmp<<1)|(pw_tmp>>>31));
    pw_tmp=(W[14]^W[9]^W[3]^W[1]);
    pw[17]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(W[15]^W[10]^W[4]^W[2]);
    pw[18]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[16]^W[11]^W[5]^W[3]);
    pw[19]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[17]^W[12]^W[6]^W[4]);
    pw[20]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[18]^W[13]^W[7]^W[5]);
    pw[21]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[19]^W[14]^W[8]^W[6]);
    pw[22]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[20]^W[15]^W[9]^W[7]);
    pw[23]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[21]^pw[16]^W[10]^W[8]);
    pw[24]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[22]^pw[17]^W[11]^W[9]);
    pw[25]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[23]^pw[18]^W[12]^W[10]);
    pw[26]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[24]^pw[19]^W[13]^W[11]);
    pw[27]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[25]^pw[20]^W[14]^W[12]);
    pw[28]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[26]^pw[21]^W[15]^W[13]);
    pw[29]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[27]^pw[22]^pw[16]^W[14]);
    pw[30]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[28]^pw[23]^pw[17]^W[15]);
    pw[31]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[29]^pw[24]^pw[18]^pw[16]);
    pw[32]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[30]^pw[25]^pw[19]^pw[17]);
    pw[33]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[31]^pw[26]^pw[20]^pw[18]);
    pw[34]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[32]^pw[27]^pw[21]^pw[19]);
    pw[35]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[33]^pw[28]^pw[22]^pw[20]);
    pw[36]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[34]^pw[29]^pw[23]^pw[21]);
    pw[37]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[35]^pw[30]^pw[24]^pw[22]);
    pw[38]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[36]^pw[31]^pw[25]^pw[23]);
    pw[39]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[37]^pw[32]^pw[26]^pw[24]);
    pw[40]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[38]^pw[33]^pw[27]^pw[25]);
    pw[41]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[39]^pw[34]^pw[28]^pw[26]);
    pw[42]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[40]^pw[35]^pw[29]^pw[27]);
    pw[43]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[41]^pw[36]^pw[30]^pw[28]);
    pw[44]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[42]^pw[37]^pw[31]^pw[29]);
    pw[45]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[43]^pw[38]^pw[32]^pw[30]);
    pw[46]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[44]^pw[39]^pw[33]^pw[31]);
    pw[47]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[45]^pw[40]^pw[34]^pw[32]);
    pw[48]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[46]^pw[41]^pw[35]^pw[33]);
    pw[49]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[47]^pw[42]^pw[36]^pw[34]);
    pw[50]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[48]^pw[43]^pw[37]^pw[35]);
    pw[51]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[49]^pw[44]^pw[38]^pw[36]);
    pw[52]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[50]^pw[45]^pw[39]^pw[37]);
    pw[53]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[51]^pw[46]^pw[40]^pw[38]);
    pw[54]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[52]^pw[47]^pw[41]^pw[39]);
    pw[55]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[53]^pw[48]^pw[42]^pw[40]);
    pw[56]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[54]^pw[49]^pw[43]^pw[41]);
    pw[57]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[55]^pw[50]^pw[44]^pw[42]);
    pw[58]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[56]^pw[51]^pw[45]^pw[43]);
    pw[59]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[57]^pw[52]^pw[46]^pw[44]);
    pw[60]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[58]^pw[53]^pw[47]^pw[45]);
    pw[61]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[59]^pw[54]^pw[48]^pw[46]);
    pw[62]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[60]^pw[55]^pw[49]^pw[47]);
    pw[63]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[61]^pw[56]^pw[50]^pw[48]);
    pw[64]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[62]^pw[57]^pw[51]^pw[49]);
    pw[65]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[63]^pw[58]^pw[52]^pw[50]);
    pw[66]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[64]^pw[59]^pw[53]^pw[51]);
    pw[67]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[65]^pw[60]^pw[54]^pw[52]);
    pw[68]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[66]^pw[61]^pw[55]^pw[53]);
    pw[69]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[67]^pw[62]^pw[56]^pw[54]);
    pw[70]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[68]^pw[63]^pw[57]^pw[55]);
    pw[71]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[69]^pw[64]^pw[58]^pw[56]);
    pw[72]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[70]^pw[65]^pw[59]^pw[57]);
    pw[73]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[71]^pw[66]^pw[60]^pw[58]);
    pw[74]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[72]^pw[67]^pw[61]^pw[59]);
    pw[75]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[73]^pw[68]^pw[62]^pw[60]);
    pw[76]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[74]^pw[69]^pw[63]^pw[61]);
    pw[77]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[75]^pw[70]^pw[64]^pw[62]);
    pw[78]=((pw_tmp<<1)|((pw_tmp>>>31)));
    pw_tmp=(pw[76]^pw[71]^pw[65]^pw[63]);
    pw[79]=((pw_tmp<<1)|((pw_tmp>>>31)));                
		//W=word_expand(W,pw);
    W[16]=(pw[16]);
    W[17]=(pw[17]);
    W[18]=(pw[18]);
    W[19]=(pw[19]);
    W[20]=(pw[20]);
    W[21]=(pw[21]);
    W[22]=(pw[22]);
    W[23]=(pw[23]);
    W[24]=(pw[24]);
    W[25]=(pw[25]);
    W[26]=(pw[26]);
    W[27]=(pw[27]);
    W[28]=(pw[28]);
    W[29]=(pw[29]);
    W[30]=(pw[30]);
    W[31]=(pw[31]);
    W[32]=(pw[32]);
    W[33]=(pw[33]);
    W[34]=(pw[34]);
    W[35]=(pw[35]);
    W[36]=(pw[36]);
    W[37]=(pw[37]);
    W[38]=(pw[38]);
    W[39]=(pw[39]);
    W[40]=(pw[40]);
    W[41]=(pw[41]);
    W[42]=(pw[42]);
    W[43]=(pw[43]);
    W[44]=(pw[44]);
    W[45]=(pw[45]);
    W[46]=(pw[46]);
    W[47]=(pw[47]);
    W[48]=(pw[48]);
    W[49]=(pw[49]);
    W[50]=(pw[50]);
    W[51]=(pw[51]);
    W[52]=(pw[52]);
    W[53]=(pw[53]);
    W[54]=(pw[54]);
    W[55]=(pw[55]);
    W[56]=(pw[56]);
    W[57]=(pw[57]);
    W[58]=(pw[58]);
    W[59]=(pw[59]);
    W[60]=(pw[60]);
    W[61]=(pw[61]);
    W[62]=(pw[62]);
    W[63]=(pw[63]);
    W[64]=(pw[64]);
    W[65]=(pw[65]);
    W[66]=(pw[66]);
    W[67]=(pw[67]);
    W[68]=(pw[68]);
    W[69]=(pw[69]);
    W[70]=(pw[70]);
    W[71]=(pw[71]);
    W[72]=(pw[72]);
    W[73]=(pw[73]);
    W[74]=(pw[74]);
    W[75]=(pw[75]);
    W[76]=(pw[76]);
    W[77]=(pw[77]);
    W[78]=(pw[78]);
    W[79]=(pw[79]);
		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;
 
		for( i= 0; i<=19; i++ ) {
                    //( n<<s ) | (n>>>(32-s));
                        tmp_shifts=((A<<5)|(A>>>27));
			temp = (tmp_shifts + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = (B<<30|(B>>>2));
			B = A;
			A = temp;
		}
 
		for( i=20; i<=39; i++ ) {
                    tmp_shifts=((A<<5)|(A>>>27));
			temp = (tmp_shifts + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=40; i<=59; i++ ) {
                    tmp_shifts=((A<<5)|(A>>>27));
			temp = (tmp_shifts + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = (B<<30|(B>>>2));
			B = A;
			A = temp;
		}
 
		for( i=60; i<=79; i++ ) {
                    tmp_shifts=((A<<5)|(A>>>27));
			temp = (tmp_shifts + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = (B<<30|(B>>>2));
			B = A;
			A = temp;
		}
                if(blockstart<k_1){
		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;
                }
 
	}
 
    if(!out_type){
        str='';
        for( i=7; i>=0; i-- ) {
                v = (H0>>>(i*4))&0x0f;
                str += v.toString(16);
        };
        for( i=7; i>=0; i-- ) {
                v = (H1>>>(i*4))&0x0f;
                str += v.toString(16);
        }
        for( i=7; i>=0; i-- ) {
                v = (H2>>>(i*4))&0x0f;
                str += v.toString(16);
        }
        for( i=7; i>=0; i-- ) {
                v = (H3>>>(i*4))&0x0f;
                str += v.toString(16);
        }
        for( i=7; i>=0; i-- ) {
                v = (H4>>>(i*4))&0x0f;
                str += v.toString(16);
        }

        return str.toLowerCase();
    }
    else{
        return new Array(H0,H1,H2,H3,H4);
    }
}