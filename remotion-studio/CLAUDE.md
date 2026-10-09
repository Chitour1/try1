# Remotion studio: instructions for Claude Code

This folder is a self-contained Remotion video project. Do not modify any files outside `remotion-studio/` for video work unless the user expressly asks.

When the user asks for a video, montage, title animation, podcast clip, captions, or promo:
1. Work in `remotion-studio/`. Video entry point: `src/index.ts`; compositions: `src/Root.tsx`.
2. Create or modify Remotion compositions under `src/`. An editable Arabic example is `ArabicIntro`.
3. Follow the official Remotion documentation at https://www.remotion.dev/docs and the Remotion animation APIs. Use frame-based deterministic animation, not CSS transitions.
4. Only if packages are absent, run `npm install --no-audit --no-fund` from this folder. Never install packages globally unless the user explicitly requests it.
5. For syntax validation use `npm run typecheck`. Run `npm run render` only when a finished MP4 is actually requested.
6. Avoid inspecting the unrelated Next.js app in the repository root; keep tool logs and explanations short. Do not render repeatedly without reason.
7. For Arabic content use right-to-left layout, preserve exact names, and use fonts that support Arabic. Ask for source footage if editing specific footage that was not supplied.
8. Never claim a render succeeded unless the output file exists.

Commands:
- Preview: `npm run dev`
- MP4: `npm run render`
- Type check: `npm run typecheck`
