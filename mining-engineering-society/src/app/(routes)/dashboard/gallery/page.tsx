"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  getAllGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
} from "@/actions/minare/gallery/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    } catch (error) {
      console.error("Error loading gallery:", error);
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
      setEditingItem(null);
      setShowAddForm(false);
      loadGallery();
    } catch (error) {
      console.error("Error saving gallery item:", error);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      imageUrl: item.imageUrl,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this gallery item?")) {
      try {
        await deleteGalleryImage(id);
        loadGallery();
      } catch (error) {
        console.error("Error deleting gallery item:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ imageUrl: "" });
    setEditingItem(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div>Loading gallery...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add New Image
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingItem ? "Update" : "Add"} Gallery Item
              </Button>
              <Button type="button" onClick={resetForm} variant="outline">
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
