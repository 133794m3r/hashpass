function compare_numbers(a, b) {
  return a - b;
}
iterations=1;
repeats=2;
w_glob=[];
w2_glob=[];
function do_test(rounds){


var i=0;
var j=0;
var k=0;
var times=[];
var start=0;
var end=0;
var means=0;
var std_devs=0;
var times_sort=[];
var result=[];
var iter=iterations*rounds;
for(i=0;i<iter;i++){
    start=microtime();
    for(j=0;j<repeats;++j){
        //pbkdf2_old('password','salt',rounds,64);
        result=SHA256(sha_string_heap);
    }
    end=microtime();
    times[i]=(end-start)/repeats;
}

times_sort=times.sort(function(a,b){
        return a - b;
    });
times_sort=times_sort.slice(floor(iter/20),-(round(iter/20)));
means=mean(times_sort);
the_mean=means;

std_devs=standard_deviation(times_sort,means);
the_std_dev=std_devs;
}
function do_test1(rounds){
var i=0;
var j=0;
var k=0;
var times=[];
var start=0;
var end=0;
var means=0;
var std_devs=0;
var result=[];
var iter=iterations*rounds;
for(i=0;i<iter;i++){
    start=microtime();
    for(j=0;j<repeats;++j){
        //pbkdf2_new('password','salt',rounds,64);
        result=SHA256_1(sha_string_heap);
    }
    end=microtime();
    times[i]=(end-start)/repeats;
}

times_sort=times.sort(function(a,b){
        return a - b;
    });
times_sort=times_sort.slice(floor(iter/20),-(round(iter/20)));
means=mean(times);
the_mean=means;
std_devs=standard_deviation(times,means);
the_std_dev=std_devs;
}


function do_test2(rounds){
var i=0;
var j=0;
var k=0;
var times=[];
var start=0;
var end=0;
var means=0;
var std_devs=0;
var result=[];
var iter=iterations*rounds;
for(i=0;i<iter;i++){
    start=microtime();
    for(j=0;j<repeats;++j){
        //pbkdf2_new('password','salt',rounds,64);
        result=sha256_bytes(sha_uint_heap);
    }
    end=microtime();
    times[i]=(end-start)/repeats;
}

times_sort=times.sort(function(a,b){
        return a - b;
    });
times_sort=times_sort.slice(floor(iter/20),-(round(iter/20)));
means=mean(times);
the_mean=means;
std_devs=standard_deviation(times,means);
the_std_dev=std_devs;
}


function do_test3(rounds){
var i=0;
var j=0;
var k=0;
var times=[];
var start=0;
var end=0;
var means=0;
var std_devs=0;

var result=[];
var iter=iterations*rounds;
for(i=0;i<iter;i++){
    start=microtime();
    for(j=0;j<repeats;++j){
        //pbkdf2_new('password','salt',rounds,64);
        result=sha256_f(sha_uint_heap);
    }
    end=microtime();
    times[i]=(end-start)/repeats;
}

times_sort=times.sort(function(a,b){
        return a - b;
    });
times_sort=times_sort.slice(floor(iter/20),-(round(iter/20)));
means=mean(times);
the_mean=means;
std_devs=standard_deviation(times,means);
the_std_dev=std_devs;
}


function do_test3a(rounds){
var i=0;
var j=0;
var k=0;
var times=[];
var start=0;
var end=0;
var means=0;
var std_devs=0;

var result=[];
var iter=iterations*rounds;
for(i=0;i<iter;i++){
    start=microtime();
    for(j=0;j<repeats;++j){
        //pbkdf2_new('password','salt',rounds,64);
        result=sha256_fast(sha_uint_heap);
    }
    end=microtime();
    times[i]=(end-start)/repeats;
}

times_sort=times.sort(function(a,b){
        return a - b;
    });
times_sort=times_sort.slice(floor(iter/20),-(round(iter/20)));
means=mean(times);
the_mean=means;
std_devs=standard_deviation(times,means);
the_std_dev=std_devs;
}
