// components/HeroSection.tsx
"use client";

import { easeIn, motion } from "framer-motion";
import { useEffect } from "react";

const title = "MINARE'25".split("");
const subtitle = "Where Engineering Meets the Earth's Core";

export const Hero = () => {
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
    <motion.div>
      <section className="relative h-screen w-full bg-black overflow-hidden">
        <div className="star-container absolute inset-0 z-0" />

        <div
          className="absolute inset-0 z-0 bg-[size:50px_50px] opacity-10 [mask-image:linear-gradient(transparent_70%,_black)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)"
          }}
        />

        <div className="relative z-10 overflow-hidden flex flex-col items-center justify-center h-full text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,

                transition: {
                  delayChildren: 0.3,
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <h1 className="text-7xl font-Bebas md:text-9xl font-bold mb-6 neon-glow">
              {title.map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 90 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 50 }
                    }
                  }}
                >
                  <div className="inline-block">
                    {char === " " ? "\u00A0" : char}
                  </div>
                </motion.span>
              ))}
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
            <div className="text-xl sm-text-2xl md:text-3xl font-light tracking-widest text-gray-300 max-w-2xl mx-auto mb-8">
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
                  <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
                    {subtitle}
                  </span>
                </div>
              </motion.span>
              {/* ))} */}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};
