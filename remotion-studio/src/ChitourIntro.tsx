import type { FC } from "react";
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type ChitourIntroProps = {
  title: string;
  handle: string;
  words: string[];
  cta: string;
  accentColor: string;
};

// Load Bahij before any frame is captured (Remotion waits on delayRender).
const fontHandle = delayRender("Loading Bahij font");
Promise.all(
  ([["Bahij-Plain.ttf", "400"], ["Bahij-Bold.ttf", "700"], ["Bahij-Black.ttf", "900"]] as const).map(([file, weight]) =>
    new FontFace("Bahij", `url('${staticFile(`fonts/${file}`)}') format('truetype')`, { weight })
      .load()
      .then((face) => (document.fonts as unknown as { add: (f: FontFace) => void }).add(face)),
  ),
)
  .then(() => continueRender(fontHandle))
  .catch((err) => {
    console.error(err);
    continueRender(fontHandle);
  });

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeOut = Easing.out(Easing.cubic);
const easeInOut = Easing.inOut(Easing.cubic);

// RTL reveal: the visible part grows from the right edge toward the left.
const rtlReveal = (p: number) => `inset(-20% 0 -20% ${(1 - p) * 100}%)`;

export const ChitourIntro: FC<ChitourIntroProps> = ({
  title,
  handle,
  words,
  cta,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  /* ---------- timeline (frames @30fps, 300 total) ---------- */
  const LINE = [4, 22];
  const TITLE = 16;
  const HANDLE = 46;
  const LIFT = [96, 118];
  const WORD0 = 112;
  const WORD_STEP = 34;
  const CTA = 214;
  const OUT = [272, 299];

  /* ---------- background ---------- */
  const drift = interpolate(frame, [0, durationInFrames], [0, 1], clamp);
  const beamX = interpolate(frame, [0, durationInFrames], [380, -380], clamp);

  /* ---------- opening line + title ---------- */
  const lineP = interpolate(frame, LINE, [0, 1], { ...clamp, easing: easeOut });
  const titleP = interpolate(frame, [TITLE, TITLE + 26], [0, 1], { ...clamp, easing: easeOut });
  const titleSpring = spring({ frame: frame - TITLE, fps, config: { damping: 16, stiffness: 120 } });
  const lift = interpolate(frame, LIFT, [0, 1], { ...clamp, easing: easeInOut });
  const titleY = interpolate(lift, [0, 1], [0, -360]);
  const titleScale = interpolate(lift, [0, 1], [1, 0.62]) * (0.92 + 0.08 * titleSpring);

  const handleP = interpolate(frame, [HANDLE, HANDLE + 20], [0, 1], { ...clamp, easing: easeOut });
  const handleSpacing = interpolate(handleP, [0, 1], [26, 6]);

  /* ---------- kinetic words (enter from the right) ---------- */
  const wordEls = words.slice(0, 3).map((w, i) => {
    const start = WORD0 + i * WORD_STEP;
    const enter = spring({ frame: frame - start, fps, config: { damping: 15, stiffness: 140 } });
    const leave = interpolate(frame, [start + WORD_STEP - 6, start + WORD_STEP + 4], [0, 1], clamp);
    const isLast = i === Math.min(words.length, 3) - 1;
    const out = isLast ? interpolate(frame, [CTA - 10, CTA], [0, 1], clamp) : leave;
    const x = interpolate(enter, [0, 1], [260, 0]) + interpolate(out, [0, 1], [0, -260]);
    const op = Math.min(enter, 1) * (1 - out);
    const bar = interpolate(frame, [start + 4, start + 18], [0, 1], { ...clamp, easing: easeOut });
    return { w, x, op, bar, i };
  });

  /* ---------- CTA ---------- */
  const ctaSpring = spring({ frame: frame - CTA, fps, config: { damping: 13, stiffness: 150 } });
  const ring = interpolate((frame - CTA - 10) % 36, [0, 35], [0, 1], clamp);
  const ringOn = frame > CTA + 10 ? 1 : 0;

  /* ---------- light sweeps (right to left) ---------- */
  const sweep = (at: number) =>
    frame >= at && frame <= at + 18
      ? interpolate(frame, [at, at + 18], [620, -620], { ...clamp, easing: easeInOut })
      : null;
  const sweeps = [TITLE + 6, CTA - 2].map(sweep);

  /* ---------- global out ---------- */
  const outP = interpolate(frame, OUT, [0, 1], { ...clamp, easing: easeInOut });
  const flash = interpolate(frame, [TITLE + 2, TITLE + 6, TITLE + 16], [0, 0.2, 0], clamp)
    + interpolate(frame, [CTA, CTA + 3, CTA + 14], [0, 0.25, 0], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0F14", fontFamily: "Bahij, sans-serif", overflow: "hidden" }}>
      <Audio src={staticFile("audio/intro-sfx.wav")} />

      {/* layered background */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 55% at 50% 40%, #1b2430 0%, #0B0F14 70%)`,
          transform: `scale(${1.05 + drift * 0.05})`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          transform: `translateY(${drift * -72}px)`,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -200,
          left: "50%",
          width: 520,
          height: 2400,
          marginLeft: -260,
          transform: `translateX(${beamX}px) rotate(18deg)`,
          background: `linear-gradient(180deg, transparent, ${accentColor}22 45%, transparent)`,
          filter: "blur(30px)",
        }}
      />

      {/* content */}
      <AbsoluteFill
        dir="rtl"
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${1 - 0.08 * outP})`,
          opacity: 1 - outP,
        }}
      >
        {/* title block */}
        <div style={{ position: "absolute", top: 760, left: 0, right: 0, textAlign: "center", transform: `translateY(${titleY}px) scale(${titleScale})` }}>
          <div
            style={{
              height: 6,
              width: 520,
              margin: "0 auto 40px",
              borderRadius: 6,
              background: `linear-gradient(270deg, ${accentColor}, ${accentColor}00)`,
              transformOrigin: "100% 50%",
              transform: `scaleX(${lineP})`,
            }}
          />
          <div
            style={{
              fontSize: 250,
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#F3EFE6",
              clipPath: rtlReveal(titleP),
              filter: `blur(${(1 - titleP) * 10}px)`,
              textShadow: `0 6px 0 rgba(0,0,0,0.35), 0 0 60px ${accentColor}44`,
            }}
          >
            {title}
          </div>
          <div
            dir="ltr"
            style={{
              marginTop: 18,
              fontSize: 58,
              fontWeight: 700,
              color: accentColor,
              letterSpacing: handleSpacing,
              opacity: handleP,
            }}
          >
            {handle}
          </div>
        </div>

        {/* kinetic words */}
        {wordEls.map(({ w, x, op, bar, i }) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 1010,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: op,
              transform: `translateX(${x}px)`,
            }}
          >
            <div style={{ fontSize: 150, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.2 }}>{w}</div>
            <div
              style={{
                height: 10,
                width: 300,
                margin: "18px auto 0",
                borderRadius: 10,
                background: accentColor,
                transformOrigin: "100% 50%",
                transform: `scaleX(${bar})`,
              }}
            />
          </div>
        ))}

        {/* call to action */}
        <div
          style={{
            position: "absolute",
            top: 1080,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: Math.min(1, ctaSpring),
            transform: `translateY(${(1 - ctaSpring) * 80}px) scale(${0.9 + 0.1 * ctaSpring})`,
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 120,
                border: `4px solid ${accentColor}`,
                opacity: ringOn * (1 - ring),
                transform: `scale(${1 + ring * 0.25})`,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                padding: "34px 64px",
                borderRadius: 120,
                background: accentColor,
                color: "#0B0F14",
                fontSize: 72,
                fontWeight: 900,
                boxShadow: `0 20px 60px ${accentColor}55`,
              }}
            >
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0B0F14" strokeWidth="2.6" strokeLinecap="round">
                <circle cx="10" cy="8" r="4" />
                <path d="M3 21c0-4 3-7 7-7s7 3 7 7" />
                <path d="M20 8v6M17 11h6" />
              </svg>
              {cta}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* light sweeps */}
      {sweeps.map((sx, i) =>
        sx === null ? null : (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: 260,
              marginLeft: -130,
              transform: `translateX(${sx}px) skewX(-14deg)`,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
              mixBlendMode: "screen",
            }}
          />
        ),
      )}

      <AbsoluteFill style={{ background: "#fff", opacity: flash, mixBlendMode: "screen" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 85% 70% at 50% 45%, transparent 55%, rgba(0,0,0,0.6) 100%)" }} />
    </AbsoluteFill>
  );
};
