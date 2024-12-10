"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-semibold"
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
    className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
  >
    {children}
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAnotherDropdownOpen, setIsAnotherDropdownOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleDropdownClick = (
    dropdownSetter: React.Dispatch<React.SetStateAction<boolean>>,
    otherDropdownSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    dropdownSetter((prev) => !prev);
    otherDropdownSetter(false);
  };

  return (
    <nav
      className={`bg-black fixed w-full z-10 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } border-b border-gray-700`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="https://res.cloudinary.com/dhv234qct/image/upload/v1733770163/mes/fi0wou0kizqqbuysezfm.svg"
                alt="Logo 1"
                width={50}
                height={50}
              />
              <span className="ml-3 sm:ml-5 text-white text-base sm:text-2xl font-semibold">
                MES NITRKL
              </span>
            </div>
            <div className="hidden md:block ml-10 flex-1">
              <div className="flex items-baseline space-x-4">
                <NavItem href="/">Home</NavItem>
                <NavItem href="/about">About</NavItem>
                <div className="relative">
                  <button
                    onClick={() =>
                      handleDropdownClick(
                        setIsDropdownOpen,
                        setIsAnotherDropdownOpen
                      )
                    }
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-semibold inline-flex items-center"
                  >
                    Members
                    <ChevronDown className="ml-1 h-5 w-5" />
                  </button>
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <DropdownItem href="/members/stakeholders">
                        Stake Holders
                      </DropdownItem>
                      <DropdownItem href="/members/alumni">
                        Alumnis
                      </DropdownItem>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() =>
                      handleDropdownClick(
                        setIsAnotherDropdownOpen,
                        setIsDropdownOpen
                      )
                    }
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-semibold inline-flex items-center"
                  >
                    Events
                    <ChevronDown className="ml-1 h-5 w-5" />
                  </button>
                  {isAnotherDropdownOpen && (
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
                <NavItem href="/contact">Contact</NavItem>
              </div>
            </div>
          </div>
          {!isOpen && (
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Facebook size={20} />
              </a>
              <Image
                src="https://res.cloudinary.com/dhv234qct/image/upload/v1733771631/mes/xac8wdivrcpuag1qt6gu.svg"
                alt="Logo 2"
                width={50}
                height={50}
              />
            </div>
          )}
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/about">About</NavItem>
            <button
              onClick={() =>
                handleDropdownClick(setIsDropdownOpen, setIsAnotherDropdownOpen)
              }
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-semibold w-full text-left"
            >
              Members
              <ChevronDown className="ml-1 h-4 w-4 inline" />
            </button>
            {isDropdownOpen && (
              <div className="pl-4">
                <DropdownItem href="/members/stakeholders">
                  Stake Holders
                </DropdownItem>
                <DropdownItem href="/members/alumni">Alumnis</DropdownItem>
              </div>
            )}
            <button
              onClick={() =>
                handleDropdownClick(setIsAnotherDropdownOpen, setIsDropdownOpen)
              }
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-semibold w-full text-left"
            >
              Events
              <ChevronDown className="ml-1 h-4 w-4 inline" />
            </button>
            {isAnotherDropdownOpen && (
              <div className="pl-4">
                <DropdownItem href="/events/upcoming">Upcoming</DropdownItem>
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
