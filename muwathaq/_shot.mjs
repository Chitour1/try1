import puppeteer from 'puppeteer-core';
const [file,outp]=process.argv.slice(2);
const b=await puppeteer.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--allow-file-access-from-files','--disable-web-security']});
const p=await b.newPage();await p.setViewport({width:1900,height:1000});
await p.goto('file://'+file);await p.waitForFunction(()=>document.title==='ok');await new Promise(r=>setTimeout(r,400));
for(const id of ['p1','p2','p3']){const e=await p.$('#'+id);await e.screenshot({path:`${outp}_${id}.png`})}
await b.close();
