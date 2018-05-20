/*
* Awesome Password Generator aka HashPass
* Copyright (c) Macarthur Inbody 2011-2017
* https://github.com/133794m3r/hashpass
* AGPLv3
*/

function do_write(str){
    document.writeln(str+'<br />');
}
function do_test(rounds){
total=microtime();
var i=0;
var j=60;
var l=0;
var k=2;
var iter=j;
var maximum=j*k;
var strings=new Array(k);
var salts=new Array(k);
var times=new Array(i);
var start=0;
var end=0;
var means=0;
var std_dev=0;
var round_str='';
var tmp_str=Math.random().toString(16);
var tmp_str2=Math.random().toString(16);
for(i=0;i<maximum;i++){
    tmp_str=sha1(tmp_str);
    if (rounds<=9) {
        round_str='0'+rounds;
    }
    else{
        round_str=rounds;
    }
    salts[i]="$2a$"+round_str+"$"+tmp_str.substring(0,22);
}
for(i=0;i<maximum;i++){
    //tmp_str2=sha1(tmp_str);
    tmp_str2=btoa(Math.random());
    strings[i]=tmp_str2;
}
maximum=0;
da_salt=salts[0];
da_string=strings[0];
true_start=microtime();
for(i=1;i<=j;i++){
    start=microtime();
    for(l=1;l<=k;l++,maximum++){
        bcrypt_new(strings[maximum],salts[maximum]);
    }
    end=microtime();
    times[i-1]=((end-start)/k);
}


true_end=microtime();
times_sort=times.sort(function(a,b){
        return a - b;
    });
times_sort=times_sort.slice(floor(iter/20),-(round(iter/20)));
means=mean(times_sort);
std_dev=standard_deviation(times_sort,means);
the_std_dev=std_dev;
the_mean=means;
means=mean(times);
std_dev=standard_deviation(times,means);
console.log('mean: '+means);
console.log('std_dev: '+std_dev);
console.log('hps: '+round(1/(means+Math.floor(std_dev/2)),4));

}
