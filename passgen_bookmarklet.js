/*
* Awesome Password Generator aka HashPass
* Copyright (c) 133794m3r aka Macarthur Inbody 2011-2019
* https://github.com/133794m3r/hashpass
* AGPLv3
*/
function generate_pass(){
    var objs=document.getElementsByTagName('input');
    var objs_len=objs.length;
    var type='';
    var j=0;
    var tmp='';
    var inputs=[];
    var username='';
    for(i=0;i<objs_len;++i){
        type=objs[i].type;
        if(type=='password'){
            inputs[j++]=i;
            tmp=objs[i].value;
            if(tmp!==''){
                password=tmp;
            }
        }
    }
    var inputs_len=inputs.length;
    for(i=0;i<inputs_len;++i){
        tmp=objs[inputs[i]-1].value;
        if(tmp!==''){
            username=tmp;
        }
    }
    var salt=generate_salt(password,username);
    salt=salt.substr(0,22);
    salt='$2a$04$'+salt;
    password=bcrypt(password,salt);
    password=sha1(password);
    password=hex_decode(password);
    password=base32_encode(password);
    password=password.substr(0,12);
    for(i=0;i<inputs_len;++i){
        objs[inputs[i]].value=password;
    }
}
generate_pass();
