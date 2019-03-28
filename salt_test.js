/*
* Awesome Password Generator aka HashPass
* Copyright (c) 133794m3r aka Macarthur Inbody 2011-2019
* https://github.com/133794m3r/hashpass
* Licensed AGPLv3 or Later
* version 2.0.0b
*/

function generate_salt(password,username,url){
    var salt='';
    var salt2='';
    var n1=7;
    var p=1;
    var r1=9;
    var n2=9;
    var p2=1;
    var r2=7;
    password=ucrypt(password,url,n1,r1,p,32,'base64');
    username=ucrypt(username,password,n1,r1,p,32,'base64');
    url=ucrypt(url,username,n1,r1,p,32,'base64');
    salt=url+password+username;
    salt2=username+url+password;
    ucrypt(salt,salt2,n2,r2,p,32,'hex');
    return salt;
}

function generate_salt2(password,username,url){
    var salt='';
    var salt2='';

    var n1=10;
    var r1=11;
    var p=1;

    var n2=9;
    var r2=8;
    var p2=1;
    password=ucrypt(password,url,n1,r1,p,32,'base64');
    username=ucrypt(username,password,n1,r1,p,32,'base64');
    url=ucrypt(url,username,n1,r1+1,p,32,'base64');
    salt=url+password+username;
    salt2=username+url+password;
    ucrypt(salt,salt2,n2,r2,p,32,'hex');
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
var true_end=0;
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
	start=microtime();
    tmp=generate_salt(passwords[i],usernames[i],urls[i]);
	end=microtime();
	times[i]=(end-start);
}
//times=times.slice(arr_start,arr_end);
arr_start=1+(Math.ceil(num/20));
arr_end=-1*arr_start;
times_sort=times.sort(function(a,b){
        return a - b;
    });
times_sort=times_sort.slice(floor(num/20),-(round(num/20)));
times=times_sort;
true_mean=mean(times);
true_stddev=standard_deviation(times,true_mean);

            str='old salt: </br />';
            hps=round(1/(true_mean+(true_stddev/2)),4);
            str+='new mean:'+true_mean+'<br /> new stddev:'+true_stddev+'<br /> hps:'+hps+'<br />';
            str+='phone time normal:'+round(1/(hps/15),3)+'s<br />';
            str+='phone time worst: '+round(1/(hps/23),3)+'s<br />';
            results.insertAdjacentHTML('afterbegin',str);


times=[];
for(i=0;i<=num;i++){
	start=microtime();
    tmp=generate_salt2(passwords[i],usernames[i],urls[i]);
	end=microtime();
	times[i]=(end-start);
}
//times=times.slice(arr_start,arr_end);
arr_start=1+(Math.ceil(num/20));
arr_end=-1*arr_start;
times_sort=times.sort(function(a,b){
        return a - b;
    });
times_sort=times_sort.slice(floor(num/20),-(round(num/20)));
times=times_sort;
true_mean=mean(times);
true_stddev=standard_deviation(times,true_mean);
true_end=microtime()

            str='new salt: </br />';
            hps=round(1/(true_mean+(true_stddev/2)),4);
            str+='new mean:'+true_mean+'<br /> new stddev:'+true_stddev+'<br /> hps:'+hps+'<br />';
            str+='phone time normal:'+round(1/(hps/15),3)+'s<br />';
            str+='phone time worst: '+round(1/(hps/23),3)+'s<br />';
            results.insertAdjacentHTML('afterbegin',str);
console.log('true time 1:'+(true_end-true_start));


}
