import Marquee from "react-fast-marquee";
import CarouselCard from "@/components/ui/CarouselCard";
import { PastStakeHolders } from "@/config/Members/StakeHolders/Data";

export default function PastStakeHolderCarousel() {
  return (
    <div className="ml-2 mr-2 sm:ml-3 sm:mr-3 mb-20">
      <Marquee pauseOnClick={true} speed={40}>
        {PastStakeHolders.map((stakeholder, index) => (
          <CarouselCard
            key={index}
            name={stakeholder.name}
            position={stakeholder.position}
            imgURL={stakeholder.imgUrl}
            tenure={stakeholder.tenure}
          />
        ))}
      </Marquee>
    </div>
  );
}
