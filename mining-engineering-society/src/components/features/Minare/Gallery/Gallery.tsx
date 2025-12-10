"use client";
import Image from "next/image";
import { galleryData } from "@/config/Minare/Gallery/Data";
import { Header } from "../landing/header";

interface UploadedImage {
  id: number;
  imageUrl: string;
}

interface GalleryProps {
  uploadedImages: UploadedImage[];
}

export default function Gallery({ uploadedImages }: GalleryProps) {
  // Transform uploaded images to match gallery format
  const transformedUploadedImages = uploadedImages.map((img) => ({
    id: `uploaded-${img.id}`,
    src: img.imageUrl,
    alt: `Gallery image ${img.id}`,
    width: 600,
    height: 400,
  }));

  // Combine static images with uploaded images
  const allImages = [...galleryData.images, ...transformedUploadedImages];

  return (
    <div className="min-h-screen bg-black text-white p-8 mb-12">
      <div className="mt-20 mb-12">
        <Header label={galleryData.title} />
      </div>
      
      {allImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-purple-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              No gallery images found
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Gallery images will be displayed here once they are uploaded.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {allImages.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-lg"
              style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
