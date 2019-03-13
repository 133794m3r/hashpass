/*
* Awesome Password Generator aka HashPass
* Copyright (c) Macarthur Inbody 2011-2017
* https://github.com/133794m3r/hashpass
* Licensed AGPLv3 or Later
* version 2.0.1
*/
perc=0;
function generate_salt(password,username,url,lower=false,higher=false){
    var time=Date.now();
    var salt='';
    var sal2='';
    var n1=7;
    var p=1;
    var r1=6;
    var n2=9;
    var p2=1;
    var r2=8;



	if(lower==true && higher === false){

		password=scrypt(password,url,{
			log_n:n1,
			r:r1,
			p:p,
			encoding:'base64'}
		)

		username=scrypt(username,password,{
			log_n:n1,
			r:r1,
			p:p,
			encoding:'hex'}
		)

		url=scrypt(url,username,{
			log_n:n1,
			r:r1,
			p:p,
			encoding:'base64'}
		)
	}
    
	else{

    if(higher===true){
        r1=9;
        n1=9;
        n2=12;
        r2=14;
    }
    
    r1=r1+1;
    r2=r2+1;

		password=ucrypt(password,url,{
			log_n:n1,
			r:r1,
			p:p,
			encoding:'base64'}
		)

		username=ucrypt(username,password,{
			log_n:n1,
			r:r1,
			p:p,
			encoding:'hex'}
		)

		url=ucrypt(url,username,{
			log_n:n1,
			r:r1,
			p:p,
			encoding:'base64'}
		)
	}
    salt=url+password+username;
    salt2=username+url+password;
	if(lower===true){
		salt=scrypt(salt,salt2,{
			log_n:n2,
			r:r2,
			p:p2,
			encoding:'hex'}
		)
	}
	else{
		salt=ucrypt(salt,salt2,{
			log_n:n2,
			r:r2,
			p:p2,
			encoding:'hex'}
		)
	}
    
    var time2=Date.now();
    console.log('gen_salt:'+(time2-time)+'ms');
    console.log(salt);
    return salt;
}
function simplify(password,max_len,no_spec,legacy_mode){

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
//console.log('num '+num_str);
//console.log('str '+str_char);


    chars_order=(password.charCodeAt(1)+password.charCodeAt(1)+password.charCodeAt(2))%10;
  //  password='example2';
   // console.log(chars_order);
	switch(chars_order){
		case 0:
			//A0bcdefg123@
			password=cap_char+num+str_char+num_str+tmp_str;
			break;
		case 1:
			//@123Abcdefg0
			password=tmp_str+num_str+cap_char+str_char+num;
			break;
		case 2:
			//0@A123bcdefg
			password=num+tmp_str+cap_char+num_str+str_char;
			break;
		case 3:
			//A123@bcdefg0
			password=cap_char+num_str+tmp_str+str_char+num;
			break;
		case 4:
			//123Abcdefg@0
			password=num_str+cap_char+str_char+tmp_str+num;
			break;
		case 5:
			//123A0bcdefg@
			password=num_str+cap_char+num+str_char+tmp_str;
			break;
		case 6:
			//bcdefg1230A
			password=tmp_str+num_str+str_char+num+cap_char;
			break;
		case 7:
			//123@bcdefgA0
			password=num_str+tmp_str+str_char+cap_char+num;
			break;
		case 8:
			//bcdefg123@A0
			password=str_char+num_str+tmp_str+cap_char+num;
			break;
		case 9:
			//0bcdefg123@A
			password=num+str_char+num_str+tmp_str+cap_char;
			break;
	}
//password=password+tmp_str;
var time2=Date.now();
console.log('pass '+password);
console.log('simplify:'+(time2-time)+'ms');
return password;

}

