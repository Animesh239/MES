// import { AboutMiningDept } from "./AboutminingDept";
import { AboutMiningDept } from "./AboutMiningDept";
// import { CardWrapper } from "./CardWrapper";
// import { Feedback } from "./Feedback";
import { Heading } from "./Heading";
import { Statistics } from "./Statistics";
import { YoutubeVideo } from "./youtubeVideo";

export const AboutUsMain = () => {
  return (
    <div className="min-h-screen h-auto flex flex-col gap-8 xsm:gap-12 sm:gap-16 md:gap-24 lg:gap-32 py-20 sm:py-[10%] px-4 xsm:px-[3vw] sm:px-[10vw]">
      <Heading />
      <AboutMiningDept />
      {/* <CardWrapper /> */}
      <Statistics />
      <YoutubeVideo />
      {/* <Feedback /> */}
    </div>
  );
};
