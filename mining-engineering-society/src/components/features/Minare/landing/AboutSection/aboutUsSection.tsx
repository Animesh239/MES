"use client";
import { AboutUsData } from "@/config/Minare/landingpagedata";
import { motion } from "framer-motion";
import { Header } from "../header";
import { useEffect, useState } from "react";

export const About = () => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => setIsMobile(window.innerWidth < 600);
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const toggleDescription = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const truncateDescription = (text: string, sectionId: string) => {
    const words = text.split(" ");
    const isExpanded = expandedSections[sectionId];

    if (isExpanded) return text;

    const truncatedText = words.slice(0, 50).join(" ");
    return words.length > 50 ? `${truncatedText}...` : truncatedText;
  };

  return (
    <div className="relative h-auto">
      <div className="w-full text-white bg-transparent">
        <section className="border-none max-w-7xl mx-auto bg-transparent">
          <div>
            {AboutUsData.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 150 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  type: "tween",
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className={section.boxClasses}>
                  <div className="mb-16">
                    <Header label={section.header.title} />
                  </div>
                  <p className="text-gray-100 text-center font-roboto leading-[30px] sm:leading-[40px]  text-lg md:text-[27px] tracking-wider font-[300]">
                    {isMobile ? (
                      <>
                        {truncateDescription(section.description, section.id)}
                        {section.description.split(" ").length > 50 && (
                          <button
                            onClick={() => toggleDescription(section.id)}
                            className=" text-blue-300 hover:text-blue-500 text-justify transition-colors"
                          >
                            {expandedSections[section.id]
                              ? "Show Less"
                              : "Show More"}
                          </button>
                        )}
                      </>
                    ) : (
                      section.description
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
