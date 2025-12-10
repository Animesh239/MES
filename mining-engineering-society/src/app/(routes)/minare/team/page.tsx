import MembersPage from "@/components/features/Minare/Members/MembersPage";
import { getAllMembers } from "@/actions/minare/members/action";

export default async function TeamPage() {
  const response = await getAllMembers();
  const members = response.success && response.data ? response.data : [];

  return (
    <>
      <MembersPage members={members} />
    </>
  );
}
