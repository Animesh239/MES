"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  getAllAchievements,
  addAchievement,
  updateAchievement,
  deleteAchievement,
} from "@/actions/mes/achievements/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CldUploadButton } from "next-cloudinary";

interface Achievement {
  id: number;
  name: string;
  year: string;
  achievement: string;
  photoUrl: string;
}

export default function AchievementsManagement() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAchievement, setEditingAchievement] =
    useState<Achievement | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    achievement: "",
  });
  const [uploadedPhoto, setUploadedPhoto] = useState<string>("");

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    setLoading(true);
    try {
      const result = await getAllAchievements();
      if (result.success && result.data) {
        setAchievements(result.data);
      }
    } catch (error) {
      console.error("Error loading achievements:", error);
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

    const achievementData = {
      name: formData.name,
      year: formData.year,
      achievement: formData.achievement,
      photoUrl: uploadedPhoto,
    };

    try {
      let result;
      if (editingAchievement) {
        result = await updateAchievement(
          editingAchievement.id,
          achievementData
        );
      } else {
        result = await addAchievement(achievementData);
      }

      if (!result.success) {
        alert(result.message);
        return;
      }

      resetForm();
      loadAchievements();
    } catch (error) {
      console.error("Error saving achievement:", error);
      alert("An error occurred while saving the achievement.");
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setFormData({
      name: achievement.name,
      year: achievement.year,
      achievement: achievement.achievement,
    });
    setUploadedPhoto(achievement.photoUrl);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      try {
        await deleteAchievement(id);
        loadAchievements();
      } catch (error) {
        console.error("Error deleting achievement:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: "", year: "", achievement: "" });
    setUploadedPhoto("");
    setEditingAchievement(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading achievements...</p>
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
            Students Corner Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage student achievements and recognitions
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
          Add Achievement
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {editingAchievement ? "Edit Achievement" : "Add New Achievement"}
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
                  placeholder="Student Name"
                  required
                />
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
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., 2024"
                  required
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="achievement"
                className="text-gray-300 font-medium"
              >
                Achievement Description
              </Label>
              <Textarea
                id="achievement"
                value={formData.achievement}
                onChange={(e) =>
                  setFormData({ ...formData, achievement: e.target.value })
                }
                className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                placeholder="Describe the achievement..."
                required
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
                      alt="Uploaded achievement photo"
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
                {editingAchievement ? "Update Achievement" : "Add Achievement"}
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

      {/* Achievements List */}
      <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 bg-black/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Achievements</h2>
            <div className="text-sm text-gray-400">
              {achievements.length} achievement
              {achievements.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {achievements.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No achievements found
              </h3>
              <p className="text-gray-400 mb-4">
                Get started by adding student achievements!
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                Add Achievement
              </Button>
            </div>
          ) : (
            achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="px-6 py-4 hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <Image
                        src={achievement.photoUrl}
                        alt={`${achievement.name} photo`}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg mb-1">
                        {achievement.name} ({achievement.year})
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {achievement.achievement}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button
                      onClick={() => handleEdit(achievement)}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-500/20"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(achievement.id)}
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
