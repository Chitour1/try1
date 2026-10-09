import { Composition } from "remotion";
import { ArabicIntro } from "./ArabicIntro";

export const RemotionRoot = () => {
  return (
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
  );
};
