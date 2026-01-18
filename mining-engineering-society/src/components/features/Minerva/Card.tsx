"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Modal from "./Modal";

interface CardProps {
  title: string;
  issueDate: Date | string;
  coverImageLink: string;
  pdfLink: string;
}

const Card = ({ title, issueDate, coverImageLink, pdfLink }: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert issueDate to Date object if it's a string
  const formattedDate =
    issueDate instanceof Date
      ? issueDate.toLocaleDateString()
      : new Date(issueDate).toLocaleDateString();

  return (
    <div className="flex flex-col items-center mb-20">
      <motion.div
        style={{
          position: "relative",
          width: "25rem",
          height: "30rem",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          overflow: "hidden",
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div
          onClick={() => setIsModalOpen(true)}
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            src={coverImageLink}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
          />
          <div
            className="absolute inset-0 opacity-0 hover:opacity-90 transition-opacity duration-300 flex items-center justify-center"
            style={{
              background: `
              linear-gradient(135deg, #888 0%, #eee 20%, #888 40%, #999 60%, #eee 80%, #888 100%)
            `,
              backgroundSize: "200% 200%",
              animation: "shimmer 5s ease-in-out infinite",
            }}
          >
            <p className="text-gray-800 text-2xl font-bold drop-shadow-lg">
              Click to see Minerva
            </p>
          </div>
        </div>
      </motion.div>
      <p className="mt-4 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        {title} - {formattedDate}
      </p>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pdfLink={pdfLink}
        coverImageLink={coverImageLink}
      />
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Card;
