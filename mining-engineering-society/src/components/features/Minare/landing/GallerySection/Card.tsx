"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { GalleryData } from "@/config/Minare/landingpagedata";

export const GalleryCard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => setIsMobile(window.innerWidth < 900);
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <Swiper
        slidesPerView={isMobile ? 1 : 3}
        centeredSlides={true}
        loop={true}
        spaceBetween={30}
        // pagination={{
        //   clickable: true
        // }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {GalleryData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="h-[350px] aspect-[3/4] rounded-lg overflow-hidden flex items-center justify-center">
              <span className="text-2xl">Photo {item.id}</span>
              <Image
                src={item.imgUrl}
                alt="GalleryImage"
                layout="fill"
                className="z-20 rounded-[12px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
