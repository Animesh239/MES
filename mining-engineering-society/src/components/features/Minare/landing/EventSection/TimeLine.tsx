"use client";
import { easeIn, motion, useScroll } from "framer-motion";
// import Image from "next/image";
import { RefObject, useRef } from "react";

const events = [
  { id: 1, title: "Event 1", date: "2023", description: "Description 1" },
  { id: 2, title: "Event 2", date: "2024", description: "Description 2" },
  { id: 3, title: "Event 3", date: "2025", description: "Description 3" },
  { id: 4, title: "Event 1", date: "2023", description: "Description 1" },
  { id: 5, title: "Event 2", date: "2024", description: "Description 2" },
  { id: 6, title: "Event 3", date: "2025", description: "Description 3" },
  { id: 7, title: "Event 1", date: "2023", description: "Description 1" },
  { id: 8, title: "Event 2", date: "2024", description: "Description 2" },
  { id: 9, title: "Event 3", date: "2025", description: "Description 3" }
];

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef as RefObject<HTMLElement>,
    offset: ["start start", "end end"]
  });
  //   const color = useTransform({});

  return (
    <div className="relative min-h-screen bg-black">
      <motion.div style={{ scaleX: scrollYProgress }}>
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-50"></div>
      </motion.div>

      <div className="relative mx-auto max-w-7xl p-8" ref={containerRef}>
        <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 transform bg-white/30" />

        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "tween", ease: easeIn }}
          >
            {/* <motion.div
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.2 }}
            > */}
            <div
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } mb-16 max-md:justify-start`}
            >
              <div className="relative w-full max-w-md">
                <motion.div
                  whileInView={{
                    opacity: 1,
                    backgroundColor: ["#000000", "#ffffff"]
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, type: "tween", ease: easeIn }}
                >
                  {/* <div
                    className={`absolute top-6 h-8 w-8 rounded-full border-2 border-white/50  ${
                      index % 2 === 0 ? "-right-8" : "-left-8"
                    }`}
                  /> */}
                </motion.div>

                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #000000 100%)",
                    boxShadow:
                      "0px 10px 50px rgba(0, 0, 0, 0.3), 0px 5px 15px rgba(0, 0, 0, 0.6)"
                  }}
                  className="w-[270px] xxsm:w-[310px] xsm:w-[347px] h-[416px] flex justify-center items-center text-[24px] font-spaceX leading-[37px] break-words text-center rounded-3xl"
                >
                  <h3 className="text-xl font-bold text-white">
                    {event.title}
                  </h3>
                  {/* <Image
                    src=""
                    alt="alt"
                    fill
                    style={{ objectFit: "fill", borderRadius: "16px" }}
                  /> */}
                </div>

                <p className="text-sm text-white/60">{event.date}</p>
                <p className="mt-2 text-white/80">{event.description}</p>
              </div>
            </div>
            {/* </motion.div> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
