import { logoutAction } from "@/actions/auth/action";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication check
  const session = await getSession();

  if (!session || session.expires < new Date()) {
    redirect("/login");
  }

  // Redirect if role is NOT user (Strict separation)
  if (session.role !== "user") {
    redirect("/dashboard"); // Redirect admins back to their dashboard
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Star Background */}
      <div className="star-container fixed inset-0 pointer-events-none"></div>

      {/* Navigation Header */}
      <nav className="relative z-10 backdrop-blur-md bg-black/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                MES User Dashboard
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

      {/* Main Content - No Sidebar */}
      <main className="relative z-10 flex-1 p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
