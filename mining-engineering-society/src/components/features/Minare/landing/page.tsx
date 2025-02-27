"use client";
import { useEffect, useState } from "react";
import { About } from "./AboutSection/aboutUsSection";
import { Hero } from "./HeroSection/heroSection";
import { Event } from "./EventSection/Event";
import { Gallery } from "./GallerySection/Gallery";
import { GetUserDetail } from "@/lib/firebase/getUserData";
import { UserFormInterface } from "@/config/Minare/Registration/type";
import {
  initializeAuthListener,
  useAuthStore
} from "@/lib/firebase/authListener";
import { Profile } from "./HeroSection/profile";

export const LandingPage = () => {
  const [userData, setUserData] = useState<UserFormInterface>({
    fullname: "",
    email: "",
    phonenumber: "",
    collegename: "",
    branch: "",
    photoURL: "",
    graduationyear: "",
    uid: "",
    paymentProofImgURL: ""
  });
  const isLoading = useAuthStore((state) => state.isLoading);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    initializeAuthListener();

    const createStars = () => {
      const container = document.querySelector(".star-container");
      if (!container) return;
      container.innerHTML = "";

      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "absolute bg-white rounded-full animate-twinkle";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(star);
      }
    };
    const fetchUserData = async () => {
      if (!isLoading) {
        const result = await GetUserDetail();
        if (result.success && result.data?.profileSubmitted) {
          setUserData(result.data);
          setIsLogin(true);
        }
      }
    };

    createStars();
    fetchUserData();

    return () => {
      const container = document.querySelector(".star-container");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [isLoading]);

  return (
    <div className=" h-auto p-[16px] relative flex flex-col gap-32">
      <div className="star-container fixed inset-0 -z-10 overflow-hidden"></div>
      <div
        className="absolute inset-0 -z-10 bg-[size:50px_50px] opacity-10 [mask-image:linear-gradient(transparent_70%,_black)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)"
        }}
      />
      {isLogin && <Profile userData={userData} />}
      <Hero />
      <About />
      <Event />
      <Gallery />
    </div>
  );
};
