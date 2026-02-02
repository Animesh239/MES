"use client";

import Image from "next/image";
import { useState } from "react";
import { ModalGallery } from "@/components/ui/modal-gallery";
import { Button } from "@/components/ui/button";
import { ChevronRight, Camera, Sparkles } from "lucide-react";

interface MinareEvent {
  id: number;
  title: string;
  type: string;
  year?: string | null;
  imageLinks: string[];
}

export const MinareYearEventGallery = ({
  events,
}: {
  events: MinareEvent[];
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const openModal = (images: string[], initialIndex: number = 0) => {
    setSelectedImages(images);
    setInitialImageIndex(initialIndex);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full px-6 py-16 min-h-screen bg-gradient-to-b from-black/0 via-black/5 to-black/0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {events.map((event) => (
          <section
            key={event.id}
            className="relative group bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-md rounded-3xl p-8 space-y-8
              border border-white/10 hover:border-white/30 transition-all duration-500
              hover:shadow-[0_0_35px_rgba(255,255,255,0.12)] hover:-translate-y-1
              before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/[0.08] before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
          >
            <div className="relative">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative">
                  <Camera className="w-7 h-7 text-white/70 group-hover:text-white/90 transition-colors duration-500" />
                  <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-white/40 group-hover:text-white/70 transition-colors duration-500" />
                </div>
                <h2
                  className="text-2xl sm:text-4xl md:text-5xl font-bold 
                  bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent 
                  group-hover:from-white group-hover:via-white group-hover:to-white/90 
                  transition-all duration-500 tracking-tight"
                >
                  {event.title}
                </h2>
              </div>
              <div
                className="h-0.5 w-20 bg-gradient-to-r from-white/30 via-white/20 to-transparent 
                rounded-full group-hover:w-32 group-hover:from-white/50 transition-all duration-500"
              />
            </div>

            <div className="relative w-full aspect-square group/gallery">
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 opacity-0 
                group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
              />
              <div
                className="grid grid-cols-2 grid-rows-2 gap-4 h-full p-1 rounded-2xl 
                bg-gradient-to-br from-white/[0.15] to-transparent"
              >
                {event.imageLinks.slice(0, 4).map((imageUrl, imageIdx) => (
                  <div
                    key={imageIdx}
                    className={`relative w-full h-full rounded-xl overflow-hidden ${
                      imageIdx === 3 && event.imageLinks.length > 4
                        ? "group/image cursor-pointer"
                        : ""
                    } shadow-lg hover:shadow-2xl transition-all duration-500
                    before:absolute before:inset-0 before:z-10 before:bg-gradient-to-t before:from-black/30 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300`}
                    onClick={() => openModal(event.imageLinks, imageIdx)}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${event.title} image ${imageIdx + 1}`}
                      fill
                      className={`object-cover transition-all duration-700 
                        group-hover/gallery:scale-[1.02] hover:scale-110 
                        ${
                          imageIdx === 3 && event.imageLinks.length > 4
                            ? "group-hover/image:opacity-40"
                            : ""
                        }`}
                    />
                    {imageIdx === 3 && event.imageLinks.length > 4 && (
                      <div
                        className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center 
                        opacity-0 group-hover/image:opacity-100 transition-all duration-500"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-white border-white/70 hover:border-white 
                            hover:bg-white/10 hover:text-white transition-all duration-300 
                            shadow-[0_0_20px_rgba(255,255,255,0.15)]
                            hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(event.imageLinks);
                          }}
                        >
                          View Gallery
                          <ChevronRight className="ml-1.5 h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
      {isModalOpen && (
        <ModalGallery
          images={selectedImages}
          onClose={() => setIsModalOpen(false)}
          initialIndex={initialImageIndex}
        />
      )}
    </div>
  );
};
