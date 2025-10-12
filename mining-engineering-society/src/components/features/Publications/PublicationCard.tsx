"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, Calendar, User } from "lucide-react";
import { Publication } from "@/types/publication";

interface PublicationCardProps {
  publication: Publication;
  index: number;
  onClick: () => void;
}

export default function PublicationCard({
  publication,
  index,
  onClick,
}: PublicationCardProps) {
  const { title, author, publishDate, type, content } = publication;

  // Extract first few words for preview
  const getPreview = (content: string, maxLength: number = 100) => {
    const textContent = content.replace(/[#*`_~]/g, "").replace(/\n/g, " ");
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div
        onClick={onClick}
        className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 cursor-pointer group transition-all duration-300 shadow-lg hover:shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl ${
              type === "poem"
                ? "bg-purple-500/20 text-purple-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {type === "poem" ? (
              <BookOpen className="w-6 h-6" />
            ) : (
              <FileText className="w-6 h-6" />
            )}
          </div>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              type === "poem"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Preview */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {getPreview(content)}
        </p>

        {/* Metadata */}
        <div className="space-y-2 pt-4 border-t border-gray-700">
          <div className="flex items-center text-gray-400 text-sm">
            <User className="w-4 h-4 mr-2" />
            <span>{author}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(publishDate)}</span>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 rounded-2xl transition-all duration-300" />
      </div>
    </motion.div>
  );
}
