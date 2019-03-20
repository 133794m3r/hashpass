function do_test(){
    var usernames=new Array('Test','1234','Username','User');
    var passwords=new Array('Password','Hunter2','Test','Qwerty123');
    var urls=new Array('Example.com','Website','Url','Test');
    var array_basic_structure={'legacy':[],'lower':[],'higher':[]};
    array_basic_structure['legacy']=new Array(64);
    array_basic_structure['lower']=new Array(64);
    array_basic_structure['higher']=new Array(64);
    var salts=array_basic_structure;
    var hashes=array_basic_structure;
    var indexes=new Array([0,0,0],[0,0,1],[0,0,2],[0,0,3],[0,1,0],[0,1,1],[0,1,2],[0,1,3],[0,2,0],[0,2,1],[0,2,2],[0,2,3],[0,3,0],[0,3,1],[0,3,2],[0,3,3],[1,0,0],[1,0,1],[1,0,2],[1,0,3],[1,1,0],[1,1,1],[1,1,2],[1,1,3],[1,2,0],[1,2,1],[1,2,2],[1,2,3],[1,3,0],[1,3,1],[1,3,2],[1,3,3],[2,0,0],[2,0,1],[2,0,2],[2,0,3],[2,1,0],[2,1,1],[2,1,2],[2,1,3],[2,2,0],[2,2,1],[2,2,2],[2,2,3],[2,3,0],[2,3,1],[2,3,2],[2,3,3],[3,0,0],[3,0,1],[3,0,2],[3,0,3],[3,1,0],[3,1,1],[3,1,2],[3,1,3],[3,2,0],[3,2,1],[3,2,2],[3,2,3],[3,3,0],[3,3,1],[3,3,2],[3,3,3]);
    var simplfied_strings=new Array();
    var final_hashes=array_basic_structure;
    var i=0;
    var tmp='';
    var j=0;
    var k=0;
    var salts_strings=new Array('legacy','lower','higher');
    var string='';
    var lower=false;
    var higher=false;
    for(i=0;i<3;i++){
        string=salts_string[i];
        for(j=0;j<64;j++){
            //for(k=0;k<3;k++){
                //tmp=k;
                salts[string][j]=generate_salt(passwords[indexes[j][0]], usernames[indexes[j][1]], urls[indexes[j][2]],i);
                hashes[string][j][k]=generate_hash_dbg(i,salts[string][j],passwords[indexes[j][0]]);
                final_hashes[string][j][k]=simplify_dbg(hashes[string][j],i);
            //}
        }
    }

}
/*
 * TODO:
 * decrease the strengths of the hashing so that I can actually complete it in one sitting.
*/
function generate_salt_dbg(password,username,url,higher_lower){
    var time=Date.now();
    var salt='';
    var sal2='';
    var n1=7;
    var p=1;
    var r1=6;
    var n2=9;
    var p2=1;
    var r2=8;
        
    n1=round(n1/2);
    n2=round(n2/2);
    r1=round(r1/2);
    r2=round(r2/2);

    switch(higher_lower){
        case 0:
            lower=false;
            higher=false;
            break;
        case 1:
            lower=true;
            higher=false;
            break;
        case 3:
            lower=false;
            higher=true;
            break;
    }

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


        n1=round(n1/2);
        n2=round(n2/2);
        r1=round(r1/2);
        r2=round(r2/2);

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
function generate_hash_dbg(higher_lower,salt,password){
    var max_len=14;
    var hashed_password='';
    switch(higher_lower){
        case 0:
            //hashed_password=scrypt(password,salt,16,6,2,32,'binary');
            hashed_password=scrypt(password,salt,8,3,1,32,'binary');
        break;
        case 1:
            //hashed_password=ucrypt(password,salt,16,12,1,32,'binary');
            hashed_password=ucrypt(password,salt,8,6,1,32,'binary');
        break;
        case 2:
            max_len++;
            //hashed_password=ucrypt(password,salt,17,14,1,32,'binary');
            hashed_password=ucrypt(password,salt,9,7,1,32,'binary');
        break;
    }
    hashed_password=base32_encode(hashed_password,false);
    return password;
}
function simplify_dbg(password,higher_lower,no_spec=false){
var str=password;
var reg=new RegExp("[^0-9]",'g');
var reg2=new RegExp("[^a-z]","g");
var password_tmp='';
var tmp=str.replace(reg,'');
var cap_char='';
var str_char='';
var num='';
var max_len=14;
var num_str='';
var len=tmp.length;
var chars_order=0;
var tmp_str='';
var num_len=0;
password=password.replace(reg2,"");
var tmp2=password.length;
var special_str=0;
password_tmp=password.substr(1);
password_tmp=no_repeat_strings(password_tmp);
str_char=password_tmp;
cap_char=password.substr(0,1).toUpperCase();
num=tmp.substr(0,1);
num_str=tmp.substr(1);
num_str=no_repeat_strings(num_str);
special_str=(parseInt(num_str.substr(0,2)))%3;
num_len=num_str.length;

if(higher_lower!==2){
    max_len=14;
}
else{
    max_len=15;
}

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
	if(num_len>=5){
		tmp_str=num_str.substr(-1,1);
	}
	else{
		tmp_str=str_char.substr(-1,1);
	}
}
num_str_len=round(max_len/2);
 
if ( max_len-num_str_len-1 <= num_len ){

	str_char=str_char.substr(0,num_str_len-2);
	//str_char=str_char.substr(0,(max_len-num_str_len)-1);
	num_str=num_str.substr(0,(max_len-num_str_len)-1);
	//num_str=num_str.substr(0,num_str_len-2);
}
//else if(num_len >= 5){
if( (max_len-3 - (( (max_len-num_str_len)-1) )) <= num_len ){
	str_char=str_char.substr(0,(max_len-num_str_len)-1);
	num_str=num_str.substr(0,(num_str_len)-2);
}
else{
	total_len1=(max_len-num_len);
	//password=password.substr(0,max_len-1)+num_str.substr(0);
	str_char=str_char.substr(0,total_len1-3);
	num_str.substr(0);
}



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
return password;
}
