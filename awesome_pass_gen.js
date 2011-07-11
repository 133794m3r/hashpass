javascript:(function(){
/**
 *  The following function is provided by:
 *
 *  Secure Hash Algorithm (SHA1)
 *  http://www.webtoolkit.info/
 *
 */
function sha1(msg) {

    function rotate_left(n,s) {
        var t4 = ( n<<s ) | (n>>>(32-s));
        return t4;
    };

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

        for (var n = 0; n < string.len; n++) {

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

    msg = Utf8Encode(msg);

    var msg_len = msg.len;

    var word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
        j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
        word_array.push( j );
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

    word_array.push( i );

    while( (word_array.len % 16) != 14 ) word_array.push( 0 );

    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff );


    for ( blockstart=0; blockstart<word_array.len; blockstart+=16 ) {

        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
        for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for( i= 0; i<=19; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=20; i<=39; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=40; i<=59; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=60; i<=79; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;

    }

    temp = cvt_b62(H0) + cvt_b62(H1) + cvt_b62(H2) + cvt_b62(H3) + cvt_b62(H4);

    return temp.toLowerCase();

}    
    var len=(document.forms.length)-1;
    var i=0,j=0;
    var len2;
    var tagname;
    var attr;
    var tmp;
    var found_value=new Array;
    var salt='o6jlhDV3fvuo985FOVl9'
    var max_len=12;
    for(i=0;i<len;++i){
        tagname=document.forms[i].getElementsByTagName('input');
        len2=tagname.len
        for(j=0;j<len2;++j){
            attr=tagname[j].getAttribute('type');
            if(attr=="password"){
                found_value[0].push(i,j);
                found_value[1].push(i,j);
                found_value[2].push(i,j);
                max_len=tagname[j].getAttribute('maxlength');
                if(max_len==null){
                    max_len=12;
                }
            }
            else if(attr=="username"){
                found_value[1].push(i,j);
            }
        }
    }
    var password=document.forms[found_value[0][0]].elements[found_value[0][1]].value;
    var username=document.forms[found_value[1][0]].elements[found_value[1][1]].value;
    var hostname=window.location.hostname.split('.');
    function regnerate_password(hostname,username,password){
        len=hostname.length;
        tmp=username+password+hostname[len-1]+hostname[len-2]+salt;
        var result=sha1(tmp);
        result=sha1(result+salt);
        result=result.substr(0, max_len);
    }
    password=regenerate_password(hostname,username,password);
    var new_div=document.createElement('div');
    new_div.setAttribute('style', ' backround-color:gray;border 2px black;position:absolute;left:5px;top:30px;width:100px;height:200px;');
    new_div.innerHTML='<span>Generated Password</span><br /><input type="password" id="agp_password" /><br /><span>Given Password</span><br /><input type="text" /><a href="#" id="sgp_pass_show">Show/Hide</a><div id="agp_hidden_stuff"><span>Generate New Password</span><span>Given Password<input type="password" id="sgp_generated_password" /><br /><span>Domain/URL</span><input type="text" id="sgp_url" /><br /><span>Password Length</span><input type="text" value="'+len+'"/><br /><input type="button" value="submit" onclick="javascript:regenerate_password()"/>';
    document.body.appendChild(new_div);
})()