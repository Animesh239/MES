"use client";

import { useState, useEffect } from "react";
import {
  getUpcomingMinareEvents,
  getPastMinareEvents,
  addMinareEvent,
  updateMinareEvent,
  deleteMinareEvent,
} from "@/actions/minare/events/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CldUploadButton } from "next-cloudinary";

interface MinareEvent {
  id: number;
  title: string;
  type: string;
  imageLinks: string[];
}

export default function MinareEventsManagement() {
  const [upcomingEvents, setUpcomingEvents] = useState<MinareEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<MinareEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<MinareEvent | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    type: "upcoming" as "upcoming" | "past",
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const [upcomingResult, pastResult] = await Promise.all([
        getUpcomingMinareEvents(),
        getPastMinareEvents(),
      ]);

      if (upcomingResult.success && upcomingResult.data) {
        setUpcomingEvents(upcomingResult.data);
      } else {
        setUpcomingEvents([]);
      }
      
      if (pastResult.success && pastResult.data) {
        setPastEvents(pastResult.data);
      } else {
        setPastEvents([]);
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
      imageLinks: uploadedImages,
    };

    try {
      let result;
      if (editingEvent) {
        result = await updateMinareEvent(editingEvent.title, eventData);
      } else {
        result = await addMinareEvent(eventData);
      }

      if (!result.success) {
        alert(result.message);
        return;
      }

      setFormData({ title: "", type: "upcoming" });
      setUploadedImages([]);
      setEditingEvent(null);
      setShowAddForm(false);
      loadEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("An error occurred while saving the event.");
    }
  };

  const handleEdit = (event: MinareEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      type: event.type as "upcoming" | "past",
    });
    setUploadedImages(event.imageLinks || []);
    setShowAddForm(true);
  };

  const handleDelete = async (title: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteMinareEvent(title);
        loadEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", type: "upcoming" });
    setUploadedImages([]);
    setEditingEvent(null);
    setShowAddForm(false);
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages(
      uploadedImages.filter((_, index) => index !== indexToRemove)
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading events...</p>
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
            Minare Events Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage all Minare events (Upcoming and Past)
          </p>
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
          Add New Event
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {editingEvent ? "Edit Event" : "Add New Event"}
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
                <Label htmlFor="title" className="text-gray-300 font-medium">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-2 bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter event title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type" className="text-gray-300 font-medium">
                  Type
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "upcoming" | "past") =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger className="mt-2 bg-black/30 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-gray-700">
                    <SelectItem
                      value="upcoming"
                      className="text-white hover:bg-blue-500/20"
                    >
                      Upcoming
                    </SelectItem>
                    <SelectItem
                      value="past"
                      className="text-white hover:bg-blue-500/20"
                    >
                      Past
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-300 font-medium">Upload Images</Label>
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
                      setUploadedImages((prevImages) => [
                        ...prevImages,
                        result.info.secure_url,
                      ]);
                    }
                  }}
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  options={{
                    multiple: true,
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
                  Upload Images ({uploadedImages.length})
                </CldUploadButton>
              </div>

              {/* Display uploaded images */}
              {uploadedImages.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-400 mb-2">
                    Uploaded Images ({uploadedImages.length}):
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {uploadedImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Event image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-600"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg"
              >
                {editingEvent ? "Update Event" : "Add Event"}
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

      {/* Upcoming Events List */}
      <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 bg-black/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Upcoming Events
            </h2>
            <div className="text-sm text-gray-400">
              {upcomingEvents.length} event
              {upcomingEvents.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {upcomingEvents.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No upcoming events found
              </h3>
              <p className="text-gray-400 mb-4">
                Get started by adding your first event!
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Add Your First Event
              </Button>
            </div>
          ) : (
            upcomingEvents.map((event: MinareEvent) => (
              <div
                key={event.id}
                className="px-6 py-4 hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Event Images Preview */}
                    {event.imageLinks && event.imageLinks.length > 0 && (
                      <div className="flex-shrink-0 flex items-center space-x-2">
                        {event.imageLinks
                          .slice(0, 3)
                          .map((imageUrl: string, idx: number) => (
                            <img
                              key={idx}
                              src={imageUrl}
                              alt={`${event.title} - ${idx + 1}`}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-600"
                            />
                          ))}
                        {event.imageLinks.length > 3 && (
                          <div className="w-16 h-16 bg-black/50 border border-gray-600 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-400">
                              +{event.imageLinks.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Event Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg mb-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {event.type}
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {event.imageLinks && event.imageLinks.length > 0
                            ? `${event.imageLinks.length} image${
                                event.imageLinks.length > 1 ? "s" : ""
                              }`
                            : "No images"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button
                      onClick={() => handleEdit(event)}
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
                      onClick={() => handleDelete(event.title)}
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

      {/* Past Events List */}
      <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 bg-black/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Past Events</h2>
            <div className="text-sm text-gray-400">
              {pastEvents.length} event{pastEvents.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {pastEvents.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No past events found
              </h3>
              <p className="text-gray-400">Past events will appear here.</p>
            </div>
          ) : (
            pastEvents.map((event: MinareEvent) => (
              <div
                key={event.id}
                className="px-6 py-4 hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Event Images Preview */}
                    {event.imageLinks && event.imageLinks.length > 0 && (
                      <div className="flex-shrink-0 flex items-center space-x-2">
                        {event.imageLinks
                          .slice(0, 3)
                          .map((imageUrl: string, idx: number) => (
                            <img
                              key={idx}
                              src={imageUrl}
                              alt={`${event.title} - ${idx + 1}`}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-600 grayscale"
                            />
                          ))}
                        {event.imageLinks.length > 3 && (
                          <div className="w-16 h-16 bg-black/50 border border-gray-600 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-400">
                              +{event.imageLinks.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Event Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg mb-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {event.type}
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {event.imageLinks && event.imageLinks.length > 0
                            ? `${event.imageLinks.length} image${
                                event.imageLinks.length > 1 ? "s" : ""
                              }`
                            : "No images"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button
                      onClick={() => handleEdit(event)}
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
                      onClick={() => handleDelete(event.title)}
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
