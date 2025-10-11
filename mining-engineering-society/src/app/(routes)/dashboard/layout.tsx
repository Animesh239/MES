import Link from "next/link";
import { getSession } from "@/lib/session";
import { logoutAction } from "@/actions/auth/action";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                MES Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {session?.username}
              </span>
              <form action={logoutAction}>
                <Button type="submit" variant="outline" size="sm">
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                MES Management
              </h2>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/dashboard/events"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/alumni"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Alumni
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/stakeholders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Stakeholders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/minerva"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Minerva
                  </Link>
                </li>
              </ul>
            </div>

            <div className="px-4 mt-8">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                MINARE Management
              </h2>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/dashboard/gallery"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/members"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Members
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
