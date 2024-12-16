"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// import "./swiper.css";
// import { Autoplay } from "swiper/modules";
import { Feedbackdata } from "@/config/Homepage/HomePagedata";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
// import { SubHeadingText } from "@/components/typography/LandingPage";

export const Feedback = () => {
  return (
    <>
      <div className="rounded-lg">
        <Swiper
          spaceBetween={"16px"}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          modules={[Pagination, Autoplay]}
          pagination={true}
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
                </div>
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
