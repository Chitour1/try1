import puppeteer from 'puppeteer-core'; import fs from 'fs';
const [src,out,color,W]=process.argv.slice(2);
let s=fs.readFileSync(src,'utf8').replace(/fill="#240F6E"/g,`fill="${color}"`).replace(/width="900" height="320"/,`width="${W}" height="${W*32/90}"`);
const b=await puppeteer.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const p=await b.newPage();await p.setViewport({width:+W,height:Math.ceil(W*32/90)});
await p.setContent(`<html><body style="margin:0;background:transparent">${s}</body></html>`);
await p.screenshot({path:out,omitBackground:true});await b.close();
