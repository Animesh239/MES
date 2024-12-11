"use client";

import { VerticalLine } from "./VerticalLine";
import { HorizontalLine } from "./HorizontalLine";
import {
  HeadingText,
  SubHeadingText,
} from "@/components/typography/LandingPage";
import { Button } from "@/components/ui/button";
import { HeroSectionData, LogosData } from "@/config/Homepage/HomePagedata";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Body = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 480);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  return (
    <>
      <div className="bg-[#000000] relative overflow-hidden pt-[10vh] h-auto md:px-[5vw] -z-10">
        <VerticalLine leftPosition="11vw" delay="0" topPostion="" />

        <VerticalLine leftPosition="89vw" delay="0.6" topPostion="" />
        <div className="hidden md:block">
          <VerticalLine leftPosition="63vw" delay="0.4" topPostion="" />
        </div>
        <div className="hidden md:block">
          <VerticalLine leftPosition="37vw" delay="0.2" topPostion="" />
        </div>

        {HeroSectionData.map((data, index) => (
          <div
            key={index}
            style={{
              marginTop: index === 0 ? (isSmallScreen ? "5vh" : "15vh") : "0",
            }}
            className="relative text-white flex  h-auto w-full"
          >
            {index === 0 && <HorizontalLine topPostion="0" delay={0} />}
            <HorizontalLine topPostion="100%" delay={index === 0 ? 0.3 : 0.6} />

            <div className="flex justify-center w-full">
              <div className=" bg-black z-20 flex justify-center items-center mt-[1px] py-8 h-auto w-[76vw] ">
                {index === 0 ? (
                  <HeadingText label={data.title} />
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <SubHeadingText label={data.title} />
                    <div className="flex justify-center items-center p-2 gap-4">
                      {LogosData.map((logo, index) => (
                        <Image
                          width={20}
                          height={20}
                          key={index}
                          src={logo.imgUrl}
                          alt={logo.title}
                          className="w-16 h-16 sm:w-20 sm:h-20"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center py-16">
          <Button variant="default" size="default">
            get Started
          </Button>
        </div>
      </div>
    </>
  );
};
