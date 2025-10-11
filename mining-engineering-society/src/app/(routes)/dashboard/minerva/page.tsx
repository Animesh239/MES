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
    return <div>Loading Minerva issues...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Minerva Newsletter Management
        </h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add New Issue
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingIssue ? "Edit Issue" : "Add New Issue"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="pdfLink">PDF Link</Label>
              <Input
                id="pdfLink"
                type="url"
                value={formData.pdfLink}
                onChange={(e) =>
                  setFormData({ ...formData, pdfLink: e.target.value })
                }
                required
                placeholder="https://example.com/newsletter.pdf"
              />
            </div>
            <div>
              <Label htmlFor="coverImageLink">Cover Image Link</Label>
              <Input
                id="coverImageLink"
                type="url"
                value={formData.coverImageLink}
                onChange={(e) =>
                  setFormData({ ...formData, coverImageLink: e.target.value })
                }
                required
                placeholder="https://example.com/cover-image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) =>
                  setFormData({ ...formData, issueDate: e.target.value })
                }
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingIssue ? "Update" : "Add"} Issue
              </Button>
              <Button type="button" onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Issues List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">All Minerva Issues</h2>
        </div>
        <div className="divide-y">
          {issues.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No Minerva issues found. Add your first issue!
            </div>
          ) : (
            issues.map((issue) => (
              <div
                key={issue.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{issue.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    PDF:{" "}
                    <a
                      href={issue.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Document
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    Cover:{" "}
                    <a
                      href={issue.coverImageLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Image
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Issue Date: {issue.issueDate}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    onClick={() => handleEdit(issue)}
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(issue.title)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
