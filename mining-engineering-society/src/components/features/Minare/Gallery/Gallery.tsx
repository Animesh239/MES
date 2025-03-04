"use client";
import Image from "next/image";
import { galleryData } from "@/config/Minare/Gallery/Data";
import { Header } from "../landing/header";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-black text-white p-8 mb-12">
      <div className="mt-20 mb-12">
        <Header label={galleryData.title} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {galleryData.images.map((image) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg shadow-lg"
            style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
          >
            <Image
              src={image.src}
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