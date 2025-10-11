"use client";

import { useState, useEffect } from "react";
import {
  getAllArticles,
  addArticle,
  updateArticle,
  deleteArticle,
} from "@/actions/mes/minerva/articles/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/ui/modal";

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  publishDate: string;
}

export default function ArticlesManagement() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewingArticle, setViewingArticle] = useState<Article | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    publishDate: "",
  });

  // Simple MDX-like renderer for basic markdown
  const renderMDXContent = (content: string) => {
    let html = content
      // Headers
      .replace(
        /^### (.*$)/gm,
        '<h3 class="text-xl font-semibold text-purple-300 mb-3 mt-6">$1</h3>'
      )
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-2xl font-bold text-purple-200 mb-4 mt-8">$1</h2>'
      )
      .replace(
        /^# (.*$)/gm,
        '<h1 class="text-3xl font-bold text-purple-100 mb-6 mt-8">$1</h1>'
      )
      // Bold and italic
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-bold text-white">$1</strong>'
      )
      .replace(/\*(.*?)\*/g, '<em class="italic text-purple-200">$1</em>')
      // Code blocks
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm font-mono">$1</code>'
      )
      // Blockquotes
      .replace(
        /^> (.*$)/gm,
        '<blockquote class="border-l-4 border-purple-500 pl-4 text-gray-300 italic my-4">$1</blockquote>'
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

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const result = await getAllArticles();
      if (result.success && result.data) {
        setArticles(result.data);
      }
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, formData);
      } else {
        await addArticle(formData);
      }

      setFormData({ title: "", content: "", author: "", publishDate: "" });
      setEditingArticle(null);
      setShowAddForm(false);
      loadArticles();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      author: article.author,
      publishDate: article.publishDate,
    });
    setShowAddForm(true);
  };

  const handleView = (article: Article) => {
    setViewingArticle(article);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewingArticle(null);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id);
        loadArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", author: "", publishDate: "" });
    setEditingArticle(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Articles Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage articles for the Minerva publication
          </p>
        </div>
        {!showAddForm && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Article
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">
            {editingArticle ? "Edit Article" : "Add New Article"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="text-gray-300 font-medium">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter article title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="author" className="text-gray-300 font-medium">
                  Author
                </Label>
                <Input
                  id="author"
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter author name"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="publishDate"
                  className="text-gray-300 font-medium"
                >
                  Publish Date
                </Label>
                <Input
                  id="publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) =>
                    setFormData({ ...formData, publishDate: e.target.value })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="content" className="text-gray-300 font-medium">
                Content (MDX)
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 min-h-[300px]"
                placeholder="Enter article content in MDX format..."
                required
              />
              <p className="text-gray-500 text-sm mt-1">
                You can use MDX format with React components for rich formatting
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg"
              >
                {editingArticle ? "Update Article" : "Add Article"}
              </Button>
              <Button
                type="button"
                onClick={resetForm}
                variant="outline"
                className="border-gray-600 text-gray-400 hover:text-white hover:border-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Articles List */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700/50">
          <h2 className="text-xl font-semibold text-white">All Articles</h2>
          <p className="text-gray-400 text-sm mt-1">
            {articles.length} article{articles.length !== 1 ? "s" : ""} total
          </p>
        </div>

        <div className="divide-y divide-gray-700/50">
          {articles.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No articles yet
              </h3>
              <p className="text-gray-400 mb-4">
                Get started by adding your first article!
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                Add Your First Article
              </Button>
            </div>
          ) : (
            articles.map((article) => (
              <div
                key={article.id}
                className="px-6 py-4 hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg mb-2">
                      {article.title}
                    </h3>
                    <div className="space-y-1">
                      <div className="flex items-center text-gray-400">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        By {article.author}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Published:{" "}
                        {new Date(article.publishDate).toLocaleDateString()}
                      </div>
                      <div className="text-gray-500 text-sm mt-2 line-clamp-3">
                        {article.content.slice(0, 200)}...
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button
                      onClick={() => handleView(article)}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/20"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View
                    </Button>
                    <Button
                      onClick={() => handleEdit(article)}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-500/20"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(article.id)}
                      size="sm"
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 7a1 1 0 012 0v4a1 1 0 11-2 0V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* View Article Modal */}
      <Modal isOpen={showViewModal} onClose={handleCloseViewModal}>
        {viewingArticle && (
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">
                {viewingArticle.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  By {viewingArticle.author}
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {new Date(viewingArticle.publishDate).toLocaleDateString()}
                </div>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-6"></div>
            </div>

            {/* Rendered MDX Content */}
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: renderMDXContent(viewingArticle.content),
              }}
            />

            {/* Raw Content Section (for reference) */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <h4 className="text-lg font-semibold text-gray-300 mb-3">
                Raw MDX Content:
              </h4>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
                <pre className="text-sm text-gray-400 whitespace-pre-wrap font-mono">
                  {viewingArticle.content}
                </pre>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
