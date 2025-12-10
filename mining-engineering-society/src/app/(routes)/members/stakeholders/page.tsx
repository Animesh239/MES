import MemberCard from "@/components/ui/card";
import PastStakeHolderCarousel from "@/components/features/Members/StakeHolders/Carousel";
import { getAllStakeholders } from "@/actions/mes/members/stakeholders/action";

export default async function StakeholdersPage() {
  const response = await getAllStakeholders();
  const stakeholders = response.success && response.data ? response.data : [];

  return (
    <div>
      <div className="mt-24 text-center text-4xl xxsm:text-6xl font-semibold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
        Our Stakeholders
      </div>
      <div
        className="mt-12 mb-12 grid grid-cols-1 xxxsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6
      gap-y-8 sm:gap-y-12 justify-items-center px-4 sm:px-6 lg:px-8"
      >
        {stakeholders.map((stakeholder) => (
          <MemberCard
            key={stakeholder.id}
            name={stakeholder.name}
            position={stakeholder.role}
            imgURL={stakeholder.photoUrl}
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
