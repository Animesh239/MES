"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Feedbackdata } from "@/config/Homepage/HomePagedata";
import Image from "next/image";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const Feedback = () => {
  return (
    <div className="rounded-lg relative">
      <Swiper
        spaceBetween={"16px"}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        modules={[Pagination, Autoplay, Navigation]}
        pagination={true}
        navigation={{
          nextEl: ".feedback-button-next",
          prevEl: ".feedback-button-prev",
        }}
        autoplay={{ delay: 5000 }}
        className="mySwiper"
      >
        {Feedbackdata.map((items, index) => (
          <SwiperSlide key={index}>
              <div className=" relative flex flex-col justify-center items-center p-4 pb-10 xsm:p-8 sm:p-12 md:p-16 md:pt-28 w-full max-sm:pb-20 h-auto sm:h-[70vh] bg-white/[0.06] border-2 border-white/[0.1] rounded-xl">
                <div className="h-auto flex flex-col justify-center items-center">
                  <Image
                    width={80}
                    height={80}
                    src="https://res.cloudinary.com/dehegwbs0/image/upload/v1734360834/oyanvzueht23nxelne7j.png"
                    alt="bb"
                    className="md:absolute left-5 xsm:left-7 sm:left-10  top-12 w-16 h-16 xsm:w-[72px] xsm:h-[72px] sm:w-20 sm:h-20"
                  />
                  <div className="text-lg sm:text-[2xl] leading-relaxed tracking-wide text-white/[0.7] text-center h-auto m-4 md:m-0 md:h-56 w-[95%] md:w-[80%]  overflow-y-auto">
                    {items.feedback}
                  </div>
                  <Image
                    width={80}
                    height={80}
                    src="https://res.cloudinary.com/dehegwbs0/image/upload/v1734360937/qupljtnmkuzhrhakywpz.png"
                    alt="bb"
                    className="md:absolute right-5 xsm:right-7 sm:right-10 top-5 xsm:top-7 sm:top-[50%] lg:top-[40%] w-16 h-16 xsm:w-[72px] xsm:h-[72px] sm:w-20 sm:h-20"
                  />
                <div className="flex justify-center  gap-6 items-center">
                  <Image
                    src={items.imgUrl}
                    alt="Minare"
                    height={80}
                    width={80}
                    className="rounded-full"
                  />

                  <div className="flex flex-col gap-2 justify-start w-full ">
                    {items.details?.map((detail, index) => (
                      <div
                        key={index}
                        style={{
                          color: index === 0 ? "white" : "",
                          fontSize: index == 0 ? "24px" : ""
                        }}
                        className="text-white/[0.5] text-xs xsm:text-base  font-normal leading-relaxed tracking-wider"
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </div>
              </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation buttons */}
      <div className="feedback-button-next absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <div className="feedback-button-prev absolute top-1/2 -translate-y-1/2 left-4 z-10 cursor-pointer bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
    </div>
  );
};