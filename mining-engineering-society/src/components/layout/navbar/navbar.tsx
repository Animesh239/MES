"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-semibold"
  >
    {children}
  </Link>
);

const DropdownItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="block px-4 py-2 text-lg text-gray-500 hover:bg-gray-100"
  >
    {children}
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);

  const handleDropdownToggle = (dropdownType: string) => {
    if (dropdownType === "members") {
      setIsDropdownOpen(!isDropdownOpen);
      setIsEventsDropdownOpen(false);
    } else if (dropdownType === "events") {
      setIsEventsDropdownOpen(!isEventsDropdownOpen);
      setIsDropdownOpen(false);
    }
  };

  return (
    <nav
      className={`bg-black fixed w-full z-10 border-b border-gray-700 top-0 bg-opacity-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between flex-1">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="https://res.cloudinary.com/dhv234qct/image/upload/v1733770163/mes/fi0wou0kizqqbuysezfm.svg"
                alt="Logo 1"
                width={50}
                height={50}
              />
              <span className="ml-3 sm:ml-5 font-semibold relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-2xl">
                  MES
                </span>
              </span>
            </div>
            <div className="hidden md:block flex-1">
              <div className="flex items-baseline justify-center space-x-4 xl:space-x-7">
                <NavItem href="/">Home</NavItem>
                <NavItem href="/aboutus">About Us</NavItem>
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle("members")}
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-semibold inline-flex items-center"
                  >
                    Members
                    <ChevronDown className="ml-1 h-5 w-5" />
                  </button>
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <DropdownItem href="/members/stakeholders">
                        Stake Holders
                      </DropdownItem>
                      <DropdownItem href="/members/alumni">Alumni</DropdownItem>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle("events")}
                    className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-lg font-semibold inline-flex items-center"
                  >
                    Events
                    <ChevronDown className="ml-1 h-5 w-5" />
                  </button>
                  {isEventsDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <DropdownItem href="/events/upcoming">
                        Upcoming
                      </DropdownItem>
                      <DropdownItem href="/events/past">
                        Past Events
                      </DropdownItem>
                    </div>
                  )}
                </div>
                <NavItem href="/publications">Publications</NavItem>
                <NavItem href="/contactus">Contact</NavItem>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <button className="px-6 py-2 text-white text-xl font-bold rounded-full bg-black border border-white shadow-[0_0_5px_#fff,inset_0_0_2px_#fff,0_0_10px_#08f] hover:shadow-[0_0_5px_#fff,inset_0_0_2px_#fff,0_0_10px_#0ff] transition-all duration-300 ">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-xl">
                MINARE
              </span>
            </button>
          </div>
          <div className="md:hidden flex items-center space-x-4">
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

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 items-center flex flex-col">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/aboutus">About</NavItem>
            <button
              onClick={() => handleDropdownToggle("members")}
              className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-lg font-semibold w-full text-center"
            >
              Members
              <ChevronDown className="ml-1 h-4 w-4 inline" />
            </button>
            {isDropdownOpen && (
              <div className="pl-4">
                <DropdownItem href="/members/stakeholders">
                  Stake Holders
                </DropdownItem>
                <DropdownItem href="/members/alumni">Alumni</DropdownItem>
              </div>
            )}
            <button
              onClick={() => handleDropdownToggle("events")}
              className="text-white hover:bg-gray-700  block px-3 py-2 rounded-md text-lg font-semibold w-full text-center"
            >
              Events
              <ChevronDown className="ml-1 h-4 w-4 inline" />
            </button>
            {isEventsDropdownOpen && (
              <div className="pl-4">
                <DropdownItem href="/events/upcoming">
                  Upcoming Events
                </DropdownItem>
                <DropdownItem href="/events/past">Past Events</DropdownItem>
              </div>
            )}
            <NavItem href="/contact">Contact</NavItem>
          </div>
        </div>
      )}
    </nav>
  );
}
