

function do_write(str){
    document.writeln(str+'<br />');
}

function do_test(rounds){
total=microtime();
var i=1;
var j=25;
var l=0;
var k=2;
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
for(i=1;i<=k;i++){
    tmp_str=sha1(tmp_str);
    if (rounds<=9) {
        round_str='0'+rounds;
    }
    else{
        round_str=rounds;
    }
    salts[i-1]="$2a$"+round_str+"$"+tmp_str.substring(0,22);
}
for(i=1;i<=k;i++){
    tmp_str2=sha1(tmp_str);
    strings[i-1]=tmp_str2;
}
true_start=microtime();
for(i=1;i<=j;i++){
    start=microtime();
    for(l=1;l<=k;l++){
        bcrypt(strings[l-1],salts[l-1]);
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

