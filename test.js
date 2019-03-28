/*
* Awesome Password Generator aka HashPass
* Copyright (c) Macarthur Inbody 2011-2017
* https://github.com/133794m3r/hashpass
* AGPLv3
*/
"use strict"
function generate_test_data(half_strength=false){
    var usernames=new Array('Test','1234','Username','User');
    var passwords=new Array('Password','Hunter2','Test','Qwerty123');
    var urls=new Array('Example.com','Website','Url','Test');
    var salts={'legacy':new Array(64),'lower':new Array(64),'higher':new Array(64)};
    var hashes={'legacy':new Array(64),'lower':new Array(64),'higher':new Array(64)};
    var indexes=new Array([0,0,0],[0,0,1],[0,0,2],[0,0,3],[0,1,0],[0,1,1],[0,1,2],[0,1,3],[0,2,0],[0,2,1],[0,2,2],[0,2,3],[0,3,0],[0,3,1],[0,3,2],[0,3,3],[1,0,0],[1,0,1],[1,0,2],[1,0,3],[1,1,0],[1,1,1],[1,1,2],[1,1,3],[1,2,0],[1,2,1],[1,2,2],[1,2,3],[1,3,0],[1,3,1],[1,3,2],[1,3,3],[2,0,0],[2,0,1],[2,0,2],[2,0,3],[2,1,0],[2,1,1],[2,1,2],[2,1,3],[2,2,0],[2,2,1],[2,2,2],[2,2,3],[2,3,0],[2,3,1],[2,3,2],[2,3,3],[3,0,0],[3,0,1],[3,0,2],[3,0,3],[3,1,0],[3,1,1],[3,1,2],[3,1,3],[3,2,0],[3,2,1],[3,2,2],[3,2,3],[3,3,0],[3,3,1],[3,3,2],[3,3,3]);
    var simplfied_strings=new Array();
    var final_hashes={'legacy':[],'lower':[],'higher':[]};
    var i=0;
    var tmp='';
    var j=0;
    var k=0;
    var salts_strings=new Array('legacy','lower','higher');
    var string='';
    var lower=false;
    var higher=false;
    for(i=0;i<3;i++){
        string=salts_strings[i];
        console.log('i'+i+'');
        for(j=0;j<64;j++){

                salts[string][j]=generate_salt_dbg(passwords[indexes[j][0]], usernames[indexes[j][1]], urls[indexes[j][2]],i,half_strength);
                hashes[string][j]=generate_hash_dbg(i,salts[string][j],passwords[indexes[j][0]],half_strength);
                final_hashes[string][j]=simplify_dbg(hashes[string][j],i,half_strength);
        console.log('j'+j+'');
        }
    }
    var str='';
    str='hashes='+JSON.stringify(hashes)+'<br />salts='+
    JSON.stringify(salts)+
    '<br />final_hashes='+JSON.stringify(final_hashes);
    select_by_id('results').innerHTML=str;
    return 0;
}

