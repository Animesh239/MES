"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

interface ModalGalleryProps {
  images: string[];
  onClose: () => void;
  initialIndex?: number;
}

export const ModalGallery = ({
  images,
  onClose,
  initialIndex = 0
}: ModalGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(
    Math.min(Math.max(initialIndex, 0), images.length - 1) // Ensure initialIndex is valid
  );

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); // Wrap to the last image
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <Dialog open onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="max-w-[95vw] h-[95vh] p-0 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 shadow-2xl"
        {...swipeHandlers}
      >
        <DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="hidden sm:flex absolute inset-y-0 w-full items-center justify-between px-4">
              <button
                onClick={handlePrevious}
                className="p-2 bg-gradient-to-r from-white/90 to-gray-400/90 text-black shadow-lg transition-transform duration-300 group z-10"
              >
                <ChevronLeft className="h-8 w-8 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-gradient-to-r from-white/90 to-gray-400/90 text-black shadow-lg transition-transform duration-300 group z-10"
              >
                <ChevronRight className="h-8 w-8 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-3 rounded-full text-white shadow-xl transition-all duration-300 transform z-50"
            >
              <X className="h-6 w-6" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%"
                }}
              >
                <Image
                  src={images[currentIndex]}
                  alt={`Gallery image ${currentIndex + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="transform transition-transform duration-500"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-white/90 to-gray-400 backdrop-blur-md px-6 py-2 rounded-full text-black font-medium shadow-xl">
              {currentIndex + 1} / {images.length}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentIndex + 1) / images.length) * 100}%`
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0.3), white)"
                }}
              />
            </div>
          </div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
