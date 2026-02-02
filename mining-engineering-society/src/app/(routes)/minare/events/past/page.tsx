"use client";

import { useEffect, useState } from "react";
import { getPastMinareEvents } from "@/actions/minare/events/action";
import { cn } from "@nextui-org/react";
import { MinareYearEventGallery } from "@/components/features/Minare/EventsPage/MinareYearEventGallery";

interface MinareEvent {
  id: number;
  title: string;
  type: string;
  year?: string | null;
  imageLinks: string[];
}

export default function MinarePastEventsPage() {
  const [allEvents, setAllEvents] = useState<MinareEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await getPastMinareEvents();
        if (result.success && result.data) {
          const data = result.data;
          setAllEvents(data);

          // Extract unique years
          const uniqueYearStrings = Array.from(
            new Set(data.map((e) => e.year).filter((y): y is string => !!y))
          );

          // Sort years descending
          const sortedYears = uniqueYearStrings.sort((a, b) => {
            const numA = parseInt(a) || 0;
            const numB = parseInt(b) || 0;
            return numB - numA;
          });

          setYears(sortedYears);
          if (sortedYears.length > 0) {
            setSelectedYear(sortedYears[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching past minare events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = allEvents.filter((e) => e.year === selectedYear);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl xxsm:text-6xl font-bold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
          Past Minare Editions
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A glimpse into the history of Minare.
        </p>
      </div>

      {years.length === 0 ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4 text-gray-500">
              No Past Editions Found
            </h2>
            <p className="text-gray-400">
              Events with year tags will appear here once added.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Year Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={cn(
                  "px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 border border-white/10",
                  selectedYear === year
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)] scale-105"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 key={selectedYear}">
            <MinareYearEventGallery events={filteredEvents} />
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No events found for {selectedYear}.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
