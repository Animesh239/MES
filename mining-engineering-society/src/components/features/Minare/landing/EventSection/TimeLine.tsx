import { Button } from "@/components/ui/button";
import { easeIn, motion, useScroll } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";

const events = [
  { id: 1, title: "Event 1", date: "2023", description: "Description 1" },
  { id: 2, title: "Event 2", date: "2024", description: "Description 2" },
  { id: 3, title: "Event 3", date: "2025", description: "Description 3" },
  { id: 4, title: "Event 4", date: "2026", description: "Description 4" },
  { id: 5, title: "Event 5", date: "2027", description: "Description 5" },
  { id: 6, title: "Event 6", date: "2028", description: "Description 6" },
  { id: 7, title: "Event 7", date: "2029", description: "Description 7" },
  { id: 8, title: "Event 8", date: "2030", description: "Description 8" },
  { id: 9, title: "Event 9", date: "2031", description: "Description 9" }
];

const Timeline = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => setIsMobile(window.innerWidth < 900);
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef as RefObject<HTMLElement>,
    offset: ["start start", "end end"]
  });
  function xOrientation(index: number) {
    if (isMobile) {
      return 100;
    } else {
      if (index % 2 === 0) {
        return -100;
      } else return 100;
    }
  }

  return (
    <div className="relative min-h-screen overflow-y-hidden ">
      <motion.div style={{ scaleX: scrollYProgress }}>
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-50"></div>
      </motion.div>

      <div className="relative mx-auto max-w-7xl p-4 sm:p-8" ref={containerRef}>
        <div className="absolute lg:left-1/2 left-8 h-full w-0.5 lg:-translate-x-1/2 transform bg-white/30" />

        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{
              opacity: 0,
              x: xOrientation(index)
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "tween", ease: easeIn }}
          >
            <div
              className={`flex ${
                !isMobile
                  ? index % 2 === 0
                    ? "lg:justify-start lg:pr-8"
                    : "lg:justify-end lg:pl-8"
                  : "justify-start pl-16"
              } mb-16 relative`}
            >
              <motion.div
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: easeIn }}
              >
                <div
                  className={`absolute lg:left-1/2 left-8 -translate-x-1/2 top-6 h-6 w-6 
                    rounded-full border-2 border-white/50 bg-black/80
                    flex items-center justify-center `}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <div className="h-3 w-3 rounded-full bg-white/80"></div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="relative w-full max-w-md">
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #000000 100%)",
                    boxShadow:
                      "0px 10px 50px rgba(0, 0, 0, 0.3), 0px 5px 15px rgba(0, 0, 0, 0.6)"
                  }}
                  className="w-full min-h-[300px] sm:min-h-[350px] lg:min-h-[416px] 
                    flex flex-col justify-center items-center p-6 
                    text-[20px] sm:text-[24px] font-bold leading-relaxed 
                    break-words text-center rounded-3xl"
                >
                  <h3 className="text-xl font-bold text-white mb-4">
                    {event.title}
                  </h3>
                  <p className="text-base font-normal text-white/60 mb-2">
                    {event.date}
                  </p>
                  <p className="text-sm font-normal text-white/80">
                    {event.description}
                  </p>
                  <Button className="w-full mt-7 h-10 sm:h-12 bg-white font-normal font-roboto text-[#211330] hover:bg-white/90 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base">
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
