import { CardWrapper } from "./CardWrapper";
import { Heading } from "./Heading";

export const AboutUsMain = () => {
  return (
    <div className="min-h-screen h-auto flex flex-col gap-10 pt-20 sm:pt-[10%]">
      <Heading />
      <CardWrapper />
    </div>
  );
};