function generate_pass(dbg=false){
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
    var p=1;
    var r=10;
    var n=15;
	var no_spec=select_by_id('no_spec').checked;
    var legacy_mode=select_by_id('no_legacy').checked;
	var higher_security=select_by_id('no_security').checked;
    var score=0;
    var score_progress=0;
    var warning='';
    var warn_txt='';
	//password special strings will be one of $#@
    url=select_by_id('site_name').value;
	password=select_by_id('password').value;
	username=select_by_id('username').value;
	max_len=select_by_id('length').value;
    inputs[0]=username;inputs[1]=url;
	if(max_len === ''){
		max_len=14;
		select_by_id('length').value=14;
	}
    if(password !== ''){
        tmp=password.length;
        password=password.substr(0,1).toUpperCase()+password.substr(1,tmp);
        select_by_id('password').value=password;
    }
	if(username !== ''){
		username=username.substr(0,1).toUpperCase()+username.substr(1);
		select_by_id('username').value=username;
	}
	if(url !==''){
		url=url.substr(0,1).toUpperCase()+url.substr(1);
		select_by_id('site_name').value=url;
	}
	tmp='';
    result=zxcvbn(password,inputs);
	tmp=result.feedback.warning;
	console.log(result.guesses);
    console.log(tmp);
    warning='Try adding a word or two, less common words are better. Or try adding a few numbers. '+tmp;

    score=result.score;
    if(score===0){
        color='red';
        warn_txt='Unsafe'
        document.getElementById('orig_score_txt').setAttribute('style', 'color: red; font-weight:bold;');
    }
    else if(score === 1){
        color='orange';
        warn_txt='Bad'
    }
    else if(score === 2){
        color='yellow';
        warn_txt='Acceptable'
    }
    else if(score === 3){
        color='yellowgreen';
        warn_txt='Safe'
    }
    else{
        color='green';
        warn_txt='Perfect'
    }
    select_by_id('orig_score_txt').setAttribute('style', 'color: white; font-weight:bold;');
    select_by_id('orig_score_txt').innerHTML=score;
    score_progress=((score)*23.75);
    select_by_id('low_score_warn').setAttribute('style',"margin-left:29%; background-color:black; color:"+color);
    select_by_id('low_score_warn').innerHTML=warn_txt;
    select_by_id('orig_score_bar').setAttribute('style',"width:"+score_progress+"%; background-color:"+color); 


    if(result.score<=1 && ((inputs[0] === inputs[1])||(inputs[0] === password)||(inputs[1] === password))){
        select_by_id('feedback').innerHTML='Do not use your username or site name in the password! '+warning;
    }
    else if(result.score<=2){
	    select_by_id('feedback').innerHTML=warning;
    }
    else{
        select_by_id('feedback').innerHTML='Score is 3 or above and thus suggestions not necessary';
    }

    time=Date.now();
    var salt=generate_salt(password,username,url,legacy_mode);
	time4=Date.now();
    /* 
    * using ~380x guesses as SSE2 scrypt running on CPU whereas the state of the art gpu at the time can only
    * do ~20x as fast as my own GPU which is itself only ~1.5x as fast as the cpu. So I am doing ~13x the rate
    * that about $10K worth of GPUs can theoretically attempt in 2018. Hopefully this high of a ceiling can still
    * keep that number within a reasonable amount for a long period of time. I will of course update this section
    * with more accurate data every 5 years to keep guessing time accurate. I cannot test the hashing speed with my
    * own gpu as it's way too damned slow to test.
    */
    if(legacy_mode===true){
	    select_by_id('orig_time').innerHTML=display_time(result.guesses/1300);
        password=scrypt(password,salt,16,6,2,32,'binary');
		
    }
	else if(higher_security===false){
		select_by_id('orig_time').innerHTML=display_time(result.guesses/1300);
		password=ucrypt(password,salt,16,12,1,32,'binary');
        select_by_id('length').value=14;
	}
    else{
		select_by_id('orig_time').innerHTML=display_time(result.guesses/1300);
		password=ucrypt(password,salt,17,14,1,32,'binary');
	    max_len++;
        select_by_id('length').value=max_len;
    }
    time3=Date.now();
    console.log('scrypt time:'+(time3-time4)+'ms');

    //password=hex_decode(password);
    password=base32_encode(password,false);

    console.log('scrypt:'+password);
    password=simplify(password,max_len,no_spec,legacy_mode);

//    password=password.substr(0,max_len);
    select_by_id('result').value=password;
    time2=Date.now();
    var total=time2-time;
    console.log('total:'+((time2-time))+'ms');

	if(dbg===true){
		alert('total new values:'+total);
	}

    time=Date.now();
    result=zxcvbn(password);
    time2=Date.now();
    console.log('zxcvbn:'+((time2-time))+'ms');

    score=result.score;
    console.log('b '+score);
    color='green';

    score_progress=((score)*23.75);
    select_by_id('gen_score_txt').innerHTML=score;
    select_by_id('gen_score_bar').setAttribute('style',"width:"+score_progress+"%; background-color:"+color);

//using ~380x guesses as SSE2 scrypt running on CPU.

/*
*switched the generated one back to a more realistic estimate because I don't know what sites are
*actually using for their system and moved real times to the orginal one as that' the one where
I control the strengths.
*/
select_by_id('gen_time').innerHTML=display_time(result.guesses/9000);
modal_toggle('_progress');

select_by_id('generate_pass').disabled=false

return;
}



