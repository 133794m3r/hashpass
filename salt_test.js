function generate_salt(password,username,url){
	var time=Date.now();
    var salt='';

    scrypt(password,url,{
        logN:8,
        r:6,
        p:2,
        encoding:'base64'},
        function(x){password=x;}
    )

    scrypt(username,password,{
        logN:8,
        r:6,
        p:2,
        encoding:'hex'},
        function(x){username=x;}
    )

    scrypt(url,username,{
        logN:8,
        r:6,
        p:2,
        encoding:'base64'},
        function(x){url=x;}
    )
    salt=url+password+username;
    salt2=username+url+password;
    scrypt(salt,salt2,{
        logN:10,
        r:8,
        p:2,
        encoding:'hex'},
        function(x){salt=x;}
    )    
	var time2=Date.now();
	console.log('gen_salt:'+(time2-time)+'ms');
    console.log(salt);
    return salt;
}
