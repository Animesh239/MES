import { getSession } from "@/lib/session";
import { getUserRegistration } from "@/actions/minare/registration/action";
import { getUserDetails, logoutAction } from "@/actions/auth/action";
import { RegistrationCard } from "@/components/features/Minare/Registration/UserDashboard/RegistrationCard";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function UserDashboardData() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: registration } = await getUserRegistration(session.userId);
  const { data: user } = await getUserDetails(session.userId);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-gray-800 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Welcome, {session.username}
            </h1>
            <p className="mt-2 text-gray-400">
              Manage your profile and Minare participation.
            </p>
          </div>
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sign Out
            </Button>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Information */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm shadow-xl hover:border-purple-500/30 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-purple-400">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Personal Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  Full Name
                </label>
                <p className="text-white font-medium">{user?.name || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  Email
                </label>
                <p className="text-white font-medium">{user?.email || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  Phone Number
                </label>
                <p className="text-white font-medium">
                  {user?.phoneNumber || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  Username
                </label>
                <p className="text-white font-medium">
                  @{user?.username || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm shadow-xl hover:border-blue-500/30 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-blue-400">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Academic Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  College
                </label>
                <p className="text-white font-medium">
                  {user?.collegeName || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  Branch
                </label>
                <p className="text-white font-medium">
                  {user?.branch || "N/A"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">
                    Year
                  </label>
                  <p className="text-white font-medium">
                    {user?.graduationYear || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">
                    Degree
                  </label>
                  <p className="text-white font-medium">
                    {user?.degree || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Status */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm shadow-xl hover:border-green-500/30 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-green-400">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Minare Status
            </h2>
            {registration ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-gray-800">
                  <span className="text-gray-400">Current Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      registration.status === "approved"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : registration.status === "rejected"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {registration.status}
                  </span>
                </div>

                {registration.paymentProofUrl && (
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
                      Payment Proof
                    </label>
                    <div className="relative w-full h-32 overflow-hidden rounded-lg border border-gray-700 bg-black/20 group cursor-pointer">
                      <Image
                        src={registration.paymentProofUrl}
                        alt="Payment Proof"
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                )}

                {registration.status === "pending" && (
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-xs text-yellow-200">
                      Your registration is currently under review by the admin
                      team.
                    </p>
                  </div>
                )}
                {registration.status === "approved" && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-xs text-green-200">
                      You are officially registered for Minare!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <p className="text-gray-400 mb-6">
                  You are not registered for Minare yet.
                </p>
                <div className="flex justify-center">
                  <RegistrationCard userId={session.userId} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
