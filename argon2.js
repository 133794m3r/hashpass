 var ArgonType = {
        Argon2d: 0,
        Argon2i: 1
    };      
            function argon2_hash(params){
            var tCost = params.time || 1;
            var mCost = params.mem || 1024;
            var parallelism = params.parallelism || 1;
            var pwd = Module.allocate(Module.intArrayFromString(params.pass), 'i8', Module.ALLOC_NORMAL);
            var pwdlen = params.pass.length;
            var salt = Module.allocate(Module.intArrayFromString(params.salt), 'i8', Module.ALLOC_NORMAL);
            var saltlen = params.salt.length;
            var hash = Module.allocate(new Array(params.hashLen || 24), 'i8', Module.ALLOC_NORMAL);
            var hashlen = params.hashLen || 32;
            var encoded = Module.allocate(new Array(512), 'i8', Module.ALLOC_NORMAL);
            var encodedlen = 512;
            var argon2Type = params.type || argon2.ArgonType.Argon2d;
            var version = 0x13;
            var err;
            var res;
            var encoding=params.encode||'hex';
            try {
                res = Module._argon2_hash(tCost, mCost, parallelism, pwd, pwdlen, salt, saltlen,
                    hash, hashlen, encoded, encodedlen, argon2Type, version);
            } catch (e) {
                err = e;
            }
            var result;
            if (res === 0 && !err) {
                heaps=Module.HEAP8;
                var hashStr = '';
                var hashArr = new Uint8Array(hashlen);
                if(encoding==='hex'){
                for (var i = 0; i < hashlen; i++) {
                    var byte = Module.HEAP8[hash + i];
                    hashArr[i] = byte;
                    hashStr += ('0' + (0xFF & byte).toString(16)).slice(-2);
                }
                    result=hashStr;
                }
                else if(encoding==='arr'){
                    result=hashArr;
                }
                else{
                var encodedStr = Module.Pointer_stringify(encoded);
                result=encodedStr;

                }
            } else {
                try {
                    if (!err) {
                        err = Module.Pointer_stringify(Module._argon2_error_message(res));
                    }
                } catch (e) {
                }
                result = { message: err, code: res };
            }
            try {
                Module._free(pwd);
                Module._free(salt);
                Module._free(hash);
                Module._free(encoded);
            } catch (e) { }
            if (err) {
                throw result;
            } else {
                return result;
            }            
            
            }
            var argon2={hash:argon2_hash,ArgonType:ArgonType};
