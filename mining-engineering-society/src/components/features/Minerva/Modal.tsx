"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-0"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          style={{
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={200}
            />
          )}
          <motion.div
            className="bg-transparent p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2 max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[70vh] mb-4 sm:mb-6 overflow-hidden rounded-lg">
              <Image
                src="https://picsum.photos/400/800"
                alt="Random Minerva Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-black text-white hover:scale-105 transition-all duration-300 p-2 border-2 border-white rounded-xl"
                onClick={() => router.push("/read-more")}
              >
                <span className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Explore Minerva
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
