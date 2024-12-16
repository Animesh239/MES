import { AboutSectionCardData } from "@/config/Homepage/HomePagedata";
import { Card } from "./Card";

export const CardWrapper = () => {
  return (
    <div className="relative flex flex-col md:flex-row justify-between items-center  md:p-2  gap-5">
      {AboutSectionCardData.map((items, index) => (
        <Card
          key={index}
          url={items.url}
          description={items.description}
          title={items.title}
        />
      ))}
    </div>
  );
};
