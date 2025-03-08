import MemberCard from "@/components/ui/card";
import { CurrentStakeHolders } from "@/config/Members/StakeHolders/Data";
import PastStakeHolderCarousel from "@/components/features/Members/StakeHolders/Carousel";

export default function StakeholdersPage() {
  return (
    <div>
      <div className="mt-24 text-center text-4xl xxsm:text-6xl font-semibold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
        Our Stakeholders
      </div>
      <div
        className="mt-12 mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6
      gap-y-12 justify-items-center"
      >
        {CurrentStakeHolders.map((stakeholder, index) => (
          <MemberCard
            key={index}
            name={stakeholder.name}
            position={stakeholder.position}
            imgURL={stakeholder.imgUrl}
          />
        ))}
      </div>
      <div className="mt-20 mb-20 text-center text-4xl xxsm:text-6xl font-semibold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
        Meet our Past Stakeholders
      </div>
      <PastStakeHolderCarousel />
    </div>
  );
}
