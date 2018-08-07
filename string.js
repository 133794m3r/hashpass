/*
* Awesome Password Generator aka HashPass
* Copyright (c) Macarthur Inbody 2011-2017
* https://github.com/133794m3r/hashpass
* Licensed AGPLv3 or Later
* version 2.0.0b
*/
function base32_encode(string) {
    //var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var alphabet = 'ybndrfg8ejkmcpqxot1uwisza345h769';
    var output='';
    var iter= Math.floor((string.length / 5));
    var leftover = string.length % 5;
    var part1=0;
    var part1=0;
    var part2=0;
    var part3=0;
    var part4=0;
    var part5=0;
    var part6=0;
    var part7=0;
    var part8=0;
    var str1='';
    var str2='';
    var str3='';
    var str4='';
    var str5='';
    var padding='';
    if (leftover != 0) {
       //for (var i = 0; i < (5-leftover); i++) { s += '\x00'; }
       iter += 1;
    }

    for (i = 0; i < iter; i++) {
        str1=string.charCodeAt(i*5);
        str2=string.charCodeAt((i*5)+1);
        str3=string.charCodeAt((i*5)+2);
        str4=string.charCodeAt((i*5)+3);
        str5=string.charCodeAt((i*5)+4);
        part1=(str1 >> 3);
        part2=( ((str1 & 0x07) << 2)
           | (str2 >> 6));
        part3=( ((str2 & 0x3F) >> 1) );
        part4=( ((str2 & 0x01) << 4)
           | (str3 >> 4));
        part5=( ((str3 & 0x0F) << 1)
           | (str4 >> 7));
        parts6=( ((str4 & 0x7F) >> 2));
        part7=( ((str4 & 0x03) << 3)
           | (str5 >> 5));
        part8=( ((str5 & 0x1F) ));

        output+=alphabet.charAt(part1)+
        alphabet.charAt(part2)+
        alphabet.charAt(part3)+
        alphabet.charAt(part4)+
        alphabet.charAt(part5)+
        alphabet.charAt(part6)+
        alphabet.charAt(part7)+
        alphabet.charAt(part8);
    }

    var replace = 0;
    if (leftover == 1) replace = 6;
    else if (leftover == 2) replace = 4;
    else if (leftover == 3) replace = 3;
    else if (leftover == 4) replace = 1;
    var j=(i*8);

    for (i = 0; i < replace; i++) padding+='=';
    replace=(j)-replace;
    output=output.substr(0,replace)+padding;
return output;

}
function hex_decode(hex_str){
    var strlen=Math.ceil(hex_str.length/2);
    var i=0;
    var out_str=''
    for(i=0;i<strlen;i++){
        out_str+=String.fromCharCode(parseInt(hex_str.substr(i*2,2),16));
    }
    return out_str;
}
function string_indexes(string,search_string){
var len=string.length;
var tmp_str='';
var str='';
var index=0;
var indexes=[];
var prev_index=0;
var j=0;
while(index!==null){
    tmp_str=string.substr(index);

    index=tmp_str.match(search_string);

    if(index!==null){
        indexes[j++]=tmp_str.indexOf(index[0])+prev_index;
        index=tmp_str.indexOf(index[0])+1+prev_index;
        prev_index=index;
    }
}
return indexes;
}
/*function no_repeat_strings(string){
  var tmp_str='';
  var string_fixed='';
  var strlen=string.length;
  var extra_str='';
  var prev_str=string.substr(0,1);
  var cur_str='';
  var string_fixed='';
  var repeat_found=1;
  var i=1;
  var tmp_str_len=0;
  var j=0;
  var l=0;
  while(repeat_found===1){
    if( (i>strlen)&& (tmp_str_len>=1) && (j<=5)){
      i=1;
      string=extra_str+tmp_str;
      if(string.substr(-1,1)===string.substr(-2,1)){
        ins_place=(l%strlen);
        string=string.substr(0,ins_place)+string.substr(-1,1)+string.substr(ins_place,(strlen-1));
      }      
      prev_str=string.substr(0,1);
      tmp_str_len=0;
      repeat_found=1;
      extra_str='';
      tmp_str='';
      j=j+1;
    }
    else if((i>strlen)){
      repeat_found=0;
    }
    cur_str=string.substr(i,1);
    if(prev_str==cur_str){
      tmp_str+=prev_str;
      tmp_str_len=tmp_str.length;
    }
    else{
      extra_str+=prev_str;
    }
    prev_str=cur_str;
    i=i+1;
  }
  string_fixed=string;
 return string_fixed; 
}
*/
function no_repeat_strings(string) {
  var tmp_str = '';
  var string_fixed = '';
  var strlen = string.length;
  var extra_str = '';
  var prev_str = string.substr(0, 1);
  var cur_str = '';

  var repeat_found = 1;
  var i = 1;
  var tmp_str_len = 0;
  var j = 0;
  var l = 0;
  while (repeat_found === 1) {
    if ((i > strlen) && (tmp_str_len >= 1) && (j <= 100)) {
        l =l+i+j;
        i = 1;
        string = tmp_str + extra_str;
        if (string.substr( -1, 1) === string.substr( -2, 1)) {
            ins_place = (l % strlen);
            string = string.substr(0, ins_place) + string.substr( - 1, 1) + string.substr(ins_place, (strlen - 1));
        }
        else if(string.substr(0,1)===string.substr(1,1)){
            ins_place = (l % strlen);
            string = string.substr(0, ins_place) + string.substr( -1, 1) + string.substr(ins_place, (strlen - 1));
        }
      prev_str = string.substr(0, 1);
      tmp_str_len = 0;
      repeat_found = 1;
      extra_str = '';
      tmp_str = '';
      j = j + 1;
    }
    else if ((i > strlen)) {
      repeat_found = 0;
    }
    cur_str = string.substr(i, 1);
    if (prev_str == cur_str) {
      tmp_str += prev_str;
      tmp_str_len = tmp_str.length;
    } 
    else {
      extra_str += prev_str;
    }
    prev_str = cur_str;
    i = i + 1;

  }
  string_fixed = string;
  return string_fixed;
}

