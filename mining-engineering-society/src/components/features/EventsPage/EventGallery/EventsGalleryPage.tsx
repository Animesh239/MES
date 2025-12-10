"use client";
import { useState, useEffect } from "react";
import { SelectYear } from "./Selectyear";
import { YearEventGallery } from "./YearEventGallery";
import { getAllEvents } from "@/actions/mes/events/action";

interface Event {
  id: number;
  title: string;
  type: string;
  imageLinks: string[];
}

export const EventsGalleryPage = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getAllEvents();
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

  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 h-auto py-32">
      <SelectYear handleSelectYear={handleSelectYear} />
      <YearEventGallery year={selectedYear} events={events} />
    </div>
  );
};
