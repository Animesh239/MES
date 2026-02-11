import { getSession } from "@/lib/session";
import { getUserRegistration } from "@/actions/minare/registration/action";
import { getUserDetails, logoutAction } from "@/actions/auth/action";
import { RegistrationCard } from "@/components/features/Minare/Registration/UserDashboard/RegistrationCard";
import { IdCardUpload } from "@/components/features/Minare/Registration/UserDashboard/IdCardUpload";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function UserDashboardData() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: registration } = await getUserRegistration(session.userId);
  const { data: user } = await getUserDetails(session.userId);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Dashboard
            </h1>
            <p className="mt-1 text-gray-400">
              Welcome back,{" "}
              <span className="text-white font-semibold">
                {session.username}
              </span>
              . Manage your Minare participation.
            </p>
          </div>
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="outline"
              className="border-red-900/50 text-red-500 hover:bg-red-950 hover:text-red-400 hover:border-red-500 transition-all font-medium"
            >
              Sign Out
            </Button>
          </form>
        </div>

        {/* Important Information Banner */}
        <div className="rounded-xl border-l-4 border-l-blue-500 bg-gray-900/50 border-y border-r border-gray-800 p-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide uppercase">
                Important Registration Details
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  The registration fee of ₹500 covers the following:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-200">
                    <svg
                      className="w-4 h-4 mr-2 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Accommodation (6th - 8th March)
                  </li>
                  <li className="flex items-center text-gray-200">
                    <svg
                      className="w-4 h-4 mr-2 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Official Registration Kit
                  </li>
                  <li className="flex items-center text-gray-200">
                    <svg
                      className="w-4 h-4 mr-2 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Access to all Events
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Important Notes:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-200">
                    <svg
                      className="w-4 h-4 mr-2 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Please note that{" "}
                    <span className="text-red-400 font-bold mx-1">
                      food is not included
                    </span>{" "}
                    in the registration package.
                  </li>
                </ul>
                <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 mt-4">
                  <p className="text-sm text-red-200 font-medium flex gap-2">
                    <svg
                      className="w-5 h-5 flex-shrink-0"
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
                    <span>
                      We kindly request that you make{" "}
                      <strong>INDIVIDUAL PAYMENTS</strong>. Group transactions
                      are not accepted. Each participant must upload their own
                      unique payment proof.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - Primary Actions & Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Minare Status Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
                  Minare Registration Status
                </h2>
                {registration && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                      registration.status === "approved"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : registration.status === "rejected"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    }`}
                  >
                    {registration.status}
                  </span>
                )}
              </div>

              <div className="p-6">
                {registration ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 block">
                          Payment Proof
                        </label>
                        {registration.paymentProofUrl ? (
                          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-700 bg-black/40 group">
                            <Image
                              src={registration.paymentProofUrl}
                              alt="Payment Proof"
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="h-32 bg-gray-800/50 rounded-lg flex items-center justify-center border border-dashed border-gray-700">
                            <span className="text-gray-500 text-sm">
                              No proof uploaded
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-center space-y-4">
                        {registration.status === "pending" && (
                          <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-lg">
                            <h4 className="text-yellow-400 font-bold mb-1">
                              Under Review
                            </h4>
                            <p className="text-sm text-yellow-200/70">
                              Your payment proof has been verified by our
                              automated system and is now pending admin
                              approval.
                            </p>
                          </div>
                        )}
                        {registration.status === "approved" && (
                          <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-lg">
                            <h4 className="text-green-400 font-bold mb-1">
                              Registration Confirmed
                            </h4>
                            <p className="text-sm text-green-200/70">
                              You are all set! We look forward to seeing you at
                              Minare.
                            </p>
                          </div>
                        )}
                        {registration.status === "rejected" && (
                          <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-lg">
                            <h4 className="text-red-400 font-bold mb-1">
                              Action Required
                            </h4>
                            <p className="text-sm text-red-200/70">
                              There was an issue with your registration. Please
                              contact support.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                      <svg
                        className="w-8 h-8 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Not Registered Yet
                    </h3>
                    <p className="text-gray-400 max-w-md mx-auto mb-8">
                      Join us for Minare! Complete the registration process by
                      paying the fee and uploading your proof.
                    </p>
                    <RegistrationCard userId={session.userId} />
                  </div>
                )}
              </div>
            </div>

            {/* ID Card Upload Section */}
            {registration && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                    College ID Card
                  </h2>
                  {registration.idCardUrl ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border bg-green-500/10 text-green-400 border-green-500/20">
                      Uploaded
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border bg-red-500/10 text-red-400 border-red-500/20">
                      Action Required
                    </span>
                  )}
                </div>

                <div className="p-6">
                  {!registration.idCardUrl && (
                    <div className="mb-6 p-4 bg-red-500/5 border border-red-500/10 rounded-lg flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
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
                      <div>
                        <h4 className="text-red-400 font-bold text-sm">
                          Missing ID Card
                        </h4>
                        <p className="text-xs text-red-200/70 mt-1">
                          Please upload your College ID Card to complete your
                          registration profile. This is required for
                          verification.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      {registration.idCardUrl ? (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-700 bg-black/40 group">
                          <Image
                            src={registration.idCardUrl}
                            alt="ID Card"
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="h-40 bg-gray-800/50 rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-700">
                          <svg
                            className="w-8 h-8 text-gray-600 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                            />
                          </svg>
                          <span className="text-gray-500 text-sm">
                            No ID Card uploaded
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center">
                      {/* This component needs to be created or integrated. For now we will add a placeholder or modify RegistrationCard to handle just ID upload or new component */}
                      <div className="space-y-4">
                        <p className="text-sm text-gray-400">
                          Upload a clear image of your College ID Card. Allowed
                          formats: JPG, PNG.
                        </p>
                        {/* We will need a client component here to handle the upload. 
                                 For this step, I"ll use a placeholder comment and then create a new component `IdCardUpload` 
                                 or reuse `CldUploadButton` directly if this was a client component. 
                                 Since this is a server component, I need to verify if I can import a client component here. 
                                 `RegistrationCard` is likely a client component. I should create `IdCardUpload.tsx`.
                             */}
                        <IdCardUpload userId={session.userId} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Details Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-800 bg-gray-900/50">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                  Profile Details
                </h2>
              </div>
              <div className="p-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                      Full Name
                    </label>
                    <p className="text-white font-medium text-lg">
                      {user?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                      Email Address
                    </label>
                    <p className="text-white font-medium text-lg">
                      {user?.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                      Phone Number
                    </label>
                    <p className="text-white font-medium text-lg">
                      {user?.phoneNumber || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                      College / Institution
                    </label>
                    <p className="text-white font-medium text-lg">
                      {user?.collegeName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                      Branch & Year
                    </label>
                    <p className="text-white font-medium text-lg">
                      {user?.branch}, {user?.graduationYear}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                      Degree
                    </label>
                    <p className="text-white font-medium text-lg">
                      {user?.degree || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Info Sidebar */}
          <div className="space-y-8">
            {/* Payment Info Card */}
            <div className="bg-gray-900 border border-yellow-500/20 rounded-xl overflow-hidden shadow-sm relative group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg
                  className="w-32 h-32 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.15-1.46-3.27-3.4h1.96c.1 1.05 1.18 1.91 2.53 1.91 1.29 0 2.13-.59 2.13-1.66 0-.85-.42-1.43-2.05-2.13l-.68-.27C9.53 11.63 8 10.72 8 8.93c0-1.87 1.27-2.96 2.74-3.31V4h2.67v1.93c1.38.35 2.58 1.34 2.74 2.91h-2.06c-.09-.72-.63-1.43-1.89-1.43-1.22 0-2.06.59-2.06 1.48 0 .84.47 1.48 1.92 2.08l.79.33c1.92.81 3.48 1.91 3.48 3.86.01 1.94-1.25 3.03-2.78 3.39z" />
                </svg>
              </div>
              <div className="p-6 border-b border-gray-800 bg-yellow-500/5">
                <h3 className="text-lg font-bold text-yellow-400">
                  Payment Required
                </h3>
                <p className="text-xs text-yellow-200/60 mt-1 uppercase tracking-wider">
                  Transfer Details
                </p>
              </div>
              <div className="p-6 space-y-6 relative z-10">
                <div className="text-center p-4 bg-black/40 rounded-lg border border-gray-800">
                  <span className="block text-xs uppercase text-gray-500 mb-1">
                    Amount to Pay
                  </span>
                  <span className="text-3xl font-bold text-white">₹500</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-xs text-gray-500 uppercase">
                      Account Name
                    </span>
                    <span className="text-sm font-medium text-white text-right">
                      MS Ming Engg Society
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-xs text-gray-500 uppercase">
                      Account No
                    </span>
                    <span className="text-sm font-mono font-medium text-yellow-100 text-right">
                      10138951149
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-xs text-gray-500 uppercase">
                      IFSC Code
                    </span>
                    <span className="text-sm font-mono font-medium text-yellow-100 text-right">
                      SBIN0002109
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-yellow-500/10 border border-yellow-500/10 rounded text-xs text-yellow-200/80 leading-relaxed">
                  Verification will be completed within 24-48 hours of upload.
                </div>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-gray-900 border border-pink-500/20 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-800 bg-pink-500/5">
                <h3 className="text-lg font-bold text-pink-400">
                  Need Assistance?
                </h3>
                <p className="text-xs text-pink-200/60 mt-1 uppercase tracking-wider">
                  Contact Coordinators
                </p>
              </div>
              <div className="p-6 space-y-4">
                {/* Om Prakash Mallick */}
                <div className="flex items-center gap-4 p-3 rounded-lg bg-black/40 border border-gray-800 hover:border-pink-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                    <svg
                      className="w-5 h-5"
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
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      Om Prakash Mallick
                    </p>
                    <a
                      href="tel:+918260995822"
                      className="text-xs text-gray-400 hover:text-pink-400"
                    >
                      +91-82609-95822
                    </a>
                  </div>
                </div>

                {/* L M Bisal Tripathy */}
                <div className="flex items-center gap-4 p-3 rounded-lg bg-black/40 border border-gray-800 hover:border-pink-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                    <svg
                      className="w-5 h-5"
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
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      L M Bisal Tripathy
                    </p>
                    <a
                      href="tel:+919348390438"
                      className="text-xs text-gray-400 hover:text-pink-400"
                    >
                      +91-93483-90438
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-black/40 border border-gray-800 hover:border-pink-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                    <svg
                      className="w-5 h-5"
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
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      Satya Prakash Behera
                    </p>
                    <a
                      href="tel:+919938525212"
                      className="text-xs text-gray-400 hover:text-pink-400"
                    >
                      +91-99385-25212
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-black/40 border border-gray-800 hover:border-pink-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                    <svg
                      className="w-5 h-5"
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
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      Ayush Jaiswal
                    </p>
                    <a
                      href="tel:+916376752908"
                      className="text-xs text-gray-400 hover:text-pink-400"
                    >
                      +91-63767-52908
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
