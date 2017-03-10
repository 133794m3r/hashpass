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
function do_test(num){
var times=[];
var urls=[];
var usernames=[];
var passwords=[];
var tmp='';
var start=0;
var end=0;
var true_start=microtime()
var arr_start=1+(Math.floor(num/20));
var arr_end=-1*arr_start;
for(i=0;i<=num;i++){
	urls[i]=((Math.random()).toString(16))+((Date.now()).toString(16));
	usernames[i]=((Math.random()).toString(16))+((Date.now()).toString(16));
	passwords[i]=((Math.random()).toString(16))+((Date.now()).toString(16));
}

for(i=0;i<=num;i++){
	start=microtime()
	tmp=generate_salt(passwords[i],usernames[i],urls[i]);
	end=microtime()
	times[i]=(end-start);
}
times=times.slice(arr_start,arr_end);
salt_mean=mean(times);
salt_stddev=standard_deviation(times,salt_mean);

for(i=0;i<=num;i++){
	start=microtime()
	tmp=generate_salt(passwords[i],usernames[i],urls[i]);
	scrypt(passwords[i],tmp,{
            logN:15,
            r:10,
            p:1
        },
        function (x){tmp=x;}
        );
	end=microtime()
	times[i]=(end-start);
}
//times=times.slice(arr_start,arr_end);
true_mean=mean(times);
true_stddev=standard_deviation(times,true_mean);
var true_end=microtime()
console.log('true time:'+(true_end-true_start));

}