/*
* Awesome Password Generator aka HashPass
* Copyright (c) Macarthur Inbody 2011-2017
* https://github.com/133794m3r/hashpass
*AGPLv3
*/
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

function intval(value){
    return parseInt(value);
}
/**
 *
 *Better random Number Generator
 *
 *Accepts two paramters to make it more accesible AND like the native ones in other langauges.
 *
 *@param    {integer} min the minimum value
 *@param    {integer} max the maximum value
 *@return   {integer} a random integer between the min AND maximum values
 */
function rand(min,max){
    var deviation;
    if(max===undefined){
        max=min;
        min=0;
    }
    return (Math.floor(Math.random()*(max-min))+min);
}

/**
 *Rounding with precision
 *
 *Allows for one to round a number with decimal precision in mind if they so wish.
 *
 *@param    n   the number to be rounded
 *@param    x   [optional]the precision for the rounding after the decimal
 *@return   the rounded value
 */
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

/**
 * 
 * random Float
 * 
 * Generates a random number between two numbers AND returns a float with the precision that is defined.
 * 
 * @param   min 	integer minimum value
 * @param   max		integer maximum value
 * @param   precision	integer digits of precision
 * @return  float the value   
 */
function randfloat(min,max,precision){
    var range=max-min;
    var num=0;
    var precision_rand=Math.pow(10, precision);
    num=min+(range*(rand(0,precision_rand)/precision_rand));
    num=round(num,precision);
    return num;
}

function sum(initial_value,start,end,formula){
    var i=0;
    var j=initial_value;
    var total;
    for(i=start;i<end;++i){
        total+=eval(formula);
        ++j;
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

function num_format(number){
    str=number+'';
	x = str.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
return x1+x2;
}

function float_bin(num){
    var float_split=num+'';
    float_split=num.split('.');
    var fraction=parseFloat('0.'+float_split[1]);
    var part=1;
    var split=new Array();
    num='';
    var precision=24;
    var cur_len=0;
    var tmp=0;
    var tmp_str='';
    var tmp_str2='';
    var direction=0;
    var i=0;
    if(num<0){
        num+='1';
    }
    else{
        num+='0'
    }
    if(Math.abs(float_split[0])>1){
        tmp_str2=Math.abs(float_split[0]).toString(2);
        cur_len=tmp_str2.length;
        tmp_str2+='.';
    }
    else{
        tmp_str2='0.';
    }
    while(part!==0&&cur_len<precision){
        fraction=fraction*2;
        tmp=fraction;
        tmp=Math.floor(tmp);
        tmp_str2+=tmp;
        fraction+='';
        tmp=fraction.split('.');
        part=parseInt(tmp[1]);
        ++cur_len;
    }
    fraction=tmp_str2.split('.');
    if(parseInt(fraction[0])==0){
        direction=1;
        cur_len=fraction[0].length;
    }
    else{
        direction=0;
        cur_len=fraction[1].length;
    }
    
    for(i=0;i<cur_len;++i){
        
    }
    
}
function bin_float(bin){
    
}


/*
 * js entropy sources need 5
 * 
 * screen_width^screen_height
 * Math.rand
 * time^browser_version
 * random.org 31bits.
 * viewport_width^viewport_height
 * 
 */
function xor_rand(min,max){
    var x,y,z,w,t;
    x=(window.screenX^window.screen.width);
    y=(window.screenY^window.screen.height);
    z=Math.floor((Math.rand()*4294967295));
    w=Math.floor((Math.rand()*4294967295));
    var max_bits=0xffffffff;
    //var max_bits=0x1fffffffffffff;
    w^=(w<<1); w=(w>>3); w^=(w<<10);
    z^=(z<<1); z=(z>>3); z^=(z<<10);
    x^=(x<<16); z=(x>>5); z^=(x<<1);
    y^=(y>>2); y=(y<<5); y^=(y>>15);
    
    var rounds=((w&6)+(x&6)+(y&6)+(z&6))+3;
    var i=0;
    for(i=0;i<rounds;++i){
        w^=(w<<1); w=(w>>3); w^=(w<<10);
        z^=(z<<1); z=(z>>3); z^=(z<<10);
        x^=(x<<16); z=(x>>5); z^=(x<<1);
        y^=(y>>2); y=(y<<5); y^=(y>>15);
    }
//        $.ajax({
//        type:"GET",
//        async:false,
//        url:"http://www.random.org/integers/?",
//        data:'num=1&min=-1000000000&max=1000000000&col=1&base=10&format=plain',
//        success:function (datum){
//            w=parseInt(datum);
//        }
//    });
    rounds=rounds*2;
    for(i=0;i<rounds;++i){
        t=(x^(x<<20))^(y^(y>>11))^(z^(z<<27))^(w^(w>>6));
        x=y;
        y=z;
        z=w;
        w=t;
    }
    if(!min&&!max){
        return w&max_bits;
    }
    else{
        return (Math.floor(w*(max-min))+min)
    }
}

//xor_128(unsigned int min,unsigned int max){
//    unsigned int x=0,y=0,z=0,w=0,t=0;
//   
//    w=xor_64();
//    z^=(w<<1); z=(z>>3); z^=(z<<10);
//    x^=(z<<16); z=(x>>5); z^=(x<<1);
//    y^=(x>>2); y=(y<<5); y^=(y>>15);
//    
//    t=(x^(x<<20))^(y^(y>>11))^(z^(z<<27))^(w^(w>>6));
//    x=y;y=z;z=w;
//    
//    return (w=t);
//}
function microtime(){
    return (Date.now()/1000);
}
