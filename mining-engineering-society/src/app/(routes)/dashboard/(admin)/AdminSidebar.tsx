"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function NavItem({
  href,
  icon,
  label,
  isCollapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`group flex items-center ${
          isCollapsed ? "justify-center px-0" : "px-4"
        } py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 border border-transparent hover:border-white/20`}
        title={isCollapsed ? label : undefined}
      >
        <span className={`${isCollapsed ? "w-6 h-6 flex items-center justify-center" : "mr-3 w-5 h-5 flex items-center justify-center"}`}>
          {icon}
        </span>
        {!isCollapsed && <span>{label}</span>}
      </Link>
    </li>
  );
}

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mesManagement = [
    {
      href: "/dashboard/events",
      label: "Events",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      href: "/dashboard/alumni",
      label: "Alumni",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
    {
      href: "/dashboard/stakeholders",
      label: "Stakeholders",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      href: "/dashboard/members/past-stakeholders",
      label: "Past Stakeholders",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      href: "/dashboard/members/class-representatives",
      label: "Class Reps",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
    },
    {
      href: "/dashboard/achievements",
      label: "Students Corner",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      href: "/dashboard/minerva",
      label: "Minerva",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      href: "/dashboard/poems",
      label: "Poems",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      href: "/dashboard/articles",
      label: "Articles",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  const minareManagement = [
    {
      href: "/dashboard/minare-registrations",
      label: "Registrations",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      href: "/dashboard/minare-events",
      label: "Events",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      href: "/dashboard/gallery",
      label: "Gallery",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      href: "/dashboard/members",
      label: "Members",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-black/60 backdrop-blur-md border-r border-gray-800 min-h-screen transition-all duration-300 flex flex-col z-20 sticky top-0 md:top-16 md:min-h-[calc(100vh-4rem)]`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800 h-[60px]">
        {!isCollapsed && (
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 ${isCollapsed ? 'mx-auto' : ''}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="21" y1="12" x2="9" y2="12" />
              <polyline points="15 18 21 12 15 6" />
              <line x1="3" y1="6" x2="3" y2="18" />
            </svg>
          ) : (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="18"
               height="18"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="15" y2="12" />
              <polyline points="9 18 3 12 9 6" />
              <line x1="21" y1="6" x2="21" y2="18" />
            </svg>
          )}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 no-scrollbar">
        <div>
          {!isCollapsed && (
            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-3">
              MES Management
            </h2>
          )}
          <ul className="space-y-1">
            {mesManagement.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </div>
        <div>
          {!isCollapsed && (
            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-3">
              MINARE Management
            </h2>
          )}
          <ul className="space-y-1">
            {minareManagement.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
