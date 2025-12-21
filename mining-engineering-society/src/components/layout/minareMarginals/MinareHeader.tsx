"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const NavItem = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-semibold"
    onClick={onClick}
  >
    {children}
  </Link>
);

const NavDropdown = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-semibold flex items-center gap-1 focus:outline-none">
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-black border border-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function MinareNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-black fixed w-full z-10 border-b border-gray-700 top-0 bg-opacity-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center justify-between flex-1">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="https://res.cloudinary.com/dhv234qct/image/upload/v1733770163/mes/fi0wou0kizqqbuysezfm.svg"
                alt="Logo 1"
                width={55}
                height={55}
                className="hover:scale-105 transition-transform duration-300"
              />
              <span className="ml-3 sm:ml-5 font-bold relative">
                <span
                  className="relative z-10 text-3xl sm:text-4xl"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "2px white",
                    textShadow: "2px 2px 0 rgba(0,0,0,0.3)",
                    letterSpacing: "0.05em",
                  }}
                >
                  MINARE
                </span>
              </span>
            </div>

            <div className="hidden md:block flex-1">
              <div className="flex items-baseline justify-center space-x-6 xl:space-x-10">
                {" "}
                {/* Increased spacing */}
                <NavItem href="/minare">Home</NavItem>
                <NavItem href="/minare/team">Members</NavItem>
                <NavDropdown 
                  title="Events" 
                  items={[
                    { label: "Upcoming", href: "/minare/events/upcoming" },
                    { label: "Past", href: "/minare/events/past" }
                  ]} 
                />
                <NavItem href="/minare/gallery">Gallery</NavItem>
                <NavItem href="/minare/sponsors">Sponsors</NavItem>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <Link href="/">
              <button className="px-6 py-2 text-white text-xl font-bold rounded-2xl bg-black border border-white shadow-[0_0_5px_#fff,inset_0_0_2px_#fff,0_0_2px_#08f] transition-all duration-300 hover:scale-105">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-xl">
                  Back to MES
                </span>
              </button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden h-screen flex items-center justify-center -mt-12">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 items-center flex flex-col">
            <NavItem href="/minare" onClick={closeNavbar}>
              Home
            </NavItem>
            <NavItem href="/minare/team" onClick={closeNavbar}>
              Members
            </NavItem>
            <div className="flex flex-col items-center w-full">
              <span className="text-white px-3 py-2 text-lg font-semibold">Events</span>
              <NavItem href="/minare/events/upcoming" onClick={closeNavbar}>
                <span className="text-base text-gray-300">Upcoming</span>
              </NavItem>
              <NavItem href="/minare/events/past" onClick={closeNavbar}>
                <span className="text-base text-gray-300">Past</span>
              </NavItem>
            </div>
            <NavItem href="/minare/gallery" onClick={closeNavbar}>
              Gallery
            </NavItem>
            <NavItem href="/minare/sponsors" onClick={closeNavbar}>
              Sponsors
            </NavItem>
            <div className="md:block">
              <Link href="/">
                <button className="px-6 py-3 mt-2 text-white text-xl font-bold rounded-2xl bg-black border border-white shadow-[0_0_5px_#fff,inset_0_0_2px_#fff,0_0_2px_#08f] transition-all duration-300 hover:scale-105">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-xl">
                    MES
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
