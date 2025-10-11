"use client";

import { useState, useEffect } from "react";
import {
  getAllMinerva,
  addMinerva,
  updateMinerva,
  deleteMinerva,
} from "@/actions/mes/minerva/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MinervaIssue {
  id: number;
  title: string;
  issueDate: string;
  pdfLink: string;
  coverImageLink: string;
}

export default function MinervaManagement() {
  const [issues, setIssues] = useState<MinervaIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIssue, setEditingIssue] = useState<MinervaIssue | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    issueDate: "",
    pdfLink: "",
    coverImageLink: "",
  });

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    setLoading(true);
    try {
      const result = await getAllMinerva();
      if (result.success && result.data) {
        setIssues(result.data);
      }
    } catch (error) {
      console.error("Error loading Minerva issues:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingIssue) {
        await updateMinerva(editingIssue.title, formData);
      } else {
        await addMinerva(formData);
      }

      setFormData({
        title: "",
        issueDate: "",
        pdfLink: "",
        coverImageLink: "",
      });
      setEditingIssue(null);
      setShowAddForm(false);
      loadIssues();
    } catch (error) {
      console.error("Error saving Minerva issue:", error);
    }
  };

  const handleEdit = (issue: MinervaIssue) => {
    setEditingIssue(issue);
    setFormData({
      title: issue.title,
      issueDate: issue.issueDate,
      pdfLink: issue.pdfLink,
      coverImageLink: issue.coverImageLink,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (title: string) => {
    if (confirm("Are you sure you want to delete this Minerva issue?")) {
      try {
        await deleteMinerva(title);
        loadIssues();
      } catch (error) {
        console.error("Error deleting Minerva issue:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", issueDate: "", pdfLink: "", coverImageLink: "" });
    setEditingIssue(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Minerva issues...</p>
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
            Minerva Newsletter Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage newsletter issues and publications
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Issue
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {editingIssue ? "Edit Issue" : "Add New Issue"}
            </h2>
            <Button
              onClick={resetForm}
              variant="outline"
              className="border-gray-600 text-gray-400 hover:text-white hover:border-white"
              size="sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>

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
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Enter issue title"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="issueDate"
                  className="text-gray-300 font-medium"
                >
                  Issue Date
                </Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, issueDate: e.target.value })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pdfLink" className="text-gray-300 font-medium">
                PDF Link
              </Label>
              <Input
                id="pdfLink"
                type="url"
                value={formData.pdfLink}
                onChange={(e) =>
                  setFormData({ ...formData, pdfLink: e.target.value })
                }
                className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                placeholder="https://example.com/newsletter.pdf"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="coverImageLink"
                className="text-gray-300 font-medium"
              >
                Cover Image Link
              </Label>
              <Input
                id="coverImageLink"
                type="url"
                value={formData.coverImageLink}
                onChange={(e) =>
                  setFormData({ ...formData, coverImageLink: e.target.value })
                }
                className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                placeholder="https://example.com/cover-image.jpg"
                required
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg"
              >
                {editingIssue ? "Update Issue" : "Add Issue"}
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

      {/* Issues List */}
      <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 bg-black/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              All Minerva Issues
            </h2>
            <div className="text-sm text-gray-400">
              {issues.length} issue{issues.length !== 1 ? "s" : ""} total
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {issues.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No Minerva issues found
              </h3>
              <p className="text-gray-400 mb-4">
                Get started by adding your first newsletter issue!
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                Add Your First Issue
              </Button>
            </div>
          ) : (
            issues.map((issue) => (
              <div
                key={issue.id}
                className="px-6 py-4 hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg mb-2">
                      {issue.title}
                    </h3>
                    <div className="space-y-2">
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
                        Issue Date: {issue.issueDate}
                      </div>

                      <div className="flex items-center space-x-4">
                        <a
                          href={issue.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          View PDF
                        </a>

                        <a
                          href={issue.coverImageLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          View Cover
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button
                      onClick={() => handleEdit(issue)}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/20"
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
                      onClick={() => handleDelete(issue.title)}
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
    </div>
  );
}
