function sha1(msg,out_type) {

    function cvt_b62(val){
        var str="";
        var i=0;
        var v=0;
        var chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(val<0){
            val=val+0x80000000;
        }
        for(i=0;i<6;++i){          
            v=val % 62;
            str+=chars.charAt(v);
            val=Math.floor((val-v)/62);
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
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    var rl_tmp;
    var word_array_len=0;
    msg = Utf8Encode(msg);

    var msg_len = msg.length;

    var word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
        j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
        word_array[word_array_len++]= j;
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
            i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;
        break;
    }

    word_array[word_array_len++]=  i ;

    while( (word_array.length % 16) != 14 ){ 
        word_array[word_array_len++]=  0 ;
    }

   word_array[word_array_len++]=msg_len>>>29;
   word_array[word_array_len++]=(msg_len<<3)&0x0ffffffff;


    for ( blockstart=0; blockstart<word_array_len; blockstart+=16 ) {

        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
        for( i=16; i<=79; i++ ){
            W[i] = ((W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16])<<1)|((W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16])>>>31);
        }

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for( i= 0; i<=19; i++ ) {
            rl_tmp=(A<<5)|(A>>>(32-5));
            temp = (rl_tmp + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = (B<<30)|(B>>>(32-30));
            B = A;
            A = temp;
        }

        for( i=20; i<=39; i++ ) {
            rl_tmp=(A<<5)|(A>>>(32-5));
            temp = (rl_tmp + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = (B<<30)|(B>>>(32-30));
            B = A;
            A = temp;
        }

        for( i=40; i<=59; i++ ) {
            rl_tmp=(A<<5)|(A>>>(32-5));
            temp = (rl_tmp + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = (B<<30)|(B>>>(32-30));
            B = A;
            A = temp;
        }

        for( i=60; i<=79; i++ ) {
            rl_tmp=(A<<5)|(A>>>(32-5));
            temp = (rl_tmp + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = (B<<30)|(B>>>(32-30));
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;

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
    else if(out_type=='b62'){
        str='';
        str+=cvt_b62(H0);
        str+=cvt_b62(H1);
        str+=cvt_b62(H2);
        str+=cvt_b62(H3);
        str+=cvt_b62(H4);
        return str;
    }
    else{
        var tmp=new Array(H0,H1,H2,H3,H4);
        return tmp;
    }

}
function base32_encode(string){
    var dictionary='ybndrfg8ejkmcpqxot1uwisza345h769';
    //dictionary="ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var str_len=string.length;
    var iters=Math.ceil(str_len/5);
    var tmp=Math.round(str_len/5);
    var i=0;
    var value=0;
    var part1=0;
    var part2=0;
    var part3=0;
    var part4=0;
    var part5=0;
    var part6=0;
    var part7=0;
    var part8=0;
    var parta=0;
    var partb=0;
    var partc=0;
    var partd=0;
    var parte=0;
    var out_str='';
    for(i=0;i<iters;++i){
        parta=string.charCodeAt(i*5);
        partb=string.charCodeAt((i*5)+1);

        partc=string.charCodeAt((i*5)+2);

        partd=string.charCodeAt((i*5)+3);

        parte=string.charCodeAt((i*5)+4);
        value=(parta*Math.pow(2,32));
        if(partb>=0){
            value+=(partb*Math.pow(2,24));
        }            
        if(partc>=0){
            value+=(partc<<16);
        }
        if(partd>=0){
            value+=(partd<<8);
        }
        if(parte>=0){
            value+=(parte);
        }
           
        part1=(value/0x800000000)&0x1f;
        part2=(value/0x400000000)&0x1f;
        part3=(value/0x2000000)&0x1f;
        part4=(value/0x100000)&0x1f;
        part5=(value/0x8000)&0x1f;
        part6=(value/0x400)&0x1f;
        part7=(value/0x20)&0x1f;
        part8=value&0x1f;
        tmp=dictionary[part1]+dictionary[part2]+dictionary[part3]+dictionary[part4]+dictionary[part5]+dictionary[part6]+dictionary[part7]+dictionary[part8];
        out_str+=tmp;
    }
    return out_str.substr(0,(Math.ceil(str_len*(8/5))));
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
//to get the username/email just get the input that is directly above the password. This will allow it to have better salting.
// as a potential hacker won't be able to just try everyone's password with the site. They'll have to go username by username.
//thus limiting the potential exposure for each user, along with making sure that each one is unique.
function generate_salt(password,username){
    var base_salt='mnJ+,`~~<GvaV9*.S1Ms#ChS';
    var uri=process_uri(window.location.href);
    var salt=sha1(password);
    uri=sha1(uri);
    base_salt=sha1(base_salt);
    username=sha1(username);
    salt=sha1(uri+base_salt+salt+username,'b62');
    return salt;
}
function generate_pass(){
    var objs=document.getElementsByTagName('input');
    var objs_len=objs.length;
    var type='';
    var j=0;
    var tmp='';
    var inputs=[];
    var username='';
    var password='';
    for(i=0;i<objs_len;++i){
        type=objs[i].type;
        if(type=='password'){
            inputs[j++]=i;
            tmp=objs[i].value;
            if(tmp!==''){
                password=tmp;
            }
        }
    }
    var inputs_len=inputs.length;
    for(i=0;i<inputs_len;++i){
        tmp=objs[inputs[i]-1].value;
        if(tmp!==''){
            username=tmp;
        }
    }
    var salt=generate_salt(password,username);
    salt=salt.substr(0,22);
    salt='$2a$07$'+salt;
    password=bcrypt(password,salt);
    password=sha1(password);
    password=hex_decode(password);
    password=base32_encode(password);
    password=password.substr(0,12);
    for(i=0;i<inputs_len;++i){
        objs[inputs[i]].value=password;
    }
}