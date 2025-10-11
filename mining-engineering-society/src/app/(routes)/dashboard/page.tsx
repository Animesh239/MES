import Link from "next/link";

export default function DashboardHome() {
  const sections = [
    {
      title: "Events Management",
      description: "Manage all events for the Mining Engineering Society",
      href: "/dashboard/events",
      color: "from-blue-500 to-blue-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "Alumni Management",
      description: "Manage alumni information and profiles",
      href: "/dashboard/alumni",
      color: "from-green-500 to-green-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
    {
      title: "Stakeholders Management",
      description: "Manage stakeholder information",
      href: "/dashboard/stakeholders",
      color: "from-purple-500 to-purple-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Minerva Management",
      description: "Manage Minerva newsletter content",
      href: "/dashboard/minerva",
      color: "from-orange-500 to-orange-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "Gallery Management",
      description: "Manage MINARE gallery images",
      href: "/dashboard/gallery",
      color: "from-pink-500 to-pink-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "Members Management",
      description: "Manage MINARE members",
      href: "/dashboard/members",
      color: "from-indigo-500 to-indigo-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Manage all aspects of the Mining Engineering Society website from this
          central hub
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="group block">
            <div className="relative overflow-hidden bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:bg-black/60">
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${section.color} text-white mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                {section.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white">
                {section.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">
                {section.description}
              </p>

              {/* Arrow icon */}
              <div className="mt-4 inline-flex items-center text-gray-400 group-hover:text-white transition-colors duration-200">
                <span className="text-sm font-medium mr-2">Manage</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">6</div>
          <div className="text-sm text-gray-400">Management Modules</div>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">Active</div>
          <div className="text-sm text-gray-400">System Status</div>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">MES</div>
          <div className="text-sm text-gray-400">Organization</div>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">2025</div>
          <div className="text-sm text-gray-400">Current Year</div>
        </div>
      </div>
    </div>
  );
}
