// Reads <job>/cfg.js (+engine lib.js), prints the timeline, writes <job>/out/timeline.json for snd.py/render.py.
// node tools/cfg2json.mjs <job>
import fs from 'fs'; import vm from 'vm';
const job=process.argv[2]; const ctx={}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(`${job}/lib.js`,'utf8')+'\n'+fs.readFileSync(`${job}/cfg.js`,'utf8')+'\nvar TOTAL=TIMELINE();',ctx);
const S=ctx.S, TOTAL=ctx.TOTAL; fs.mkdirSync(`${job}/out`,{recursive:true});
fs.writeFileSync(`${job}/out/timeline.json`,JSON.stringify({total:TOTAL,scenes:S.map(s=>({start:s.start,dur:s.dur,tin:s.tin,sfx:s.sfx||[]}))}));
const mmss=t=>`${Math.floor(t/60)}:${String((t%60).toFixed(1)).padStart(4,'0')}`;
S.forEach((s,i)=>{const first=(s.beats.find(b=>b.text)||{}).text||((s.beats.find(b=>b.blk)||{}).blk||{}).type||'';
  console.log(`${String(i+1).padStart(2)}  ${mmss(s.start)}  ${String(s.dur).padStart(4)}s  ${(s.tin||'').padEnd(5)}  ${String(first).replace(/\*\*|__|\{|\}/g,'').replace(/\|/g,' ').slice(0,48)}`)});
console.log('TOTAL',TOTAL,'s =',mmss(TOTAL), S.some(s=>s.dur>15)?' (note: some scenes > 15 s)':'');
