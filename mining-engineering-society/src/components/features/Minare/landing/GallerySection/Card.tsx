import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
// import { GalleryData } from "../data/galleryData";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { GalleryData } from "@/config/Minare/landingpagedata";

export const GalleryCard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => setIsMobile(window.innerWidth < 600);
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <div className="w-full max-w-7xl  mx-auto px-4">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={isMobile ? 1 : 2.5}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="py-10"
      >
        {GalleryData.map((item) => (
          <SwiperSlide key={item.id} className="py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.imgUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 hover:bg-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 translate-y-6 group-hover:translate-y-0">
                  {/* <h3 className="text-2xl font-bold mb-2">Event {item.id}</h3> */}
                  {/* <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Capturing moments that define our journey
                  </p> */}
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