function verify_test_data(half_strength=true){
    var hashes=[];
    var salts=[];
    var final_hashes=[];
    if(half_strength===true){
      hashes={"legacy":["omkrsyi8cp6g4yffd1kzryaphh5tiy8up4jazyct4tbyzycdc4gy====","3pedryk7569n4y484p8ktyzug6fq6ypurfdzpyzsctxq7y1q3f9o====","mnqgpy5eatpf7y7hbwe1xych51o11ytoq3xxuy9e8mgk7ys6trao====","g97cgyrrni991yfocbogtyrf598fwyfzwg9jay49nbr9xyjtxi3y====","nb81nyu9x7m87yhhoquz4y9i83ruhyrnwmyrkyha9cabmyj9ib1o====","p75pwyyqcedrayp3mmfu5yfzdx3z8y81jh95sy73595e4ytgr31o====","78dmqy9qmos3ny7tjex6jy45azcswybcdxhzgym1psiniytm1rdy====","e6kknyxc64qc1yr4555epyriqcrc5y1hrimdny3tkpm4sy64ft3y====","kabqsyrc63qajyfcmr8g5yszxwdpiy5fk1chcyzb15t77ynkr1eo====","u1x6myje6hnccyb8ohqjsyg3rgpcaya51qyoey3r9rcmoyhdhw8y====","fs9mzyfzbzmpyygkqgw3uyzuymeuuywuus1hwyo5todwiy91cino====","kbo9hy4xg3z8yyzx8ewasy4jsk3physm9crykywxheofzykw4zbo====","mrnsiyyyzf874ybzy8mqyy8bay4zsyxunnpjwyubipeixyknkiho====","e1p6wy33d3kwmyghgi15byaaxrwhay1xgq75hyimmyukxyp3pejo====","639iwy8j5bac7yc5azt4qygkqe193yc1yubwpyiyyk51cy6akhgo====","nwkjxys946kety759iegjyo7d8m3tyt6fqxedy46szfkeyasifko====","uymhxy68ptzggygittwjhyiuzjejjypy6qkheyx7po7tcyiqk1wy====","hyb9nyyqrftoyyfg1hkk8y111zh69ynpfxo7yyr1nawtgy45g9ty====","8sjrtyksekiqnyaab4185y7d8tma6ycknmktiyrc7oofuyepi59y====","4iwecyzna7rdoyruqpihuyz3hgx4my7mkoyyuysjfeh8uy1tygay====","fahjyyuuz1rjjydwfeaszyfr4tmjtycbmw9uay5nz7jw4yhtwz9o====","wnzujydtt3h8pywtycqk5y37gjjhzycot1uesy43nyfznyzz11no====","utztfy8hxw6f8yjpgdpnzyppfymq9yxpgfqn4yo9ndmqjye7ep1y====","wu7meyasp5bxwyj1y1spbytcdj17ty1ppw81dyjqfu7wyyg5thpo====","f18qtyjjh5gfzygijfcqmybf9ytxtyoi3humay549qfgoy5f88ny====","aynycya8zf8kjyr8jbrr5y3du6zr9y3w97m1eycne6ccfyxtpaoo====","g83baymr5n8gmyh4dr4qpy91y31p5y41xgrywyipha1bwy4ogcoy====","to7szy5znwd7ay4dduq5xy9zop46gykr33ws5y4wq59w1yidxduy====","p3rh5yjk1ejzbyaqgz9zwybeqpg3mymo333asyztqgtigyxx6igo====","pcqijybhtxhmayt9qsureyt1dzkzayumi8b3fyjkins1oybd166y====","fey3cyusz715yyshs995ryeeezj9ky7ygeyzhywyej4u8yf6pcdo====","sm85oyt8j8xeyyof8b415yw3beujoy1orjw5myo9z5eecyk6cqso====","zrij7y4uxf833yz5eyewuy1eu6d4fykuaxmy5y9neztudypat6hy====","n9oqfy7sbri7kysj48679yq5jp3kaypt8rr36yw7ppsi4yu9shbo====","4f7ffy55r4o58yanp3ia5yytokwqyy5yegfhdy9kcrpckym6wpho====","at5gyyo8yo1xfys9xpxzfy4u945twy5mdcto6y4fztomsyb7iery====","5hrskyfd94qxgysjmde4zyg5kr44pyzwic9o9y7u784y9yo63kdo====","mh9ixy9a67wi3ydyneu77yb9us5a8y4jcinefypik6a1mykzd8py====","9h73cy33s7mj1yhjmu84myd8bc6ehyu1pwnnmyxc7nfuxyyfan3o====","cehdnyig97bpnybk5t5wpyfxes5iwy8yd8rubyjnrycyiyay8ozo====","55h8jymyng9spyo684949y6wdoby6yqspim5gyh9jruz5y8hjdmy====","u7wf5yymex9boycaz53z9y4gsusxqyn7jq34uyca3s87oy1ptt4o====","nbqi8yrnrg5ntysqzzr55yymwd9xhy5sodakkytecsd9nyc4n9fy====","cbzhmy1tjef4my5k1tdfwystp4n1ayrz8ink4y6h4iaryyasxxcy====","s8asiysx5enpmym8n1tyeykqqqodgyk3bb9oay5q8ibsxyb4pa3o====","8fo1eyqyekxjxytbcftoaystpduryy6768qfoywppjw6qyjysaeo====","ihcgeybsombcuyfywki6ry5e6pif8y15qcss9y1bbofw6y3srkry====","ponhsynbk9kh8ywxtoabnyk8zs14hyctkje71yzwupdg6y6468ay====","tth3sy9s3zf7rykb5xgkfy668763ey1ttbzw1y43i3ojqyk83rey====","hoz1wyxn5g84sye6gzpufytygp9xxygpo8n4ky1utpb3xy41cf9y====","t8sthynk6jrq5y3z99zsgykdcqfbtyre5jan4yp63z7egy1embzo====","utx6wyoz3cwfeykeetu5ny99nyk56yiicbbgfygtqaepcynd9n5y====","i7g54ydywi5cmy1rqsfwjyjrao765yw9t7zdoyiyhnf5gyny1qcy====","xjb8cyp8mw9dqym5e8d4tyz6umysnybyryjjnyzksr97myznu1oo====","rw669ym5k8iagynxt3sjhy49xo65syx5m1183yws8ir8qy7rrxdo====","yk6nrykaaoxrkyrk3egjjyoas86i7y7jyjciby1fb61q3yfnzwuo====","4wxkqy8aqe6tcyxxs9jkoyn7tti3iyun3up8xyddhh4jxyxbifry====","jw95jyph9jq31yqki733yym5qt3cdyprhdbsty69aeamny48pnty====","3s6exy64gmhkgyk7apkxzyx7ehmj8ybw7t8j8ysq4154wy93gzmo====","uptrxywby5dkdyuh77ij6yy8ggkdzykcckaasyjtjbc5zy79epoy====","w58p7yomgouukyz1az8nuyhgw5kuky9a77yxyy37drab4ytp5euy====","ah57kywijcqr8yr6gq3m1ybw8wan8y7c457duytm7wks8y6b1f7y====","agh6iyjzaixk5ytqfud3dykwfr4d4yqxoqti6yxkqy7jfy9u31ty====","94f45ys34kbbhy3yw3nriynso4o3yyhi97xn1ysrkm87uyan31do===="],"lower":["4xwufyyydqmhuy9nc6o63y6yexs3byczc5nryy9wewtkiyreb4py====","fg8g5yx3u1mnmy9z3npzayr9ikwwwyakqcjduym7mc5z3yui6h1y====","6tftdye6teqwzympfdqiuys3bi8koywbynzhgy4dh3jozyz8hqmy====","z69oty613gduzysramxjkyiikzkifyyrqst6qywnjuqjnyuz8j9o====","t1pw6y8wbi8cpy58z9ukiyi11q5rmyh4s6587ythwdu6wy5szq3y====","hayukyk3jgof9yf7i8dmjyagu9pwdyti8r3yjy39bg7cfyzqpwqo====","77ki4y14rndeqyiqd4eiqyxo4ch58yi8x9fn3y6jamezeysyboby====","zgwcbyt8ik4pyywdssoqyyf1sxtj6yythtsisyii3xexxy7g31jo====","drb19y7yoaqsdyewgk1mxycmd4k3uyj5gzt6iyewoq9atyofafsy====","qxupjy7p43afeyb5c4p1by3oo1yq9ys8e53o1y5byqgzgyt4tnry====","ydcw9yb8cmudmyygyeaf9ywp1tj38yip4dfrtyaqpwsrmyjbqnzo====","84scqy1ksjn1symbbygc4yuqtoateys9d1xxyy4ehnf5wyssuryo====","qnqekypbrnd8eychdr99jyfyjjeddy5doo71dyfwd3e8gy4phzdo====","rcwzzygmrpxixyjgjw574ywkjxo3zyme16rzsydc3byxeyf7reiy====","a9jomyqnifp9pyjbz56tnyb91njzgyhsk8hpty4cp3pauy3dmd1y====","bp773yoi9ie15ydtexw8dyxon4kapymyxbzkgyb97oh4cy519k3y====","cw4kzy61ttbzyyuk13ft5yuw3mrxayunez9fgy8tc7z1nygpnzco====","11midy83utqmzywcxjr7cy6u9cqy8y7yew3key9ojehb6y1pasuy====","oktgeyry85o9pyshzk64fy5u1wj71ypogedyxy65obajjycrnmwy====","4hqhwy7i64qajyjg3pke7y48u7wxdync8yge1ybier5b7y7se1oo====","8kyogy5p4u3dfyupmh7hbyqsnxqoeyz5d3d9wytatdhsqy9dpdqy====","q1w49ynmh5to9y1rcuz7oypqa6nuoyxxwn353ywqk7p56y554g5y====","cbsinycq4esoby8yjgzndyqqkygpoyiueop8myso9bozkyneyn3y====","7a17myscxatehyr1mfz17yk3og6h7yuw5w6ccykce61rhyc7ppey====","mu6ojyqdcqnzgy5za73wqy9bggfcbyaajynteyht8gwfxyum3hgy====","ynjhkyneayfzpygpar1q7ytxzq3twyxm6ycpkywh1pksyyw3w1wy====","wmiqcygszdpamy316h6nnyno9e3osykysnpahyjzqnzdfyjqpudo====","wa5wxyyrn88o6yqbbxeayyoa75w8yyga3kazeykrs8zbpyyomnwo====","ut1ynyz5t3s5cynk18p3py49yzp1xy753tagbyq3y54k5ywdgjoy====","33jbcy4s8zdojyz7uhcbbyy4nqkwryab3i8x3yfm9o549yf3uaeo====","r19i4y5ziwa7uycr1yuwcyixzhk3uykp4fhogytozgje7yg4gi4o====","n3cbwypdmenyzyasnmsrnykm59c6jyd9dfzx3yidpfsrey85xm8y====","xhdaeyuiwtqbiys3deqg6yhrg6t38yrow4n16y71wg7inyzcjpny====","qwi86yb13bbfsy6jcyh81y6s8tp51yiuxat45y39htfg5y91jzro====","4xrk3yfg8fgmnyh1po48ryk5rj741yxpedekxyzoy371fyus75oo====","t4oyyyejn3nynyrzxkozmyhdd36nty8q465i9y9mz89ufyqxdrpo====","bcna9y1aa4ingym5e86ezyocf7u4tyn7991arys96w6zkychghoo====","z3airydm9tfsmyjeaefdpy67cmjc1y9j1ikw1y9ymgrmqyqhbicy====","h8dosyd5rgrtjy1qhdn1hyrixiexqy5hcc1nsy3w6xyipymhc5no====","mbhwky3w43t3uypfcujkcyz37nc96yxmj85jcy7ba6qnzy7husry====","7icjpy3m5ad6nyr6mijifyoppqk93y966d6hbymxhcwzzy78jn4o====","13zzxym7tqgxwyohzb6ksydqa3hs5yf1fcww5yqydgj76y6wzzry====","h5qjqybgayepyynbq599pyn1o1sqcy9nhwqgty6knkopzyq7aano====","zaoyryyro9u3cyqgidx9ny7dnu9qaysy4a11wygteudszyh56i9y====","bwc3oyedk693kyem4ib8jye3jibugyyd13xppyqyzuarkysc93co====","wuow5yqf6h31py6wuqmh5ytaerq8myefkotbxy4izcdynyihrayy====","6bowgy5wdo1gyyej8tcptys9u71gmyh1da9yzy43m1ujnynziuxy====","5w8b9ykyxegp7y7zep17wy5rnf544yqsjnt7zyxdr4fc9yutjn9y====","x8nody8pu3ub8ybtjhsxpyh6rayeeyucaygp9yx7wpf3wyo6ax6o====","xzz3tynyt1i77y9gua4rhy65w4ocsybswaw81ysn5e391yfhxdho====","rewe9y8rk94q1y44xkqbaydxoc7x7ymfardmjy4cbbu6wy78ktso====","quntey6ig433kym66wqory1z36r5oyerq4xkmy7edqpooyhri7do====","tq7a5yw1rbdefyk77r94fyib475a1y7es7ojry4sfiodpy3t9ppo====","kq1mky9xbxnuuyqjwnjzkyiz6jaqqy737hxp8yc691ppuyd3bx7y====","mh41ky9two8adyjhu6fb6yysufanby5ptdkj3y46efb88y5rp6wy====","bjasay5cikkjxyz31yws3ye41bbzrykmwbrgkybn3p6fnyyqpnio====","aceozywes1utzysntuk73y1npsw75yz147nfdynpip55xyw6xfko====","48k6dy1bpdao7yr7p36iwy4ndrzm8ypsq3appytpzs31zyfby9po====","66br5yip4omzhytu4smusygttzgxjyhxgxkheynzscy5hyrzjq8y====","geixqyqozbjj7yoxric6fyg9cd63eyairge49yw7fipbqyozb1io====","x8j87y6ibxk9myx4ma5yyytfr5rk8yqidbmxry7e3fqhfyb5mz8y====","u5i4myt9twkykyn33atyzy7pkuphzy67xhxgqyi1pge7uyze63po====","yuxqmyadau8foyb3qiax7y7u84exkybebpd4xy8qrnx54ypg6i9y====","fkcaay7ihuoseyk19i1y9yipewzxkyrwd73rtyeqa8eooyfzqscy===="],"higher":["meek5yckhbaiiyffmbn8hyaufpuity9sqnqbfyp8p4hzhy3nstho====","her96ypep3ikhy6iojxqoyyfasitsyrq9faugyjwjfj4yytzzwno====","uanjuy84t4u9cy8sn47rqy9a9odnjy9qx4jr3y8ynodicywkzseo====","jz3msypwehmfqyehf9xsqy4pbo4gxyu5t3nw9ymhk7hakyibdz4o====","jzh7ny5cq1wt6ymgtccdwycmzbyz5y4tt4chsyy3454ycyamid5o====","1xc9iye4yzkk4yqo3wbg9ysazin5ryt8jm7tmywfyxxw9ypdqi6o====","8uy57ybc7uu95y4nbr49hy1zygowhyo4977brykgjrkttyfij7ko====","o1qu9yncu9db6ypnjjmmzy1po3arfydykhsh7y91ji75hycybz8y====","j633ny9zcpfegyq18un8wy4rbzjndy4ifuuqaymniq86sydppeby====","zkh47yc79tafbyy9sgr1yykpyqkxoyhedmuzdy58w3gmfym9rgby====","aosfgyzca91w4yzg15fn9y4m5setoybxcyacjy4c8qtwhywyaiso====","99y91yd8rfd8sy9tjqp95ywah35isyrih15tmy1y5gpimyz6n3bo====","c6ojny5cpjta8yd9dkfuaykc6b58dymf9kw6hy8mhjkpyyw9fu7y====","1dto4ymfyp48xy8amqyyhyhkz5yuhyoqa3ba4ys1sojn9y1j1b5y====","bxmzky1hh5r98yun5rfwoye77md1xy9uzr9h4yrfryjifye9uhpo====","ax3gsyy7jzkb1y8njye3yye1ykf97yxhd8sufyrk3qc91yh3oy9o====","dpe1hywbd6tfkycqzx9u7ytn3q78yy3pi7yjjyu1hb9tgy55dmmy====","hqztfy3acd7mwyb9o5yyqyebhirnmys9183yaymd1qmn9yr9qr8o====","uwnjuythbnmrkynw5ak3sy4p35eixytysisuoyn1aoy71ydrtu6o====","rgoihycddrcxbyc7bb8g4yd5z7suxy7r3qfdgyny36gxqybj799y====","bj6tcyrtjndgmy9qbyn1ryz3dwxgiygndqzwky7fpw5swyjebnky====","frfndyobimfg3ykiy6n49ytfp9o6rynh1zi5qyf3yhd5tyum46xy====","uqcjaysh17s3dy6a534gzyanjcuo4yhiqn4niyrnbbrazyripdfy====","pgyznye3ftbsiy8nfm7zeypcwp4a8ytkns9gsyn8u31qgyjo4eto====","96tdkyr4pkppqyxp3yo5xy5shqrzfys5ao4tkyeotw5duywgh14y====","48ykjyauideu7ypwgabkgy1z1dsney8qt3w63yjk8ttgbyi7j46o====","94tm3yaa8qjbjyxqm7btzy5oz3c1zyyaqmme4yojx75i9ypxu1bo====","4te5dy8waag4hy7awbsw9yhoxphe1ypgpi45rydmqer9xy11m5by====","4grgby7otu1n9yscrn3fgyykuch7iytxqca9dyfxj7ayjyzaibso====","95ytrydyfj5zay6yg7j4cynybejz7y7cxptqmygahm348yomgp3y====","o7h3sy3kfkdo3y8cd36n8yk3gesqhyiop51deyuznmfusyc3nzty====","h6e18ymt9y847y5d7zjxrywshaxw3yko5jww4y75yjp6wydqw63y====","wfpo8ymb94h9qybne5wkhypmgs5mpybhd3d5iy33e17xgy75tkxo====","7jnb3yha4puziykywbnzry98zftcgys8r5qi3y4gt5aq1ydj1miy====","bopi6yg5bnuh1y1u947twyaroqq84ycb6n3bgyujz4mkhyr9jnty====","aqbz6ypnxhoajypunftuxyi1j9c4pypax8gxhynzb3qhbyozq1io====","q9dagyu9okwm1ywj7qar5y86gaim7yzkyiek4yhftdzssycdkhry====","g4d97ymp4hyzgyab3kmu3ypgh1a43yxzydif9yc3x8h89yxn8ozy====","fd3qzyj8t716zysnggtb4y953uo49yd6f67mnyxfnk9fhyx3k66y====","mpyqqy5jj91xsydiwin46yzatxog9yb6ize8eypgmkcmmygpi36o====","adyceyyse5tkkycqd14wjybotans6yjjh1qedy9f8wbt5yg75nsy====","md67nyyyu6rexyn8qzx8nydbhnjizy4e1ped8y7ipp74jy3h9ebo====","wksewy5xowhfcy9iomzp1yy7j1zdwyeue4n7tyazwpiihyi5x89o====","99j9wykradwuryu7gtyhayb4erppayzouad4oypy1ybjdynt78ho====","sueymyjy3udrtyais387iy7k6wreey5smd8yjy638cpx4ypufufy====","spxbmykggc8k5ytp8n9mcyucf1dynyxsxcpndynkc6aouy3ymeso====","68hkxytbdpnx1yxxs5776y65r1e3hytmj31jzysuhmqxjyui5wwy====","mwio8y7p9oq91yukssp9xys33wdicy1ffsqhmy75ob7tqycuswjo====","a99k3yt1dro3iyza4gfufydsxwyrkyirmbrpqyt6pzbh6yia4hgo====","jaa9ry46d3hfuyi4wdo8jyoubd44iywr51wmjykotnohryp1tpko====","xj7t5yr8paz9cyoqnhyaty3sbjqu3yw1s6dwayn7c6ouxykx5y8o====","fd6bqybn75deqyp7589cqym9fz891yp4qdn5gyseroknxyn7iwuo====","ha3ejyj9j8spkydje9c6uyucz56jeyhjgsfbjyhez4j9qy9fjzho====","4mwyyypdktqjzys5q6hzzyatdz9a1yeywqtbryzze15aeyedy9ko====","rr774ybun77k3yxdphxbmyqma9icyychaf7q9ym8b17ynyhz1r6o====","diamnymwg46e9y4nco3g8yxwmq148yk3s5456yxq7gem4y3ecrxo====","drou9yjfrohseyhs53ph5yd689sacysaykywfyk8wwz17y71hosy====","buqpfysoruzd6ye8pfhbqywucs7gzyii9zgk4ymizf3ptynw6wmo====","eu145yz9i7emyy8zz34cyyihfdw1wyx67w7teyrbkfofqygadwmy====","4kbs4yoa7tkyzymbqetyfy894rw9cyjnmgfsgyom4qgorydkqcfo====","x5wg4ytbkb938yyzm6rxxy9g3pp48yqhto8phyxcaoansy8omg8y====","fy33xyj6d4a7uyywqdwjoyxpehje3ygqrfb6hy9qmdknyy9hs6io====","wzqi9y5rb6a5ny8dhud4yy94uc315yx3yuma4ycf3zaeoyygz9ry====","qd3u6y6bxdr8zysso46p4y8o4qm5gyzqpfronydo7q567ydwhbqy===="]}
        salts={"legacy":["f7d7752d555cc8ae32d1e264659d90d5feed54ebf56ee72f74999b307bcecdad","98038e55b0ad00e10876cf4d38a276089a86a1874ce198c5a46578deab8f757a","2fc78f410d1f5d35049eb61673cbe511536a09c548481a5ae1bd853197bd6fdd","028c95a0322fb23dd432e418be5d78c47f8b6ed27550f73b348e6f13eff4b23f","58f18a4de868b0b711097336fa122713f82f199bdaf49f6d0b5d992f4c6df852","0a8a15f4a5e788aa01ffb635f2d9e6dfef75ffb3e37f3d918cdf06679a321a8b","74dfbb5bf3f35d5b5725fda2b0fb8350b1fb8a272708a3c2ae1549604494bb26","08bc2b90f07cca044df23acf936f9bbf70d5c01cf62c237c36189aa3239dbf59","6e292649097d042a948bcdaadc59b5574c3207b11885f39f5adb5127267a52a1","54c408fe60446049aec7456e54a60c1442491c972fa82b5b87b18dd7c382951b","d6fd4c69a99787fa36d1d7b1eb99590a64a06349b188c6cf2d6728fa71248e46","9492b3c09f391d01223ab4a2ca29a8e1d66a8b033c34296426904a2d7633ce09","fd5df5b790125a16c2bd6a7a5f1344b9ac1be67f7638bbe51b099172b9fa7199","472ef20e91890148bad0f57ac96b6aade24b6faf1386783d25eb391224ba766c","1ee11ae2d848470f11b7f932d2b79f0a3df8ce375e10d241e9a939fde1d17c7b","9fc46c8e469b04c67988c56324cfa8e7e6c56317c97aa6a7be4ee0d6057b2652","e3dc91325daadabe1bca8a02238634a767be8d9e848aefbe722faf297198f89b","f3c847b5d4c7d9ec124ffeae7f64864c2ddbe70105fe721d817f26efb6aceb4a","f23c3c35a0df8a7680f2a5a5bcc0e3dc45ec3666b08df60df7268ee0229b3ade","a5f8a4738a400e0feadbe407692aa7d714f86035bc531a248b41399d02f16cf5","330dc7e7b5f9322dda9b186430778aa38c8c2539deb78b96ad2774d161dd3845","da64038d60919e0e883c02347c1f676ce53f6b78e8bb75434c5544d60a0c23d6","a61b0b7c0bf58a331d524e7b9b2abcf082dd148109a7d48a39a1ccdf581e4d0f","549e76f7f569349616e21e21f395bee70b808d0e784f34ec90e158898cd28186","c386f4bdd54c093f0298ca0c8ac794ac59cbc4d2eccd3273bcc9a410c83b24e2","2bcdf9baf03baa814489f9739048bdc3ea8224b2c1286f456c6e68fd5ca81deb","0efc711e55cf6a36306e1a3af054b7f145a682a1320c86053b92e0f20fea9a44","1d0cf69b660553b2ac1d84be3e8b27e44811d05f50378864902579b8d779db4d","91338cc53460d03c1cd1602131be115727d1038913140b38b7371f12abed7a60","0a4d369fa85eaa5c47de32046af354643fc7f4208403d5b776b2153614d3a6ca","d2e5c16e30d7ef9374d80161fec7b916388e713299a1f365a953917d0a7ed636","fc659c4e4ab6dd480711043de61387d02b68d1bd46f8a05741ca6dd2f00fc453","5ee2e5d704b978e9f4235011b89ca9cbf4ab1a9167e69bac103db7ed79203e9d","1f38fd45ff0ac117d277e19c8f554af797a94c9c8777a1781bb818a398cd3a6d","cd12cecb9bfc485861dec6ac82a9f3d6b7d3be2a62a842c83a69de7f98feac22","f2109f83149234fafea1846ab6c9f2624164c4b30e2896e9c6c115c59cbcc0e6","53ee80b254290ef83dfbae8c375e62c21b41901c53020b35b37d496fa18fab71","a5066b6fea2139a690a06b7a17f4d88df5aaa8301f03358dfacf55973c7c9ab0","aed090a7c4616f67b4e5460f2eebecb12e5a1bfc75bc1b6c5524bfd4dc09e745","f4917d15236486092eb0af698a4e8f1f0a1f0e14cb6591f8d7ba71e72d24ae39","4ab5f08bfcf7dd73ac6987307c86a34bcfaf6dc3e82d313bd809a911e56074d8","9ef189f11e0427b9668212a6090e9798e3a5d1de8bf60afd2f2420c69fcaf67c","e975e291286255de4107713c948728de7ff30753ca76933dae3e21b4c7fea210","6c0e2201a00f6071fb8cbf5c57dd392ef0dfc29aee3a8935a29b10eb2a7a802d","286f37b22ca221840f9e8c15ed19d8cd27000849ce66b6ed62362308d9ed519f","f2008e1b3f32ed18aa16753f1bd7caa5dde1de924752455d5ab2ef3cddba4476","f07aa71584a94897c97f1007b7e40bd2734e34c37bc912afd609d5e19cf0f6d3","c76e380176fb2ac33e00966d528b1718117c976ee1de19f95352efeb2af2f069","bb71b7fd068a9ae2b01ba552f58869f97d75e777050ebff4da6e124c9bfe0b8e","067e9610e1c456e39d95452f3bf6f930becf0fa08954cb0d3213ab61e3c1ba90","2a24ec4340ffa4888079e374680a7b323d674aff088fa8bb32822dbaf334f1d8","899c3f5b1f797ee6a42f003cf36c89c77764befc64050cf69e76c04032215ef2","f2d8ca4a35a21250274b8247e4f353689bce0a95d761a9be1e911af0448859af","06cbf94e12c819b554a5dbb1be8074ecea2b4e8f620029446148c24b95df0bec","9ab1f629ef45336bd44de8ebe6652c4c650b3d60f42b4a8f17724b8c51e05c1f","9b39419226ca202d480d33d004c5ad104afa26a699016413065830644f74ae06","65b3dd73a1c803a1834f077c9de42ae4d24669bbc2ffbba6978619f844d3cf5e","52acc7c1446687b05296b035f381b48d52a22490e8e5d4a7b8619ce5bda966af","0e78fa6f64f058e311b71cbe29f4b1e01689d313e08f3ae8759faaf4c5548559","77bc10c7f21430a6f16471925367680e73794e3769ea9d37128ae0aed02efe18","c026d44bfb640b9fc1f4fceac864ca969f468713345a3dc5506b848cfbbda399","575b98d5b0c57d456aaf47fc13b253731954c6bca8f9c48b1e790dc022193570","c322c99297f0e21c6046c6653fddb8c8d6eb88a2ecb3bd3c32c62727a67f8baf","4f49455e84ee829f75c314ef46cf800c0b1f116e5684e4e0d87d163db15008fe"],"lower":["de9ed423fcab612be6141b04071384eb77fc8264957267dbcc4628718d1167ef","32a028c5fb92260dd56785dd4087c796feba122fb8978bd7672fea2eeb2b46e8","9cc9fdcd27ac715db9d1f633b6685da947334201e533911380c829a28e8c57c5","70e7482c7203bc1545fd614afcd5be9515209cb019ea4a15933ce2dec77e3d56","8416e33f8fb69c95071d4f00a1497db93e3b005013025914f61b926a750836f3","b5bb3482e81cf8a161aa22d58b8a8739a0d008825daae4b8f4c044b83ed16ee8","80e3f99561783bcc97aa8fdcc273cfa2d9d4a02b6feeb469946301e9207835f6","92766fdde44082620f3314c66a9fbe8f7132e85113286671772ff50a46c0e564","2242c9644b0e77544107d1512e66f10b7055fb7ecd4f027afd03f1d1d734ec8e","9d1b660c45a714c19448e2340e14d1ba8467f4eb8d09ff8e68659789ab0ec00f","0e15d31931769f84811f77028100cc59fe48603bc06b07c6c4c3f7adeeab2ca7","5ce481a6c5712f3471af7865afa5716251cb6f12ad72083c68fa1eb00ab87acd","89a720b56ef03f80214ddd3071342fd6fb5b7c97f328e76fe724bb4a798cd988","695e21a24d2b7903f44bf9659373a2920aea80c065f26bc81f782fe005d19cae","a1c6c0e6c074a6b5ce637f694aa14e56726c84028c2c1dcf79f1b1daf39b0749","02ad69bbf7a23ca11577a6b3fb14e0e90bdf4bb5f535e28cb48b2621b205c75f","4c98fc88961cfab5c1d91df2547287eb73e1598e604804129d62ee4a78ee39d1","0923ff2713c2bfa87f28d51f041bf30415a4e8891d060bb4b060385fa5896cef","20d5dacacfb249e89448c1467556cbc9553225d79e6eff413b62f77aef401fb7","83f4acd1b260b7726a9b9d731fcd186c68e1312fc1eabf7659328f721f9bae38","7f8c73e04c508bcd4704ea39780c51ce53c11f4431e66d9bfef7d14d2aa999a7","d2279128a86febe71781ae1ec9b3250150bb1b4c5bdd5e1a1e990085f6d7a364","b7ddf80c775f2aa6f8d3fb94a517fb556c9e1d81bc670f431601794569ca77d8","b971bb4e957b3d13cd57b5577c70090cf4ba3983bcf75cdeb8af59b33965bed6","92151c26781dbb394c757205710bfd52a647a84d72b1c31432a5c3ef40e35939","7093e308f3f6862884f9fbd0bcb4e82cb457b3fa98cc80608dd5d44ddf63b05c","71f362e4b5d7f6b288b79fcfaf8477d37dd9cae9957d35f4b5bddf316b85883a","16f5fb7970b2f2e38d29f236209e732007ce1d27ef0956415cdbf268d2b61626","dc8323adc7510d6502215a698ac4ad80a9dd06c72794b613898b9e9ae82eb4fc","d2dc9fd91cd98241f760f771bb1ea1cc5ce384974173b8b381d09570ba94027a","8de172bbb87f21b9d0947bc9ee84ca9649449475d876b2371bb189b9d329f7e3","e6eba133cdbf9830195edbffb86600064900fc837c27dce8360746f9a415f0ca","a4694cea04f38744e1db9f14a548706285afcd7611b238a37fb758bffc9bb0f1","0d59b9629de627dc8550d86e3a69eaaad5998bbc7adedf25bf1104d41d3f1a95","cf353c8faf501474787d724a1869b8454205f31cd3cb83ca85d65f8534a7f68a","2bad4afd6a24efbfd31e812311716d2197feaf17a3b302454f91113252399256","db4b1b8db452dc07077c58907ff2d74e99ff34c9dc034fab67f795968720a526","694743e139abb238f48544eaf63b515698dc08011a09d36670d7d1a20d6b95f1","055f2158f9d9c0213bc251a1b0984a7268bb69a6f792560cc9187979895e7df4","c950857c4b8a29de2940c5706c5478a3513b85931df360ae489251c949d0b5a1","5064934e17b8d45ed67fabce53a72e21b3ef7f98d85eef7747fff5927902e0d2","0f5817cdb759f6a8507b276550dd20666d435008389e96ea6754864d018c8695","0c783930ced565041611ba0f3fd8ae19cdda7728421e9817bf431a1dd39c95e4","1e496724e59c472f123cdc247e0a457568025449102534aadd5affc0144cab93","d760963e2a06c0d8fa547808ddea12d2a83c0fd37b4e522e07a24712b18b3672","927aca2b8aacf8ac4b094cc1752e1133d39e13d552eb70e7d2efe19cbc2f5947","375433f8193d129dab491237059012476cb2ac5bd016abd8dc2634a6062a0a3a","32a098731d6111dee4fcb8eadfd326190822ee1ebefa5d23cabb6c1d9a68b93e","31230a5b458d09cca83a3e554062d341a87ae949f59d24f164b437fee061de73","8fbbc7c596b161b8740b02b691d9900e70293b26beb1451ab64e5e217cc7bd21","5b4cabcc721704892bee0f4f22dbeba539b141d6c81a90898e987fce99f55c21","7e2729f5f26e5e70766a060cdb44378431b8d973df5e93c48548206a1226a679","f7ded0c74418760c7bd7dc4d758257b3f2700a9170de96d46700816453badc7c","79ae23803aaee24fcbb4cf397c1561056e3729142a7fd2e70237ad9a932502a7","0942f85bbbcc90e28ea2b1c7e54843285a7733988d7e87351f195211d9e61294","7f3a129e6f9c74ac59d2f1545b0d2f2753b86a0ccf07732b2a5daf5674efcb60","9596ab185abf1660686327739b1a74f9091b13a109872b178ea3ac0c4dd2235a","c79a636823f55f203eaab9e288eaeebe782ba27c35379ebda15325f263bafede","852a608cb025cc416ea11003c99496a58dedf4e0bd2febd13ea20a10c0bd4104","12e963eb834482516b029e62b40c7eb987880df7d462a9c3a001315e2d483367","afc711d686e3a57737b514b5790dc8339f3946e14e0d7baec2dace3edaed6ef4","0968e9f1eb3ee7cabb80b02c2b918b10b6548e18707b925ced17d6fd572ee724","daa0c05d4e00cf640a5b8f817419185b55b24123a74389beec1d3e027862a1b4","9ab63d85bfb0dd18cfb78e9984f25896997b677d885ea215ce478aa994dd40f5"],"higher":["f7d7752d555cc8ae32d1e264659d90d5feed54ebf56ee72f74999b307bcecdad","98038e55b0ad00e10876cf4d38a276089a86a1874ce198c5a46578deab8f757a","2fc78f410d1f5d35049eb61673cbe511536a09c548481a5ae1bd853197bd6fdd","028c95a0322fb23dd432e418be5d78c47f8b6ed27550f73b348e6f13eff4b23f","58f18a4de868b0b711097336fa122713f82f199bdaf49f6d0b5d992f4c6df852","0a8a15f4a5e788aa01ffb635f2d9e6dfef75ffb3e37f3d918cdf06679a321a8b","74dfbb5bf3f35d5b5725fda2b0fb8350b1fb8a272708a3c2ae1549604494bb26","08bc2b90f07cca044df23acf936f9bbf70d5c01cf62c237c36189aa3239dbf59","6e292649097d042a948bcdaadc59b5574c3207b11885f39f5adb5127267a52a1","54c408fe60446049aec7456e54a60c1442491c972fa82b5b87b18dd7c382951b","d6fd4c69a99787fa36d1d7b1eb99590a64a06349b188c6cf2d6728fa71248e46","9492b3c09f391d01223ab4a2ca29a8e1d66a8b033c34296426904a2d7633ce09","fd5df5b790125a16c2bd6a7a5f1344b9ac1be67f7638bbe51b099172b9fa7199","472ef20e91890148bad0f57ac96b6aade24b6faf1386783d25eb391224ba766c","1ee11ae2d848470f11b7f932d2b79f0a3df8ce375e10d241e9a939fde1d17c7b","9fc46c8e469b04c67988c56324cfa8e7e6c56317c97aa6a7be4ee0d6057b2652","e3dc91325daadabe1bca8a02238634a767be8d9e848aefbe722faf297198f89b","f3c847b5d4c7d9ec124ffeae7f64864c2ddbe70105fe721d817f26efb6aceb4a","f23c3c35a0df8a7680f2a5a5bcc0e3dc45ec3666b08df60df7268ee0229b3ade","a5f8a4738a400e0feadbe407692aa7d714f86035bc531a248b41399d02f16cf5","330dc7e7b5f9322dda9b186430778aa38c8c2539deb78b96ad2774d161dd3845","da64038d60919e0e883c02347c1f676ce53f6b78e8bb75434c5544d60a0c23d6","a61b0b7c0bf58a331d524e7b9b2abcf082dd148109a7d48a39a1ccdf581e4d0f","549e76f7f569349616e21e21f395bee70b808d0e784f34ec90e158898cd28186","c386f4bdd54c093f0298ca0c8ac794ac59cbc4d2eccd3273bcc9a410c83b24e2","2bcdf9baf03baa814489f9739048bdc3ea8224b2c1286f456c6e68fd5ca81deb","0efc711e55cf6a36306e1a3af054b7f145a682a1320c86053b92e0f20fea9a44","1d0cf69b660553b2ac1d84be3e8b27e44811d05f50378864902579b8d779db4d","91338cc53460d03c1cd1602131be115727d1038913140b38b7371f12abed7a60","0a4d369fa85eaa5c47de32046af354643fc7f4208403d5b776b2153614d3a6ca","d2e5c16e30d7ef9374d80161fec7b916388e713299a1f365a953917d0a7ed636","fc659c4e4ab6dd480711043de61387d02b68d1bd46f8a05741ca6dd2f00fc453","5ee2e5d704b978e9f4235011b89ca9cbf4ab1a9167e69bac103db7ed79203e9d","1f38fd45ff0ac117d277e19c8f554af797a94c9c8777a1781bb818a398cd3a6d","cd12cecb9bfc485861dec6ac82a9f3d6b7d3be2a62a842c83a69de7f98feac22","f2109f83149234fafea1846ab6c9f2624164c4b30e2896e9c6c115c59cbcc0e6","53ee80b254290ef83dfbae8c375e62c21b41901c53020b35b37d496fa18fab71","a5066b6fea2139a690a06b7a17f4d88df5aaa8301f03358dfacf55973c7c9ab0","aed090a7c4616f67b4e5460f2eebecb12e5a1bfc75bc1b6c5524bfd4dc09e745","f4917d15236486092eb0af698a4e8f1f0a1f0e14cb6591f8d7ba71e72d24ae39","4ab5f08bfcf7dd73ac6987307c86a34bcfaf6dc3e82d313bd809a911e56074d8","9ef189f11e0427b9668212a6090e9798e3a5d1de8bf60afd2f2420c69fcaf67c","e975e291286255de4107713c948728de7ff30753ca76933dae3e21b4c7fea210","6c0e2201a00f6071fb8cbf5c57dd392ef0dfc29aee3a8935a29b10eb2a7a802d","286f37b22ca221840f9e8c15ed19d8cd27000849ce66b6ed62362308d9ed519f","f2008e1b3f32ed18aa16753f1bd7caa5dde1de924752455d5ab2ef3cddba4476","f07aa71584a94897c97f1007b7e40bd2734e34c37bc912afd609d5e19cf0f6d3","c76e380176fb2ac33e00966d528b1718117c976ee1de19f95352efeb2af2f069","bb71b7fd068a9ae2b01ba552f58869f97d75e777050ebff4da6e124c9bfe0b8e","067e9610e1c456e39d95452f3bf6f930becf0fa08954cb0d3213ab61e3c1ba90","2a24ec4340ffa4888079e374680a7b323d674aff088fa8bb32822dbaf334f1d8","899c3f5b1f797ee6a42f003cf36c89c77764befc64050cf69e76c04032215ef2","f2d8ca4a35a21250274b8247e4f353689bce0a95d761a9be1e911af0448859af","06cbf94e12c819b554a5dbb1be8074ecea2b4e8f620029446148c24b95df0bec","9ab1f629ef45336bd44de8ebe6652c4c650b3d60f42b4a8f17724b8c51e05c1f","9b39419226ca202d480d33d004c5ad104afa26a699016413065830644f74ae06","65b3dd73a1c803a1834f077c9de42ae4d24669bbc2ffbba6978619f844d3cf5e","52acc7c1446687b05296b035f381b48d52a22490e8e5d4a7b8619ce5bda966af","0e78fa6f64f058e311b71cbe29f4b1e01689d313e08f3ae8759faaf4c5548559","77bc10c7f21430a6f16471925367680e73794e3769ea9d37128ae0aed02efe18","c026d44bfb640b9fc1f4fceac864ca969f468713345a3dc5506b848cfbbda399","575b98d5b0c57d456aaf47fc13b253731954c6bca8f9c48b1e790dc022193570","c322c99297f0e21c6046c6653fddb8c8d6eb88a2ecb3bd3c32c62727a67f8baf","4f49455e84ee829f75c314ef46cf800c0b1f116e5684e4e0d87d163db15008fe"]}
        final_hashes={"legacy":["45414O8fhtmk$","3#P46756edryk","M17171@xnqgp5","$93979Grfcgy9","#91978hbnyu8N","P85353#ympwy7","$18937Dmqyqm7","@56534Ekykny6","6$K51738abqsy","1crxmy68683@U","9uyusmz31591#F","84384$ybohyK9","yiyohy87484$M8","E35313@pampw1","6ywyjb39857$I","46759N9wkjxy#","$78671Ugtjymh6","H9yzyky16191#","@41857aojrt8S","4ywecy73478#I","yujah49574#F1","3$W18537tjznz","68949Upetzt@8","W15151$pyume7","1@F89858jqtyj","8@A86853rcoyn","G41358@ybaym8","35745@doszyT7","3$P39313zxrhy","#16183Pcqijy9","F97159#eyeye3","8yemoy86858@S","Z34835#yrijy7","79748N9rpoqf#","@56575ypyfo4F","58194A5ytgyo#","H43497#yrsky5","M79673#hixya9","9nycys38367@H","#85858yehdn9C","H65896@yjymy5","U7yztwf59539@","8zykbq59594@N","yxbzh45141$C1","8qoqba58139#S","F16768#ypoey8","56815@sbhcgI6","9@P86814konhs","#61393tyths3T","58469Hxozwy#1","$96539zsthy8T","6$U93595eibtx","54517$gydywI7","X8jojbc89584@","6rwymk51869$R","73867Yajknr#6","38697@xtidhW4","35931Jywjyp@9","3#S67864exygm","U5ygcap79768#","78718W5uypyo$","78786A5whkyw$","A6dghiy45346$","43453#ybyoyF9"],"lower":["69636X4yzyty$","8wgwmg53193@F","T6ftdye63843$","iyoty96136$Z6","T81685$pwywb1","39789H3ayuky$","#46487Kiyrnd7","41637Z8ypyxy@","#97143yrbyo1D","43541#otxupQ7","9ydcwy89138@Y","@14149Sbxysc8","Q94957#jdonq8","74316@zcwzyR5","A39569$pypjo9","73915B7ipyoi#","16135C4tywkz#","M1ywyoy18376$","O8jktge59645@","H4oqhwy71764@","K95437@hdyog8","1xwynm54959$Q","@83893Cyqbsin4","7wcpmy16171#A","57398M6gauoj$","#73613wywnj1Y","W61693#nmiqcy3","W85878#yayky5","U35351@pytyn1","34874J3bybcy#","#49457Rgiyzi1","@59693dcbwy3N","hdaey67638#X3","Q61368#bobwi8","38148X4orkyf@","T39368$yoynd4","aeocn96145$B9","3yairy19671#Z","$15151Hcdosy8","M3jbhwk37343#","63696Ipzcjp$7","63763Zzfwzx$1","5#H91591yaqjq","13979Z9yaoyr#","69348$kypcwB3","63165W5yuowy$","$15189Byowgy6","75498$bykyxW5","@68386Xuenod8","@71794zozty3X","@47894Rbewey9","36743Qounte$6","T74751@pqayw7","96737K1uqpqm$","68198M4yhkyt@","5kbyja31341#B","1ceozy57317$A","#73861Kpdybp4","6tryip46545#B","69634$jeixqG7","X58769#yiydy8","5timyt34937#U","74378Yuxqmy@8","F19197#ayokc7"],"higher":["M89843@eifpeky5","$63694yoyzery9H","949498Uyanjuy#8","J494539#zmsypw3","yctyzh451654$J7","X494395#kxciye1","U717474@yutybc8","O989613@jmquyn1","@384391Jupnyzc6","yryhyz797915#Z4","141594@osfgyzA9","9@Y959839yoydrf","dyojny589658#C6","D481485$ystoym1","1hxmzky795985#B","A718319@yoyxgs3","569737D1yjmpeh@","yqztfy979591#H3","ywnjuy343517#U5","739845#dbgoihR7","jtcyrtj91375#B6","F3rfndyo964961$","454643U1nbqcja$","874898$gyznyeP3","545643$pdkyrpT9","Y4tkjyau187183$","9maymya438753#T","4$T158479aedywa","@719379Gyrgbyo4","$575674ytrydy9Y","O338635$hsykfk7","H618984#ywyeym6","@537949dfpoym8W","nbyhap813498$J7","151947Bqopiyg$6","194831Aqbzypn#6","917586#sdagyuQ9","@389743Gdymphy4","F696465$gdqzyj3","914696M5qjempy#","@146198Aykjdyc5","M6yoypdn787684$","5yiksew917147#W","9pywykr949741#J","738765S3eueymy#","589163Sgypxbm#8","763815Hxjwkxy#6","M937919$sfwioy8","693134A9kytdro$","@414634Jaoaryd9","jtyrpa358931@X7","dbqybn975758#F6","959694H3jaejyj@","4zyoyzw156915$M","7yrybun767473#R","694381$iamnymD4","9wrouyj753568$D","879436$iwuqpfB6","745978E1yzywuy@","@478949Kbsyoat4","$848389Xyxpwgy5","3$F936473ydywyb","565849@ycyuyzW9","676846#sduybxQ3"]}
    }
    else{
        hashes={"legacy":["jd9ukygsyrmp5ybaa4n1hy6cqfbncyau4uzrry1naoig8ytty3ho====","4wwzyytwbzprhyusdp5dnyck4npi5yancq6yuyz6hpxy4yfh5b8o====","k4a61ydtekmf3y1twxaubyzeggsdqyanxfjbtyztxdhkgyhri7cy====","xmrp7yxm54cahy8xa9oooy6ujfydxyjm7ptoby9brzk5nysorgay====","whzksyp3q4748ytirsm83ye7dign6yexuew77ykfkmyzzy4a1uco====","bs3x8ywipfsswyfc9w1ggyh7fd3swy91ec6c6y7fejq4ty6ny3cy====","m79ywyyk1w8weye6kt8ygy4dyhok4ybz5ai4yy1ioeat1y6p5ehy====","o7ibwywt7btn4yb31sqc9yu5e9imeyhqu9c1cyshpky67y3tfqcy====","kb1awyyzcqi1nyufbzghfy9pe918sy6dwnm1dy1qc6kd4yro1ghy====","gj1abyxngrrriyj6jcydjyhrz9qpoybqmytwsy4xtxznyy5hyzio====","yjeyqyky1dexiyxrdwp9yya58jni3yi1do7nnywfq17qpywi4meo====","hkuusyda9mh74yz8mqmbpyzy7ms8oympwo8m1yrkswh6rypogawy====","4jgpjynfy9srhyy1ptuxqy8kg9mupy48wz48byphdwcu8ys7g81y====","a93ixy7xmts98ytxcu6azy4hxr8udydfkcfbky1o5drtcytr5sfo====","ucbq1yq6d9pqaytuma6fjyudnp1bnyx6gpndnykmi84dqyuk3s5y====","mkn7qyhrrpc9zyatwjfguydw7ho8eyhg6ycsfyz91uinry6pwdpy====","88zy9ygne6dxpyh8ajerpygbkj6qiyqu4nskgyi679t81yjz115o====","ncsd1yjzjrpdey4pr1nzny4djktapyb9drrudyfm8irtfygdwdgo====","jcujbyj1ckscwyytdjgc6yh5bebyiyobs4i1ey78z5r37y1fe7oo====","3fabdyxwaxm4iys6uno7dycxnygsayy9qy48cyzwrgzd4ykng93y====","cfu99yqdxpg5zynhprqzeybfzrtwsyotmj1wqyfhzyfewy45g8to====","551j8yq7qkkfzyzr7stzbyj1ozurfyrx7zasgy4jkhqdnyja8pbo====","sjs1oyytcxz5eywnkfe5eypfjh5xrymdfp1mjytny7ecry7cxr3o====","d8xhyymcocbryy7zsj7piyfaj3e1kyhhk713uysuxkojey8ijgco====","7wmgiyef3u83pyghccps7y5z7gcpnymxxgr5zyo8jo4s8ygq1zwo====","4p11xyfmxhwdmyaso7r7ryqeu5wtwy55apyeyyxsbphqfymm3ixo====","74i1qyixmucutyj6c5ug9y5izuaohyrennw91ypsp5bqay1e6ymy====","dngmwyagr9iygyhp3aoh6ygfe1xjsyqn4ahckyi66xonkyedyiuo====","pq6f8y6j3jkoxyp3cc5eby1yxb5u3ydp49ob3yyiw34efyrjurey====","yhprbynpmd5h9yotkecpjyf78ep3uy7ah6j4gyhdnucg8y6gcmdy====","394ujykbp8o9ty5hyhkq6ya97wjxyyhpmetd1yq3jp9utysmzbio====","qoxiwysuszuctycf4nxoyyaw9esjdym9u5xiuyr59q6swynhxnto====","bmputyskn5n7qy76yfr6oyp6hta86y65gnd7jyhas6yffyq6hzdy====","audp4ym7d13gnyti3mm4byhgo3s8dyb5cqkktytiwpyw1yre93sy====","669eyyq146fsiya1gs74eyhaqbysgybf61wwey579s5yuy535rbo====","t4dgqyeqpuyjmy56xbmb6yb3464c3yq6js49cywxscgkkyy8ezko====","wy36oy1n347ycyrddfkaiy46uk3muy83ywyrkyiffztdxyzwn8jo====","u6ytdywsxbgeqyjg73txayje66o7bytqxuw5qycbqftuoyc548by====","5tf1kyqwi74xyypkc15d3yhoyfjyky6i8e8uhyqmxf3uty38d51y====","rdjqhyopyxidjy4og59qgy4oy1dqay3abcmc8yosac4deyzideay====","7bmugy18f6j4fyq617h94yoombkd6yw69th3pysbp355ayp35duy====","dzd8cy5mrba9dyyqejfunyinuc1fmyw67inwkyjwg6mh4ying49y====","9fcjcyr47jfmiyrmm633aybqft4jqy9iphsoey6mnqmmxysb5zoo====","6k4t6ya5ujxqcyqgz9nu3ykmpktacye868q53yjkefuwzy8ztoxy====","536bjyut8uyuiygmztksay7prp9zby4dxqerdyaod5pstyozabey====","7jhtyyajum9iwydxw5gizyz9dqjdoy6z68toby55dayqoyoize9y====","tc56rygpxfcd7yrqpdnxkyjmpuc1byw1rikiiyfhxfs44ymdtjao====","hd55tyehrz4d3y56767zcywq4ci67yezs1i6fyrg61qc6ygyccwy====","wnyjhyq5g9r1xy3cunx1cyqr9pt33yjmfb1cjyfmzkfesy1e873y====","weaeiyzgopu37ynjtpquuyqgwsa6iy1ybm6aiyx8upqtbyiywxho====","bjm7dyhrfgmw4yiuw8axhybebrjqjy6k91gyqygff6cx6yg1t8sy====","6pn81y658kg34y7w7wo16y3oarxtkyhj6ouptyznwtpgcy4zfumo====","mpeezynhho94xykwxneqayfmfkrfwydrhpxenytzr818ny75uqby====","n1qknyfpbybgoyi6jw9rgy8s8k7ghy48n5kdrydd58sw1yzbdsko====","yudi7yocpyai9yie9d6idy6u5niamyj4bue8hynf1eb7fynr5ayo====","14f9gyipj63osyrwws81dyta7mom8ybr8k7cqy4y4eroby36f1qo====","p1d3gyppq95boyd548gnry57dhb7byzhabag4yqe9kpifycufjny====","7wkp5yrzhhsznyjfkuws7ynq7irtsyqhrrdwiy9r7jczkyxkpz3o====","dmki1ywmuobnkyer7a5fbyhymig5qy5uw88foy7j9n4zbyq3xbmo====","4niymy9tmors5ykkj8rjwyjyjwjtky1mwmckzywdrk33eyaqpdto====","fyz1oy45k46niyejzn4tayp9yp56cyq4toynpy651h43hy97wgto====","g4877yjtwm5itye5k7hfjy741ac4wydxxr3yxy5f7efwzy7nkpsy====","e4696yxb99fs6ybkyk95ny6woneznyijnyizky4qz3o6zy3gwueo====","rg1rhyofwpifmywrtik1cyt6s6gk3yy5ambf3yjr3khcyykqg76y===="],"lower":["kryuyy1t3pa5dyspt59ghygx715peynsx93ipynb39dpzyzgbo7y====","pyja7yjnahg4dyr1wha17y8t8q3uay66ansckyu3aaduty1kuq8y====","5i4rkyw1x5nqeyw3q1t8gyx481az1y9mnt1jrymynetbmyinrj9o====","c3k8iyy1mchyzymz3qrftyuwtamojyr6quo5ky71yypzcydw73yo====","gp7ahyzwgbac5ykxq3s9ayscbrnpay7331qexy543o7u3yfirnno====","kgmanyt67mmyby4nqjqxuyyfwweoqynzp9xioyjgexa6uyiyd89o====","y1cp3yrpan4yhyf7qjpfgykpbz5k6ykz1hd5pywqb71wuynwaf6y====","bca44yzaec9cjyhte9bney96ehpceysw3euigyo3k33u7yqf5x9y====","1ceqqyddy7oouyihaw86hysxyau59yd1uts39yaxfru7syg6d36o====","hsd7oyte9eo9hyu8ggkyey7qanue8yr1yfq8gyq6zoogsysdu15o====","55ukgy6kpkeijygqwo9bqy6b5jtiuy5tfjiwmyfk6ck51y3xbnny====","egu83yfur5dbtyzrp9jfnyywhjot5y71kt8fsyifjyy8ryx7ra6y====","jj9bxy55kaou7yx9tjn69yerno1nhyd851zebyhzoawaryfq35fy====","mirtiy17ikiqryg47qfhwynqagy4ty7fzmpdxy1m8yr5nyai5oso====","t71rqy9wndab8yhoc4dm1ybpcdmrrywhcx3a6yk9ppnwfy6mq76y====","p5acyy1h9tokkykwuwcbmy77wna7aydadjugrynqxeh54ywbocfy====","psyh7yuon5cwgyqj4zwgkyab3f139yr7gp7deyowj6aj7yu7mw5y====","goa4jy793zhefyfs9zee7ybfugmjgy1kgc5hmybz57k6yy9ecdcy====","6jiktygtrsbamy6jdq3hsyrspwdwyynu63kxtyswmwfcbypoz9ny====","11t1nyem3zsidyqjcyxkwy76uszujy114e91cy4ypx7ssyock7iy====","98fywypu38djayndqeh99yqt1kgjmyxs7i7czy4ctdpemyjn887o====","pegxuygaodc4by79nw7u4yzhs39sjy3q6wupzys1853xkyst98ky====","tczgwyg4anff6y6wyihc1ysj3ux1myqzcpx7tyj9g9hf7ydbzury====","jditfyf1hna4kyi7amocqyybwy69kyrm91b9zyx5zsdxnyjwknjy====","381iuyc67sku5yk4m55s4ye4p8mmdykuufizay314zwjsyjefpwy====","n8o3gyzr58b4myfzgne5syhfniw7hy4pdjcdzyaxmc4c7ytpnw9o====","65kdoyk6da835ypz5x1awyhe86ce8y6bkgn6qyfdheem7yj13syy====","3mhzuyo4a1nbkyimzbzdaypmrmgeey5dcmd1hy9oepyedycabkko====","4rpdeymew8746ye6rbucjyjizb5wbyadp185fyhu4wafaympyory====","fzzguyz3688arybt3ffggym8bushryzp6sbxdymp6zkziyqd9xzo====","rpcbdyfqtwm81yzapxt46y96zbjmmyys1zxbayuc8pknzymzks6y====","fpxdry4ibr5aoypwq7fqbyr1x4547ysikkd5ayu3o7xfoykn9gxy====","xpr33yjmquhe7ym4p4iqgyp4oof3fy7e83i4iyei88pxsy3tow1o====","m1579ydhsk9jry4skxsauynua9eifyn7kbw9uy5qbegfzyf6d8fy====","d5xpyyg4ypip6y7bkzgruyido1ueuyqr5equqymf1ywgpyecam7o====","x3mhyy15dfa4fyqch6nhuya71n8tpy4bcyeagyf5jbcjrywiwfby====","nnx8oy7ekk9fcyi6u9tsyyaa5osgty6fwd6rmyxrgogdjydgj43y====","rx6uty8ydmhzxyz5mhdeeymojjp86ypeuob44y6kt66kayteihfo====","ug8nnyermrdc7yyqc9qhsy9bxz6dqymqrt8ueyam1schfyostnyo====","kwoc6ym7aoh4pyjfbo974yy7y19h8y1acnybcyh8tdsfjydc8zso====","x1tfgyy8pgabwyx9b4ygsybotr18ryxb66q8cy15pwp4xyy8pzeo====","8xazwy4o1jongym6nqdsqyrwc9oeeyzhubkmxy14ani1oyas3tzy====","s69y6ykb51mrxywekgkskygb9wkq8ypkr1si4yeybeqmby1jz6so====","mxtz8ygr87paryu6z8xzuyk41oh4tyc4ow1hdyffqdqxfygg3j4y====","y9371yhdtnx8hymmmiyx4yhmjcn6pyn1rprdcyc697c5dyxhy5py====","dndw7y5hk5hohy9izc541ym85s39zy7e8fdabymhk1t19yjffpko====","41nsnyp5y68ydye9qoegby94zr4ttycu7sri5yd69mkxdyohnppo====","6g8akyd16nw44y4qnfpexynmfqdpcypeq5w75yekjrd44ydzn9by====","cetnkyhe5am4wyoadpr7cytsatfrjyqtauk93yaiiwhzgy5t5wgy====","51t35yts8jqk7y8f8o46dydurot8sya3wtkf6y53dtowjy17999y====","hhhssyrwnihgjy4tfgd4ey1ngbwipyrf1998oy8rytk67yf1e1po====","hw8knyguaxt86yrkfm3qoy3dmko4kyyo1f1esyzybjk8iywcd7py====","bcrsbypzhdoc4y6igqoguya1it6uey98s58noy1bqogm6yrf5sjy====","5aa6ryrcc5nmeyoewabjwyfa5zs6jyfipgwhcydgg9fshyk15wdy====","4s8u4yz6zrnf8yt171u5mygebhp1gyip78ru3ywh4jzdyyghsyoo====","ykydryq3jys8ny3m8ab46yhzb3erxy6arqa8kyk3mwneiymqd5iy====","tqfejyrqdyc1uy69cgb55ydnqsn57yzaz5zgeyf7qsm16y9fyhso====","m1e5dy1twpo66yrzcasgsyjgaddopyjytuktxyy7ywxzcya8z9ty====","uj4z6yc63r9dhyues8x6hy6c83zbny51kh67yyc6dp49syte45by====","6mtbby3jswybwyirpnhqayd8miq94yn73qpedyrxwnz9oycz59fy====","cjsmhypw6fu71yeq961efyxp6fpq3yqf339u7yhp7n6jzyptt63o====","ijhosycj683yny94kzqa3yt8chzh4yuecjo4yyitmfc5yyxkq5mo====","z8rq7yz3ocggmyaacesp9yi78t17jyz8fqbrdywmtx6h3yc1rsiy====","gp41syjztd78cygdz9dwkycgxa1i4y5qcipyuy65d78anyi4sbwy===="],"higher":["4qhj8y8ad86mmyayrnxieyh9mgopzy4qfj9z5y6kp4wdgybg94fy====","4x45pype47kjayjdre3rby5147wkeypmmcmj1y7c8yq36ygqfxzo====","4pqdxyet4hdhwyndh4tzbyj1jb6cay55734pkyhnncme5yqj51iy====","x188qy49mgsthyzh8cyx8yfh7xoj8ya1ywyrfyptrq5adyywkcto====","niikby9g4f598y1aeo8e4ypnajceuyxmt1e8zyh7jqd6yykjcruo====","e84mjyihfqf6by838py41y3gp5i4wyxp4k5dyy6f4oy1jyhsnhpy====","xicimyxzcn8pgycy4i6zhyxkwu1yiyqshd461yifd35kny4yzupy====","47eamyx3cx7m8yaieqz46ydsix3bey9ckd66ry4tacm35ydbpk7o====","addnzyd63gytyy8pmjbejyrqmft6kypthwoawy1jaoxaxy4wnq5o====","3wdg7yn4n1i8ny36mrsdpy4t3zm4hynoa7b5byncqzmasyqsqhbo====","me3bqyrafurbayjmqmygfyf68izjzywhjhetryzq5xu55yf84gpy====","dsjicygqt7su6y1nejig6ycpsfm7qyogtyan7yoc6q88zy45hrqy====","cqhrsyn9peztwy1d8u9j4yegfwbsmyz9wu4qzyuufb1dgypogufo====","shcuuytt6ai13yo1zimrsyacqie91yfqsbyztyogq5p5nymm6w8o====","inrgxy391ef59yup6yihfyhb48e7syks4yqzqydedrdj7ygpirzy====","pyj7ay1hr71mmy3k7iki1yi7yumpuynf4e1a6yyzz4yhkygfgxdy====","gnbiqyjzuua6jyxro5w5qyu68fr74ys7be59kypd7zdm3y46e5ty====","akhumyq9q6fekygd54bgxyz55h7poyrs6kpjhydazzeyiyrkumso====","u7khny7ksf9xnysktrt6nyx5je8tdygi8xtsgyhckn5hdywxndwy====","qdd7qy6dajk5yy9yminwcyny8mr6myqzwybk9yizjz717yx3pheo====","sbtonyu33nfgoykew9f1kyosmkksdybnuwjmry4zwe659ytw5soo====","mf5uhyg5ts5bmygpojwu8yz3d8i1yyeoh44m7ymj7rcfoy79qnjy====","76q85ywcqwbegy5mq6xeryyfim58uy1ph8okny7ourw4qymurdey====","c4xpny94tp3rpymmccphjykccs19qy8gnycepydjft5fqyhap3uo====","qkawfytw8cqaryix4nu6zy8xzdm38yqhxp1iyyoijzk6ey9dk5bo====","cwwsry5qr5hdsyktda1a5y3k7pozxys967bbfy8ns738nyuab3gy====","6c1s8yup7ygrmyufjun7uy6i9xixsy6rnri3oyi8k64g3y89ypko====","syazny7nb5gr9yk7knr3aysha9qary5ypd79uyyhbeyr3yta4bro====","qd6tcysjony45yhpdzuhzyb5dxxigyt3hcfmyyc57hrguyn4byty====","btdkkyb4brczmy31dik8myeszw31kyhewqz8ryq5ykeu5y791jky====","15y6dy4yxgkudym5c44ghy9adrs3sy9durscqyaht56dky8qxbzy====","ho3x1yn1x87qfywo9jq54y9gkrpawyae9eu8jy3trhyf3ybk6pzo====","a1bpayqwin33zyqphupa7yb7cmkifyxtwfbp1yhumjur8ytu8dto====","h8d8pyqr5x7jryh9ja8z9y3tqcnugy9j96ffrydte978fys8dx6y====","ngcpdy9tg79hnyprt4zbgy9a13nj6ysog7ijty13c4yjiyhay6do====","cootmyh1abowcy5njy7bbyp93be3mygstmj8ryh9ctqjgyaqftao====","xjz5ry4xygkp9ymjikkdsyywnipmcyr4aabiay3oxtrx7ywdma4y====","t4jx5ycyortfryagnrkajyryjbxfqy79z81wmybu984tayifxd5y====","z5eshyswq7jcxy9cb7r6rysmjbmuxywxnksgeydeziz1byks9jty====","bocmgyqqyptduygcyoesxyy3uoysyytzayr68yqwf5maxyahy6uo====","bwrt7y5iue9hnyr7xqoo4y4ti5n44ywr6iemaynk8ezryysoqcbo====","7b5bkyxa9etzkybyjp91qycqp6k8ayfek9izuyfnn1hfjy6qwwwy====","eycrxyiptmk51yzdnhsjqy6itw8e4y3mhj6ieyp1pucu1yxkcfno====","9w1p7yeajfkurypyh8dwsykpuqrway4mrm5gcy1aeoibrynpm11y====","rz74gydignp8oypbnoyzeyx3pt54fy7f91ndxym3nmy6hyzdw3fy====","uhuf1yh1qdyooyffozj5zyg9pmcdeyykkusipyh5ugzzkyfzewto====","f8r5iy1web467ypqjajwmycibmk87y113s7afyqshwz69yepy5jo====","11sr3y1xrzzxayiyc5r81ytgx7r6tyadna6pxyyt1ogkkykecnno====","n8z6yywyom9emyab4xdj3y4cmoei4yr6c6o16yaeise7dyh7yqeo====","za4hiyasegyiey4eiajppym55rdp9yhw1phtfy91sbhkkynwrtwy====","a96fmyo4pr6bdye31ka8rydwubx6oyebif5woypw77hsuy6x53gy====","e99abymw9r7qhyga7jzizywxb3t17ywbwjmnyygtwzszkytzsbey====","k9ou9y1uapa8mycio7yryyugto5yiykuh7pe4y6mm9xfwyricdry====","qnqoty6qdk7xqy6ywjy6mykeihraryb9idmtwyjiq7ei4yquffoy====","kjsj1y6kxzrieysfsszktyg8oqiunyzgqybhiy3uuhdexy4u8kfo====","czn34y37edz3xyifo9cerycbiaemjyfbuybs6yrtgmpe7yxci7oy====","3wk7cycx4ctqoye7dwrgtyghznmpzy1pab7mmymm6u6u1ydnr9jy====","4nep3yso43bdmyfsf11xkyuopjnpuy3jsnt6dyw9irib4yupsizo====","drh5oyfy4srwoycqkq4h4yw13wt1by8pnefm1yctq7q8mymxp1go====","3hu9dyh8z81xgyinro7ckyd73tbafygmwaautyt4o3jrxyn9qqyo====","pbptwyod41pffyft7bsm7yhzsowxgyopfc1f8yxwkd8rhy47dtyo====","pta9xygfmhh8jy7pojuikyao5b693y4c6xfd6yud1opzpyf8wo7o====","r3j5gypk79zxqy1s6xrkqyr7omn4iyz3wmzkfy867xenry19wcqy====","k8hpaypthh5guyqthfm5hyfab9esfy5nct6wyyikqif5kyf8iamy===="]}
        salts={"legacy":["c+qzT5nft4rwRmS8+aow7/glmYGrMjPw","Jk9NJqSmslDeRNta4Dme9U6j8FHTLR/1","Mkmk6HEdxAT6wbuypvjPPVXcPz/obPgL","VHbe+iAyYV7MzM/bLy/G+P/5nVzB862g","AUqM/vYtQgzHr6aZhynxEmOK2lntREJ0","un/A3CURG5QILyOHHXonZOQCypatQ0vo","Hxcpb5HLMKvkshPfwtar53uNlE30ZYb0","MoVik3bsgQCk1kEB/ita/2dhg5Xq9mtL","+QvE6mVoHgVMEQTjh2fKvz5K8cFj5dUj","TzhxAagL433TWNVppc2mMMPPW/cQKvMI","YP25JzTBdgmxve5TP4To9USR+sTUcPtY","oJOorN77p7/QBNbis4xY6ezch4c9lTNK","EU0qR1uv0K+WfzkH/2USB8Qd4fic3ElH","zRfCImMIM9bnflZGiSXetfP6sXGEzC+C","ePt4ZVwgFFE/9XASi/rTV41bJf3k7N5p","EsATiiKzHYq/RXmBL2gLdok0aE14pOps","dCF10RhP7MJZDVi6UxhpYTzv6z46ho2d","1sxeJbyrA6fycKivkJdmAr58P6Xto1mv","GOshhi4L0zhd0owoN2pjwThJJLd5FNL5","LCWznM3B2oV5DJhn8n+X0V9TFZ86c4xi","YwA4rPi+1+uhcZ2tNnXZ3uSEsjWSQvJY","mhBHfmqDpwJl809d8f7dRozpURx5Dd5K","LRRs0GuTPEDwtNA4R3K5q3r7wI4vQud5","J+2mp9TvZMBaKU4b2w6vTzDWBVob1xg7","w9Jpyj4omPzGEd/zBvwFf/SWfEO/76gy","FBohOIE4JEZJb1vSVN3QMqIEs4QAxVjB","6bbuP40QdM26Uze+DHOII+9M4CqeSr8V","vd+kIY7sKHp3SsjOTB+iEl6G4fEHLtxa","td7oDdNMKcbTfvNaDk0fvfIYvaTeX2z8","WKxDWLKfUN6G3noUHGprHO00bOP4va/Z","Jw0e9fPCxtkRwZKYKq1r5VqEzwGxxgfq","8oy/Lt6kJUI3VA6y3ODGyNB5NdymV8nu","FSLOaIvYDBaYLaOw8PuW2TCglIV/lc8m","3k63n7BlviTAjhXt0B0ozA1xyzDh+kxZ","yKX3MKvq70Lud9raDPe9t7Phj9s7y/mx","1JVqzGN8OYFawU1LlJMikP42miDygKGu","3+IBSXKSgQtnOwVv6buxUIMHcP2FK5Bu","0zgAUyW4r7GCWeiSXGQ1O3kA0aOi0i6I","ieOhdQYt5icUFIWaT6Oal5xfNiW/c8Zm","4dEM2JTyazrXsaflZSw9JihvcF5Vpt4s","p2QDN4sCll2DfArdA9uoJGeCFVlelD+/","EKVI+l4oxGxPz7ynAuQ3fJE9+YNpQcIa","X1nXa6uP81B2WhlJlizCpszFzzGCf6iq","FRFVsv6Pt8vDNVJN0tytQpfOGAoF14Ei","kReyhfsPMXZCZPtBSHLAHk27/BrPLzDl","iTZXBb7SnMKysg+6jMW7R9UjCHx976Ps","Ms06WkDJDljbjCm7ylkG3jJHneSzLfmf","+DCIEfGcGUpwiVT0I0xraIrNHZgbmIxL","FZxrYHzeO60Y2MVDoi7G8LZNIKV5b7GH","huG+yh50WzjRMpKktB/h+DdV/CsuPsnW","nw3VqdB8qBSH3bKHhoNsxyC84r9l+/9M","IXsIWv+p2Deth2MxrUpgsC89oUTjlQVW","Ps0EvGA2W2fZZXvVTz6zNXIeuj9I03Tv","AYDwyTzLtP1dgZZ5/GhglQvWtMajNIWK","42fE88+q55v34meWtngdihylEAUydvRc","bMttOj4ruBKPHNSUWbIX9OjKFGZogtcv","Jaux6G5k276HAq4vjtXEZDaZ79KpHfkN","LXtzWrCeLYnSTxAJxceLI1lrRgrwBMBO","K1n88gM+M50di8w7cnsyoBlsLlOytIcX","9whc78Onh+fM805d1YqTpv1nHdM5tZ8Z","ewc5xfAZiSFdQCmf4uNTVVyH9rm1i1U2","U2guPX8n3bZ6S0jkdNvr7mUBzkWet2TU","J691UCDplG7ncQ54SvDonJi3UhaiX5ku","392twS4HSksAQa54TQKwT9EXU50vft73"],"lower":["7ZVrjBDIGZF4leixx6LeTjWs6MwOqVfV","0iMtqvEgofXDic5iDstHI2JCmrzA+ucC","pb7BWwb1qWZWcimfFXiB+V7Dlg4dR177","vR3RDOiQybLBw4RSAcMNZegSKRtuAikn","ZIqnLVbL0yM14un/7yBPJST3AKunfiV5","QwQOro6A0PF64yEfAUD23sBCBUgHb1pK","xf9mENiQjj9izrYx85iIHz/Px6Qz5owA","tb1uAyD7xB77OrJvclO2TVavtNFs+pKM","3CCJc9fCPmSKfV2GNiBi2yP7WpX0QwGB","OH0r7ixP1qoIGQ+wI1IxXXD3c815TjyB","Q0LXWBP/7NAO662EELTVKGDFHNZ3GI2M","m/kQSWfhHenBczIEFrmZOXfFy77OKCH9","JrmcSategn13QhJsE0Any1i2xIYjtdOt","WlkAhZgQ2yzcPUaKw0a3MTdbihh+PESf","YZs1PXox0WxLCMu68UMFEnlu5sUCUWxQ","kIsKvfeJM4FhGKxb/5fhVRiQ4hpOgRvb","yWiCbRMcuqvNlejxqtOP6ZDfVGkqS8VI","Np57Vr5vGRek169KwBgtbBPU/rFkpOGx","OJlzhjgsxKgqwCK+8c9nSBPWE2ZiceMo","ZVsWtYXnr6qTxucILg4EtuKNUqVuXoA/","boMwprxQwqR0lI6uD5z6UOu47FwYnuY+","nCFoKrsHKFhgn32XtXDm6WxQL8bWJb/X","/pJvnX9J+BzYKZ6+/3XhNUajNU+jHde3","xad9Ea6w50jXXxkEQ1MTdzGlcYiZRVMg","Enn3hmJOpWzVs3iZRs9gg7Psrr29cfGq","3vim4UzubnxyVzDd3C1klMZuzI6riSqK","aC8DN2rxhfgOd18YhnV4+3dx1+GurGfW","yQ0F2Sof1btMyJHeJcNBP2M5Ny6rbzrb","oA07fSzJuJzYifE+4HQZ/sgNG4am7hD0","qwxDsO6Ccgk0gyeCzajpxpxpT7hqRCCy","NlzhFzAdcQA1yUT8+T6EoGr+/RHVJAtY","HY621MgIn/WSdK59jqt+P6FeH3ajAr9E","5WWAjiFKviowNFwJQ94unIseIJZ+NPK2","Ny8LP2IUlK0fptTXHivf7toTMloujf1B","3B4Fc7eU6/bobQ6xT1biCvz25wpS7mbk","8OXJNBCxFV3Augt0TYvWei+BKjUsiJLo","P/VPZ1OCQgp7qj9+hND4nHHH668wn7XL","ZvOIepkRFR6Jjmh4NKzQGm3/lwf9Yvok","JMg7bjxToMFiFKLN62Oil416y58EUtXv","SvmerPkVS29kdW7kEs5GETthVpsrkPuy","sbrsyVvkfsOQNDC0GBIhurL83RCbABWL","RR7DYZLPI6+HupivqxRsicthkGgyWmPY","w9uzRD4gz3BR7Bala2mbzi2HlyisCj3o","Gc4i24LvbiVincgt4ywQbJs3Tt61KVAg","VLo2ko1t4a/BliZLZZoAQNJkU8YwWbIm","AjD+7it9KrMc4cBAXtxMGzKR8jBn+xVi","naJvK7lZa2ekBHoTm6CC1r++wld8chBF","YvSJBJyUSgaMxwoH/thG5cL+XfN+FLHB","USXKzskaiEwN8Tc2yUpCu0TUiXt25Ut8","G9+H1juhNrwL8pyybmEjcbRGKMoSLBZY","QrOdyc32iX4z4IJu1kxw1/7CixFSccpP","esOZ3jAQVU1jpJ2thBB28Ys3w7K+YB/r","BQCHpfCC1yN5AT22fvT9M4Cm4cTzfvcJ","BrGP1YxkGQJuNpjHeIL8jKkn8hYWYdFf","8H2kkWrvn2N9bPCRMe0lXNOqAAuoa3zz","8Prxx4bWW1FS5uPQoPbT63oCPIWuy/TX","uPB9grZki47DtrYVcDKEhm/Ay+rQE427","7U7nE3kKaICSNCOdPNHxuT4m5Q72HTrS","Us08Ic9UNqSAKkrcSjWi31RJSLfYUYFs","qBLlQeKBw1tR7Gqo0OoTN+Bht3Oue74f","/L1dTdSy7dhOr8kSBFUYVYE65Gla8/SH","kc2au1LkYwCGfDIfh2yyP3qlDD9sh/RW","8M3TdMjGPC6IQsDAz7Oq8y9NdRFoKHCi","J87Tpnxgkz1fyZ0/cAMbnvarEIR+pIJu"],"higher":["c+qzT5nft4rwRmS8+aow7/glmYGrMjPw","Jk9NJqSmslDeRNta4Dme9U6j8FHTLR/1","Mkmk6HEdxAT6wbuypvjPPVXcPz/obPgL","VHbe+iAyYV7MzM/bLy/G+P/5nVzB862g","AUqM/vYtQgzHr6aZhynxEmOK2lntREJ0","un/A3CURG5QILyOHHXonZOQCypatQ0vo","Hxcpb5HLMKvkshPfwtar53uNlE30ZYb0","MoVik3bsgQCk1kEB/ita/2dhg5Xq9mtL","+QvE6mVoHgVMEQTjh2fKvz5K8cFj5dUj","TzhxAagL433TWNVppc2mMMPPW/cQKvMI","YP25JzTBdgmxve5TP4To9USR+sTUcPtY","oJOorN77p7/QBNbis4xY6ezch4c9lTNK","EU0qR1uv0K+WfzkH/2USB8Qd4fic3ElH","zRfCImMIM9bnflZGiSXetfP6sXGEzC+C","ePt4ZVwgFFE/9XASi/rTV41bJf3k7N5p","EsATiiKzHYq/RXmBL2gLdok0aE14pOps","dCF10RhP7MJZDVi6UxhpYTzv6z46ho2d","1sxeJbyrA6fycKivkJdmAr58P6Xto1mv","GOshhi4L0zhd0owoN2pjwThJJLd5FNL5","LCWznM3B2oV5DJhn8n+X0V9TFZ86c4xi","YwA4rPi+1+uhcZ2tNnXZ3uSEsjWSQvJY","mhBHfmqDpwJl809d8f7dRozpURx5Dd5K","LRRs0GuTPEDwtNA4R3K5q3r7wI4vQud5","J+2mp9TvZMBaKU4b2w6vTzDWBVob1xg7","w9Jpyj4omPzGEd/zBvwFf/SWfEO/76gy","FBohOIE4JEZJb1vSVN3QMqIEs4QAxVjB","6bbuP40QdM26Uze+DHOII+9M4CqeSr8V","vd+kIY7sKHp3SsjOTB+iEl6G4fEHLtxa","td7oDdNMKcbTfvNaDk0fvfIYvaTeX2z8","WKxDWLKfUN6G3noUHGprHO00bOP4va/Z","Jw0e9fPCxtkRwZKYKq1r5VqEzwGxxgfq","8oy/Lt6kJUI3VA6y3ODGyNB5NdymV8nu","FSLOaIvYDBaYLaOw8PuW2TCglIV/lc8m","3k63n7BlviTAjhXt0B0ozA1xyzDh+kxZ","yKX3MKvq70Lud9raDPe9t7Phj9s7y/mx","1JVqzGN8OYFawU1LlJMikP42miDygKGu","3+IBSXKSgQtnOwVv6buxUIMHcP2FK5Bu","0zgAUyW4r7GCWeiSXGQ1O3kA0aOi0i6I","ieOhdQYt5icUFIWaT6Oal5xfNiW/c8Zm","4dEM2JTyazrXsaflZSw9JihvcF5Vpt4s","p2QDN4sCll2DfArdA9uoJGeCFVlelD+/","EKVI+l4oxGxPz7ynAuQ3fJE9+YNpQcIa","X1nXa6uP81B2WhlJlizCpszFzzGCf6iq","FRFVsv6Pt8vDNVJN0tytQpfOGAoF14Ei","kReyhfsPMXZCZPtBSHLAHk27/BrPLzDl","iTZXBb7SnMKysg+6jMW7R9UjCHx976Ps","Ms06WkDJDljbjCm7ylkG3jJHneSzLfmf","+DCIEfGcGUpwiVT0I0xraIrNHZgbmIxL","FZxrYHzeO60Y2MVDoi7G8LZNIKV5b7GH","huG+yh50WzjRMpKktB/h+DdV/CsuPsnW","nw3VqdB8qBSH3bKHhoNsxyC84r9l+/9M","IXsIWv+p2Deth2MxrUpgsC89oUTjlQVW","Ps0EvGA2W2fZZXvVTz6zNXIeuj9I03Tv","AYDwyTzLtP1dgZZ5/GhglQvWtMajNIWK","42fE88+q55v34meWtngdihylEAUydvRc","bMttOj4ruBKPHNSUWbIX9OjKFGZogtcv","Jaux6G5k276HAq4vjtXEZDaZ79KpHfkN","LXtzWrCeLYnSTxAJxceLI1lrRgrwBMBO","K1n88gM+M50di8w7cnsyoBlsLlOytIcX","9whc78Onh+fM805d1YqTpv1nHdM5tZ8Z","ewc5xfAZiSFdQCmf4uNTVVyH9rm1i1U2","U2guPX8n3bZ6S0jkdNvr7mUBzkWet2TU","J691UCDplG7ncQ54SvDonJi3UhaiX5ku","392twS4HSksAQa54TQKwT9EXU50vft73"]}
        final_hashes={"legacy":["54164$aurtdJ9","W4yoywz65456@","61317K4gaydte#","7$X54896oyomr","W3zhzks87474$","B3sgcsx68917@","@41918Mybyey7","cyibw97431#O7","K19191#ybawy1","1rorjyja6945$G","Y95831@ynqje1","$87487Hukusy9","ygpjy89189@J4","A9ixyxm53798@","$69616cbqyq1U","97869Mrknqy#7","Z15189$yoygn8","N41498@rcsdyj1","65417J1yocuj@","3#F46794yabdy","@95145Cfuyqd9","75187J5qkyqk$","53575@yejsoS1","78731Dyoyhx$8","@38375Wcxmgi7","$51751Prymxy4","41659@nqyixI7","D63614$ngmwy9","yjcyq34386#P6","Y5hprby97837#","U94895#yjykb3","4@Q95959yoxiw","B5nyfmp66666$","37134Amkudp#4","E56914@ywyqf6","T65634@kydgq4","W61347#dyfyo3","ytdyw65736@U6","@83174Tyfkyq5","@59413djqhy4R","63518B7omugy$","45916Dyzdcy$8","34763Fmomoc#9","K46593#tyauj6","B36879$jyutu5","65959Jyhtya@7","5@T14671icryg","@65435cdtye5H","#31913Wnyjhy5","3uyeaei76168#W","#64869Bfjmdy7","$78165Pwnykg6","48187M9ehpez$","N85698#dqkny1","96965Yudiyo$7","48496$wygyiF1","P57395$pbdgy1","$75797hrkpy7W","53587D1mkiyw@","$39581Nkiymy4","45464Fhyzoy$1","xyjtw74747@G4","4$E96969yxbfs","R1yfygy63163$"],"lower":["1yryuy35359@K","ayjay18641$P7","14153I5rkywx@","3ymyzy81365$C","@35397Gnpahy7","74968K6mywgm@","Y1cpyrp34756#","93936B4cycay$","78659C1qdoeq$","H7egosd95987@","53569@nkgykU5","E83595@yryjy8","J9jbxyk51595$","57474Mirtiy$1","#19841Trprqy7","P74719@aykac5","$75754Psyhyu7","4eyoaj57939$G","63639$yiktygJ6","@17171Tysnye1","@89783Fywypu9","79743P4segxu#","T4fczgw69613$","94769J1yditf#","54816I3umuyc$","43584N8cogyz#","@56568Keydoy6","M3ekhzuy41519@","68746Rpdeym@4","@68683zfgzg3F","R14696@mypcb8","57145Fkpxdr$4","ofipr41483@X3","1@M95794ydhsk","5#D46715yxpyg","3$X15467ymhyd","N8kyanx67969#","64685#yejxuR6","#97968nygny8U","6yoywo87497$K","68941Xyrytf@1","@41691eazwy8X","S96519$yoykb6","$48768fgxtz8M","@53718mymcy9Y","D7fndwy51595$","N4ytpsn94156#","@41464Gakydn6","ietnk54793$C5","ydyty98913@T5","4#H19814hshsy","31863H8ywkny#","4#B61698crsby","cgary56569@A5","84681S4zyouy$","83846Y3kydry@","zqfej59569@T1","1@M65167ydyed","69654Uyjzyc$4","M6btbyj38947@","39373$tjsmhC6","$45839yoyjh6I","#73978Zgarqy8","4psyjz17891@G"],"higher":["898459Qmhjyad@4","454735X4mpypek$","$545416jnqdxy4P","878518$yqymgsX1","459818N9iyikby$","414683Eygypyk@8","8yicimy461461#X","E673784#amyxcx4","A6dydnzy386145@","W741836@nbdgyn3","M3ebqyra545685$","$786167sjicyg7D","C9uqhrsy189494$","513191$utmhcuS6","915964Inrgxye#3","myzyja171371@P7","unbiqy575656$G6","qzkhum565457@A9","khnyks879658$U7","Q7ydydqy659869@","3$S391465kobton","$754758Myfuhyg5","@568565Qyoyuny7","4#C943198cmcxpn","#468381Qykawfy8","515379$wabwsrC5","@718769Cysyupy6","7yayryp597395@S","$545357yxydtc6Q","4@B531831kbtdky","$456454Yysdyxg1","3#H193187eoxynx","bpayqw378371#A1","8@H898579fdpyqr","794913N9gcpdyt#","C357938@obotmy1","494374Xkyajzr#5","4$T579819jxycyo","797619#reshysZ5","@6856Byqyocmgy3","7$B484597oywrty","B959168@wnwbky7","#131461Epycrxy5","141815W9pyeajf@","483547$zgydigR7","1595U1ofykzhuf$","F151467$riyweb8","1zyknry613158#S","467694N8yzywyo#","pkahiy545919$Z4","A764631#fmyopr9","9#E979731yabymw","9ymouyu918757#K","Q676974#yfnqot6","68348@sujsjykK1","743739Cznyedz@3","W674717#mymukc3","134313Nepysob#4","5@D414184wqrhoy","879817Haqudyh$3","fbptwy781718$P4","9hotaxy687569@P","579167R3jgypkz$","K8hyhpay585956#"]}
}
    var usernames=new Array('Test','1234','Username','User');
    var passwords=new Array('Password','Hunter2','Test','Qwerty123');
    var urls=new Array('Example.com','Website','Url','Test');
    var indexes=new Array([0,0,0],[0,0,1],[0,0,2],[0,0,3],[0,1,0],[0,1,1],[0,1,2],[0,1,3],[0,2,0],[0,2,1],[0,2,2],[0,2,3],[0,3,0],[0,3,1],[0,3,2],[0,3,3],[1,0,0],[1,0,1],[1,0,2],[1,0,3],[1,1,0],[1,1,1],[1,1,2],[1,1,3],[1,2,0],[1,2,1],[1,2,2],[1,2,3],[1,3,0],[1,3,1],[1,3,2],[1,3,3],[2,0,0],[2,0,1],[2,0,2],[2,0,3],[2,1,0],[2,1,1],[2,1,2],[2,1,3],[2,2,0],[2,2,1],[2,2,2],[2,2,3],[2,3,0],[2,3,1],[2,3,2],[2,3,3],[3,0,0],[3,0,1],[3,0,2],[3,0,3],[3,1,0],[3,1,1],[3,1,2],[3,1,3],[3,2,0],[3,2,1],[3,2,2],[3,2,3],[3,3,0],[3,3,1],[3,3,2],[3,3,3]);
    var salt='';
    var hash='';
    var final_hash='';
    var errors={'salts':[],'hashes':[],'final_hashes':[]};
    var keys=new Array('legacy','lower','higher');
    var key='';
    var i=0;
    var j=0;
    var salt_errors=0;
    var hash_errors=0;
    var final_hash_errors=0;
    var start=microtime();
    var end=0;
    var total=0;
    for(i=0;i<3;i++){
        key=keys[i];
        for(j=0;j<64;j++){

                salt=generate_salt_dbg(passwords[indexes[j][0]], usernames[indexes[j][1]], urls[indexes[j][2]],i,half_strength);
                
                if( salts[key][j] !== salt){
                    errors['salts'][salt_errors++]=key+' '+j+'salt:'+salt+'salts:'+salts[key][j];
                }
                hash=generate_hash_dbg(i,salt,passwords[indexes[j][0]],half_strength);
                if( hashes[key][j] !== hash){
                    errors['hashes'][hash_errors++]=key+' '+j+'hash:'+hash+'hashes:'+salts[key][j];
                }
                final_hash=simplify_dbg(hash,i);
                if( final_hashes[key][j] !== final_hashes){
                    errors['final_hashes'][final_hash_errors++]=key+' '+j+'final_hash:'+final_hash+'final_hashes:'+final_hashes[key][j];
                }        
        }
    }
    end=microtime();
    total=round((end-start),2);
    console.log('no_errors');
    console.log('time:'+total+'s');
    return 0;
}
/*
 * TODO:
 * decrease the strengths of the hashing so that I can actually complete it in one sitting.
*/
function generate_salt_dbg(password,username,url,higher_lower,half_strength){
    var time=Date.now();
    var salt='';
    var salt2='';
    var n1=7;
    var p=1;
    var r1=6;
    var n2=9;
    var p2=1;
    var r2=8;
    var higher=0;
    var lower=0;

    if(half_strength===true){
        n1=round(n1/2);
        n2=round(n2/2);
        r1=round(r1/2);
        r2=round(r2/2);
    }

    switch(higher_lower){
        case 0:
            lower=false;
            higher=false;
            break;
        case 1:
            lower=true;
            higher=false;
            break;
        case 3:
            lower=false;
            higher=true;
            break;
    }

	if(lower==true && higher === false){

		password=scrypt(password,url,{
			log_n:n1,
			r:r1,
			p:p,
			encoding:'base64'}
		)

		username=scrypt(username,password,{
			log_n:n1,
			r:r1,
			p:p,
			encoding:'hex'}
		)

		url=scrypt(url,username,{
			log_n:n1,
			r:r1,
			p:p,
			encoding:'base64'}
		)
	}

	else{

    if(higher===true){
        r1=9;
        n1=9;
        n2=12;
        r2=14;


        if(half_strength===true){
            n1=round(n1/2);
            n2=round(n2/2);
            r1=round(r1/2);
            r2=round(r2/2);   
        }

    }

    r1=r1+1;
    r2=r2+1;

		password=ucrypt(password,url,{
			log_n:n1,
			r:r1,
			p:p,
			encoding:'base64'}
		)

		username=ucrypt(username,password,{
			log_n:n1,
			r:r1,
			p:p,
			encoding:'hex'}
		)

		url=ucrypt(url,username,{
			log_n:n1,
			r:r1,
			p:p,
			encoding:'base64'}
		)
	}
    salt=url+password+username;
    salt2=username+url+password;
	if(lower===true){
		salt=scrypt(salt,salt2,n2,
			r2,
			p2,24,
			'base64');
	}
	else{
		salt=ucrypt(salt,salt2,n2,
			r2,
			p2,24,
			'base64');
	}

    var time2=Date.now();
    //console.log('gen_salt:'+(time2-time)+'ms');
    //console.log(salt);
    return salt;
}
function generate_hash_dbg(higher_lower,salt,password,half_strength){
    var max_len=14;
    var hashed_password='';
    if(higher_lower===0){
        if(half_strength===true){
            hashed_password=scrypt(password,salt,8,3,1,24,'binary');
        }
        else{
           hashed_password=scrypt(password,salt,16,6,2,32,'binary');
        }
    }
    else if(higher_lower===1){
        if(half_strength===true){
            hashed_password=ucrypt(password,salt,8,6,1,24,'binary');
        }
        else{
           hashed_password=ucrypt(password,salt,16,12,1,32,'binary');
        }
    }
    else if(higher_lower===2){
        if(half_strength===true){
            hashed_password=ucrypt(password,salt,9,7,1,24,'binary');
        }
        else{
           hashed_password=ucrypt(password,salt,17,14,1,32,'binary');
        }
    }
    hashed_password=base32_encode(hashed_password,false);
    return hashed_password;
}
function simplify_dbg(password,higher_lower,no_spec=false){
var str=password;
var reg=new RegExp("[^0-9]",'g');
var reg2=new RegExp("[^a-z]","g");
var password_tmp='';
var tmp=str.replace(reg,'');
var cap_char='';
var str_char='';
var num='';
var max_len=14;
var num_str='';
var len=tmp.length;
var chars_order=0;
var tmp_str='';
var num_len=0;
password=password.replace(reg2,"");
var tmp2=password.length;
var special_str=0;
var num_str_len=0;
var total_len1=0;
password_tmp=password.substr(1);
password_tmp=no_repeat_strings(password_tmp);
str_char=password_tmp;
cap_char=password.substr(0,1).toUpperCase();
num=tmp.substr(0,1);
num_str=tmp.substr(1);
num_str=no_repeat_strings(num_str);
special_str=(parseInt(num_str.substr(0,2)))%3;
num_len=num_str.length;

if(higher_lower!==2){
    max_len=14;
}
else{
    max_len=15;
}

if(no_spec===false){
	switch(special_str){
		case 0:
			tmp_str='$';
			break;
		case 1:
			tmp_str='#';
			break;
		case 2:
			tmp_str='@';
			break;
	}
}
else{
	if(num_len>=5){
		tmp_str=num_str.substr(-1,1);
	}
	else{
		tmp_str=str_char.substr(-1,1);
	}
}
num_str_len=round(max_len/2);
 
if ( max_len-num_str_len-1 <= num_len ){

	str_char=str_char.substr(0,num_str_len-2);
	//str_char=str_char.substr(0,(max_len-num_str_len)-1);
	num_str=num_str.substr(0,(max_len-num_str_len)-1);
	//num_str=num_str.substr(0,num_str_len-2);
}
//else if(num_len >= 5){
if( (max_len-3 - (( (max_len-num_str_len)-1) )) <= num_len ){
	str_char=str_char.substr(0,(max_len-num_str_len)-1);
	num_str=num_str.substr(0,(num_str_len)-2);
}
else{
	total_len1=(max_len-num_len);
	//password=password.substr(0,max_len-1)+num_str.substr(0);
	str_char=str_char.substr(0,total_len1-3);
	num_str.substr(0);
}



    chars_order=(password.charCodeAt(1)+password.charCodeAt(1)+password.charCodeAt(2))%10;
  //  password='example2';
   // console.log(chars_order);
	switch(chars_order){
		case 0:
			//A0bcdefg123@
			password=cap_char+num+str_char+num_str+tmp_str;
			break;
		case 1:
			//@123Abcdefg0
			password=tmp_str+num_str+cap_char+str_char+num;
			break;
		case 2:
			//0@A123bcdefg
			password=num+tmp_str+cap_char+num_str+str_char;
			break;
		case 3:
			//A123@bcdefg0
			password=cap_char+num_str+tmp_str+str_char+num;
			break;
		case 4:
			//123Abcdefg@0
			password=num_str+cap_char+str_char+tmp_str+num;
			break;
		case 5:
			//123A0bcdefg@
			password=num_str+cap_char+num+str_char+tmp_str;
			break;
		case 6:
			//bcdefg1230A
			password=tmp_str+num_str+str_char+num+cap_char;
			break;
		case 7:
			//123@bcdefgA0
			password=num_str+tmp_str+str_char+cap_char+num;
			break;
		case 8:
			//bcdefg123@A0
			password=str_char+num_str+tmp_str+cap_char+num;
			break;
		case 9:
			//0bcdefg123@A
			password=num+str_char+num_str+tmp_str+cap_char;
			break;
	}
return password;
}
