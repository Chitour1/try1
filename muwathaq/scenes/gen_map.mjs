// node gen_map.mjs spec.json out.json  — projects world-atlas 10m countries into a W×H box
// spec: {"bbox":[minLon,minLat,maxLon,maxLat],"w":1000,"h":1000,"pin":[lon,lat],"labels":[["إيران",lon,lat],...]}
import fs from 'fs'; import {createRequire} from 'module';
import {feature} from 'topojson-client'; import {geoMercator, geoPath, geoBounds} from 'd3-geo';
const require = createRequire(import.meta.url);
const topo = require('world-atlas/countries-10m.json');
const [,, specF, outF] = process.argv; const s = JSON.parse(fs.readFileSync(specF, 'utf8'));
const [x0, y0, x1, y1] = s.bbox, W = s.w || 1000, H = s.h || 1000;
const box = {type: 'Feature', geometry: {type: 'Polygon', coordinates: [[[x0, y0], [x0, y1], [x1, y1], [x1, y0], [x0, y0]]]}};
const proj = geoMercator().fitExtent([[0, 0], [W, H]], box).clipExtent([[-40, -40], [W + 40, H + 40]]); const path = geoPath(proj);
const fc = feature(topo, topo.objects.countries);
const near = f => { const [[a, b], [c, d]] = geoBounds(f); return !(c < x0 - 3 || a > x1 + 3 || d < y0 - 3 || b > y1 + 3) && (c - a) < 180; };
const paths = fc.features.filter(near).map(f => ({name: f.properties.name, d: path(f)})).filter(p => p.d && p.d.length > 20);
const P = ([lo, la]) => proj([lo, la]).map(v => Math.round(v * 10) / 10);
fs.writeFileSync(outF, JSON.stringify({w: W, h: H, paths, pin: s.pin ? P(s.pin) : null, labels: (s.labels || []).map(([t, lo, la]) => [t, ...P([lo, la])])}));
console.log('map', paths.length, 'countries');
