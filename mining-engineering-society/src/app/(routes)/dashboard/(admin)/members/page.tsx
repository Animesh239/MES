"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  getAllMembers,
  addMember,
  updateMember,
  deleteMember,
} from "@/actions/minare/members/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldUploadButton } from "next-cloudinary";

interface Member {
  id: number;
  name: string;
  role: string;
  photoUrl: string;
  linkedInProfile?: string | null;
  year?: string | null;
  type?: string | null; // 'current' or 'past'
}

export default function MembersManagement() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    linkedInProfile: "",
    year: new Date().getFullYear().toString(),
    type: "current",
  });
  const [uploadedPhoto, setUploadedPhoto] = useState<string>("");

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    try {
      console.log("Fetching members...");
      const result = await getAllMembers();
      console.log("Fetch result:", result);

      if (result.success && result.data) {
        console.log("Setting members:", result.data);
        setMembers(result.data);
      } else {
        console.error("Fetch failed or no data:", result);
        // Optional: Set an error state to display to the user
      }
    } catch (error) {
      console.error("Error loading members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const memberData = {
      name: formData.name,
      role: formData.role,
      photoUrl: uploadedPhoto,
      linkedInProfile: formData.linkedInProfile || undefined,
      year: formData.year || undefined,
      type: formData.type || "current",
    };

    try {
      if (editingMember) {
        await updateMember(editingMember.name, memberData);
      } else {
        await addMember(memberData);
      }

      resetForm();
      loadMembers();
    } catch (error) {
      console.error("Error saving member:", error);
    }
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      linkedInProfile: member.linkedInProfile || "",
      year: member.year || new Date().getFullYear().toString(),
      type: member.type || "current",
    });
    setUploadedPhoto(member.photoUrl);
    setShowAddForm(true);
  };

  const handleDelete = async (name: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      try {
        await deleteMember(name);
        loadMembers();
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      linkedInProfile: "",
      year: new Date().getFullYear().toString(),
      type: "current",
    });
    setUploadedPhoto("");
    setEditingMember(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading members...</p>
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
            MINARE Members Management
          </h1>
          <p className="text-gray-400 mt-2">Manage MINARE team members</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Member
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {editingMember ? "Edit Member" : "Add New Member"}
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
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter member name"
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
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., President, Vice President"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="type" className="text-gray-300 font-medium">
                  Type
                </Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full mt-2 p-2 bg-black/30 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:ring-blue-500 outline-none"
                >
                  <option value="current">Current Member</option>
                  <option value="past">Past Member</option>
                </select>
              </div>
              <div>
                <Label htmlFor="year" className="text-gray-300 font-medium">
                  Year
                </Label>
                <Input
                  id="year"
                  type="text"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 2025"
                />
              </div>
              <div>
                <Label
                  htmlFor="linkedInProfile"
                  className="text-gray-300 font-medium"
                >
                  LinkedIn Profile
                </Label>
                <Input
                  id="linkedInProfile"
                  type="url"
                  value={formData.linkedInProfile}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      linkedInProfile: e.target.value,
                    })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://linkedin.com/..."
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300 font-medium">Upload Photo</Label>
              <div className="mt-2 flex items-center space-x-4">
                <CldUploadButton
                  // @ts-ignore
                  onSuccess={(result: any) => {
                    console.log("Upload success:", result);
                    if (
                      result &&
                      result.info &&
                      typeof result.info === "object" &&
                      "secure_url" in result.info
                    ) {
                      console.log("Setting photo URL:", result.info.secure_url);
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
                      alt="Uploaded member photo"
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
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg"
              >
                {editingMember ? "Update Member" : "Add Member"}
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

      {/* Members Grid */}
      <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 bg-black/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">All Members</h2>
            <div className="text-sm text-gray-400">
              {members.length} member{members.length !== 1 ? "s" : ""} total
            </div>
          </div>
        </div>

        <div className="p-6">
          {members.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No members found
              </h3>
              <p className="text-gray-400 mb-4">
                Get started by adding your first member!
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Add Your First Member
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-200 hover:shadow-xl"
                >
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-white text-lg mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">{member.role}</p>
                    <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-500">
                      <span className="bg-gray-800 px-2 py-0.5 rounded">
                        {member.year || "N/A"}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded ${
                          member.type === "past"
                            ? "bg-red-900/50 text-red-200"
                            : "bg-green-900/50 text-green-200"
                        }`}
                      >
                        {member.type === "past" ? "Past" : "Current"}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(member)}
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/20"
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
                        onClick={() => handleDelete(member.name)}
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
