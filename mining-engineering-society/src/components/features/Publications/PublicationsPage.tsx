"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  FileText,
  Search,
  Filter,
  Calendar,
  User,
} from "lucide-react";
import { getAllPublications } from "@/actions/mes/publications/action";
import { Publication } from "@/types/publication";
import PublicationModal from "./PublicationModal";

type PublicationType = "all" | "poems" | "articles";

interface SelectedPublication extends Publication {
  type: "poem" | "article";
}

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<
    Publication[]
  >([]);
  const [filter, setFilter] = useState<PublicationType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublication, setSelectedPublication] =
    useState<SelectedPublication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPublications() {
      try {
        const response = await getAllPublications();
        if (response.success) {
          setPublications(response.data);
          setFilteredPublications(response.data);
        } else {
          console.error("Error fetching publications:", response.message);
        }
      } catch (error) {
        console.error("Error fetching publications:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPublications();
  }, []);

  useEffect(() => {
    let filtered = publications;

    // Apply type filter
    if (filter !== "all") {
      filtered = filtered.filter((pub) => pub.type === filter.slice(0, -1));
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (pub) =>
          pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pub.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pub.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPublications(filtered);
  }, [publications, filter, searchTerm]);

  const handlePublicationClick = (publication: Publication) => {
    setSelectedPublication(publication);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-12">
      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search publications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-3">
                {[
                  { key: "all", label: "All", icon: Filter },
                  { key: "poems", label: "Poems", icon: BookOpen },
                  { key: "articles", label: "Articles", icon: FileText },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key as PublicationType)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      filter === key
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50 hover:border-gray-500/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <p className="text-gray-400 text-sm">
                Showing {filteredPublications.length} of {publications.length}{" "}
                publications
                {filter !== "all" && ` in ${filter}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Publications Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPublications.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center py-16">
              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700/50 max-w-md mx-auto">
                <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No publications found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "No publications available at the moment"}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div layout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredPublications.map((publication, index) => (
                  <motion.div
                    key={publication.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => handlePublicationClick(publication)}
                    >
                      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 h-full group">
                        {/* Publication Type Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                              publication.type === "poem"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            }`}
                          >
                            {publication.type === "poem" ? (
                              <BookOpen className="w-3 h-3" />
                            ) : (
                              <FileText className="w-3 h-3" />
                            )}
                            {publication.type === "poem" ? "Poem" : "Article"}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-blue-300 transition-colors">
                          {publication.title}
                        </h3>

                        {/* Content Preview */}
                        <p className="text-gray-400 text-sm mb-6 line-clamp-4 leading-relaxed">
                          {publication.content
                            .replace(/[#*`]/g, "")
                            .substring(0, 150)}
                          ...
                        </p>

                        {/* Meta Information */}
                        <div className="space-y-3 text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 text-gray-400" />
                            <span className="font-medium text-gray-300">
                              {publication.author}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span>
                              {new Date(
                                publication.publishDate
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Read More Button */}
                        <div className="mt-auto pt-4 border-t border-gray-700/50">
                          <span className="text-blue-400 group-hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-2">
                            Read More
                            <motion.span
                              initial={{ x: 0 }}
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="inline-block">→</span>
                            </motion.span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>

      {/* Publication Modal */}
      <PublicationModal
        publication={selectedPublication}
        isOpen={!!selectedPublication}
        onClose={() => setSelectedPublication(null)}
      />
    </div>
  );
}
