// ===== TEMPLATE — one scene per component/option. Copy to the job, then replace every placeholder with the study's own content. =====
// scene: {dur(<=15), tin:'black'|'wipe'|'zoom'|'whip'|'flash'|'leak', scrim:'top'|'bottom'|'none', bg:[], beats:[], sfx:[], shake:[], glitch:[], leak:[], outro}
// bg:    {clip:'1',from,z:[a,b],dark,gray:[t0,t1],rate} | {photo:'x_f.jpg',from,pan:[x0,x1],z} | {img:'a/ph/x.jpg',from,z} | {deep:1,dark:1,blur:{clip,f},from}
// beat:  {t0,t1,y,x,w,size,weight,anim:'words'|'mask'|'stamp'|'pop'|'slide'|'fade'|'type'|'none',rot, text:'line|line' with **box** __cyan__ {num}} | {html} | {blk:{type,...}}
var S = [
/* 1 hook question over a clip */ {dur:9, tin:'black', scrim:'top',
  bg:[{clip:'1',from:0,z:[1.0,1.12]}],
  beats:[
   {t0:.5,t1:4.2,y:250,size:88,anim:'words',text:'سؤال افتتاحي|من صلب الدراسة'},
   {t0:4.4,t1:8.75,y:240,size:56,anim:'words',text:'جملة تمهّد للإجابة'},
   {t0:5.2,t1:8.75,y:330,size:120,anim:'stamp',text:'**كلمة**'}],
  sfx:[{t:.2,k:'swell'},{t:5.2,k:'braam'}], shake:[{t:5.2,a:9,d:.45}]},

/* 2 title + author, then the 3D cover */ {dur:13, tin:'wipe', scrim:'top',
  bg:[{clip:'2',from:0,z:[1.0,1.1]},{deep:1,blur:{clip:'2',f:200},from:5.7}],
  beats:[
   {t0:.45,t1:5.5,y:200,anim:'slide',html:'<span class="chip tex" style="font-size:32px">دراسة</span>'},
   {t0:.75,t1:5.5,y:290,size:68,anim:'mask',text:'عنوان الدراسة|سطر ثانٍ من العنوان'},
   {t0:2.0,t1:5.5,y:560,size:52,anim:'slide',text:'__اسم الكاتب__'},
   {t0:5.9,t1:12.75,y:0,anim:'none',blk:{type:'cover',x:305,y:250,w:470,h:582,t:5.9,r:-14}},
   {t0:7.4,t1:12.75,y:1010,size:46,anim:'mask',text:'دورية «اسم الدورية»'},
   {t0:7.9,t1:12.75,y:1080,size:34,weight:400,anim:'mask',text:'العدد {00} | الشهر {0000}'}],
  sfx:[{t:.8,k:'hit'},{t:4.4,k:'riser',d:1.4},{t:5.85,k:'whoosh'},{t:6.6,k:'thud'},{t:7.2,k:'shimmer'}], shake:[{t:6.6,a:5,d:.3}]},

/* 3 concept with tiles */ {dur:10, tin:'zoom', scrim:'none',
  bg:[{deep:1,blur:{clip:'2',f:390}}],
  beats:[
   {t0:.1,t1:9.7,y:0,anim:'fade',html:'<div class="bignum" style="left:-40px;top:120px">1</div>'},
   {t0:.8,t1:9.7,y:300,size:100,anim:'mask',text:'__المفهوم الأول__'},
   {t0:2.0,t1:9.7,y:460,size:52,anim:'words',text:'شرح قصير للمفهوم:'},
   {t0:3.2,t1:9.7,y:0,anim:'none',blk:{type:'tiles',y:570,items:[['power','عنصر',3.5],['money','عنصر',4.1],['shield','عنصر',4.7]]}}],
  sfx:[{t:3.5,k:'tick'},{t:4.1,k:'tick'},{t:4.7,k:'tick'}]},

/* 4 a number on a photo, then counting card + bars */ {dur:12, tin:'flash', scrim:'top',
  bg:[{photo:'photo1_f.jpg',from:0,pan:[.9,.1],z:[1.0,1.07]},{deep:1,blur:{clip:'1',f:300},from:5.5}],
  beats:[
   {t0:.6,t1:5.2,y:240,anim:'pop',html:'<div class="t" style="font-size:190px;line-height:1"><span class="num" data-count="5000" data-t0=".7" data-t1="2.1" data-sep="1">5,000</span> <span style="font-size:76px">وحدة</span></div>'},
   {t0:2.4,t1:5.2,y:480,size:58,anim:'words',text:'ما يعنيه الرقم'},
   {t0:5.7,t1:11.7,y:0,anim:'none',blk:{type:'bigcard',y:300,t:5.8,pre:'نحو',num:1.2,dec:1,unit:'مليار<br>وحدة',cap:'تعليق قصير',capT:7.0}},
   {t0:7.5,t1:11.7,y:0,anim:'none',blk:{type:'bars',y:700,title:'عنوان المقارنة',titleT:7.6,rows:[['{2024}','40%',40,8.2,'#2FC4DA'],['{2025}','60%',60,8.8,'#61EDEE']]}},
   {t0:9.8,t1:11.7,y:1150,size:26,weight:400,anim:'fade',text:'المصدر: كما ورد في الدراسة'}],
  sfx:[{t:.05,k:'shutter'},{t:.7,k:'ticks',d:1.4},{t:2.15,k:'hit'},{t:5.8,k:'ticks',d:1.4},{t:8.2,k:'whoosh',g:.6}]},

/* 5 numbered list + arrows */ {dur:14, tin:'zoom', scrim:'none',
  bg:[{deep:1,blur:{clip:'1',f:440}}],
  beats:[
   {t0:.3,t1:8.2,y:170,size:96,anim:'mask',text:'عنوان القائمة'},
   {t0:.8,t1:8.2,y:0,anim:'none',blk:{type:'list',y:330,t:1.2,step:1.6,items:['البند الأول','البند الثاني','البند الثالث','البند الرابع']}},
   {t0:8.4,t1:13.7,y:0,anim:'none',blk:{type:'arrows',y:300,rows:[['طرف','ما يفعله',8.5],['طرف آخر','ما يفعله',9.4]]}}],
  sfx:[{t:1.2,k:'whoosh',g:.5},{t:2.8,k:'whoosh',g:.5},{t:4.4,k:'whoosh',g:.5},{t:6.0,k:'whoosh',g:.5},{t:8.5,k:'tick'},{t:9.4,k:'tick'}]},

/* 6 map (needs tools/mkmap.mjs with keys 'o','a','b') then chips + big count */ {dur:14, tin:'whip', scrim:'none',
  bg:[{deep:1,from:0},{clip:'3',from:6.5,z:[1.0,1.08],dark:.45}],
  beats:[
   {t0:.1,t1:6.2,y:0,anim:'none',blk:{type:'map',origin:'o',targets:[['a','بلد: حدث',.6,60,10,30],['b','بلد: حدث',1.6,120,-150,40]]}},
   {t0:.3,t1:6.2,y:170,size:90,anim:'mask',text:'عنوان الخريطة'},
   {t0:6.7,t1:13.7,y:170,size:60,anim:'words',text:'عنوان المجموعة'},
   {t0:7.0,t1:13.7,y:0,anim:'none',blk:{type:'chips',y:270,items:[['اسم',7.2],['اسم',7.8],['اسم',8.4],['اسم',9.0]]}},
   {t0:10.0,t1:13.7,y:0,anim:'none',blk:{type:'count',y:560,t:10.0,num:40,unit:'وحدة',sub:'تعليق مع تاريخ {2025}'}}],
  sfx:[{t:.6,k:'tick'},{t:1.6,k:'tick'},{t:6.5,k:'whoosh'},{t:7.2,k:'tick'},{t:7.8,k:'tick'},{t:8.4,k:'tick'},{t:9.0,k:'tick'},{t:10.1,k:'ticks',d:1.0},{t:11.2,k:'braam',g:.7}], shake:[{t:11.2,a:7,d:.35}]},

/* 7 photo card over a blurred backdrop, then a two-sided split */ {dur:13, tin:'flash', scrim:'top',
  bg:[{img:'a/ph/photo2_bg.jpg',from:0,z:[1.05,1.12]},{deep:1,dark:1,from:5.0}],
  beats:[
   {t0:.15,t1:4.8,y:0,anim:'none',blk:{type:'card',src:'photo2_card.jpg',t:.15}},
   {t0:1.2,t1:4.8,y:820,size:46,weight:600,anim:'words',text:'ما تقوله الدراسة عن الصورة'},
   {t0:5.2,t1:12.7,y:200,size:80,anim:'mask',text:'عنوان المقارنة'},
   {t0:5.4,t1:12.7,y:0,anim:'none',blk:{type:'split',y:420,right:{chip:'الطرف الأول',text:'وصف<br>من سطرين',t:6.0},left:{chip:'الطرف الثاني',text:'الخلاصة',t:8.2}}}],
  sfx:[{t:.2,k:'shutter'},{t:6.0,k:'tick'},{t:8.2,k:'thud'}], shake:[{t:8.2,a:6,d:.3}]},

/* 8 quote card, then «A أو B» punch on a photo */ {dur:11, tin:'leak', scrim:'bottom',
  bg:[{deep:1,dark:1},{photo:'photo3_f.jpg',from:5.8,pan:[.95,.08],z:[1.04,1.1]}],
  beats:[
   {t0:.1,t1:5.5,y:0,anim:'fade',html:'<div class="qmark">«</div>'},
   {t0:.4,t1:5.5,y:400,size:78,anim:'type',text:'اقتباس قصير|كما ورد في الدراسة'},
   {t0:3.3,t1:5.5,y:760,anim:'slide',html:'<div style="display:flex;align-items:center;gap:22px"><div style="width:90px;height:4px;background:#61EDEE"></div><div class="t" style="font-size:44px;font-weight:600">قائل الاقتباس</div></div>'},
   {t0:6.1,t1:10.75,y:880,size:50,weight:600,anim:'words',text:'المعيار عنده:'},
   {t0:6.8,t1:10.75,y:0,anim:'none',blk:{type:'vs',y:960,a:'أ',or:'أو',b:'ب',t:6.9}}],
  sfx:[{t:.4,k:'typing',d:2.6},{t:3.3,k:'chime'},{t:5.8,k:'shutter'},{t:6.9,k:'hit'},{t:7.6,k:'braam'}], shake:[{t:7.6,a:10,d:.4}]},

/* 9 outro: cover, journal, logo, handle once + six icons */ {dur:8, tin:'zoom', scrim:'none', outro:1,
  bg:[{deep:1,blur:{clip:'1',f:440}}],
  beats:[
   {t0:.2,t1:8,y:0,anim:'none',blk:{type:'cover',x:90,y:250,w:410,h:508,t:.2,r:22}},
   {t0:.8,t1:8,y:300,x:80,w:470,size:66,anim:'mask',text:'اقرأ الدراسة|كاملة'},
   {t0:1.4,t1:8,y:500,x:80,w:470,size:44,anim:'mask',text:'دورية «اسم الدورية»'},
   {t0:1.8,t1:8,y:570,x:80,w:470,size:32,weight:400,anim:'mask',text:'العدد {00} | الشهر {0000}'},
   {t0:2.6,t1:8,y:0,anim:'none',blk:{type:'endcard',t:2.6,handle:'arabcenter.ar',icons:['facebook','x','youtube','threads','instagram','telegram']}}],
  sfx:[{t:.8,k:'hit',g:.6},{t:2.6,k:'shimmer'},{t:2.7,k:'bell',g:.5}]}
];
// Revisions go below, e.g.:  HOLD(4,8.2,2);   S.splice(7,1);   S[3].bg[0].rate=15/17;
