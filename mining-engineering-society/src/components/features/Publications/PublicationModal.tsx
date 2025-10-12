"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, FileText, Calendar, User } from "lucide-react";
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

  // Simple MDX-like rendering for content
  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      // Handle headers
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-white">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-6 mb-4 text-white">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold mt-6 mb-4 text-white">
            {line.replace("# ", "")}
          </h1>
        );
      }

      // Handle emphasis
      const processedLine = line
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(
          /`(.*?)`/g,
          '<code class="bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">$1</code>'
        );

      // Handle empty lines
      if (line.trim() === "") {
        return <br key={index} />;
      }

      // Regular paragraphs
      return (
        <p
          key={index}
          className="mb-3 text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    });
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

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          publication.type === "poem"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {publication.type === "poem" ? (
                          <BookOpen className="w-5 h-5" />
                        ) : (
                          <FileText className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {publication.title}
                        </h2>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{publication.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(publication.publishDate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div
                    className={`prose prose-invert max-w-none ${
                      publication.type === "poem"
                        ? "text-center prose-lg"
                        : "prose-base"
                    }`}
                  >
                    {renderContent(publication.content)}
                  </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        publication.type === "poem"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}
                    >
                      {publication.type.charAt(0).toUpperCase() +
                        publication.type.slice(1)}
                    </span>
                    <div className="text-xs text-gray-500">
                      Press ESC to close
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
