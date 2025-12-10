"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import {
  getAllGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
} from "@/actions/minare/gallery/action";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface GalleryItem {
  id: number;
  imageUrl: string;
}

export default function GalleryManagement() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    imageUrl: "",
  });

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    setLoading(true);
    try {
      const result = await getAllGalleryImages();
      if (result.success && result.data) {
        setGallery(result.data);
      }
    } catch {
      // Error loading gallery
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingItem) {
        // No update function available, so we'll delete and re-add
        await deleteGalleryImage(editingItem.id);
        await addGalleryImage(formData);
      } else {
        await addGalleryImage(formData);
      }

      setFormData({ imageUrl: "" });
      setUploadedImageUrl("");
      setEditingItem(null);
      setShowAddForm(false);
      loadGallery();
    } catch {
      // Error saving gallery item
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      imageUrl: item.imageUrl,
    });
    setUploadedImageUrl(item.imageUrl);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this gallery item?")) {
      try {
        await deleteGalleryImage(id);
        loadGallery();
      } catch {
        // Error deleting gallery item
      }
    }
  };

  const resetForm = () => {
    setFormData({ imageUrl: "" });
    setUploadedImageUrl("");
    setEditingItem(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading gallery...</p>
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
            Gallery Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage MINARE gallery images and showcase
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Image
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-white">
            {editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="imageUrl" className="text-gray-200">Upload Image</Label>
              <div className="mt-2 space-y-4">
                <CldUploadWidget
                  uploadPreset="mes-upload-images"
                  options={{
                    folder: "minare/gallery",
                    resourceType: "image",
                    clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
                    maxFileSize: 10000000,
                  }}
                  onSuccess={(result: any) => {
                    const url = result?.info?.secure_url;
                    if (url) {
                      setFormData({ ...formData, imageUrl: url });
                      setUploadedImageUrl(url);
                    }
                  }}
                >
                  {({ open }) => (
                    <Button
                      type="button"
                      onClick={() => open()}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      {uploadedImageUrl ? "Change Image" : "Upload Image"}
                    </Button>
                  )}
                </CldUploadWidget>
                
                {uploadedImageUrl && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-600">
                    <Image
                      src={uploadedImageUrl}
                      alt="Uploaded preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {!uploadedImageUrl && (
                  <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg bg-gray-800">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-400">No image uploaded</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={!uploadedImageUrl}
              >
                {editingItem ? "Update" : "Add"} Gallery Item
              </Button>
              <Button type="button" onClick={resetForm} variant="outline" className="text-white border-gray-600 hover:bg-gray-700">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No gallery items found. Add your first image!
          </div>
        ) : (
          gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <Image
                src={item.imageUrl}
                alt={`Gallery image ${item.id}`}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  Gallery Image #{item.id}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  URL: {item.imageUrl}
                </p>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEdit(item)}
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
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
  );
}
