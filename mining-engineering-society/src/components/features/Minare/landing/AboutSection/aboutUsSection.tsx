"use client";
import { useEffect } from "react";

import { AboutUsData } from "@/config/Minare/landingpagedata";
import { motion } from "framer-motion";

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
    <div className="relative min-h-screen h-auto">
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {AboutUsData.map((section) => {
              const HeaderIcon = section.header.Icon;
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
                    <div className="text-center mb-10">
                      <HeaderIcon
                        className={`w-20 h-20 mx-auto mb-6 ${section.header.iconClass} group-hover:scale-110 transition-transform duration-700`}
                      />
                      <h2
                        className={`font-orbitron text-3xl md:text-4xl font-bold bg-clip-text text-transparent ${section.header.titleGradient} drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]`}
                      >
                        {section.header.title}
                      </h2>
                    </div>

                    <p className="text-gray-100 font-raleway leading-relaxed text-lg md:text-xl tracking-wide font-light">
                      {section.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                      {section.items.map((item, index) => {
                        const ItemIcon = item.icon;
                        return (
                          <div
                            key={index}
                            className="group/card p-6 bg-gray-800/50 rounded-2xl hover:bg-gray-800/70 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                          >
                            <ItemIcon
                              className={`w-10 h-10 mb-4 ${item.iconColor} ${item.iconDropShadow} group-hover/card:scale-110 transition-transform duration-500`}
                            />
                            <h3 className="orbitron font-semibold text-lg text-white mb-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-200 font-light">
                              {item.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
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
