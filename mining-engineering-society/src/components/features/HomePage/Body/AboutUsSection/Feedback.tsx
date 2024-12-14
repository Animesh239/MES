"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// import "./swiper.css";
// import { Autoplay } from "swiper/modules";
import { Feedbackdata } from "@/config/Homepage/HomePagedata";
import Image from "next/image";
// import { SubHeadingText } from "@/components/typography/LandingPage";

export const Feedback = () => {
  return (
    <>
      <div className="rounded-lg">
        <Swiper
          //   modules={[Autoplay]}
          spaceBetween={"16px"}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          className="mySwiper"
        >
          {Feedbackdata.map((items, index) => (
            <SwiperSlide key={index}>
              <div className=" relative flex flex-col justify-center items-center gap-4 xsm:gap-6 sm:gap-8 p-4 xsm:p-8 sm:p-12 md:p-16 w-full max-sm:pb-10 h-auto sm:h-[80vh] bg-white/[0.06] border-2 border-white/[0.1] rounded-xl">
                <Image
                  width={80}
                  height={80}
                  src="https://res.cloudinary.com/dehegwbs0/image/upload/v1734212670/qp6kpwwlutb8lrjfkzem.png"
                  alt="bb"
                  className="absolute left-5 xsm:left-7 sm:left-10 top-5 xsm:top-7 sm:top-10 w-16 h-16 xsm:w-[72px] xsm:h-[72px] sm:w-20 sm:h-20"
                />
                <div className="relative  w-[18vh] h-[18vh] rounded-full ">
                  <Image
                    src={items.imgUrl}
                    alt="Minare"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="text-[1.20rem] xsm:text-[1.40rem] sm:text-[1.75rem] leading-relaxed tracking-wide text-white/[0.7] h-48 xsm:h-56 sm:h-64 overflow-y-auto">
                  {items.feedback}
                </div>
                <div className="flex justify-between w-full ">
                  {items.details?.map((detail, index) => (
                    <div
                      key={index}
                      className="text-white/[0.5] text-xs xsm:text-base sm:text-xl font-normal leading-relaxed tracking-wider"
                    >
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
