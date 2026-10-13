// World map data for the 'map' component -> <job>/a/map.js
// node tools/mkmap.mjs <job> spec.json
// spec: {"origin":{"key":"usa","name":"United States of America","at":[-98,39]},
//        "targets":[{"key":"can","name":"Canada","at":[-100,57]},{"key":"irn","name":"Iran","at":[54,32.5]}],
//        "box":[-150,-30,70,78], "rotate":40}
// names = Natural Earth (world-atlas countries-110m) English names; "at" = [lon,lat] where the dot/arc lands.
import fs from 'fs'; import path from 'path'; import {fileURLToPath} from 'url'; import {createRequire} from 'module';
const here=path.dirname(fileURLToPath(import.meta.url)); const req=createRequire(path.join(here,'..','package.json'));
const topo=req('topojson-client'); const d3=req('d3-geo');
const [,, job, specf]=process.argv; const sp=JSON.parse(fs.readFileSync(specf));
const w=JSON.parse(fs.readFileSync(req.resolve('world-atlas/countries-110m.json')));
const fc=topo.feature(w,w.objects.countries);
const [x0,y0,x1,y1]=sp.box||[-150,-30,70,78];
const box={type:'Feature',geometry:{type:'Polygon',coordinates:[[[x0,y0],[x0,y1],[x1,y1],[x1,y0],[x0,y0]].reverse()]}};
const proj=d3.geoNaturalEarth1().rotate([sp.rotate??40,0]).fitExtent(sp.extent||[[40,330],[1040,1080]],box);
const pth=d3.geoPath(proj);
const all=[sp.origin,...sp.targets]; const hi={}; all.forEach(o=>hi[o.name]=o.key);
let land='',hl={},c={};
for(const f of fc.features){const dd=pth(f); if(!dd)continue; const k=hi[f.properties.name]; if(k)hl[k]=dd; else land+=dd;}
for(const o of all){ if(!hl[o.key]) console.log('WARNING: country not found:',o.name); c[o.key]=o.at?proj(o.at):pth.centroid(fc.features.find(f=>f.properties.name===o.name)); }
const grat=pth(d3.geoGraticule10());
fs.writeFileSync(`${job}/a/map.js`,'var MAPJSON='+JSON.stringify(JSON.stringify({land,hl,c,grat}))+';\n');
console.log('map.js written; keys',Object.keys(hl),'anchors',JSON.stringify(c));
