"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { galleryData } from "@/config/Minare/Gallery/Data";

interface ImageDimensions {
  width: number;
  height: number;
}

export default function Gallery() {
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions[]>([]);

  useEffect(() => {
    const dimensions = galleryData.images.map(() => ({
      width: Math.floor(Math.random() * (600 - 300 + 1)) + 300,
      height: Math.floor(Math.random() * (400 - 200 + 1)) + 200,
    }));
    setImageDimensions(dimensions);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 mb-12">
      <div className=" text-center text-4xl xxsm:text-6xl font-semibold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent sm:mb-12 mt-20">
        {galleryData.title}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {galleryData.images.map((image, index) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg shadow-lg"
            style={{
              paddingBottom: `${
                (imageDimensions[index]?.height /
                  imageDimensions[index]?.width) *
                100
              }%`,
            }}
          >
            <Image
              src={`https://picsum.photos/${imageDimensions[index]?.width}/${imageDimensions[index]?.height}?random=${image.id}`}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
