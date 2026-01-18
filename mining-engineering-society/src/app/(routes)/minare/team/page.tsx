import MembersPage from "@/components/features/Minare/Members/MembersPage";
import { getAllMembers } from "@/actions/minare/members/action";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TeamPage() {
  const response = await getAllMembers();
  const members = response.success && response.data ? response.data : [];
  console.log("TeamPage: members count:", members.length);

  return (
    <>
      <MembersPage members={members} />
    </>
  );
}
