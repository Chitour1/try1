import puppeteer from 'puppeteer-core'; import {spawn} from 'child_process';
const [,, dir, mode, ...rest] = process.argv;
const br=await puppeteer.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',headless:true,args:['--allow-file-access-from-files','--no-sandbox','--disable-web-security']});
const pg=await br.newPage(); await pg.setViewport({width:+(process.env.VW||1080),height:+(process.env.VH||1920),deviceScaleFactor:1});
pg.on('pageerror',e=>console.log('ERR',e.message)); pg.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text())});
await pg.goto(`file://${dir}/comp.html`,{waitUntil:'load'}); await pg.evaluate(()=>window.__setup());
if(mode==='frames'){for(const t of rest.join(',').split(',').map(Number)){await pg.evaluate(t=>window.__renderAt(t),t);await pg.screenshot({path:`${dir}/t/f_${t}.jpg`,type:'jpeg',quality:85});}}
else{const [s,e,out]=[+rest[0],+rest[1],rest[2]];const N=Math.round((e-s)*30);
 const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate','30','-i','-','-c:v','libx264','-preset','slow','-crf','12','-profile:v','high','-tune','film','-pix_fmt','yuv420p',out]);
 for(let f=0;f<N;f++){await pg.evaluate(t=>window.__renderAt(t),s+f/30);const b=await pg.screenshot({type:'jpeg',quality:100});if(!ff.stdin.write(b))await new Promise(r=>ff.stdin.once('drain',r));if(f%60===0)console.log('frame',f,'/',N);}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));console.log('done');}
await br.close();
