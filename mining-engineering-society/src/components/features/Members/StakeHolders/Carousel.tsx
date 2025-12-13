import Marquee from "react-fast-marquee";
import CarouselCard from "@/components/ui/CarouselCard";

interface Stakeholder {
  id: number;
  name: string;
  role: string;
  tenure: string;
  photoUrl: string;
  linkedInProfile?: string | null;
}

interface PastStakeHolderCarouselProps {
  stakeholders: Stakeholder[];
}

export default function PastStakeHolderCarousel({
  stakeholders,
}: PastStakeHolderCarouselProps) {
  return (
    <div className="ml-2 mr-2 sm:ml-3 sm:mr-3 mb-20">
      <Marquee pauseOnClick={true} speed={40}>
        {stakeholders.map((stakeholder) => (
          <CarouselCard
            key={stakeholder.id}
            name={stakeholder.name}
            position={stakeholder.role}
            imgURL={stakeholder.photoUrl}
            tenure={stakeholder.tenure}
            linkedInProfile={stakeholder.linkedInProfile}
          />
        ))}
      </Marquee>
    </div>
  );
}
