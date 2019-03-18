function do_test(){
    var usernames=new Array('test','1234','username','user');
    var passwords=new Array('password','pass','letmein','password123');
    var urls=new Array('example.com','website','url','thing');
    var salts={'legacy':[],'lower':[],'higher':[]};
    var finalized_hashes=new Array();
    var indexes=new Array([0,0,0],[0,0,1],[0,0,2],[0,0,3],[0,1,0],[0,1,1],[0,1,2],[0,1,3],[0,2,0],[0,2,1],[0,2,2],[0,2,3],[0,3,0],[0,3,1],[0,3,2],[0,3,3],[1,0,0],[1,0,1],[1,0,2],[1,0,3],[1,1,0],[1,1,1],[1,1,2],[1,1,3],[1,2,0],[1,2,1],[1,2,2],[1,2,3],[1,3,0],[1,3,1],[1,3,2],[1,3,3],[2,0,0],[2,0,1],[2,0,2],[2,0,3],[2,1,0],[2,1,1],[2,1,2],[2,1,3],[2,2,0],[2,2,1],[2,2,2],[2,2,3],[2,3,0],[2,3,1],[2,3,2],[2,3,3],[3,0,0],[3,0,1],[3,0,2],[3,0,3],[3,1,0],[3,1,1],[3,1,2],[3,1,3],[3,2,0],[3,2,1],[3,2,2],[3,2,3],[3,3,0],[3,3,1],[3,3,2],[3,3,3]);
    var simplfied=new Array();
    var i=0;
    var tmp='';
    var j=0;
    var k=0;
    var salts_strings=new Array('legacy','lower','higher');
    var string='';
    var lower=false;
    var higher=false;
    for(i=0;i<3;i++){
        string=salts_strings[i];
    for(j=0;j<64;j++){
        for(k=0;k<3;k++){
            salts[string][j][k]=generate_salt(passwords[indexes[j][k]],usernames[indexes[j][k]],urls[indexes[j][k]]);
        }
    }
    }
    console.log()
}

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
