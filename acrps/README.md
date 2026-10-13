# ACRPS study videos (المركز العربي للأبحاث ودراسة السياسات)

Engine and tools behind the Claude skill **acrps-study-video**: a ~3-minute 4:5 (1080×1350) video about a published study,
in the Center's identity (teal, textured strips, logo, Bahij font, right-to-left), built from generated clips + Center photos,
on-screen text only (no narration), with transitions, sound effects and animated infographics.

```
engine/  comp.html (scene engine + component library), lib.js (HOLD, TIMELINE), r3.mjs (frame renderer)
tools/   prep.py (job, PDF pages, clips, photos, cover), mkmap.mjs, cfg2json.mjs, snd.py, render.py
assets/  Bahij fonts, logo, brand textures, film grain, default news-bed music
template/ cfg.js — generic template: one scene per component, placeholders only
BRAND.md the identity notes taken from the Center's designs
```
SFX synthesis is shared with `../muwathaq/fxlib.py`. Setup: `cd acrps && npm i` (needs node ≥18, ffmpeg, poppler-utils, python3 with numpy scipy pillow soundfile pyloudnorm).
