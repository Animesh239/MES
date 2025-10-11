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

interface Member {
  id: number;
  name: string;
  role: string;
  photoUrl: string;
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
    photoUrl: "",
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const result = await getAllMembers();
      if (result.success && result.data) {
        setMembers(result.data);
      }
    } catch (error) {
      console.error("Error loading members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingMember) {
        await updateMember(editingMember.name, formData);
      } else {
        await addMember(formData);
      }

      setFormData({ name: "", role: "", photoUrl: "" });
      setEditingMember(null);
      setShowAddForm(false);
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
      photoUrl: member.photoUrl,
    });
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
    setFormData({ name: "", role: "", photoUrl: "" });
    setEditingMember(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div>Loading members...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          MINARE Members Management
        </h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add New Member
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingMember ? "Edit Member" : "Add New Member"}
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
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="photoUrl">Photo URL</Label>
              <Input
                id="photoUrl"
                type="url"
                value={formData.photoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, photoUrl: e.target.value })
                }
                required
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingMember ? "Update" : "Add"} Member
              </Button>
              <Button type="button" onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No members found. Add your first member!
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <Image
                src={member.photoUrl}
                alt={member.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEdit(member)}
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(member.name)}
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
