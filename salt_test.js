function generate_salt(password,username,url){
	var time=microtime()
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
	var time2=microtime()
    return salt;
}
function generate_salt3(password,username,url){
    var time=microtime();
    var salt='';
    var tmp='';
    var url=password+username+url;
    n=1;
    m=512;
    p=1;
    id=0;
        tmp=argon2_hash({
        pass:password,
        salt:url,
        time:n,
        mem:r,
        parallelism:p,
        type:id
        });
    password=tmp;

        tmp=argon2_hash({
        pass:username,
        salt:password,
        time:n,
        mem:r,
        parallelism:p,
        type:id
        });
    username=tmp;

        tmp=argon2_hash({
        pass:url,
        salt:usernamee,
        time:n,
        mem:r,
        parallelism:p,
        type:id
        });
    url=tmp;

        tmp=argon2_hash({
        pass:password,
        salt:url,
        time:n,
        mem:r,
        parallelism:p,
        type:id
        });
    url=tmp;

    salt=url+password+username;
    salt2=username+url+password;
        tmp=argon2_hash({
        pass:salt,
        salt:salt2,
        time:n,
        mem:r+128,
        parallelism:p,
        type:id
        });
    salt=tmp;

    return salt;
}
function generate_salt2(password,username,url){
	var time=microtime()
    var salt='';

    scrypt(password,url,{
        logN:9,
        r:7,
        p:2,
        encoding:'base64'},
        function(x){password=x;}
    )

    scrypt(username,password,{
        logN:9,
        r:7,
        p:2,
        encoding:'hex'},
        function(x){username=x;}
    )

    scrypt(url,username,{
        logN:9,
        r:7,
        p:2,
        encoding:'base64'},
        function(x){url=x;}
    )
    salt=url+password+username;
    salt2=username+url+password;
    scrypt(salt,salt2,{
        logN:11,
        r:10,
        p:2,
        encoding:'hex'},
        function(x){salt=x;}
    )    
	var time2=microtime()
    return salt;
}

function do_test(num){
var times=[];
var urls=[];
var usernames=[];
var passwords=[];
var tmp='';
var start=0;
var end=0;
var password='';
var true_start=microtime()
var arr_start=1+(Math.floor(num/20));
var arr_end=-1*arr_start;
for(i=0;i<=num;i++){
	urls[i]=((Math.random()).toString(16))+((Date.now()).toString(16));
	usernames[i]=((Math.random()).toString(16))+((Date.now()).toString(16));
	passwords[i]=((Math.random()).toString(16))+((Date.now()).toString(16));
}
/*
for(i=0;i<=num;i++){
	start=microtime()
	tmp=generate_salt2(passwords[i],usernames[i],urls[i]);
    scrypt(passwords[i],tmp,{
        logN:15,
        r:10,
        p:1,
        encoding:'hex'},
        function(x){password=x;}
    );
	end=microtime()
	times[i]=(end-start);
}
times=times.slice(arr_start,arr_end);
salt_mean=mean(times);
salt_stddev=standard_deviation(times,salt_mean);
*/
times=[];
for(i=0;i<=num;i++){
	start=microtime()
	tmp=generate_salt2(passwords[i],usernames[i],urls[i]);
        password=argon2_hash({
        pass:passwords[i],
        salt:tmp,
        time:1,
        mem:2048+1024,
        parallelism:1,
        type:0
        });
	end=microtime()
	times[i]=(end-start);
}
//times=times.slice(arr_start,arr_end);
true_mean=mean(times);
true_stddev=standard_deviation(times,true_mean);
var true_end=microtime()
console.log('true time:'+(true_end-true_start));

}
