/*
* Awesome Password Generator aka HashPass
* Copyright (c) Macarthur Inbody 2011-2017
* https://github.com/133794m3r/hashpass
* AGPLv3
*/
function do_write(str){
    document.writeln(str+'<br />');
}

function do_test(n,r,p){
total=microtime();
var i=1;
var j=120;
var l=0;
var k=1;
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
var tmp='';
n=Math.pow(2,n);

true_start=microtime();
for(i=1;i<=j;i++){
    start=microtime();
        res=scrypt(tmp_str,tmp_str2,{
            N:n,
            r:r,
            p:p
        })
        tmp_str2=tmp_str;
        tmp_str2=tmp;
    end=microtime();
    times[i-1]=((end-start));
}
console.log(res);
true_end=microtime();

var arr_start=1+(Math.ceil(j/20));
var arr_end=-1*arr_start;
times_sort=times.sort(function(a,b){
        return a - b;
    });
times_sort=times_sort.slice(floor(j/20),-(round(j/20)));
//times=times.slice(arr_start,arr_end);
times=times_sort;
means=mean(times);
std_dev=standard_deviation(times,means);
the_std_dev=std_dev;
the_mean=means;
}
