import Link from "next/link";

export default function DashboardHome() {
  const sections = [
    {
      title: "Events Management",
      description: "Manage all events for the Mining Engineering Society",
      href: "/dashboard/events",
      color: "bg-blue-500",
    },
    {
      title: "Alumni Management",
      description: "Manage alumni information and profiles",
      href: "/dashboard/alumni",
      color: "bg-green-500",
    },
    {
      title: "Stakeholders Management",
      description: "Manage stakeholder information",
      href: "/dashboard/stakeholders",
      color: "bg-purple-500",
    },
    {
      title: "Minerva Management",
      description: "Manage Minerva newsletter content",
      href: "/dashboard/minerva",
      color: "bg-orange-500",
    },
    {
      title: "Gallery Management",
      description: "Manage MINARE gallery images",
      href: "/dashboard/gallery",
      color: "bg-pink-500",
    },
    {
      title: "Members Management",
      description: "Manage MINARE members",
      href: "/dashboard/members",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Manage all aspects of the Mining Engineering Society website
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div
              className={`w-12 h-12 ${section.color} rounded-lg mb-4 flex items-center justify-center`}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {section.title}
            </h3>
            <p className="text-gray-600 text-sm">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
