"use client";

import { useState, useEffect } from "react";
import {
  getAllAlumni,
  addAlumni,
  updateAlumni,
  deleteAlumni,
} from "@/actions/mes/members/alumni/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Alumni {
  id: number;
  name: string;
  graduationYear: string;
  currentPosition: string;
  company: string;
  linkedInProfile?: string | null;
}

export default function AlumniManagement() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAlumni, setEditingAlumni] = useState<Alumni | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    graduationYear: "",
    currentPosition: "",
    company: "",
    linkedInProfile: "",
  });

  useEffect(() => {
    loadAlumni();
  }, []);

  const loadAlumni = async () => {
    setLoading(true);
    try {
      const result = await getAllAlumni();
      if (result.success && result.data) {
        setAlumni(result.data);
      }
    } catch (error) {
      console.error("Error loading alumni:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const alumniData = {
      name: formData.name,
      graduationYear: formData.graduationYear,
      currentPosition: formData.currentPosition,
      company: formData.company,
      linkedInProfile: formData.linkedInProfile || undefined,
    };

    try {
      if (editingAlumni) {
        await updateAlumni(editingAlumni.name, alumniData);
      } else {
        await addAlumni(alumniData);
      }

      setFormData({
        name: "",
        graduationYear: "",
        currentPosition: "",
        company: "",
        linkedInProfile: "",
      });
      setEditingAlumni(null);
      setShowAddForm(false);
      loadAlumni();
    } catch (error) {
      console.error("Error saving alumni:", error);
    }
  };

  const handleEdit = (alumniItem: Alumni) => {
    setEditingAlumni(alumniItem);
    setFormData({
      name: alumniItem.name,
      graduationYear: alumniItem.graduationYear,
      currentPosition: alumniItem.currentPosition,
      company: alumniItem.company,
      linkedInProfile: alumniItem.linkedInProfile || "",
    });
    setShowAddForm(true);
  };

  const handleDelete = async (name: string) => {
    if (confirm("Are you sure you want to delete this alumni record?")) {
      try {
        await deleteAlumni(name);
        loadAlumni();
      } catch (error) {
        console.error("Error deleting alumni:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      graduationYear: "",
      currentPosition: "",
      company: "",
      linkedInProfile: "",
    });
    setEditingAlumni(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div>Loading alumni...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Alumni Management</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add New Alumni
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingAlumni ? "Edit Alumni" : "Add New Alumni"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input
                id="graduationYear"
                type="text"
                value={formData.graduationYear}
                onChange={(e) =>
                  setFormData({ ...formData, graduationYear: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="currentPosition">Current Position</Label>
              <Input
                id="currentPosition"
                type="text"
                value={formData.currentPosition}
                onChange={(e) =>
                  setFormData({ ...formData, currentPosition: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="linkedInProfile">
                LinkedIn Profile (optional)
              </Label>
              <Input
                id="linkedInProfile"
                type="url"
                value={formData.linkedInProfile}
                onChange={(e) =>
                  setFormData({ ...formData, linkedInProfile: e.target.value })
                }
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingAlumni ? "Update" : "Add"} Alumni
              </Button>
              <Button type="button" onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Alumni List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">All Alumni</h2>
        </div>
        <div className="divide-y">
          {alumni.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No alumni found. Add your first alumni record!
            </div>
          ) : (
            alumni.map((alumniItem) => (
              <div
                key={alumniItem.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {alumniItem.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {alumniItem.currentPosition} at {alumniItem.company}
                  </p>
                  <p className="text-sm text-gray-600">
                    Graduated: {alumniItem.graduationYear}
                  </p>
                  {alumniItem.linkedInProfile && (
                    <a
                      href={alumniItem.linkedInProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      LinkedIn Profile
                    </a>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEdit(alumniItem)}
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(alumniItem.name)}
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
