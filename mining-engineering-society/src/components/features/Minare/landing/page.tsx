"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { About } from "./AboutSection/aboutUsSection";
import { Hero } from "./HeroSection/heroSection";

export const LandingPage = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const animationId = requestAnimationFrame(raf);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="h-auto star-container p-[16px]">
      <div
        className="absolute inset-0 z-0 bg-[size:50px_50px] opacity-10 [mask-image:linear-gradient(transparent_70%,_black)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)"
        }}
      />
      <Hero />
      <About />
    </div>
  );
};