function percent_update(percent){
	var completed_perc=select_by_id('completed_perc');
	var perc_text=select_by_id('perc_text');
	var perc_done=select_by_id('perc_done');
	percent=percent+'%';
	
	perc_text.innerHTML=percent;
	perc_done.innerHTML=percent;
	completed_perc.style.width=percent;
}

function modal_toggle(id){
	var el=select_by_id('modal'+id);
	var visible=el.style.visibility;
	if(visible==="visible"){
		el.style.visibility='hidden';
	}
	else{
		el.style.visibility='visible';
	}
	return 0;
}

function no_spec_check(){
	var no_spec=select_by_id('no_spec');
	if(no_spec.checked===true){
		modal_toggle('_spec');
	}
	return 0;
}
function no_legacy_check(){
	var no_legacy=select_by_id('no_legacy');
	if(no_legacy.checked===true){
		modal_toggle('_legacy');
	}
	return 0;
}
function change_security_mode(){
    var high_security=select_by_id('no_security');
    if(high_security.checked===true){
        modal_toggle('_security');
    }
    return 0;
}
function confirmed(val,id){
	var el=select_by_id('no'+id);
	el.checked=val;
	modal_toggle(id);
	return 0;
}

function generate_wrapper(dbg=false){
	setTimeout(function(){select_by_id('modal_progress').style.visibility='visible'},0);
    setTimeout(function(){select_by_id('generate_pass').disabled=true},1);
	var interval=setTimeout(function(){percent_update(70)},2);
	setTimeout(function(){generate_pass(dbg)},45);
}

function score_password(){
    var legacy_mode=select_by_id('no_legacy').checked;
    var tmp='';
	var warn_txt='';
    var warning='';
    var result='';
    var inputs=[];
    var score=0;
    var score_progress=0;
    var url=select_by_id('site_name').value;
    var password=select_by_id('password').value;
	var username=select_by_id('username').value;
	var max_len=select_by_id('length').value;
    result=zxcvbn(password,inputs);
    if(password !== ''){
        password=password.substr(0,1).toUpperCase()+password.substr(1);
        select_by_id('password').value=password;
    }
	if(username !== ''){
		username=username.substr(0,1).toUpperCase()+username.substr(1);
		select_by_id('username').value=username;
	}
	if(url !==''){
		url=url.substr(0,1).toUpperCase()+url.substr(1);
		select_by_id('site_name').value=url;
	}
    score=result.score;
    //result=zxcvbn(password,inputs);
	tmp=result.feedback.warning;
    if(score===0){
        color='red';
        warn_txt='Unsafe'
        select_by_id('orig_score_txt').setAttribute('style', 'color: red; font-weight:bold;');
    }
    else if(score === 1){
        color='orange';
        warn_txt='Bad'
    }
    else if(score === 2){
        color='yellow';
        warn_txt='Acceptable'
    }
    else if(score === 3){
        color='yellowgreen';
        warn_txt='Safe'
    }
    else{
        color='green';
        warn_txt='Perfect'
    }
    select_by_id('orig_score_txt').setAttribute('style', 'color: white; font-weight:bold;');
    warning='Try adding a word or two, less common words are better. Or try adding a few numbers. '+tmp;
    select_by_id('orig_score_txt').innerHTML=result.score;
    score_progress=((result.score)*23.75);
    select_by_id('orig_score_bar').setAttribute('style',"width:"+score_progress+"%; background-color:"+color);  
    select_by_id('low_score_warn').setAttribute('style',"margin-left:29%;"+"color:"+color);
    select_by_id('low_score_warn').innerHTML=warn_txt;
    
    if(result.score<=1 && ((username == password)||(url == password))){
        select_by_id('feedback').innerHTML='Do not use your username or site name in the password! '+warning;
    }
    else if(result.score<=2){
        console.log('hit');
	    select_by_id('feedback').innerHTML=warning;
    }
    else{
        select_by_id('feedback').innerHTML='Score is 3 or above and thus suggestions not necessary';
    }
    //for scoring password I am using in between as I don't know how they're using it will show up as different but still it should be fine.
        select_by_id('orig_time').innerHTML=display_time(result.guesses/3000);

}
