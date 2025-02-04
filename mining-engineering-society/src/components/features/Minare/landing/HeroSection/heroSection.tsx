// components/HeroSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { easeIn, motion } from "framer-motion";
// import { useEffect } from "react";

// const title = "MINARE'25".split("");
const subtitle = "The Annual Geo-technical Fest of NIT Rourkela";

export const Hero = () => {
  return (
    <motion.div>
      <section className="mt-60 md:mt-0 md:h-screen h-auto w-full bg-black overflow-hidden">
        <div className="  flex flex-col items-center justify-center h-full text-center">
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
            <h1 className="text-7xl font-Bebas md:text-9xl font-bold mb-6 text-white">
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
                <div className="inline-block mr-3 leading-relaxed font-orbitron">
                  <span className="bg-gradient-to-r text-[18px] sm:text-[24px] md:text-[28px] from-gray-300 to-white bg-clip-text text-transparent">
                    {subtitle}
                  </span>
                </div>
              </motion.span>
              {/* ))} */}
            </div>
          </motion.div>{" "}
          <Button variant="default" className="font-semibold cursor-pointer">
            Register
          </Button>
        </div>
      </section>
    </motion.div>
  );
};
