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

        {/* Top Section: Critical Actions & Info */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Payment Details - Highlighted */}
          <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/5 p-6 backdrop-blur-sm shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:border-yellow-500/60 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg
                className="w-24 h-24 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.15-1.46-3.27-3.4h1.96c.1 1.05 1.18 1.91 2.53 1.91 1.29 0 2.13-.59 2.13-1.66 0-.85-.42-1.43-2.05-2.13l-.68-.27C9.53 11.63 8 10.72 8 8.93c0-1.87 1.27-2.96 2.74-3.31V4h2.67v1.93c1.38.35 2.58 1.34 2.74 2.91h-2.06c-.09-.72-.63-1.43-1.89-1.43-1.22 0-2.06.59-2.06 1.48 0 .84.47 1.48 1.92 2.08l.79.33c1.92.81 3.48 1.91 3.48 3.86.01 1.94-1.25 3.03-2.78 3.39z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-6 flex items-center text-yellow-400">
              <span className="bg-yellow-500/20 p-2 rounded-lg mr-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              Payment Details
            </h2>
            <div className="space-y-4 relative z-10">
              <div className="p-4 bg-black/40 border border-yellow-500/30 rounded-xl">
                <p className="text-sm text-yellow-200/80 font-medium mb-1 uppercase tracking-wide">
                  Registration Fee
                </p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">₹500</span>
                  <span className="text-sm font-normal text-gray-400 ml-2">
                    / person
                  </span>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-xs text-red-200 font-medium flex items-start">
                  <svg
                    className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  Please make individual payments. Group payments are NOT
                  accepted. Each participant must upload their own payment
                  proof.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Account Name
                  </span>
                  <span className="text-white font-medium text-right">
                    MS Ming Engg Society
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Account No
                  </span>
                  <span className="font-medium font-mono text-lg text-right text-yellow-100">
                    10138951149
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    IFSC Code
                  </span>
                  <span className="font-medium font-mono text-lg text-right text-yellow-100">
                    SBIN0002109
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/10">
                  <p className="text-xs text-yellow-200/80 leading-relaxed">
                    <span className="font-bold text-yellow-400">
                      Verification:
                    </span>{" "}
                    After uploading payment proof, verification will be
                    completed within a few days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Status - Highlighted & Moved to Top */}
          <div className="rounded-xl border border-green-500/40 bg-green-500/5 p-6 backdrop-blur-sm shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:border-green-500/60 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg
                className="w-24 h-24 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-6 flex items-center text-green-400">
              <span className="bg-green-500/20 p-2 rounded-lg mr-3">
                <svg
                  className="w-6 h-6"
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
              </span>
              Minare Status
            </h2>
            <div className="relative z-10">
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
                        Your registration is currently under review.
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
                  <p className="text-gray-400 mb-6 font-medium">
                    Not registered yet?
                  </p>
                  <div className="flex justify-center">
                    <RegistrationCard userId={session.userId} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Details - Highlighted */}
          <div className="rounded-xl border border-pink-500/40 bg-pink-500/5 p-6 backdrop-blur-sm shadow-[0_0_20px_rgba(236,72,153,0.1)] hover:border-pink-500/60 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg
                className="w-24 h-24 text-pink-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-6 flex items-center text-pink-400">
              <span className="bg-pink-500/20 p-2 rounded-lg mr-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
              Need Help?
            </h2>
            <div className="space-y-6 relative z-10">
              <p className="text-sm text-gray-300 font-medium">
                Reach out to our representatives anytime for queries regarding
                registration or payment.
              </p>

              <div className="space-y-4">
                <div className="flex items-center p-4 rounded-xl bg-black/40 border border-gray-700/50 hover:bg-gray-800/80 hover:border-purple-500/50 transition-all duration-300 group/item">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 text-purple-400 group-hover/item:bg-purple-500 group-hover/item:text-white transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">
                      Satya Prakash Behera
                    </p>
                    <a
                      href="tel:+919938525212"
                      className="text-sm text-gray-400 hover:text-purple-400 transition-colors font-mono"
                    >
                      +91-99385-25212
                    </a>
                  </div>
                </div>

                <div className="flex items-center p-4 rounded-xl bg-black/40 border border-gray-700/50 hover:bg-gray-800/80 hover:border-pink-500/50 transition-all duration-300 group/item">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mr-4 text-pink-400 group-hover/item:bg-pink-500 group-hover/item:text-white transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">
                      Ayush Jaiswal
                    </p>
                    <a
                      href="tel:+916376752908"
                      className="text-sm text-gray-400 hover:text-pink-400 transition-colors font-mono"
                    >
                      +91-63767-52908
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Profile Details */}
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent pt-4">
          Your Profile
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
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
        </div>
      </div>
    </div>
  );
}
