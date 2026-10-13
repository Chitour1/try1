// ===== EXAMPLE: Azmi Bishara, «من لا-أخلاقية السياسة إلى السياسة غير الأخلاقية…», Siyasat Arabiya 82 (Sept 2026) =====
// Final approved version (186 s, 16 scenes after the holds/removal at the bottom).
// beat: {t0,t1,y,x(right px),w,size,anim:'words'|'mask'|'stamp'|'pop'|'slide'|'fade', text:'line|line' with **box** __cyan__ {num}} or {html}
// bg: {clip,from,to,z:[a,b],dark} | {photo,from,to,pan:[x0,x1],z:[a,b]} | {deep:1,blur:{clip,f}} | {img,from,to}
var S = [
/* 1 */ {dur:9, tin:'black', scrim:'top',
  bg:[{clip:1,from:0,z:[1.0,1.12]}],
  beats:[
   {t0:.5,t1:3.0,y:250,size:92,anim:'words',text:'ماذا يحدث|لضمير الناس'},
   {t0:3.1,t1:5.9,y:250,size:76,anim:'words',text:'حين يرون __الكذب__|و__التباهي بالقوة__'},
   {t0:6.0,t1:8.75,y:240,size:56,anim:'words',text:'كل يوم.. حتى يصير ذلك'},
   {t0:6.6,t1:8.75,y:330,size:130,anim:'stamp',text:'**عاديًا؟**'}],
  sfx:[{t:.2,k:'swell'},{t:6.6,k:'braam'}], shake:[{t:6.6,a:9,d:.45}]},

/* 2 */ {dur:13, tin:'wipe', scrim:'top',
  bg:[{clip:2,from:0,z:[1.0,1.1]},{deep:1,blur:{clip:2,f:200},from:5.7}],
  beats:[
   {t0:.45,t1:5.5,y:200,anim:'slide',html:'<span class="chip tex" style="font-size:32px">دراسة</span>'},
   {t0:.75,t1:5.5,y:290,size:68,anim:'mask',text:'من لا-أخلاقية السياسة|إلى السياسة **غير الأخلاقية**|في ظل إدارة ترمب وأثرها'},
   {t0:2.0,t1:5.5,y:640,size:52,anim:'slide',text:'__عزمي بشارة__'},
   {t0:5.9,t1:12.75,y:0,anim:'none',blk:{type:'cover',x:305,y:250,w:470,h:582,t:5.9,r:-14}},
   {t0:7.4,t1:12.75,y:1010,size:46,anim:'mask',text:'دورية «سياسات عربية»'},
   {t0:7.9,t1:12.75,y:1080,size:34,weight:400,anim:'mask',text:'العدد {82} | أيلول/سبتمبر {2026}'}],
  sfx:[{t:.8,k:'hit'},{t:4.4,k:'riser',d:1.4},{t:5.85,k:'whoosh'},{t:6.6,k:'thud'},{t:7.2,k:'shimmer'}], shake:[{t:6.6,a:5,d:.3}]},

/* 3 */ {dur:10, tin:'zoom', scrim:'none',
  bg:[{deep:1,blur:{clip:2,f:390}}],
  beats:[
   {t0:.1,t1:9.7,y:0,anim:'fade',html:'<div class="bignum" style="left:-40px;top:120px">1</div>'},
   {t0:.3,t1:9.7,y:230,size:40,weight:600,anim:'slide',text:'تميّز الدراسة بين أمرين:'},
   {t0:.8,t1:9.7,y:300,size:104,anim:'mask',text:'__لا-أخلاقية السياسة__'},
   {t0:2.0,t1:9.7,y:460,size:52,anim:'words',text:'سياسة لا تقوم على الأخلاق، بل على:'},
   {t0:3.2,t1:9.7,y:570,anim:'none',blk:{type:'tiles',y:570,items:[['power','السلطة',3.5],['money','المصلحة',4.1],['shield','الأمن',4.7]]}},
   {t0:6.4,t1:9.7,y:900,size:60,anim:'words',text:'لكنها تدّعي أنها **تخدم قيمًا**'}],
  sfx:[{t:3.5,k:'tick'},{t:4.1,k:'tick'},{t:4.7,k:'tick'},{t:7.3,k:'hit',g:.6}]},

/* 4 */ {dur:8, tin:'whip', scrim:'none',
  bg:[{deep:1,dark:1}],
  beats:[
   {t0:.1,t1:7.7,y:0,anim:'fade',html:'<div class="bignum" style="left:-30px;top:120px">2</div>'},
   {t0:.3,t1:7.7,y:220,size:40,weight:600,anim:'slide',text:'والثاني:'},
   {t0:.6,t1:7.7,y:290,size:96,anim:'mask',text:'السياسة|__غير الأخلاقية__'},
   {t0:2.0,t1:7.7,y:560,size:52,anim:'words',text:'تتباهى بأنها بلا أخلاق، وترفع شعارات مثل:'},
   {t0:3.6,t1:7.7,y:730,size:78,anim:'stamp',rot:-4,text:'**«الغاية تبرر الوسيلة»**'},
   {t0:5.0,t1:7.7,y:890,size:78,anim:'stamp',rot:3,text:'**«القوة تصنع الحق»**'}],
  sfx:[{t:3.6,k:'thud'},{t:5.0,k:'thud'},{t:5.0,k:'braam',g:.5}], shake:[{t:3.6,a:8,d:.3},{t:5.0,a:10,d:.35}]},

/* 5 */ {dur:11, tin:'flash', scrim:'top',
  bg:[{photo:'rally_f.jpg',from:0,pan:[.12,.05],z:[1.0,1.07]},{clip:5,from:4.6,z:[1.04,1.0]}],
  beats:[
   {t0:.35,t1:4.4,y:200,anim:'slide',html:'<span class="chip tex" style="font-size:30px">أيلول/سبتمبر <span class="num">2026</span></span>'},
   {t0:.6,t1:4.4,y:275,size:54,anim:'words',text:'وعد ترمب بمنح'},
   {t0:1.1,t1:4.4,y:340,anim:'pop',html:'<div class="t" style="font-size:190px;line-height:1"><span class="num" data-count="5000" data-t0="1.2" data-t1="2.6" data-sep="1">5,000</span> <span style="font-size:76px">دولار</span></div>'},
   {t0:2.8,t1:4.4,y:570,size:62,anim:'words',text:'لكل __أميركي بالغ__'},
   {t0:4.9,t1:7.4,y:230,size:66,anim:'words',text:'إن فاز الجمهوريون|بمجلسي الكونغرس'},
   {t0:7.6,t1:10.7,y:220,size:44,weight:600,anim:'slide',text:'سمّاه ترمب:'},
   {t0:7.9,t1:10.7,y:290,size:110,anim:'stamp',rot:-2,text:'**«عائد ترمب»**'}],
  sfx:[{t:.05,k:'shutter'},{t:1.2,k:'ticks',d:1.4},{t:2.65,k:'hit'},{t:4.6,k:'whoosh'},{t:7.9,k:'thud'}], shake:[{t:7.9,a:7,d:.3}]},

/* 6 */ {dur:12, tin:'wipe', scrim:'none',
  bg:[{deep:1,blur:{clip:5,f:300}}],
  beats:[
   {t0:.3,t1:11.7,y:190,size:40,weight:600,anim:'slide',text:'يراه بشارة:'},
   {t0:.6,t1:11.7,y:250,size:96,anim:'stamp',text:'رشوة انتخابية معلنة'},
   {t0:1.4,t1:11.7,y:380,size:66,anim:'mask',text:'__من أموال الدولة__'},
   {t0:3.0,t1:11.7,y:500,anim:'none',blk:{type:'bigcard',y:500,t:3.0,pre:'نحو',num:1.2,dec:1,t0:3.2,t1:4.8,unit:'تريليون<br>دولار',cap:'الكلفة التقديرية للوعد',capT:4.0}},
   {t0:6.0,t1:11.7,y:800,anim:'none',blk:{type:'bars',y:860,title:'العجز الفدرالي من الناتج المحلي الإجمالي',titleT:6.0,max:9.4,rows:[['2026','5.8%',5.8,6.4,'#2FC4DA'],['2027','9.4%',9.4,7.0,'#61EDEE']]}},
   {t0:9.0,t1:11.7,y:1150,size:26,weight:400,anim:'fade',text:'المصدر: لجنة الميزانية الفدرالية (CRFB)، بحسب الدراسة'}],
  sfx:[{t:.6,k:'braam'},{t:3.2,k:'ticks',d:1.6},{t:4.85,k:'hit',g:.7},{t:6.4,k:'whoosh',g:.6},{t:7.7,k:'tick'}], shake:[{t:.6,a:8,d:.35}]},

/* 7 */ {dur:12, tin:'leak', scrim:'top',
  bg:[{clip:7,from:0,z:[1.0,1.1]}],
  beats:[
   {t0:.4,t1:3.0,y:230,size:50,anim:'words',text:'في زمن آخر..'},
   {t0:.9,t1:3.0,y:310,size:70,anim:'words',text:'كان إعلان كهذا|**سيثير عاصفة**'},
   {t0:3.1,t1:5.9,y:230,size:64,anim:'words',text:'لكن الردود اكتفت|بـ__السخرية__..'},
   {t0:4.4,t1:5.9,y:420,size:54,anim:'words',text:'أو بحساب الربح والخسارة'},
   {t0:6.0,t1:9.0,y:230,anim:'none',blk:{type:'arrows',y:250,rows:[['السخرية','تنفّس الغضب',6.1],['الحساب','يقيس الكلفة',7.0]]}},
   {t0:9.1,t1:11.75,y:230,size:56,anim:'words',text:'لكن كليهما'},
   {t0:9.5,t1:11.75,y:320,size:74,anim:'mask',text:'**لا يواجه**|**السؤال الأخلاقي**'}],
  sfx:[{t:.9,k:'whoosh',g:.4},{t:6.0,k:'tick'},{t:7.0,k:'tick'},{t:9.5,k:'hit'}]},

/* 8 */ {dur:13, tin:'zoom', scrim:'none',
  bg:[{deep:1,blur:{clip:7,f:440}}],
  beats:[
   {t0:.3,t1:12.7,y:170,size:104,anim:'mask',text:'خمسة عناصر'},
   {t0:.8,t1:12.7,y:310,size:42,weight:400,anim:'words',text:'تتتبعها الدراسة في سياسة الإدارة الأميركية الحالية'},
   {t0:1.4,t1:12.7,y:420,anim:'none',blk:{type:'list',y:420,t:1.6,step:1.7,items:['الإيمان المعلن بأن القوة هي الحق','المجاهرة بالعنصرية','الاستخفاف بالقانون','تأثير المال السياسي','عدم التمييز بين الديمقراطية والسلطوية']}}],
  sfx:[{t:1.6,k:'whoosh',g:.5},{t:3.3,k:'whoosh',g:.5},{t:5.0,k:'whoosh',g:.5},{t:6.7,k:'whoosh',g:.5},{t:8.4,k:'whoosh',g:.5},{t:10.2,k:'hit',g:.6}]},

/* 9 */ {dur:12, tin:'whip', scrim:'bottom',
  bg:[{photo:'putin_f.jpg',from:0,pan:[.98,.45],z:[1.03,1.08]},{photo:'carney_f.jpg',from:2.8,pan:[.9,.05],z:[1.03,1.08]},{deep:1,map:1,from:5.0},{clip:9,from:8.8,z:[1.0,1.08]}],
  beats:[
   {t0:.3,t1:2.75,y:1020,size:68,anim:'words',text:'يمتدح **الحكام الأقوياء**'},
   {t0:3.0,t1:4.95,y:1020,size:68,anim:'words',text:'ويدعو إلى **ضم كندا**'},
   {t0:5.0,t1:8.75,y:0,anim:'none',blk:{type:'map',origin:'usa',targets:[['can','كندا: الضم',5.4,60,-30,-150],['ven','فنزويلا: النفط',6.4,60,10,30],['irn','إيران: الحرب',7.4,160,-150,40]]}},
   {t0:5.2,t1:8.75,y:170,size:96,anim:'mask',text:'القوة هي الحق'},
   {t0:9.0,t1:11.75,y:230,size:54,anim:'words',text:'ويتباهى بالقوة'},
   {t0:9.4,t1:11.75,y:310,size:80,anim:'mask',text:'**في الحرب على إيران**'}],
  sfx:[{t:.05,k:'shutter'},{t:2.8,k:'shutter'},{t:5.0,k:'whoosh'},{t:5.9,k:'tick'},{t:6.9,k:'tick'},{t:7.9,k:'tick'},{t:8.8,k:'drum'},{t:9.4,k:'braam',g:.6}], shake:[{t:8.8,a:8,d:.35}]},

/* 10 */ {dur:9, tin:'wipe', scrim:'none',
  bg:[{deep:1,blur:{clip:1,f:200}}],
  beats:[
   {t0:.3,t1:8.7,y:200,size:84,anim:'mask',text:'العنصرية __المجاهَر بها__'},
   {t0:1.2,t1:8.7,y:330,size:52,anim:'words',text:'يراها بشارة **أسوأ من النفاق**'},
   {t0:2.4,t1:8.7,y:470,anim:'none',blk:{type:'split',y:500,lineT:2.4,right:{chip:'المنافق',text:'يخفي عنصريته<br>لأنه يعترف<br>بأنها عيب',t:2.6},left:{chip:'المجاهر بها',text:'يلغي المعيار<br>نفسه',t:5.0}}}],
  sfx:[{t:1.4,k:'hit',g:.5},{t:2.6,k:'tick'},{t:5.0,k:'thud'}], shake:[{t:5.0,a:6,d:.3}]},

/* 11 */ {dur:6, tin:'flash', scrim:'none',
  bg:[{deep:1,dark:1}],
  beats:[
   {t0:.1,t1:5.7,y:0,anim:'fade',html:'<div class="qmark">«</div>'},
   {t0:.4,t1:5.7,y:400,size:84,anim:'type',text:'النفاق هو الجزية|التي تؤديها الرذيلة|للفضيلة'},
   {t0:3.7,t1:5.7,y:820,anim:'slide',html:'<div style="display:flex;align-items:center;gap:22px"><div style="width:90px;height:4px;background:#61EDEE"></div><div class="t" style="font-size:44px;font-weight:600">فرانسوا دو لاروشفوكو</div></div>'}],
  sfx:[{t:.4,k:'typing',d:3.0},{t:3.7,k:'chime'}], leak:[{t:3.4,d:2.2}]},

/* 12 */ {dur:14, tin:'zoom', scrim:'top',
  bg:[{photo:'capitol_f.jpg',from:0,pan:[.42,.32],z:[1.02,1.1]},{photo:'icc_f.jpg',from:3.6,pan:[.35,.0],z:[1.05,1.0]},{clip:12,from:6.8,z:[1.0,1.08],dark:.45}],
  beats:[
   {t0:.3,t1:3.45,y:180,size:50,weight:600,anim:'slide',text:'العفو عن نحو'},
   {t0:.5,t1:3.45,y:240,anim:'pop',html:'<div class="t" style="font-size:200px;line-height:1"><span class="num" data-count="1500" data-t0=".6" data-t1="2.0">1500</span></div>'},
   {t0:1.0,t1:3.45,y:450,size:56,anim:'words',text:'مدان في __اقتحام الكابيتول__'},
   {t0:3.8,t1:6.65,y:190,size:60,anim:'words',text:'وعقوبات على قضاة'},
   {t0:4.2,t1:6.65,y:280,size:72,anim:'mask',text:'**المحكمة الجنائية الدولية**'},
   {t0:7.0,t1:13.7,y:170,size:62,anim:'words',text:'وانسحاب من منظمات أممية'},
   {t0:7.4,t1:13.7,y:270,anim:'none',blk:{type:'chips',y:270,items:[['منظمة الصحة العالمية',7.5],['مجلس حقوق الإنسان',8.1],['الأونروا',8.7],['اليونسكو',9.3]]}},
   {t0:10.2,t1:13.7,y:560,anim:'none',blk:{type:'count',y:560,t:10.2,num:66,t0:10.3,t1:11.3,unit:'منظمة دولية',sub:'انسحاب دفعة واحدة، كانون الثاني/يناير {2026}'}}],
  sfx:[{t:.05,k:'shutter'},{t:.6,k:'ticks',d:1.4},{t:2.05,k:'hit',g:.6},{t:3.6,k:'shutter'},{t:4.2,k:'thud'},{t:6.8,k:'whoosh'},{t:7.5,k:'tick'},{t:8.1,k:'tick'},{t:8.7,k:'tick'},{t:9.3,k:'tick'},{t:10.3,k:'ticks',d:1.0},{t:11.35,k:'braam',g:.7}], shake:[{t:4.2,a:6,d:.3},{t:11.35,a:7,d:.35}]},

/* 13 */ {dur:10, tin:'whip', scrim:'top',
  bg:[{img:'a/ph/adelson_bg.jpg',from:0,z:[1.05,1.12]},{clip:17,from:4.2,z:[1.0,1.08]}],
  beats:[
   {t0:.15,t1:4.1,y:0,anim:'none',blk:{type:'card',src:'adelson_card.jpg',t:.15}},
   {t0:1.2,t1:4.1,y:820,size:44,weight:600,anim:'words',text:'قال ترمب إن مريام أديلسون قدّمت لحملته'},
   {t0:1.6,t1:4.1,y:890,anim:'pop',html:'<div class="t" style="font-size:150px;line-height:1"><span class="num" data-count="250" data-t0="1.7" data-t1="2.9">250</span> <span style="font-size:64px">مليون دولار</span></div>'},
   {t0:4.4,t1:9.75,y:190,size:100,anim:'mask',text:'**المال السياسي**'},
   {t0:5.4,t1:9.75,y:350,size:50,anim:'words',text:'وقال إنها جعلته يفكر في'},
   {t0:6.4,t1:9.75,y:430,size:66,anim:'words',text:'__الاعتراف بضم إسرائيل للجولان__'}],
  sfx:[{t:.2,k:'shutter'},{t:1.7,k:'ticks',d:1.2},{t:2.95,k:'hit',g:.7},{t:4.2,k:'whoosh'},{t:4.4,k:'thud'},{t:6.4,k:'hit',g:.5}], shake:[{t:4.4,a:6,d:.3}]},

/* 14 */ {dur:5, tin:'flash', scrim:'bottom',
  bg:[{photo:'zelensky_f.jpg',from:0,pan:[.95,.08],z:[1.04,1.1]}],
  beats:[
   {t0:.4,t1:4.75,y:880,size:50,weight:600,anim:'words',text:'يتعامل مع الدول بمعيار واحد:'},
   {t0:1.3,t1:4.75,y:960,anim:'none',blk:{type:'vs',y:960,a:'معي',or:'أو',b:'ضدي',t:1.3}}],
  sfx:[{t:.05,k:'shutter'},{t:1.3,k:'hit'},{t:2.0,k:'braam'}], shake:[{t:1.3,a:6,d:.25},{t:2.0,a:11,d:.4}]},

/* 15 */ {dur:13, tin:'leak', scrim:'top',
  bg:[{clip:15,from:0,z:[1.0,1.1],gray:[3,11]}],
  beats:[
   {t0:.5,t1:3.6,y:230,size:64,anim:'words',text:'والخطر لا يقف|عند السياسات نفسها'},
   {t0:3.7,t1:6.9,y:230,size:70,anim:'words',text:'بل في أن **يعتاد الناس**'},
   {t0:4.6,t1:6.9,y:340,size:56,anim:'words',text:'وخاصة __الشباب__'},
   {t0:7.0,t1:9.9,y:230,size:66,anim:'words',text:'هذه المجاهرة..|كل يوم'},
   {t0:10.0,t1:12.75,y:220,size:60,anim:'words',text:'حتى يتبلّد'},
   {t0:10.3,t1:12.75,y:300,size:92,anim:'mask',text:'**حسهم الأخلاقي**'},
   {t0:11.2,t1:12.75,y:478,size:44,weight:600,anim:'words',text:'وتتآكل المعايير التي تحاسب السلطة'}],
  sfx:[{t:7.0,k:'heartbeat'},{t:8.0,k:'heartbeat'},{t:9.0,k:'heartbeat'},{t:10.3,k:'braam',g:.6}], glitch:[{t:10.3,d:.25}]},

/* 16 */ {dur:15, tin:'wipe', scrim:'top',
  bg:[{clip:18,from:0,z:[1.0,1.12]},{clip:19,from:9.45,z:[1.0,1.08]}],
  beats:[
   {t0:.4,t1:4.4,y:220,size:62,anim:'words',text:'قد يغيّر الناخبون اتجاههم'},
   {t0:1.4,t1:4.4,y:330,anim:'slide',html:'<span class="chip tex" style="font-size:32px">التجديد النصفي: <span class="num">3</span> تشرين الثاني/نوفمبر <span class="num">2026</span></span>'},
   {t0:2.0,t1:4.4,y:410,anim:'slide',html:'<span class="chip tex2" style="font-size:32px">الرئاسة: تشرين الثاني/نوفمبر <span class="num">2028</span></span>'},
   {t0:4.6,t1:9.4,y:210,size:56,anim:'words',text:'لكن يبقى السؤال عن'},
   {t0:5.1,t1:9.4,y:290,size:100,anim:'mask',text:'**حجم الأثر**'},
   {t0:5.9,t1:9.4,y:440,size:56,anim:'words',text:'في القيم والأخلاق'},
   {t0:9.6,t1:14.7,y:210,size:56,anim:'words',text:'أما العلاقات الدولية'},
   {t0:10.2,t1:14.7,y:295,size:68,anim:'words',text:'فستحتاج إلى وقت لتتعافى'},
   {t0:11.2,t1:14.7,y:390,size:52,anim:'words',text:'من __فقدان المعايير وغياب القانون__'}],
  sfx:[{t:1.4,k:'tick'},{t:2.0,k:'tick'},{t:3.6,k:'riser',d:1.4},{t:5.1,k:'hit'},{t:9.6,k:'whoosh',g:.4},{t:11.2,k:'shimmer',g:.6}]},

/* 17 */ {dur:8, tin:'zoom', scrim:'none', outro:1,
  bg:[{deep:1,blur:{clip:16,f:440}}],
  beats:[
   {t0:.2,t1:8,y:0,anim:'none',blk:{type:'cover',x:90,y:250,w:410,h:508,t:.2,r:22}},
   {t0:.8,t1:8,y:300,x:80,w:470,size:66,anim:'mask',text:'اقرأ الدراسة|كاملة'},
   {t0:1.4,t1:8,y:500,x:80,w:470,size:44,anim:'mask',text:'دورية «سياسات عربية»'},
   {t0:1.8,t1:8,y:570,x:80,w:470,size:32,weight:400,anim:'mask',text:'العدد {82} | أيلول/سبتمبر {2026}'},
   {t0:2.6,t1:8,y:0,anim:'none',blk:{type:'endcard',t:2.6,handle:'arabcenter.ar',icons:['facebook','x','youtube','threads','instagram','telegram']}}],
  sfx:[{t:.8,k:'hit',g:.6},{t:2.6,k:'shimmer'},{t:2.7,k:'bell',g:.5}]}
];

// ===== v3 edits: holds (+d seconds on a slide) and removal of the La Rochefoucauld scene =====
HOLD(6,9.0,2); HOLD(6,5.9,2); HOLD(6,3.0,2);   // scene 7: في زمن آخر / لكن الردود اكتفت / السخرية تنفّس الغضب
HOLD(8,8.75,2);                                // scene 9: القوة هي الحق
HOLD(11,3.45,2);                               // scene 12: العفو عن نحو 1500
HOLD(14,12.75,2);                              // scene 15: حتى يتبلّد حسهم الأخلاقي
S[6].bg[0].rate=15/18;                         // scene 7 is now 18s, its clip is 15s: slow playback slightly instead of freezing
S.splice(10,1);                                // remove scene 11 (النفاق هو الجزية)
