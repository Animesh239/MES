"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User } from "lucide-react";
import { useEffect } from "react";
import { Publication } from "@/types/publication";

interface PublicationModalProps {
  publication: Publication | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PublicationModal({
  publication,
  isOpen,
  onClose,
}: PublicationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!publication) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Simple MDX-like renderer for basic markdown (matching dashboard style)
  const renderMDXContent = (content: string) => {
    let html = content
      // Headers
      .replace(
        /^### (.*$)/gm,
        '<h3 class="text-xl font-semibold text-orange-300 mb-3 mt-6">$1</h3>'
      )
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-2xl font-bold text-orange-200 mb-4 mt-8">$1</h2>'
      )
      .replace(
        /^# (.*$)/gm,
        '<h1 class="text-3xl font-bold text-orange-100 mb-6 mt-8">$1</h1>'
      )
      // Bold and italic
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-bold text-white">$1</strong>'
      )
      .replace(/\*(.*?)\*/g, '<em class="italic text-orange-200">$1</em>')
      // Code blocks
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-800 text-orange-300 px-2 py-1 rounded text-sm font-mono">$1</code>'
      )
      // Blockquotes
      .replace(
        /^> (.*$)/gm,
        '<blockquote class="border-l-4 border-orange-500 pl-4 text-gray-300 italic my-4">$1</blockquote>'
      )
      // Lists (simple)
      .replace(/^\- (.*$)/gm, '<li class="text-gray-300 mb-1">• $1</li>')
      // Line breaks and paragraphs
      .replace(/\n\n/g, '</p><p class="text-gray-300 mb-4 leading-relaxed">')
      .replace(/\n/g, "<br/>");

    // Wrap in paragraph tags
    html =
      '<div class="text-gray-300 leading-relaxed"><p class="text-gray-300 mb-4 leading-relaxed">' +
      html +
      "</p></div>";

    return html;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal - matching dashboard poems style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="relative bg-black/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 max-w-6xl w-full max-h-[70vh] overflow-y-auto"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700/50 transition-colors z-10"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>

                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
                    {publication.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      By {publication.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(publication.publishDate)}
                    </div>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mb-6"></div>
                </div>

                {/* Content */}
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: renderMDXContent(publication.content),
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
