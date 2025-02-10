"use client";
// import { useEffect } from "react";

import { AboutUsData } from "@/config/Minare/landingpagedata";
import { motion } from "framer-motion";
import { Header } from "../header";

export const About = () => {
  return (
    <div className="relative h-auto">
      <div className=" w-full  text-white">
        <section className=" border-none max-w-6xl mx-auto">
          <div className=" ">
            {AboutUsData.map((section) => {
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 150 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    type: "tween",
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2
                  }}
                >
                  <div className={section.boxClasses}>
                    <div className=" mb-16">
                      {/* <HeaderIcon
                        className={`w-20 h-20 mx-auto mb-6 ${section.header.iconClass} group-hover:scale-110 transition-transform duration-700`}
                      /> */}
                      <Header label={section.header.title} />
                    </div>

                    <p className="text-gray-100 text-center font-roboto leading-[40px] text-lg md:text-[27px] tracking-wider font-[300]">
                      {section.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
