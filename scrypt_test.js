
function do_write(str){
    document.writeln(str+'<br />');
}

function do_test(n,r,p){
total=microtime();
var i=1;
var j=20;
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

true_start=microtime();
for(i=1;i<=j;i++){
    start=microtime();
    for(l=1;l<=k;l++){
        scrypt(tmp_str,tmp_str2,{
            logN:n,
            r:r,
            p:p
        },
        function (x){tmp=x;}
        )
        tmp_str2=tmp_str;
        tmp_str2=tmp;
    }
    end=microtime();
    times[i-1]=((end-start)/k);
}
true_end=microtime();
means=mean(times);
std_dev=standard_deviation(times,means);
the_std_dev=std_dev;
the_mean=means;
}
