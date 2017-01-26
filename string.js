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
  var string_fixed = '';
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
  console.log('j ' + j);
  return string_fixed;
}