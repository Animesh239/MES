"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MemberCard from "@/components/MinareComponents/ui/Members/MembersCard";
import MembersCarousel from "@/components/MinareComponents/ui/Members/MembersCarousel";

interface Member {
  id: number;
  name: string;
  role: string;
  photoUrl: string;
  linkedInProfile?: string | null;
}

interface MembersPageProps {
  members: Member[];
}

export default function MembersPage({ members }: MembersPageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative text-white p-4 md:p-8 mt-24 mb-12">
      <div className="star-container"></div>
      <div className=" text-center text-4xl xxsm:text-6xl font-semibold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent sm:mb-12">
        Meet our team
      </div>
      {members.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-purple-400">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              No team members found
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Team members will be displayed here once they are added.
            </p>
          </div>
        </div>
      ) : isMobile ? (
        <MembersCarousel members={members} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-16 gap-x-6 justify-center items-center">
          {members.map((member) => (
            <motion.div
              key={member.id}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: member.id * 0.1 }}
            >
              <MemberCard
                name={member.name}
                designation={member.role}
                image={member.photoUrl}
                linkedInProfile={member.linkedInProfile}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
