function generate_pass(){
    var objs=document.getElementsByTagName('input');
    var objs_len=objs.length;
    var type='';
    var j=0;
    var tmp='';
    var max_len=14;
    var tmp_num=0;
    var inputs=[];
    var username='';
    var password='';
    for(i=0;i<objs_len;++i){
        type=objs[i].type;
        if(type=='password'){
            inputs[j++]=i;
            tmp_num=objs[i].maxlength;
            if(tmp!==''){
                password=tmp;
            }
            if(tmp_num!==undefined){
                max_len=tmp_num;
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
    salt='$2a$07$'+salt;
    password=bcrypt(password,salt);
    password=sha1(password);
    password=hex_decode(password);
    password=base32_encode(password);
    password=password.substr(0,max_len);
    for(i=0;i<inputs_len;++i){
        objs[inputs[i]].value=password;
    }
}
generate_pass();