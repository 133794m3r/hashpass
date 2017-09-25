/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
off_1=0;
off_2=0;
offp1=0;
offp1_i=0;
offp2=0;
offp2_i=0;
function pow(value,power){
  var vals=Math.pow(value,power);
    return vals;
}

function sqrt(value){
    return Math.sqrt(value);
}
function ceil(valss){
    var names=Math.ceil(valss);
    return names;
}

function getint(id){
    var values=parseInt($(id).val());
    return values;
}

function floor(valss){
    var values=Math.floor(valss);
    return values;
}
function round(n,x){
    var y=0;
    if(x!==undefined){
        y=parseFloat(n.toFixed(x));
    }
    n=Math.round(n,5);
    if(y!==n&&x!==undefined){
        return parseFloat(y);
    }
    else{
        return parseInt(n);
    }
}
function mean(array){
    var arg_len=array.length;
    var i=0,max=0;
    var tmp=0;
    for(i=0;i<arg_len;++i){
        max+=array[i];
    }
    tmp=round((max/arg_len),8);
    return tmp;
}

function standard_deviation(array,mean){
    if(typeof mean==undefined){
        mean=mean(array);
    }
    var arr_len=array.length,i=0,tmp=0,tmp2=0;
    for(i=0;i<arr_len;++i){
        tmp+=pow((array[i]-mean),2);
    }
    tmp=(tmp/arr_len);
    tmp=round(sqrt(tmp),8);
    return tmp;
}
streamtoword = function(data, offp) {
	var i;
	var word = 0;
	var off = offp;
  var data_len=data.length;
		if(off>=data_len){
			off=0;
		}	    
	for (i = 0; i < 4; i++) {
		word = (word << 8) | (data[off] & 0xff);
		off = off+1;

	}
		if(off>=data_len){
			off=0;
		}	    
	off_1=off;
	offp1=off;
	offp=off;
	return word;
};
stream2word = function(data, offp) {
	var i;
	var word = 0;
	var off = offp;
  var data_len=data.length;
	for (i = 0; i < 4; i++) {
		word = (word << 8) | (data[off] & 0xff);
		off = (off + 1) % data_len
	}
	off_2=off;
	offp2 = off;
  offp=off;
	return word;
}
function rand(min,max){
    var deviation;
    if(max===undefined){
        max=min;
        min=0;
    }
    return (Math.floor(Math.random()*(max-min))+min);
}

stw=[];
s2w=[];
start=Date.now();
max=500000

strs=[];
strs_len=[];

for(i=0;i<=max;++i){
  a=btoa(Date.now()+(Math.random()).toString(16))
  a_len=a.length;
  a=a.split('');
  strs[i]=a;
  strs_len[i]=a_len;
    
}

var j=0;
var max2=max*2;
for(i=0;i<=max2;++i){
   
	offp1_i=offp1;
	offp2_i=offp2;
  b=rand(1,strs_len[j]);
	d=Date.now();
//	for(j=0;j<=10000;++j){
  streamtoword(strs[j],b);
//	}
	c=Date.now();
	stw[i]=(c-d);
	c=Date.now();
//	for(j=0;j<=10000;++j){
	stream2word(strs[j],b);
//	}
	c=Date.now();
	s2w[i]=(c-d);
	if(off_1!==off_2){
		console.log('i '+i);
		console.log('off '+off_1+' off 2'+off_2);
		console.log('offp '+offp1+' offp 2'+offp2);		
		console.log('offpi '+offp1_i+' offpi 2 '+offp2_i);		
		console.log('a_len '+a_len+' b '+b);
	}
   j++;
    if(j>=max){
        j=0;
    }
}
end=Date.now()-start;
/*
s2w_mean=mean(s2w);
s2w_std=standard_deviation(s2w,s2w_mean);
stw_mean=mean(stw);
stw_std=standard_deviation(stw,stw_mean);
console.log('s2w mean '+s2w_mean);
console.log('stw mean '+stw_mean);
console.log('s2w std '+s2w_std);
console.log('stw_std '+stw_std);
*/
console.log('done in '+end+'ms');
/*
Exception: ReferenceError: strs_len is not defined
@Scratchpad/1:124:3
*/
/*
Exception: ReferenceError: strs_len is not defined
@Scratchpad/1:140:3
*/