import PublicationsPage from "@/components/features/Publications/PublicationsPage";

export default function Publications() {
  return (
    <div className="min-h-screen">
      <div className="mt-24 mb-12 text-center text-4xl xxsm:text-6xl font-semibold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
        Publications
      </div>
      <PublicationsPage />
    </div>
  );
}
