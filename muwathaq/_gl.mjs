import puppeteer from 'puppeteer-core';
for (const args of [['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'],['--no-sandbox']]){
const b=await puppeteer.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args});
const p=await b.newPage();await p.setContent('<canvas id=c></canvas>');
console.log(args.join(' '),await p.evaluate(()=>{const g=document.getElementById('c').getContext('webgl2');if(!g)return 'no webgl2';const d=g.getExtension('WEBGL_debug_renderer_info');return g.getParameter(d?d.UNMASKED_RENDERER_WEBGL:g.RENDERER)}));await b.close();}
