// ACRPS study-video engine — shared helpers. Loaded BEFORE cfg.js in comp.html and by tools/cfg2json.mjs.
var CH='#61EDEE';

// HOLD(i, tAt, d): make scene i last d seconds longer at local time tAt ("add 2 seconds to this slide").
// Everything that starts at/after tAt (beats, background layers, sfx, shakes, glitches, leaks) moves later by d;
// beats still on screen at tAt stay d seconds longer. Nested component times of moved beats follow them (b.sh).
// i is the index in S at the moment of the call. When holding several points of one scene, call from the LATEST time
// to the earliest, using the ORIGINAL times (e.g. HOLD(6,9.0,2); HOLD(6,5.9,2); HOLD(6,3.0,2)). Do holds before splices.
function HOLD(i,tAt,d){var s=S[i]; s.dur+=d;
 s.beats.forEach(function(b){ if(b.t0>=tAt-1e-6){b.t0+=d;b.t1+=d;b.sh=(b.sh||0)+d} else if(b.t1>=tAt-1e-6){b.t1+=d} });
 s.bg.forEach(function(b){ if(b.from!=null&&b.from>=tAt-1e-6)b.from+=d });
 ['sfx','shake','glitch','leak'].forEach(function(k){ (s[k]||[]).forEach(function(e){ if(e.t>=tAt-1e-6)e.t+=d }) });
}

// Sets s.start on every scene and returns the total length in seconds.
function TIMELINE(){var t=0; S.forEach(function(s){s.start=t; t+=s.dur}); return t}
