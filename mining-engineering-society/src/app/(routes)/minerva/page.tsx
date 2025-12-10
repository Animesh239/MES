import Card from "@/components/features/Minerva/Card";
import { getAllMinerva } from "@/actions/mes/minerva/action";
import ComingSoon from "@/components/ui/ComingSoon";

export default async function Home() {
  const response = await getAllMinerva();
  const minervaIssues = response.success && response.data ? response.data : [];

  if (minervaIssues.length === 0) {
    return <ComingSoon />;
  }

  return (
    <>
      <div className="mt-24 mb-12 text-center text-4xl xxsm:text-6xl font-semibold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
        Minerva
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-20">
        {minervaIssues.map((issue) => (
          <Card
            key={issue.id}
            title={issue.title}
            issueDate={issue.issueDate}
            coverImageLink={issue.coverImageLink}
            pdfLink={issue.pdfLink}
          />
        ))}
      </div>
    </>
  );
}
