<?php
	function mean($array){
		$array_length=count($array);
		$array_total=0;
		for($i=0;$i<$array_length;++$i){
			$array_total+=$array[$i];
		}
		return round(($array_total/$array_length),8);
	}
	function standard_deviation($array,$mean){
		$array_length=count($array);
		$i=0;
		$std_dev=0;
		for($i=0;$i<$array_length;++$i){
			$std_dev+=pow(($array[$i]-$mean),2);
		}
		$std_dev=$std_dev/$array_length;
		$std_dev=round(sqrt($std_dev),8);
		return $std_dev;
        }
        
$start=microtime(true);
$pass=bin2hex(rand());
$username=bin2hex(rand());
$url=bin2hex(rand());
function generate_salt($password,$username,$url){
    $password=base64_encode(scrypt($password,$url,512,8,1,32,true));
    $username=scrypt($username,$password,512,8,1,32);
    $url=base64_encode(scrypt($url,$username,512,8,1,32,true));
    $salt=$url.$password.$username;
    $salt2=$username.$url.$password;
    $salt=scrypt($salt,$salt2,16384,9,1,32);
    return $salt;
}
function generate_salt2($password,$username,$url){
    $password=base64_encode(scrypt($password,$url,512,8,1,32,true));
    $username=scrypt($username,$password,512,8,1,32);
    $url=base64_encode(scrypt($url,$username,512,8,1,32,true));
    $salt=$url.$password.$username;
    $salt2=$username.$url.$password;
    $salt=scrypt($salt,$salt2,16384,8,1,32);
    return $salt;
}
function no_repeat_strings($str){
    $tmp_str='';
    $str_fixed='';
    $strlen=strlen($str);
    $extra_str='';
    $prev_str=substr($str,0,1);
    $cur_str='';
    $repeat_found=1;
    $i=1;
    $tmp_str_len=0;
    $j=0;
    $l=0;
    while($repeat_found===1){
        if(($i>$strlen) && ($tmp_str_len>=1) && ($j<=100)){
            $l=$l+$i+$j;
            $i=1;
            $str=$tmp_str.$extra_str;
            if(substr($str,-1,1)===substr($str,-2,1)){
                $ins_place=rand(0,$strlen);
                $str=substr($str,0,$ins_place).substr($str,-1,1).substr($str,$ins_place,($strlen-1));
            }
            else if(substr($str,0,1)===substr($str,1,1)){
                $ins_place=rand(0,$strlen);
                $str=substr($str,0,$ins_place).substr($str,-1,1).substr($str,$ins_place,($strlen-1));
            }
            $prev_str=substr($str,0,1);
            $tmp_str_len=0;
            $repeat_found=1;
            $extra_str='';
            $tmp_str='';
            $j=$j+1;
        }
        else if($i>$strlen){
            $repeat_found=0;
        }
        $cur_str=substr($str,$i,1);
        if($prev_str === $cur_str){
            $tmp_str.=$prev_str;
            //$tmp_str_len=$tmp_str_len+1;
            $tmp_str_len=strlen($tmp_str);
        }
        else{
            $extra_str.=$prev_str;
        }
        $prev_str=$cur_str;
        $i=$i+1;
    }
    $str_fixed=$str;
    return $str_fixed;
}

function simplify($string,$max_len){
    
}

function generate_pass($password,$username,$url,$alt=false){
    $n=32768;
    $r=10;
    $p=2;
    $n=65536;
    $r=6;
    $p=2;
	/*
    if($alt==false){
        $salt=generate_salt($password,$username,$url);
    }
    else{
        $n=65536;
        $r=6;
        $p=2;     
        $salt=generate_salt2($password,$username,$url);
    }
*/
    $salt=$password.$username.$url;
    $password=scrypt($password,$salt,$n,$r,$p,32);
    return $password;
}
$urls=array();
$usernames=array();
$passwords=array();
$times=array();
$start=0;
$end=0;
$tmp='';
$num=150;
$arr_start=round($num*(5/100))+1;
$arr_end=-1*$arr_start;
$true_start=microtime(true);
for($i=0;$i<=($num*2);$i++){
    $urls[$i]=sha1(uniqid().microtime());
    $passwords[$i]=sha1(uniqid().microtime());
    $usernames[$i]=sha1(uniqid().microtime());
}

