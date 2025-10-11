"use client";

import { useState, useEffect } from "react";
import {
  getAllEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "@/actions/mes/events/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Event {
  id: number;
  title: string;
  type: string;
  imageLinks: string[];
}

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    imageLinks: "",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const result = await getAllEvents();
      if (result.success && result.data) {
        setEvents(result.data);
      }
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = {
      title: formData.title,
      type: formData.type,
      imageLinks: formData.imageLinks.split(",").map((link) => link.trim()),
    };

    try {
      if (editingEvent) {
        await updateEvent(editingEvent.title, eventData);
      } else {
        await addEvent(eventData);
      }

      setFormData({ title: "", type: "", imageLinks: "" });
      setEditingEvent(null);
      setShowAddForm(false);
      loadEvents();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      type: event.type,
      imageLinks: event.imageLinks.join(", "),
    });
    setShowAddForm(true);
  };

  const handleDelete = async (title: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(title);
        loadEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", type: "", imageLinks: "" });
    setEditingEvent(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add New Event
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingEvent ? "Edit Event" : "Add New Event"}
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
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                type="text"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="imageLinks">Image Links (comma separated)</Label>
              <Input
                id="imageLinks"
                type="text"
                value={formData.imageLinks}
                onChange={(e) =>
                  setFormData({ ...formData, imageLinks: e.target.value })
                }
                placeholder="https://image1.jpg, https://image2.jpg"
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingEvent ? "Update" : "Add"} Event
              </Button>
              <Button type="button" onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Events List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">All Events</h2>
        </div>
        <div className="divide-y">
          {events.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No events found. Add your first event!
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600">Type: {event.type}</p>
                  <p className="text-sm text-gray-600">
                    Images: {event.imageLinks.length} file(s)
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEdit(event)}
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(event.title)}
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
