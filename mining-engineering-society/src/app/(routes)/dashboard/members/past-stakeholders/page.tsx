"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  getAllPastStakeholders,
  addPastStakeholder,
  updatePastStakeholder,
  deletePastStakeholder,
} from "@/actions/mes/members/past-stakeholders/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldUploadButton } from "next-cloudinary";

interface PastStakeholder {
  id: number;
  name: string;
  role: string;
  year: string;
  numericYear?: number | null;
  photoUrl: string;
  linkedInProfile?: string | null;
}

export default function PastStakeholdersManagement() {
  const [stakeholders, setStakeholders] = useState<PastStakeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStakeholder, setEditingStakeholder] =
    useState<PastStakeholder | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    year: "", // Display year e.g. "2023-24"
    numericYear: "", // Sortable year e.g. "2023"
    linkedInProfile: "",
  });
  const [uploadedPhoto, setUploadedPhoto] = useState<string>("");

  useEffect(() => {
    loadStakeholders();
  }, []);

  const loadStakeholders = async () => {
    setLoading(true);
    try {
      const result = await getAllPastStakeholders();
      if (result.success && result.data) {
        setStakeholders(result.data);
      }
    } catch (error) {
      console.error("Error loading past stakeholders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedPhoto) {
      alert("Please upload a photo.");
      return;
    }

    const stakeholderData = {
      name: formData.name,
      role: formData.role,
      year: formData.year,
      numericYear: formData.numericYear
        ? parseInt(formData.numericYear)
        : undefined,
      photoUrl: uploadedPhoto,
      linkedInProfile: formData.linkedInProfile || undefined,
    };

    try {
      let result;
      if (editingStakeholder) {
        result = await updatePastStakeholder(
          editingStakeholder.id,
          stakeholderData
        );
      } else {
        result = await addPastStakeholder(stakeholderData);
      }

      if (!result.success) {
        alert(result.message);
        return;
      }

      resetForm();
      loadStakeholders();
    } catch (error) {
      console.error("Error saving past stakeholder:", error);
      alert("An error occurred while saving the stakeholder.");
    }
  };

  const handleEdit = (stakeholder: PastStakeholder) => {
    setEditingStakeholder(stakeholder);
    setFormData({
      name: stakeholder.name,
      role: stakeholder.role,
      year: stakeholder.year,
      numericYear: stakeholder.numericYear
        ? stakeholder.numericYear.toString()
        : "",
      linkedInProfile: stakeholder.linkedInProfile || "",
    });
    setUploadedPhoto(stakeholder.photoUrl);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this stakeholder?")) {
      try {
        await deletePastStakeholder(id);
        loadStakeholders();
      } catch (error) {
        console.error("Error deleting stakeholder:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      year: "",
      numericYear: "",
      linkedInProfile: "",
    });
    setUploadedPhoto("");
    setEditingStakeholder(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading past stakeholders...</p>
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
            Past Stakeholders Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage past executive council members
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Past Stakeholder
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {editingStakeholder
                ? "Edit Past Stakeholder"
                : "Add New Past Stakeholder"}
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
                <Label htmlFor="name" className="text-gray-300 font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role" className="text-gray-300 font-medium">
                  Role
                </Label>
                <Input
                  id="role"
                  type="text"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., General Secretary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="year" className="text-gray-300 font-medium">
                  Tenure Year (Display)
                </Label>
                <Input
                  id="year"
                  type="text"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., 2023-24"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="numericYear"
                  className="text-gray-300 font-medium"
                >
                  Numeric Year (Sortable)
                </Label>
                <Input
                  id="numericYear"
                  type="number"
                  value={formData.numericYear}
                  onChange={(e) =>
                    setFormData({ ...formData, numericYear: e.target.value })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., 2023"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="linkedInProfile"
                className="text-gray-300 font-medium"
              >
                LinkedIn Profile URL (Optional)
              </Label>
              <Input
                id="linkedInProfile"
                type="url"
                value={formData.linkedInProfile}
                onChange={(e) =>
                  setFormData({ ...formData, linkedInProfile: e.target.value })
                }
                className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <Label className="text-gray-300 font-medium">Upload Photo</Label>
              <div className="mt-2 flex items-center space-x-4">
                <CldUploadButton
                  // @ts-ignore
                  onSuccess={(result: any) => {
                    if (
                      result &&
                      result.info &&
                      typeof result.info === "object" &&
                      "secure_url" in result.info
                    ) {
                      setUploadedPhoto(result.info.secure_url);
                    }
                  }}
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  options={{
                    multiple: false,
                    maxFiles: 1,
                  }}
                >
                  <svg
                    className="w-4 h-4 mr-2 inline"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {uploadedPhoto ? "Replace Photo" : "Upload Photo"}
                </CldUploadButton>
              </div>

              {/* Display uploaded photo */}
              {uploadedPhoto && (
                <div className="mt-3">
                  <p className="text-sm text-gray-400 mb-2">Uploaded Photo:</p>
                  <div className="relative inline-block">
                    <Image
                      src={uploadedPhoto}
                      alt="Uploaded stakeholder photo"
                      width={128}
                      height={128}
                      className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => setUploadedPhoto("")}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg"
              >
                {editingStakeholder
                  ? "Update Past Stakeholder"
                  : "Add Past Stakeholder"}
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

      {/* Past Stakeholders List */}
      <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 bg-black/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Past Stakeholders List
            </h2>
            <div className="text-sm text-gray-400">
              {stakeholders.length} stakeholder
              {stakeholders.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {stakeholders.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No past stakeholders found
              </h3>
              <p className="text-gray-400 mb-4">
                Get started by adding past council members!
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                Add Past Stakeholder
              </Button>
            </div>
          ) : (
            stakeholders.map((stakeholder) => (
              <div
                key={stakeholder.id}
                className="px-6 py-4 hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <Image
                        src={stakeholder.photoUrl}
                        alt={`${stakeholder.name} photo`}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-600 grayscale"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg mb-1">
                        {stakeholder.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-xs border border-purple-500/30 mr-2">
                            {stakeholder.year}
                          </span>
                        </div>
                        {stakeholder.numericYear && (
                          <div className="flex items-center">
                            <span className="bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded text-xs border border-gray-600 mr-2">
                              Num: {stakeholder.numericYear}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {stakeholder.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button
                      onClick={() => handleEdit(stakeholder)}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-500/20"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(stakeholder.id)}
                      size="sm"
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0"
                    >
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
