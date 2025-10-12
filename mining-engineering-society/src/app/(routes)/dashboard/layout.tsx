import Link from "next/link";
import { logoutAction } from "@/actions/auth/action";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import DashboardClientLayout from "./DashboardClientLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication check
  const session = await getSession();

  if (!session || session.expires < new Date()) {
    redirect("/login");
  }

  return (
    <DashboardClientLayout>
      <div className="min-h-screen bg-black mt-20">
        {/* Star Background */}
        <div className="star-container fixed inset-0 pointer-events-none"></div>

        {/* Navigation Header */}
        <nav className="relative z-10 backdrop-blur-md bg-black/80 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  MES Admin Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">
                  Welcome, {session.username}
                </span>
                <form action={logoutAction}>
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white border-0"
                    size="sm"
                  >
                    Logout
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex relative z-10">
          {/* Sidebar */}
          <aside className="w-64 bg-black/60 backdrop-blur-md border-r border-gray-800 min-h-screen">
            <nav className="mt-8">
              <div className="px-6">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  MES Management
                </h2>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/dashboard/events"
                      className="group flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 border border-transparent hover:border-white/20"
                    >
                      <svg
                        className="mr-3 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/alumni"
                      className="group flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 border border-transparent hover:border-white/20"
                    >
                      <svg
                        className="mr-3 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      Alumni
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/stakeholders"
                      className="group flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 border border-transparent hover:border-white/20"
                    >
                      <svg
                        className="mr-3 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Stakeholders
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/minerva"
                      className="group flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 border border-transparent hover:border-white/20"
                    >
                      <svg
                        className="mr-3 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Minerva
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/poems"
                      className="group flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 border border-transparent hover:border-white/20"
                    >
                      <svg
                        className="mr-3 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Poems
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/articles"
                      className="group flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 border border-transparent hover:border-white/20"
                    >
                      <svg
                        className="mr-3 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Articles
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="px-6 mt-8">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  MINARE Management
                </h2>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/dashboard/gallery"
                      className="group flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 border border-transparent hover:border-white/20"
                    >
                      <svg
                        className="mr-3 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/members"
                      className="group flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 border border-transparent hover:border-white/20"
                    >
                      <svg
                        className="mr-3 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      Members
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </DashboardClientLayout>
  );
}
