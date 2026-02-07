import { getMinareRegistrations } from "@/actions/minare/registration/action";
import { RegistrationsTable } from "@/components/features/Minare/Registrations/RegistrationsTable";

export default async function MinareRegistrationsPage() {
  const { data: registrations, success } = await getMinareRegistrations();

  if (!success || !registrations) {
    return (
      <div className="p-8">
        <div className="text-red-500">Failed to load registrations.</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Minare Registrations
        </h1>
        <div className="text-sm text-gray-400">
          Total: {registrations.length}
        </div>
      </div>

      <RegistrationsTable initialData={registrations} />
    </div>
  );
}
