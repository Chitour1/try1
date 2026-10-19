import puppeteer from 'puppeteer-core';
const [dir,t,js]=process.argv.slice(2);
const b=await puppeteer.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1080,height:1920});
await p.goto(`file://${dir}/comp.html`);await p.evaluate(()=>window.__setup());await p.evaluate(t=>window.__renderAt(t),+t);
console.log(JSON.stringify(await p.evaluate(js)));await b.close();
