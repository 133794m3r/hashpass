/*
* Awesome Password Generator aka HashPass
* Copyright (c) Macarthur Inbody 2011-2017
* https://github.com/133794m3r/hashpass
* Licensed AGPLv3 or Later
*/
perc=0;
function generate_salt(password,username,url){
	var time=Date.now();
    var salt='';

    scrypt(password,url,{
        logN:7,
        r:6,
        p:1,
        encoding:'base64'},
        function(x){password=x;}
    )

    scrypt(username,password,{
        logN:7,
        r:6,
        p:1,
        encoding:'hex'},
        function(x){username=x;}
    )

    scrypt(url,username,{
        logN:7,
        r:6,
        p:1,
        encoding:'base64'},
        function(x){url=x;}
    )
    salt=url+password+username;
    salt2=username+url+password;
    scrypt(salt,salt2,{
        logN:9,
        r:8,
        p:1,
        encoding:'hex'},
        function(x){salt=x;}
    )    
	var time2=Date.now();
	console.log('gen_salt:'+(time2-time)+'ms');
    console.log(salt);
    return salt;
}

function simplify(password,max_len,no_spec){

var time=Date.now();
var str=password;
var reg=new RegExp("[^0-9]",'g');
var reg2=new RegExp("[^a-z]","g");
var password_tmp='';
var tmp=str.replace(reg,'');
var cap_char='';
var str_char='';
var num='';
var num_str='';
var len=tmp.length;
var chars_order=0;
var tmp_str='';
chars_order=(password.charCodeAt(1)+password.charCodeAt(1)+password.charCodeAt(2))%5;
password=password.replace(reg2,"");
console.log(password);
var tmp2=password.length;
var special_str=0;
password_tmp=password.substr(1);
password_tmp=no_repeat_strings(password_tmp);
str_char=password_tmp;
cap_char=password.substr(0,1).toUpperCase();
//password=password.substr(0,1).toUpperCase()+password_tmp;
num=tmp.substr(0,1);
//password=str.substr(tmp[0],1)+password;


num_str=tmp.substr(1);
num_str=no_repeat_strings(num_str);

special_str=(parseInt(num_str.substr(0,2)))%3;
if(no_spec===false){
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
}
else{
	if(num_str.length>=5){
		tmp_str=num_str.substr(-1,1);
	}
	else{
		tmp_str=str_char.substr(-1,1);
	}
}

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



switch(chars_order){
	case 0:
        //ex 0Abcdefg123@
		password=num+cap_char+str_char+num_str+tmp_str;
		break;
	case 1:
        //ex A0bcdefg123@
		password=cap_char+num+str_char+num_str+tmp_str;
		break;
	case 2:
        //ex 0A123bcdefg@
		password=num+cap_char+num_str+str_char+tmp_str;
		break;
    case 3:
        //ex 123Abcdefg0@
        password=num_str+cap_char+str_char+num+tmp_str;
        break;
    case 4:
        //ex 0A123bcdefg@
        password=num_str+cap_char+num+str_char+tmp_str;
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
    var warning='';
    var tmp='';
	var no_spec=document.getElementById('no_spec').checked;
	//password special strings will be one of $#@
    url=document.getElementById('site_name').value;
	password=document.getElementById('password').value;
	username=document.getElementById('username').value;
	max_len=document.getElementById('length').value;
    inputs[0]=username;inputs[1]=url;
	if(max_len === ''){
		max_len=14;
		document.getElementById('length').value=14;
	}
    if(password !== ''){
        tmp=password.length;
        password=password.substr(0,1).toUpperCase()+password.substr(1,tmp);
        document.getElementById('password').value=password;
    }
	if(username !== ''){
		username=username.substr(0,1).toUpperCase()+username.substr(1);
		document.getElementById('username').value=username;
	}
	if(url !==''){
		url=url.substr(0,1).toUpperCase()+url.substr(1);
		document.getElementById('site_name').value=url;
	}
	tmp='';
    result=zxcvbn(password,inputs);
	tmp=result.feedback.warning;
	console.log(result.guesses);
    console.log(tmp);
    var warning='Try adding a word or two, less common words are better. Or try adding a few numbers. '+tmp;
    document.getElementById('orig_score').innerHTML=result.score;
    if(result.score<=1 && ((inputs[0] == inputs[1])||(inputs[0] == password)||(inputs[1] == password))){
        document.getElementById('feedback').innerHTML='Do not use your username or site name in the password! '+warning;
    }
    else if(result.score<=1){
        console.log('hit');
	    document.getElementById('feedback').innerHTML=warning;
    }
	document.getElementById('orig_time').innerHTML=display_time(result.guesses/2700);
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
    password=simplify(password,max_len,no_spec);

    password=password.substr(0,max_len);
    document.getElementById('result').value=password;
    time2=Date.now();
    var total=time2-time;
    console.log('total:'+((time2-time))+'ms');
    time=Date.now();
    result=zxcvbn(password,inputs);
    time2=Date.now();
    console.log('zxcvbn:'+((time2-time))+'ms');

	
    document.getElementById('gen_score').innerHTML=result.score;
	document.getElementById('gen_time').innerHTML=display_time(result.guesses/2700);

modal_toggle('_progress');
	//setTimeout(percent_update(99),4);


perc=0;
//alert(total+'ms');
return;
}



function percent_update(percent){
	var completed_perc=document.getElementById('completed_perc');
	var perc_text=document.getElementById('perc_text');
	var perc_done=document.getElementById('perc_done');
	percent=percent+'%';
	
	perc_text.innerHTML=percent;
	perc_done.innerHTML=percent;
	completed_perc.style.width=percent;
}

function modal_toggle(id){
	var el=document.getElementById('modal'+id);
	var visible=el.style.visibility;
	if(visible==="visible"){
		el.style.visibility='hidden';
	}
	else{
		el.style.visibility='visible';
	}
}

function no_spec_check(){
	var no_spec=document.getElementById('no_spec');
	if(no_spec.checked===true){
		modal_toggle('_spec');
	}
}

function confirmed(val){
	var no_spec=document.getElementById('no_spec');
	no_spec.checked=val;
	modal_toggle('_spec');
}

function generate_wrapper(){
	//setTimeout(document.getElementById('generate_pass').disabled=true,0);
	//var timeout=setTimeout(modal_toggle('_progress'),0);
	//setTimeout(function(){document.getElementById('header').innerHTML='changed'},0);
	setTimeout(function(){document.getElementById('modal_progress').style.visibility='visible'},0);
	var interval=setTimeout(function(){percent_update(70);},1);
	setTimeout(function(){generate_pass()},30);
}
