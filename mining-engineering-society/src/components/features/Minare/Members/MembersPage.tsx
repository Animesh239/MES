"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MemberCard from "@/components/MinareComponents/ui/Members/MembersCard";
import MembersCarousel from "@/components/MinareComponents/ui/Members/MembersCarousel";
import { members } from "@/config/Minare/Members/Data";

export default function MembersPage() {
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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative text-white p-4 md:p-8 mt-24 mb-12">
      <div className="star-container"></div>
      <div className=" text-center text-4xl xxsm:text-6xl font-semibold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent sm:mb-12">
        Meet our team
      </div>
      {isMobile ? (
        <MembersCarousel members={members} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-16 justify-center items-center">
          {members.map((member) => (
            <motion.div
              key={member.id}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: member.id * 0.1 }}
            >
              <MemberCard {...member} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
