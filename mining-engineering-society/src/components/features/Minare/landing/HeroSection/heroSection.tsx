// components/HeroSection.tsx
"use client";

import { Button } from "@/components/ui/button";
// import { UserFormInterface } from "@/config/Minare/Registration/type";
// import { Button } from "@/components/ui/button";
import { easeIn, motion } from "framer-motion";
// import Link from "next/link";
import { useRouter } from "next/navigation";
// import { Profile } from "./profile";
// import { useEffect } from "react";

const subtitle = "The Annual Geo-technical Fest of NIT Rourkela";

export const Hero = () => {
  const router = useRouter();
  const handleRegister = () => {
    router.push("minare/registration");
  };

  return (
    <motion.div>
      <section className="mt-64 md:mt-4 md:h-screen h-auto w-full overflow-hidden">
        <div className="flex select-none flex-col items-center justify-center h-full text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: easeIn }
              }
            }}
          >
            <div className="overflow-y-hidden"></div>
            <h1 className="text-6xl sm:text-7xl font-playfair_dispaly md:text-9xl font-bold mb-6 text-white">
              MINARE&apos;25
            </h1>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.5
                }
              }
            }}
          >
            <div className="text-xl sm-text-2xl md:text-3xl font-light tracking-widest text-gray-400 max-w-2xl mx-auto mb-8">
              {/* {subtitle.map((word, i) => ( */}
              <motion.span
                // key={i}
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.5, ease: easeIn }
                  }
                }}
              >
                <div className="inline-block mr-3 leading-relaxed ">
                  <span className="bg-gradient-to-r text-[18px] font-lato font-[400] sm:text-[24px] md:text-[28px] from-gray-300 to-white bg-clip-text text-transparent">
                    {subtitle}
                  </span>
                </div>
              </motion.span>
            </div>
          </motion.div>

          <Button
            variant="default"
            onClick={() => handleRegister()}
            className="font-semibold z-0 cursor-pointer"
          >
            Register
          </Button>
        </div>
      </section>
    </motion.div>
  );
};
