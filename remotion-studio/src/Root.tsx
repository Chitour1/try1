import { Composition } from "remotion";
import { ArabicIntro } from "./ArabicIntro";
import { ChitourIntro } from "./ChitourIntro";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ArabicIntro"
        component={ArabicIntro}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "مرحبًا بكم",
          subtitle: "مشروعي الأول للمونتاج",
          accentColor: "#58D9C4",
        }}
      />
      <Composition
        id="ChitourIntro"
        component={ChitourIntro}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "شيتور",
          handle: "@Chitour",
          words: ["فِكرة", "تحليل", "رأي"],
          cta: "تابِعنا",
          accentColor: "#F2B33D",
        }}
      />
    </>
  );
};
