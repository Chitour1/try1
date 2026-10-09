---
name: remotion-video
description: Create and edit Arabic or English videos using the Remotion project under remotion-studio/.
---

# Remotion video editing

Use this repository's `remotion-studio` folder for all video tasks. Do not touch the repository's existing Next.js app.

Read `remotion-studio/CLAUDE.md` and `remotion-studio/README.md`, then make the requested changes to compositions under `remotion-studio/src`.

Use official docs: https://www.remotion.dev/docs.

Install dependencies only if missing: `cd remotion-studio && npm install --no-audit --no-fund`. Check with `npm run typecheck` from the same folder. Render only when requested.

For an Arabic video, maintain RTL layout and correct Arabic text. If a source video is required and absent, ask for it.

Be brief and economical with tokens. Do not repeatedly run long commands or dump installation logs.
