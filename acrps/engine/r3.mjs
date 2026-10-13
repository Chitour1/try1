// Frame renderer: node r3.mjs <jobdir> frames t1,t2,...   |   node r3.mjs <jobdir> video <start> <end> <out.mp4>
// Env: VW=1080 VH=1350 (4:5). CHROME=<path> to override the browser.
import puppeteer from 'puppeteer-core'; import {spawn} from 'child_process'; import fs from 'fs';
const [,, dir, mode, ...rest] = process.argv;
function findChrome(){ if(process.env.CHROME) return process.env.CHROME;
  for(const b of ['/opt/pw-browsers']){ if(!fs.existsSync(b)) continue;
    for(const d of fs.readdirSync(b).filter(x=>x.startsWith('chromium')).sort().reverse()){
      for(const p of [`${b}/${d}/chrome-linux/chrome`,`${b}/${d}/chrome-linux64/chrome`]) if(fs.existsSync(p)) return p; } }
  for(const p of ['/usr/bin/chromium','/usr/bin/chromium-browser','/usr/bin/google-chrome']) if(fs.existsSync(p)) return p;
  throw new Error('no chromium found; set CHROME'); }
const br=await puppeteer.launch({executablePath:findChrome(),headless:true,args:['--allow-file-access-from-files','--no-sandbox','--disable-web-security']});
const pg=await br.newPage(); await pg.setViewport({width:+(process.env.VW||1080),height:+(process.env.VH||1350),deviceScaleFactor:1});
pg.on('pageerror',e=>console.log('ERR',e.message)); pg.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text())});
await pg.goto(`file://${dir}/comp.html`,{waitUntil:'load'}); await pg.evaluate(()=>window.__setup());
if(mode==='frames'){fs.mkdirSync(`${dir}/t`,{recursive:true});
  for(const t of rest.join(',').split(',').map(Number)){await pg.evaluate(t=>window.__renderAt(t),t);await pg.screenshot({path:`${dir}/t/f_${t}.jpg`,type:'jpeg',quality:85});}}
else{const [s,e,out]=[+rest[0],+rest[1],rest[2]];const N=Math.round((e-s)*30);
 const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate','30','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p',out]);
 for(let f=0;f<N;f++){await pg.evaluate(t=>window.__renderAt(t),s+f/30);const b=await pg.screenshot({type:'jpeg',quality:93});if(!ff.stdin.write(b))await new Promise(r=>ff.stdin.once('drain',r));if(f%60===0)console.log('frame',f,'/',N);}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));console.log('done');}
await br.close();