function b64_encode(str,type=false){
	var chr1, chr2, chr3, rez = '', arr = [], i = 0, j = 0, code = 0,k=0;
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');
if(type==false){
	while(code = str.charCodeAt(j++)){
		if(code < 128){
			arr[k] = code;
		}
		else if(code < 2048){
			arr[k] = 192 | (code >> 6);
			arr[k] = 128 | (code & 63);
		}
		else if(code < 65536){
			arr[k] = 224 | (code >> 12);
			arr[k] = 128 | ((code >> 6) & 63);
			arr[k] = 128 | (code & 63);
		}
		else{
			arr[k] = 240 | (code >> 18);
			arr[k] = 128 | ((code >> 12) & 63);
			arr[k] = 128 | ((code >> 6) & 63);
			arr[k] = 128 | (code & 63);
		}
        ++k;
	}
}
else
{
    arr=str;
    k=arr.length;
}
    console.log(arr);
	while(i < k){
		chr1 = arr[i++];
		chr2 = arr[i++];
		chr3 = arr[i++];
		rez += chars[chr1 >> 2];
		rez += chars[(((chr1 & 3) << 4) | (chr2 >> 4))];
		rez += chars[(chr2 === undefined ? 64 : ((chr2 & 15) << 2) | (chr3 >> 6))];
		rez += chars[(chr3 === undefined ? 64 : chr3 & 63)];
	}
	return rez;
};

function b64_decode(str){
    var chr0, chr1, chr2,chr3, rez = '', arr = [], i = 0, j = 0, code = 0,k=0;;
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var strlen=str.length;
    var bits=0;
    var dec=[];
    var ac=0;
    var o0,o1,o2;
    while(i<strlen){
        chr0=chars.indexOf(str.charAt(i));
        chr1=chars.indexOf(str.charAt(i+1));
        chr2=chars.indexOf(i+2,1);
        chr3=chars.indexOf(i+3,1);
        o0=(chr0<<2)|(chr1>>4);
        o1=((chr1&15)<<4)|(chr2>>2);
        o2=((chr2&3)<<6)|chr4;
        
        
        dec+=String.fromCharCode(o0)
        if(chr2!==64){
            dec+=String.fromCharCode(o1);
        }
        else if(chr3!==64){
            dec+=String.fromCharCode(o2);
        }
        chr0=chr1=chr2=chr3='';
        o0=o1=o2='';
      ++i;
    }
    dec=unescape(dec);
    return dec;
}
