//to get the username/email just get the input that is directly above the password. This will allow it to have better salting.
// as a potential hacker won't be able to just try everyone's password with the site. They'll have to go username by username.
//thus limiting the potential exposure for each user, along with making sure that each one is unique.

function convert_to_simple_time(seconds){
	
}

/*
 * first 3 char orig pass
 * 1 part 1 or 2 goes first
 * 2 letter number first
 * 3 cap or num goes first
 *
 * part 1 sing num+cap
 * part 2 letters+nums
 *
 *no consecutive characters, no characters within 2 characters of eachother.
 *Must do test suite with random strnigs to verify the requiremnts are met
 */
function generate_salt(password,username,url){
	var time=Date.now();
	url=sha1(url);
    var salt=sha1(password);
    username=sha1(username);
    salt=url+salt+username;
    salt=sha1(salt,'b62');
    salt=bcrypt(salt,'$2a$04$'+salt);
    salt=salt.substr(22,22);
	var time2=Date.now();
	console.log('gen_salt:'+(time2-time)+'ms');
    return salt;
}
function simplify(password,max_len){

var time=Date.now();
var str=password;
var reg=new RegExp("[0-9]");
var reg2=new RegExp("[0-9]","g");

var tmp=string_indexes(password,reg);

var len=tmp.length;
password=password.replace(reg2,"");

var tmp2=password.length;
var num_str='';
password=password.substr(0,1).toUpperCase()+password.substr(1);
console.log(password);
password=str.substr(tmp[0],1)+password;

for(i=1;i<len;++i){
    num_str+=str.substr(tmp[i],1);
}
console.log(num_str);

if(num_str.length>=5){
	num_str_len=(max_len-5);
	password=password.substr(0,num_str_len)+num_str.substr(0,num_str_len);
}
else{
	num_str_len=max_len-num_str.length;
	password=password.substr(0,num_str_len)+num_str.substr(0,num_str_len);
}
var time2=Date.now();
console.log('simplify:'+(time2-time));
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
/*    for(i=0;i<objs_len;++i){
        type=objs[i].id;
        if(id=='password'){
            inputs[j++]=i;
            tmp_num=objs[i].maxlength;
            if(tmp!==''){
                password=tmp;
            }
            if(tmp_num!==undefined){
                max_len=tmp_num;
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
*/
    url=document.getElementById('site_name').value;
	password=document.getElementById('password').value;
	username=document.getElementById('username').value;
    result=zxcvbn(password);
    document.getElementById('orig_score').innerHTML=result.score;
	document.getElementById('orig_time').innerHTML=result.crack_times_display['offline_slow_hashing_1e4_per_second'];
    time=Date.now();
    var salt=generate_salt(password,username,url);
	time4=Date.now();
    salt='$2a$10$'+salt;
    password=bcrypt(password,salt);
    password=sha1(password);
	time3=Date.now();
	console.log('bcrypt time:'+(time3-time4));
    password=hex_decode(password);
    password=base32_encode(password);
	console.log('bcrypt:'+password);
	
    password=simplify(password,max_len);
    password=password.substr(0,max_len);
    document.getElementById('result').value=password;
    time2=Date.now();
    console.log('total:'+(time2-time)+'ms');
    time=Date.now();
    result=zxcvbn(password);
    time2=Date.now();
    console.log('zxcvbn:'+(time2-time)+'ms');
    
    document.getElementById('gen_score').innerHTML=result.score;
	document.getElementById('gen_time').innerHTML=result.crack_times_display['offline_slow_hashing_1e4_per_second'];
	console.log(JSON.stringify(result.crack_times_display['offline_slow_hashing_1e4_per_second']));

}
