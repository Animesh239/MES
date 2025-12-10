"use client";

import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";

export default function MemberCard({
  name,
  position,
  imgURL,
  graduationYear,
  workDetails,
  linkedInProfile,
}: MemberCardProps) {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[300px] h-[380px] sm:h-[420px] group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300" />
      <Card
        className="relative py-4 px-3 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-transparent rounded-2xl h-full flex flex-col overflow-hidden transform transition-all duration-300  group-hover:shadow-2xl"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(17, 24, 39, 0.95), rgba(0, 0, 0, 0.98), rgba(17, 24, 39, 0.95))",
        }}
      >
        <CardBody className="py-2 flex flex-col h-full justify-between relative z-10">
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <Image
                alt={`${name}'s photo`}
                className="object-cover rounded-full opacity-100 border-3 border-white/10 relative z-10"
                src={imgURL}
                width={180}
                height={180}
                classNames={{
                  wrapper: "w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]",
                }}
              />
            </div>
          </div>
          <div className="mt-4 text-center space-y-2">
            <h3 className="text-xl sm:text-2xl uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 break-words line-clamp-2 px-2 group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300">
              {name}
            </h3>
            {graduationYear && workDetails ? (
              <div className="space-y-1">
                <p className="font-semibold text-sm sm:text-base text-blue-300 group-hover:text-blue-200 px-2 transition-colors duration-300">
                  Class of {graduationYear}
                </p>
                <p className="font-medium text-xs sm:text-sm text-gray-300 group-hover:text-gray-200 line-clamp-2 px-2 transition-colors duration-300">
                  {workDetails}
                </p>
                {linkedInProfile && (
                  <div className="pt-2 flex justify-center">
                    <Link
                      href={linkedInProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 rounded-lg text-blue-300 hover:text-blue-200 text-xs font-medium transition-all duration-300 hover:scale-105"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <p className="font-semibold text-sm sm:text-base text-gray-300 group-hover:text-gray-200 mt-2 line-clamp-2 px-2 transition-colors duration-300">
                {position}
              </p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

interface MemberCardProps {
  name: string;
  position?: string;
  imgURL: string;
  graduationYear?: string;
  workDetails?: string;
  linkedInProfile?: string | null;
}

