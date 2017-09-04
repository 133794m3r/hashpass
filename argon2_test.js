heaps=0;
function do_test(n,r,p,id){
total=microtime();
var i=1;
var j=40;
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
var tmp_str=(Math.random()*0xffff).toString(16);
var tmp_str2=(Math.random()*0xfff).toString(16);
var tmp='';


true_start=microtime();
for(i=1;i<=j;i++){
    start=microtime();
    //console.log('tmp '+tmp_str+' tmp_str2 '+tmp_str2);
    try {
        var tmp=argon2_hash({
        pass:tmp_str,
        salt:tmp_str2,
        time:n,
        mem:r,
        parallelism:p,
        type:id
        });
    } catch (e) {
        err = e;
        console.log(e);
    }
  /*  tmp=argon2_hash({
        pass:tmp_str,
        salt:tmp_str2,
        time:n,
        mem:r,
        parallelism:p,
        type:1
        })
*/
    tmp_str2=tmp_str;
    tmp_str=tmp;
    end=microtime();
    times[i-1]=((end-start));
}
true_end=microtime();
var arr_start=1+(Math.ceil(j/20));
var arr_end=-1*arr_start;
//times=times.slice(arr_start,arr_end);
means=mean(times);
std_dev=standard_deviation(times,means);
the_std_dev=std_dev;
the_mean=means;
daheap=new Uint8Array(heaps);
}
