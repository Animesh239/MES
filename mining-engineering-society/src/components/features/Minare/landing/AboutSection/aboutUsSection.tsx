"use client";
import { useEffect } from "react";

import { AboutUsData } from "@/config/Minare/landingpagedata";
import { motion } from "framer-motion";
import { Header } from "../header";

export const About = () => {
  useEffect(() => {
    const createStars = () => {
      const container = document.querySelector(".star-container");
      if (!container) return;

      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "absolute bg-white rounded-full animate-twinkle";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(star);
      }
    };

    createStars();
  }, []);

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

                    <p className="text-gray-100 text-center md:text-justify font-raleway leading-relaxed text-lg md:text-2xl tracking-wide font-light">
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
