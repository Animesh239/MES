"use client";
import { useEffect } from "react";

export const RegistrationPage = () => {
  useEffect(() => {
    const createStars = () => {
      const container = document.querySelector(".star-container");
      if (!container) return;

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

    createStars();
  }, []);

  return (
    <div className="h-auto p-[16px] relative flex flex-col gap-32">
      <div className="star-container fixed inset-0 -z-10 overflow-hidden"></div>
    </div>
  );
};
