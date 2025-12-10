"use client";
import { useState, useEffect } from "react";
import { YearEventGallery } from "./YearEventGallery";
import { getPastEvents } from "@/actions/mes/events/action";
import ComingSoon from "@/components/ui/ComingSoon";

interface Event {
  id: number;
  title: string;
  type: string;
  imageLinks: string[];
}

export const EventsGalleryPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getPastEvents();
        if (response.success && response.data) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (events.length === 0) {
    return <ComingSoon />;
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 h-auto py-32">
      <YearEventGallery events={events} />
    </div>
  );
};
