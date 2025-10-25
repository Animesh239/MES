"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  getAllAlumni,
  addAlumni,
  updateAlumni,
  deleteAlumni,
} from "@/actions/mes/members/alumni/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldUploadButton } from 'next-cloudinary';

interface Alumni {
  id: number;
  name: string;
  graduationYear: string;
  currentPosition: string;
  company: string;
  photoUrl: string;
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
  const [uploadedPhoto, setUploadedPhoto] = useState<string>("");

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
      photoUrl: uploadedPhoto,
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
      setUploadedPhoto("");
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
    setUploadedPhoto(alumniItem.photoUrl);
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
    setUploadedPhoto("");
    setEditingAlumni(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading alumni...</p>
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
            Alumni Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage Mining Engineering Society alumni records
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Alumni
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {editingAlumni ? "Edit Alumni" : "Add New Alumni"}
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
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500"
                  placeholder="Enter alumni name"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="graduationYear"
                  className="text-gray-300 font-medium"
                >
                  Graduation Year
                </Label>
                <Input
                  id="graduationYear"
                  type="text"
                  value={formData.graduationYear}
                  onChange={(e) =>
                    setFormData({ ...formData, graduationYear: e.target.value })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500"
                  placeholder="e.g., 2020"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="currentPosition"
                  className="text-gray-300 font-medium"
                >
                  Current Position
                </Label>
                <Input
                  id="currentPosition"
                  type="text"
                  value={formData.currentPosition}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPosition: e.target.value,
                    })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500"
                  placeholder="e.g., Senior Mining Engineer"
                  required
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-gray-300 font-medium">
                  Company
                </Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500"
                  placeholder="e.g., Rio Tinto, BHP"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300 font-medium">
                Upload Photo
              </Label>
              <div className="mt-2 flex items-center space-x-4">
                <CldUploadButton
                  onSuccess={(result: any) => {
                    console.log("Upload success:", result);
                    if (result && result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
                      console.log("Setting photo URL:", result.info.secure_url);
                      setUploadedPhoto(result.info.secure_url);
                    }
                  }}
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  options={{
                    multiple: false,
                    maxFiles: 1,
                  }}
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
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
                      alt="Uploaded alumni photo"
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

            <div>
              <Label
                htmlFor="linkedInProfile"
                className="text-gray-300 font-medium"
              >
                LinkedIn Profile{" "}
                <span className="text-gray-500">(optional)</span>
              </Label>
              <Input
                id="linkedInProfile"
                type="url"
                value={formData.linkedInProfile}
                onChange={(e) =>
                  setFormData({ ...formData, linkedInProfile: e.target.value })
                }
                className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg"
              >
                {editingAlumni ? "Update Alumni" : "Add Alumni"}
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

      {/* Alumni List */}
      <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 bg-black/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">All Alumni</h2>
            <div className="text-sm text-gray-400">
              {alumni.length} alumni record{alumni.length !== 1 ? "s" : ""}{" "}
              total
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {alumni.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No alumni found
              </h3>
              <p className="text-gray-400 mb-4">
                Get started by adding your first alumni record!
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Add Your First Alumni
              </Button>
            </div>
          ) : (
            alumni.map((alumniItem) => (
              <div
                key={alumniItem.id}
                className="px-6 py-4 hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Alumni Photo */}
                    <div className="flex-shrink-0">
                      <Image
                        src={alumniItem.photoUrl}
                        alt={`${alumniItem.name} photo`}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
                      />
                    </div>

                    {/* Alumni Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg mb-2">
                        {alumniItem.name}
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
                              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {alumniItem.currentPosition} at {alumniItem.company}
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
                          Graduated: {alumniItem.graduationYear}
                        </div>
                        {alumniItem.linkedInProfile && (
                          <a
                            href={alumniItem.linkedInProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                clipRule="evenodd"
                              />
                            </svg>
                            LinkedIn Profile
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button
                      onClick={() => handleEdit(alumniItem)}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:text-white hover:border-green-500 hover:bg-green-500/20"
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
                      onClick={() => handleDelete(alumniItem.name)}
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
