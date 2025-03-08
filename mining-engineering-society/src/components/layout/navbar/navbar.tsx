"use client";

import { useState, useEffect, useRef } from "react";
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

const NavItem2 = ({
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
    className="px-3 py-2 rounded-md text-lg font-semibold hover:scale-105 transition-all"
    onClick={onClick}
  >
    {children}
  </Link>
);

const DropdownItem = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Link
    href={href}
    className="block px-4 py-2 text-lg hover:text-white text-gray-400 font-semibold"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const membersDropdownRef = useRef<HTMLDivElement>(null);
  const eventsDropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = (dropdownType: string) => {
    setOpenDropdown(openDropdown === dropdownType ? null : dropdownType);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const closeNavbar = () => {
    setIsOpen(false);
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        membersDropdownRef.current &&
        !membersDropdownRef.current.contains(event.target as Node) &&
        eventsDropdownRef.current &&
        !eventsDropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black fixed w-full border-b border-gray-700 top-0 bg-opacity-100 z-20">
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
                  MES
                </span>
              </span>
            </div>

            <div className="hidden md:block flex-1">
              <div className="flex items-baseline justify-center space-x-4 xl:space-x-7">
                <NavItem href="/">Home</NavItem>
                {/* <NavItem href="/aboutus">About Us</NavItem> */}

                <div className="relative" ref={membersDropdownRef}>
                  <button
                    onClick={() => handleDropdownToggle("members")}
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-semibold inline-flex items-center"
                  >
                    Members
                    <ChevronDown className="ml-1 h-5 w-5" />
                  </button>
                  {openDropdown === "members" && (
                    <div className="origin-top-right absolute right-0 mt-4 w-48 rounded-md shadow-lg py-1 bg-gray-700 text-white ring-1 ring-black ring-opacity-5 backdrop-blur-lg bg-opacity-90">
                      <DropdownItem
                        href="/members/stakeholders"
                        onClick={closeDropdown}
                      >
                        Stake Holders
                      </DropdownItem>
                      <DropdownItem
                        href="/members/alumni"
                        onClick={closeDropdown}
                      >
                        Alumni
                      </DropdownItem>
                    </div>
                  )}
                </div>

                <div className="relative" ref={eventsDropdownRef}>
                  <button
                    onClick={() => handleDropdownToggle("events")}
                    className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-lg font-semibold inline-flex items-center"
                  >
                    Events
                    <ChevronDown className="ml-1 h-5 w-5" />
                  </button>
                  {openDropdown === "events" && (
                    <div className="origin-top-right absolute right-0 mt-4 w-48 rounded-md shadow-lg py-1 bg-gray-700 text-white ring-1 ring-black ring-opacity-5 backdrop-blur-lg bg-opacity-90">
                      <DropdownItem
                        href="/events/upcoming"
                        onClick={closeDropdown}
                      >
                        Upcoming
                      </DropdownItem>
                      {/* <DropdownItem href="/events/past" onClick={closeDropdown}>
                        Past Events
                      </DropdownItem> */}
                      <DropdownItem
                        href="/events/eventgallery"
                        onClick={closeDropdown}
                      >
                        Event Gallery
                      </DropdownItem>
                    </div>
                  )}
                </div>

                <NavItem href="/contactus">Contact</NavItem>

                <NavItem2 href="/minerva">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-xl p-2 transition-all duration-300 hover:shadow-[0_0_5px_3px_#fff] hover:rounded-lg">
                    Minerva
                  </span>
                </NavItem2>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <a href="/minare">
              <button className="px-6 py-2 text-white text-xl font-bold rounded-2xl bg-black border border-white shadow-[0_0_5px_#fff,inset_0_0_2px_#fff,0_0_2px_#08f] transition-all duration-300 hover:scale-105">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-xl">
                  MINARE
                </span>
              </button>
            </a>
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
        <div className="md:hidden h-screen flex items-start justify-center mt-20">
          <div className="px-2 pt-2 pb-3 space-y-4 sm:px-3 items-center flex flex-col">
            <NavItem href="/" onClick={closeNavbar}>
              Home
            </NavItem>
            {/* <NavItem href="/aboutus" onClick={closeNavbar}>
              About
            </NavItem> */}
            <NavItem href="/members/stakeholders" onClick={closeNavbar}>
              Stakeholders
            </NavItem>
            <NavItem href="/members/alumni" onClick={closeNavbar}>
              Alumni
            </NavItem>
            <NavItem href="/events/past" onClick={closeNavbar}>
              Past Events
            </NavItem>
            <NavItem href="/events/eventgallery" onClick={closeNavbar}>
              Event Gallery
            </NavItem>
            <NavItem href="/contactus" onClick={closeNavbar}>
              Contact Us
            </NavItem>
            <NavItem2 href="/minerva" onClick={closeNavbar}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-2xl transition-all duration-300 hover:shadow-[0_0_5px_3px_#fff] hover:rounded-lg">
                Minerva
              </span>
            </NavItem2>
            <div className="md:block">
              <Link href="/minare">
                <button className="px-6 py-3 mt-2 text-white text-xl font-bold rounded-2xl bg-black border border-white shadow-[0_0_5px_#fff,inset_0_0_2px_#fff,0_0_2px_#08f] transition-all duration-300 hover:scale-105">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-xl">
                    MINARE
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
