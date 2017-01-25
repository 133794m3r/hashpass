function generate_salt(password,username,url){
	var time=Date.now();
    var salt='';
    scrypt(password,url,{
        logN:7,
        r:5,
        p:1,
        encoding:'base64'},
        function(x){password=x;}
    )
    scrypt(username,password,{
        logN:7,
        r:5,
        p:1,
        encoding:'hex'},
        function(x){username=x;}
    )
    scrypt(url,username,{
        logN:7,
        r:5,
        p:1,
        encoding:'base64'},
        function(x){url=x;}
    )
    salt=url+password+username;
    salt2=username+url+password;
    scrypt(salt,salt2,{
        logN:9,
        r:7,
        p:1,
        encoding:'hex'},
        function(x){salt=x;}
    )    
	var time2=Date.now();
	console.log('gen_salt:'+(time2-time)+'ms');
    console.log(salt);
    return salt;
}

function simplify(password,max_len){

var time=Date.now();
var str=password;
var reg=new RegExp("[0-9]");
var reg2=new RegExp("[0-9]","g");
var password_tmp='';
var tmp=string_indexes(password,reg);
var cap_char='';
var str_char='';
var num='';
var num_str='';
var len=tmp.length;
var chars_order=0;
chars_order=(password.charCodeAt(1)+password.charCodeAt(1)+password.charCodeAt(2))%3;
password=password.replace(reg2,"");

var tmp2=password.length;
var special_str=0;
password_tmp=password.substr(1);

password_tmp=no_repeat_strings(password_tmp);
str_char=password_tmp;
cap_char=password.substr(0,1).toUpperCase();
//password=password.substr(0,1).toUpperCase()+password_tmp;
num=str.substr(tmp[0],1);
//password=str.substr(tmp[0],1)+password;


for(i=1;i<len;++i){
    num_str+=str.substr(tmp[i],1);
}
num_str=no_repeat_strings(num_str);
if(num_str.length>=5){
	num_str_len=Math.floor((max_len/2));
	//password=password.substr(0,num_str_len)+num_str.substr(0,(max_len-num_str_len)-1);
	str_char=str_char.substr(0,num_str_len-2);
	num_str=num_str.substr(0,(max_len-num_str_len)-1);
}
else{
	max_len=(max_len-num_str.length);
	//password=password.substr(0,max_len-1)+num_str.substr(0);
	str_char=str_char.substr(0,max_len-3);
	num_str.substr(0);
}
special_str=(parseInt(num_str.substr(0,2)))%3;
var tmp_str='';
switch(special_str){
	case 0:
		tmp_str='$';
		break;
	case 1:
		tmp_str='#';
		break;
	case 2:
		tmp_str='@';
		break;
}
switch(chars_order){
	case 0:
		password=num+cap_char+str_char+num_str+tmp_str;
		break;
	case 1:
		password=cap_char+num+str_char+num_str+tmp_str;
		break;
	case 2:
		password=num+cap_char+num_str+str_char+tmp_str;
		break;
}
//password=password+tmp_str;
var time2=Date.now();
console.log('simplify:'+(time2-time)+'ms');
return password;

}

function generate_pass(){
    var objs=document.getElementsByTagName('input');
    var objs_len=objs.length;
    var type='';
    var j=0;
    var tmp='';
    var max_len=14;
    var tmp_num=0;
    var inputs=[];
    var username='';
    var password='';
    var url='';
    var result='';
	var time3=0;
	var time2=0;
	var time=0;
	var time4=0;
	//password special strings will be one of $#@
    url=document.getElementById('site_name').value;
	password=document.getElementById('password').value;
	username=document.getElementById('username').value;
	max_len=document.getElementById('length').value;
	if(max_len===''){
		max_len=14;
		document.getElementById('length').value=14;
	}
    result=zxcvbn(password);
    document.getElementById('orig_score').innerHTML=result.score;
	document.getElementById('feedback').innerHTML=result.feedback.suggestions;
	document.getElementById('orig_time').innerHTML=result.crack_times_display['offline_slow_hashing_1e4_per_second'];
    time=Date.now();
    var salt=generate_salt(password,username,url);
	time4=Date.now();
    scrypt(password,salt,{
        logN:15,
        r:10,
        p:1,
        encoding:'hex'},
        function(x){password=x;}
    )       
	time3=Date.now();
	console.log('scrypt time:'+(time3-time4)+'ms');
    password=hex_decode(password);
    password=base32_encode(password);
	console.log('scrypt:'+password);
	
    password=simplify(password,max_len);
    password=password.substr(0,max_len);
    document.getElementById('result').value=password;
    time2=Date.now();
    console.log('total:'+((time2-time))+'ms');
    time=Date.now();
    result=zxcvbn(password);
    time2=Date.now();
    console.log('zxcvbn:'+((time2-time))+'ms');
    
    document.getElementById('gen_score').innerHTML=result.score;
	document.getElementById('gen_time').innerHTML=result.crack_times_display['offline_slow_hashing_1e4_per_second'];
	console.log(JSON.stringify(result.crack_times_display['offline_slow_hashing_1e4_per_second']));

}

function modal_toggle(id){
	var el=document.getElementById('modal'+id);
	var visible=el.style.visibility;
	console.log('modal'+id);
	console.log(document.getElementById('modal'+id).style.visibility);
	if(visible==="visible"){
		el.style.visibility='hidden';
	}
	else{
		el.style.visibility='visible';
	}
}
