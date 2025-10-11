"use client";

import { useState, useEffect } from "react";
import {
  getAllStakeholders,
  addStakeholder,
  updateStakeholder,
  deleteStakeholder,
} from "@/actions/mes/members/stakeholders/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Stakeholder {
  id: number;
  name: string;
  role: string;
  tenure: string;
}

export default function StakeholdersManagement() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStakeholder, setEditingStakeholder] =
    useState<Stakeholder | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    tenure: "",
  });

  useEffect(() => {
    loadStakeholders();
  }, []);

  const loadStakeholders = async () => {
    setLoading(true);
    try {
      const result = await getAllStakeholders();
      if (result.success && result.data) {
        setStakeholders(result.data);
      }
    } catch (error) {
      console.error("Error loading stakeholders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingStakeholder) {
        await updateStakeholder(editingStakeholder.name, formData);
      } else {
        await addStakeholder(formData);
      }

      setFormData({ name: "", role: "", tenure: "" });
      setEditingStakeholder(null);
      setShowAddForm(false);
      loadStakeholders();
    } catch (error) {
      console.error("Error saving stakeholder:", error);
    }
  };

  const handleEdit = (stakeholder: Stakeholder) => {
    setEditingStakeholder(stakeholder);
    setFormData({
      name: stakeholder.name,
      role: stakeholder.role,
      tenure: stakeholder.tenure,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (name: string) => {
    if (confirm("Are you sure you want to delete this stakeholder?")) {
      try {
        await deleteStakeholder(name);
        loadStakeholders();
      } catch (error) {
        console.error("Error deleting stakeholder:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: "", role: "", tenure: "" });
    setEditingStakeholder(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div>Loading stakeholders...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Stakeholders Management
        </h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add New Stakeholder
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingStakeholder ? "Edit Stakeholder" : "Add New Stakeholder"}
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
              <Label htmlFor="tenure">Tenure</Label>
              <Input
                id="tenure"
                type="text"
                value={formData.tenure}
                onChange={(e) =>
                  setFormData({ ...formData, tenure: e.target.value })
                }
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingStakeholder ? "Update" : "Add"} Stakeholder
              </Button>
              <Button type="button" onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Stakeholders List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">All Stakeholders</h2>
        </div>
        <div className="divide-y">
          {stakeholders.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No stakeholders found. Add your first stakeholder!
            </div>
          ) : (
            stakeholders.map((stakeholder) => (
              <div
                key={stakeholder.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {stakeholder.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Role: {stakeholder.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    Tenure: {stakeholder.tenure}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEdit(stakeholder)}
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(stakeholder.name)}
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
