"use client";

import { useEffect, useState } from "react";
import {
  Pickaxe,
  Gem,
  Hammer,
  HardHat,
  Shovel,
  Lightbulb,
  Cog,
  Cpu,
  Battery,
  Wrench,
  Zap,
  CircuitBoard,
  Boxes,
  Coins,
  Disc,
  Gauge,
  Factory,
} from "lucide-react";

const FloatingIcons = [
  Gem,
  Hammer,
  HardHat,
  Shovel,
  Lightbulb,
  Pickaxe,
  Cog,
  Cpu,
  Battery,
  Wrench,
  Zap,
  CircuitBoard,
  Boxes,
  Coins,
  Disc,
  Gauge,
  Factory,
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Floating objects - Layer 1 (Back) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => {
          const Icon = FloatingIcons[i % FloatingIcons.length];
          const size = 8 + Math.random() * 16;
          // const opacity = 0.05 + Math.random() * 0.1;

          return (
            <div
              key={`back-${i}`}
              className="absolute animate-float-reverse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 10}s`,
              }}
            >
              <Icon
                className="text-gray-800 animate-pulse-slow"
                style={{
                  width: size,
                  height: size,
                  opacity: 400,
                }}
                strokeWidth={1}
              />
            </div>
          );
        })}
      </div>

      {/* Floating objects - Layer 2 (Front) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(90)].map((_, i) => {
          const Icon = FloatingIcons[i % FloatingIcons.length];
          const size = 12 + Math.random() * 24;
          // const opacity = 0.1 + Math.random() * 0.2;

          return (
            <div
              key={`front-${i}`}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 8}s`,
              }}
            >
              <Icon
                className="text-gray-700"
                style={{
                  width: size,
                  height: size,
                  opacity: 600,
                }}
                strokeWidth={1}
              />
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="text-center relative space-y-4">
        <div className="relative inline-block">
          <Pickaxe
            className="w-20 h-20 text-gray-400 animate-pulse"
            strokeWidth={1.5}
          />
          <div className="absolute -right-2 -top-2">
            <Gem
              className="w-8 h-8 text-gray-500 animate-bounce"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-wider bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent [text-shadow:_0_4px_24px_rgba(255,255,255,0.1)]">
          COMING SOON
        </h1>
      </div>
    </main>
  );
}
