"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ReactConfetti from "react-confetti";
// Import types from framer-motion
import type { HTMLMotionProps } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
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
          // Explicitly type the motion.div as HTMLDivElement
          {...({} as HTMLMotionProps<"div">)}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div
            onClick={onClose}
            className="w-screen"
            style={{
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
              padding: "1rem",
              paddingTop: "0",
              paddingBottom: "0",
              paddingLeft: "0",
              paddingRight: "0",
            }}
          >
            {showConfetti && (
              <ReactConfetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={500}
              />
            )}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div
                className="bg-transparent p-4 sm:p-6 rounded-lg shadow-lg w-[40vh] md:w-[80vh] lg:w-[120vh] max-h-[90vh] overflow-y-auto"
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.stopPropagation()
                }
              >
                <div className="relative w-full h-[90vh] mb-4 sm:mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="https://res.cloudinary.com/dhv234qct/image/upload/v1742501375/lizq0jojfjieuxdldexs.png"
                    alt="Random Minerva Image"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-black text-white hover:scale-105 transition-all duration-300 p-2 border-2 border-white rounded-xl"
                    onClick={() => {
                      onClose();
                      window.open(
                        "https://drive.google.com/file/d/17yTQUbTBWKm1zwK1lbQ8Sh6uRzJkw7UD/view?usp=sharing"
                      );
                    }}
                  >
                    <span className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                      Explore Minerva
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
