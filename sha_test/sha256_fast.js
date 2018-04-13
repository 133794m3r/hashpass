function sha256_fast(data){
"use strict";
var exports=[];
exports.digestLength = 32;
exports.blockSize = 64;
// SHA-256 constants
var K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
    0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
    0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
    0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
    0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
    0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
    0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
    0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
    0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);


function hashBlocks(w, v, p, pos, len) {
    var a, b, c, d, e, f, g, h, u, i, j, t1, t2,pos_tmp=0;
    while (len >= 64) {
        a = v[0];
        b = v[1];
        c = v[2];
        d = v[3];
        e = v[4];
        f = v[5];
        g = v[6];
        h = v[7];
 /*
       for (i = 0; i < 16; i++) {
            j = pos + i * 4;
            w[i] = (((p[j] & 0xff) << 24) | ((p[j + 1] & 0xff) << 16) |
                ((p[j + 2] & 0xff) << 8) | (p[j + 3] & 0xff));
        }
        
        */
 
        //0
        pos_tmp=pos+0;
        w[0] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));
        //1
        pos_tmp=pos+4;
        w[1] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));
        //2
        pos_tmp=pos+8;
        w[2] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        //3
        pos_tmp=pos+12;
        w[3] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        //4
        pos_tmp=pos+16;
        w[4] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        //5
        pos_tmp=pos+20;
        w[5] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        //6
        pos_tmp=pos+24;
        w[6] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        //7
        pos_tmp=pos+28;
        w[7] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        //8
        pos_tmp=pos+32;
        w[8] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        //9
        pos_tmp=pos+36;
        w[9] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        
        //10
        pos_tmp=pos+40;
        w[10] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        //11
        pos_tmp=pos+44;
        w[11] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        //12
        pos_tmp=pos+48;
        w[12] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        //13
        pos_tmp=pos+52;
        w[13] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        //14
        pos_tmp=pos+56;
        w[14] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        //15
        pos_tmp=pos+60;
        w[15] = (((p[pos_tmp] & 0xff) << 24) | ((p[pos_tmp + 1] & 0xff) << 16) |
                ((p[pos_tmp + 2] & 0xff) << 8) | (p[pos_tmp + 3] & 0xff));        
        
        
        /*
        for (i = 16; i < 64; i++) {
            u = w[i - 2];
            t1 = (u >>> 17 | u << (32 - 17)) ^ (u >>> 19 | u << (32 - 19)) ^ (u >>> 10);
            u = w[i - 15];
            t2 = (u >>> 7 | u << (32 - 7)) ^ (u >>> 18 | u << (32 - 18)) ^ (u >>> 3);
            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
        }
        */
        
        //16
            u = w[14];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[1];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[16] = (t1 + w[9] | 0) + (t2 + w[0] | 0);
            
    //17  abbs todo          
            u = w[15];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[2];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[17]=(t1 + w[10] | 0) + (t2 + w[1] | 0);
            
//18            
            u = w[16];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[3];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[18] = (t1 + w[11] | 0) + (t2 + w[2] | 0);
//19        
            
            
            u = w[17];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[4];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[19] = (t1 + w[12] | 0) + (t2 + w[3] | 0);
            
            
            
//20            
            u = w[18];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[5];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[20] = (t1 + w[13] | 0) + (t2 + w[4] | 0);
            
            
            
