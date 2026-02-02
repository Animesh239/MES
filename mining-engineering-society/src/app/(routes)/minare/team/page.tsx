import MembersPage from "@/components/features/Minare/Members/MembersPage";
import { getAllMembers } from "@/actions/minare/members/action";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TeamPage() {
  const response = await getAllMembers();
  // Filter for current members only
  // If 'type' is missing or null, we assume 'current' for backward compatibility
  const members =
    response.success && response.data
      ? response.data.filter(
          (member) => member.type === "current" || !member.type
        )
      : [];

  console.log("TeamPage (Current): members count:", members.length);

  return (
    <>
      <MembersPage members={members} />
    </>
  );
}
