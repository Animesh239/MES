import { Header } from "../header";
import Timeline from "./TimeLine";

export const Event = () => {
  return (
    <div className="min-h-screen -z-10 h-auto flex flex-col gap-20 ">
      <Header label="EVENTS" />
      <Timeline />
    </div>
  );
};
