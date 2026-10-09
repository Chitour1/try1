import type { FC } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type IntroProps = {
  title: string;
  subtitle: string;
  accentColor: string;
};

export const ArabicIntro: FC<IntroProps> = ({
  title,
  subtitle,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 19, stiffness: 115, mass: 1 },
  });

  const fadeOut = interpolate(frame, [120, 149], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity =
    interpolate(frame, [0, 16], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) * fadeOut;

  const subtitleOpacity =
    interpolate(frame, [14, 36], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) * fadeOut;

  const lineScale = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B1428",
        backgroundImage:
          "radial-gradient(circle at 75% 25%, #1A4451 0%, #0B1428 66%)",
        justifyContent: "center",
        alignItems: "center",
        color: "#FFFFFF",
        fontFamily: "Tahoma, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 940,
          height: 940,
          borderRadius: "50%",
          border: `2px solid ${accentColor}`,
          opacity: 0.12,
          transform: `translate(420px, -340px) scale(${1 + frame / 1200})`,
        }}
      />
      <div
        dir="rtl"
        style={{
          textAlign: "center",
          transform: `translateY(${(1 - entrance) * 60}px)`,
          padding: "0 160px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            height: 8,
            width: 180,
            borderRadius: 10,
            backgroundColor: accentColor,
            margin: "0 auto 48px",
            transform: `scaleX(${lineScale})`,
          }}
        />
        <h1
          style={{
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.4,
            margin: "0 0 28px",
            opacity: titleOpacity,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: "#D7E6EA",
            fontSize: 44,
            margin: 0,
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