//21            
            u = w[19];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[6];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[21] = (t1 + w[14] | 0) + (t2 + w[5] | 0);
            
            
            
    //22        
            u = w[20];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[7];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[22] = (t1 + w[15] | 0) + (t2 + w[6] | 0);            
        
        
    //23        
            u = w[21];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[8];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[23] = (t1 + w[16] | 0) + (t2 + w[7] | 0)
            
    //24        
            u = w[22];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[9];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[24] = (t1 + w[17] | 0) + (t2 + w[8] | 0)
    //25        
            u = w[23];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[10];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[25] = (t1 + w[18] | 0) + (t2 + w[9] | 0)
            
    //26        
            u = w[24];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[11];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[26] = (t1 + w[19] | 0) + (t2 + w[10] | 0)
          
    //27        
            u = w[25];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[12];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[27] = (t1 + w[20] | 0) + (t2 + w[11] | 0)
          
            
    //28        
            u = w[26];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[13];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[28] = (t1 + w[21] | 0) + (t2 + w[12] | 0)
          
           
               //29        
            u = w[27];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[14];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[29] = (t1 + w[22] | 0) + (t2 + w[13] | 0)
          
           
            //30        
            u = w[28];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[15];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[30] = (t1 + w[23] | 0) + (t2 + w[14] | 0)
          
               //31        
            u = w[29];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[16];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[31] = (t1 + w[24] | 0) + (t2 + w[15] | 0)
          
               //32        
            u = w[30];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[17];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[32] = (t1 + w[25] | 0) + (t2 + w[16] | 0)
          
               //33        
            u = w[31];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[18];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[33] = (t1 + w[26] | 0) + (t2 + w[17] | 0)
          
               //34        
            u = w[32];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[19];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[34] = (t1 + w[27] | 0) + (t2 + w[18] | 0)
          
               //35        
            u = w[33];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[20];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[35] = (t1 + w[28] | 0) + (t2 + w[19] | 0)
          
               //36        
            u = w[34];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[21];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[36] = (t1 + w[29] | 0) + (t2 + w[20] | 0)
          
               //37        
            u = w[35];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[22];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[37] = (t1 + w[30] | 0) + (t2 + w[21] | 0)
          
               //38        
            u = w[36];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[23];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[38] = (t1 + w[31] | 0) + (t2 + w[22] | 0)
          
               //39        
            u = w[37];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[24];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[39] = (t1 + w[32] | 0) + (t2 + w[23] | 0)
          
               //40        
            u = w[38];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[25];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[40] = (t1 + w[33] | 0) + (t2 + w[24] | 0)
          
               //41        
            u = w[39];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[26];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[41] = (t1 + w[34] | 0) + (t2 + w[25] | 0)
          
               //42        
            u = w[40];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[27];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[42] = (t1 + w[35] | 0) + (t2 + w[26] | 0)

            //43
            u = w[41];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[28];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[43] = (t1 + w[36] | 0) + (t2 + w[27] | 0);
          
          
          //44
            u = w[42];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[29];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[44] = (t1 + w[37] | 0) + (t2 + w[28] | 0);
            
            
                              //45
            u = w[43];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[30];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[45] = (t1 + w[38] | 0) + (t2 + w[29] | 0);
            
            
                        //46
            u = w[44];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[31];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[46] = (t1 + w[39] | 0) + (t2 + w[30] | 0);
            
            
                        //47
            u = w[45];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[32];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[47] = (t1 + w[40] | 0) + (t2 + w[31] | 0);
            
            
                        //48
            u = w[46];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[33];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[48] = (t1 + w[41] | 0) + (t2 + w[32] | 0);
            
            
                        //49
            u = w[47];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[34];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[49] = (t1 + w[42] | 0) + (t2 + w[33] | 0);
            
            
                        //50
            u = w[48];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[35];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[50] = (t1 + w[43] | 0) + (t2 + w[34] | 0);
            
            
                        //51
            u = w[49];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[36];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[51] = (t1 + w[44] | 0) + (t2 + w[35] | 0);
            
            
                        //52
            u = w[50];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[37];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[52] = (t1 + w[45] | 0) + (t2 + w[36] | 0);
            
            
                        //53
            u = w[51];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[38];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[53] = (t1 + w[46] | 0) + (t2 + w[37] | 0);
            
            
                        //54
            u = w[52];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[39];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[54] = (t1 + w[47] | 0) + (t2 + w[38] | 0);
            
            
                        //55
            u = w[53];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[40];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[55] = (t1 + w[48] | 0) + (t2 + w[39] | 0);
            
            
                        //56
            u = w[54];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[41];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[56] = (t1 + w[49] | 0) + (t2 + w[40] | 0);
            
            
                        //57
            u = w[55];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[42];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[57] = (t1 + w[50] | 0) + (t2 + w[41] | 0);
            
            
                        //58
            u = w[56];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[43];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[58] = (t1 + w[51] | 0) + (t2 + w[42] | 0);
            
            
                        //59
            u = w[57];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[44];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[59] = (t1 + w[52] | 0) + (t2 + w[43] | 0);
            
            
                        //60
            u = w[58];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[45];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[60] = (t1 + w[53] | 0) + (t2 + w[44] | 0);
            
            
                        //61
            u = w[59];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[46];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[61] = (t1 + w[54] | 0) + (t2 + w[45] | 0);
            
            
                        //62
            u = w[60];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[47];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[62] = (t1 + w[55] | 0) + (t2 + w[46] | 0);
            
            
                        //63
            u = w[61];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[48];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[63] = (t1 + w[56] | 0) + (t2 + w[47] | 0);
            
            
                        //64
            u = w[62];
            t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
            u = w[49];
            t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
            w[64] = (t1 + w[57] | 0) + (t2 + w[48] | 0);
            
            
            
                                     
        for (i = 0; i < 64; i++) {
            t1 = (((((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^
                (e >>> 25 | e << 7)) + ((e & f) ^ (~e & g))) | 0) +
                ((h + ((K[i] + w[i]) | 0)) | 0)) | 0;
            t2 = (((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^
                (a >>> 22 | a << 10)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
            h = g;
            g = f;
            f = e;
            e = (d + t1) | 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) | 0;
        }
        v[0] += a;
        v[1] += b;
        v[2] += c;
        v[3] += d;
        v[4] += e;
        v[5] += f;
        v[6] += g;
        v[7] += h;
        pos += 64;
        len -= 64;
    }
    return pos;
}

    function reset() {
        state[0] = 0x6a09e667;
        state[1] = 0xbb67ae85;
        state[2] = 0x3c6ef372;
        state[3] = 0xa54ff53a;
        state[4] = 0x510e527f;
        state[5] = 0x9b05688c;
        state[6] = 0x1f83d9ab;
        state[7] = 0x5be0cd19;
        bufferLength = 0;
        bytesHashed = 0;
        finished = false;
    };
function clean(){
    var i=0;
    var buffer_len=buffer.length;
    var temp_len=temp.length;
    for (i=0;i<buffer_len;++i) {
        buffer[i]=0;
    }
    
    for(i=0;i<temp_len;++i){
        temp[i]=0;
    }
    reset();
}

    var digestLength;
        var blockSize;
        // Note: Int32Array is used instead of Uint32Array for performance reasons.
        var state; // hash state
        var temp; // temporary state
        var buffer; // buffer for data to hash
        var bufferLength; // number of bytes in buffer
        var bytesHashed; // number of total bytes hashed
        var finished; // indicates whether the hash was finalized

// Hash implements SHA256 hash algorithm.
function update(data,data_len){
    if(data_len === void 0){data_len=data.length}
    if(finished){
        throw new Error("SHA256: CAN'T UPDATE FINISHED");
    }
    var data_pos=0;
    bytesHashed+=data_len;
    
    if(bufferLength > 0){
        while (bufferLength < 64 && data_len > 0){
            buffer[bufferLength++] = data[data_pos++];
            dataLength--;
        }
        
        if(bufferLength === 64){
            hashblocks(temp,state,buffer,0,64);
            bufferLength = 0;
        }
    }
    
    if(data_len >= 64){
        data_pos = hashBlocks(temp,state,data,data_pos,data_len);
        data_len%=64;
    }
    
    while(data_len > 0){
        buffer[bufferLength++] = data[data_pos++];
        data_len--;
    }
    
    return data;
}
function finish(out){
    var i=0;
    if(!finished){
        var bytes_hashed=bytesHashed;
        var left=bufferLength;
        var bit_len_hi = (bytes_hashed / 0x20000000 )| 0;
        var bit_len_lo = bytes_hashed << 3;
        var pad_len=( (bytes_hashed % 64) < 56) ? 64 : 128;
        var tmp=pad_len-8;
        i=left+1;
        buffer[left] = 0x80;
        for (i;i<tmp; i++) {
            buffer[i]=0;
        }
        
        buffer[pad_len-8]= (bit_len_hi >>> 24) & 0xff;
        buffer[pad_len-7]= (bit_len_hi >>>16 )& 0xff;
        buffer[pad_len-6]= (bit_len_hi >>>8) &0xff;
        buffer[pad_len-5]= (bit_len_hi >>> 0) & 0xff;
        buffer[pad_len-4]= (bit_len_lo >>>24) & 0xff;
        buffer[pad_len-3]=(bit_len_lo >>> 16) & 0xff;
        buffer[pad_len-2]=(bit_len_lo >>> 8) &0xff;
        buffer[pad_len-1]=(bit_len_lo >>> 0 ) &0xff;
        
        hashBlocks(temp,state,buffer,0,pad_len);
        finished=true;
    }

    for(i=0;i < 8; i++){
        out[i * 4] = (state[i] >>> 24) &0xff;
        out[i*4 +1] = (state[i] >>> 16) &0xff;
        out[i*4 +2] = (state[i] >>> 8) &0xff;
        out[i*4 + 3] = (state[i] >>> 0) &0xff;
    }
    
    return out;
}

function digest(){
    var out=new Uint8Array(digestLength);
    out=finish(out);
    return out;
}

function hash(data) {
     digestLength = exports.digestLength;
         blockSize = exports.blockSize;
        // Note: Int32Array is used instead of Uint32Array for performance reasons.
        state = new Int32Array(8); // hash state
        temp = new Int32Array(64); // temporary state
        buffer = new Uint8Array(128); // buffer for data to hash
        bufferLength = 0; // number of bytes in buffer
        bytesHashed = 0; // number of total bytes hashed
        finished = false; // indicates whether the hash was finalized
        reset();
    var h = update(data);
    var digests = digest();
    clean();
    return digests;
}

// Derives a key from password and salt using PBKDF2-HMAC-SHA256
// with the given number of iterations.
//
// The number of bytes returned is equal to dkLen.
//
// (For better security, avoid dkLen greater than hash length - 32 bytes).
//function pbkdf2(password, salt, iterations, dkLen) {
//    var prf = new HMAC(password);
//    var len = prf.digestLength;
//    var ctr = new Uint8Array(4);
//    var t = new Uint8Array(len);
//    var u = new Uint8Array(len);
//    var dk = new Uint8Array(dkLen);
//    for (var i = 0; i * len < dkLen; i++) {
//        var c = i + 1;
//        ctr[0] = (c >>> 24) & 0xff;
//        ctr[1] = (c >>> 16) & 0xff;
//        ctr[2] = (c >>> 8) & 0xff;
//        ctr[3] = (c >>> 0) & 0xff;
//        prf.reset();
//        prf.update(salt);
//        prf.update(ctr);
//        prf.finish(u);
//        for (var j = 0; j < len; j++) {
//            t[j] = u[j];
//        }
//        for (var j = 2; j <= iterations; j++) {
//            prf.reset();
//            prf.update(u).finish(u);
//            for (var k = 0; k < len; k++) {
//                t[k] ^= u[k];
//            }
//        }
//        for (var j = 0; j < len && i * len + j < dkLen; j++) {
//            dk[i * len + j] = t[j];
//        }
//    }
//    for (var i = 0; i < len; i++) {
//        t[i] = u[i] = 0;
//    }
//    for (var i = 0; i < 4; i++) {
//        ctr[i] = 0;
//    }
//    prf.clean();
//    return dk;
//}

return hash(data);
}