scrypt($passwords[0],$usernames[0],16,1,1,32);
usleep(10);
$times=array();
/*

for($i=0;$i<=$num;$i++){
    $start=microtime(true);
    $tmp=generate_pass($passwords[$i],$usernames[$i],$urls[$i]);
    $end=microtime(true);
    $times[$i]=$end-$start;
}
sort($times,SORT_NUMERIC);
$times=array_slice($times,$arr_start,$arr_end);
$base_mean=mean($times);
$base_std_dev=standard_deviation($times,$base_mean);
$base_hps=round(1/($base_mean+($base_std_dev/2)),4);
$base_mean=round($base_mean*1000,2);
$base_std_dev=round($base_std_dev*1000,2);
$base_fast=$base_hps*300;
$old_js_phone=round((($base_mean+($base_std_dev/2))*35)/1000,2);
echo 'base'.PHP_EOL;
echo "std mean:$base_mean ms std dev:$base_std_dev ms hps:$base_hps".PHP_EOL;
echo "300x: $base_fast".PHP_EOL;
echo 'old js phone '.$old_js_phone.'s'.PHP_EOL;
*/

usleep(10);
scrypt($passwords[0],$usernames[0],128,1,1,32);
for($i=0;$i<=$num;$i++){
    $start=microtime(true);
    $tmp=generate_pass($passwords[$i],$usernames[$i],$urls[$i],false);
    $end=microtime(true);
    $times[$i]=$end-$start;
}
sort($times,SORT_NUMERIC);
$times=array_slice($times,$arr_start,$arr_end);
$new_mean=mean($times);
$new_std_dev=standard_deviation($times,$new_mean);
$new_hps=round(1/($new_mean+($new_std_dev/2)),4);
$new_mean=round($new_mean*1000,2);
$new_std_dev=round($new_std_dev*1000,2);

$new_js_phone=round((($new_mean+($new_std_dev/2))*36)/1000,2);
$fast_js_phone=round(($new_mean+($new_std_dev/2))*22/1000,2);
$new_fast=$new_hps*380;

echo 'new'.PHP_EOL;
echo "std mean:$new_mean ms std dev:$new_std_dev ms hps:$new_hps".PHP_EOL;
echo "380x: $new_fast".PHP_EOL;
echo 'new js worst phone '.$new_js_phone.'s'.PHP_EOL;
echo 'new js old phone '.$fast_js_phone.'s'.PHP_EOL;
$true_end=microtime(true);
echo 'true time:'.round(($true_end-$true_start),2).PHP_EOL;
/*
//$num=$num*2;
$arr_start=floor($num/20);
$arr_end=-1*$arr_start;
for($i=0;$i<=$num;$i++){
    $start=microtime(true);
    $tmp=generate_salt($usernames[$i],$passwords[$i],$urls[$i]);
    $end=microtime(true);
    $times[$i]=$end-$start;
}
sort($times,SORT_NUMERIC);
$times=array_slice($times,$arr_start,$arr_end);
$old_mean=mean($times);
$old_stddev=standard_deviation($times,$old_mean);

for($i=0;$i<=$num;$i++){
    $start=microtime(true);
    $tmp=generate_salt2($usernames[$i],$passwords[$i],$urls[$i]);
    $end=microtime(true);
    $times[$i]=$end-$start;
}
sort($times,SORT_NUMERIC);
$times=array_slice($times,$arr_start,$arr_end);
$new_mean=mean($times);
$new_stddev=standard_deviation($times,$new_mean);
$old_hps=round(1/($old_mean+($old_stddev/2)),2);
$new_hps=round(1/($new_mean+($new_stddev/2)),2);
$old_mean=round($old_mean*1000,2);
$new_mean=round($new_mean*1000,2);
$old_stddev=round($old_stddev*1000,2);
$new_stddev=round($new_stddev*1000,2);
echo 'old salt mean:'.$old_mean.'ms old std:'.$old_stddev.'ms hps:'.$old_hps.PHP_EOL;
echo 'new salt mean:'.$new_mean.'ms new std:'.$new_stddev.'ms hps:'.$new_hps.PHP_EOL;
*/


/*
3552 1200mhz new mode
4368 920mhz new mode
6295 700mhz new mode
*/
?>
