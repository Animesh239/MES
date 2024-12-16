import AlumniTable from "@/components/features/Members/Alumni/Datagrid";

export default function AlumniPage() {
  return (
    <div>
      <div className="mt-24 mb-6 text-center text-4xl xxsm:text-6xl font-semibold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
        Meet our Alumni
      </div>
      <AlumniTable />
    </div>
  );
}
