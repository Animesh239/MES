"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { RefObject, useRef } from "react";

const events = [
  { id: 1, title: "Event 1", date: "2023", description: "Description 1" },
  { id: 2, title: "Event 2", date: "2024", description: "Description 2" },
  { id: 3, title: "Event 3", date: "2025", description: "Description 3" },
  { id: 4, title: "Event 4", date: "2026", description: "Description 4" },
  { id: 5, title: "Event 5", date: "2027", description: "Description 5" },
  { id: 6, title: "Event 6", date: "2028", description: "Description 6" }
];

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef as RefObject<HTMLElement>,
    offset: ["start start", "end end"]
  });

  //   const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(163, 163, 163, 0.3)", "rgba(255, 255, 255, 1)"]
  );

  return (
    <div className="relative min-h-screen bg-black">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-50">
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: "0% 0%" }}
        >
          <div className="h-full bg-white origin-left"></div>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl p-8" ref={containerRef}>
        {/* Central Line */}
        <motion.div
          style={{ scaleY: scrollYProgress, transformOrigin: "top center" }}
        >
          <motion.div style={{ backgroundColor: lineColor }}>
            <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 transform"></div>
          </motion.div>
        </motion.div>

        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } mb-16 max-md:justify-start`}
            >
              <div className="relative w-full max-w-md">
                {/* Animated Connector Dot */}
                <motion.div
                  initial={{
                    backgroundColor: "rgb(163, 163, 163)",
                    borderColor: "rgba(255,255,255,0.3)"
                  }}
                  whileInView={{
                    backgroundColor: "#ffffff",
                    borderColor: "#ffffff"
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.8 }}
                >
                  <div
                    className={`absolute top-6 h-4 w-4 rounded-full border-2 ${
                      index % 2 === 0 ? "-right-8" : "-left-8"
                    }`}
                  />
                </motion.div>
                <motion.div
                  whileInView={{
                    borderColor: "rgba(255,255,255,0.5)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
                    <h3 className="text-xl font-bold text-white">
                      {event.title}
                    </h3>
                    <p className="text-sm text-white/60">{event.date}</p>
                    <p className="mt-2 text-white/80">{event.description}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
