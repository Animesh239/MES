"use client";

import { useEffect, useState } from "react";
import MemberCard from "@/components/ui/card";
import { getAllAlumni } from "@/actions/mes/members/alumni/action";
import { cn } from "@nextui-org/react";

interface Alumni {
  id: number;
  name: string;
  graduationYear: string;
  currentPosition: string;
  company: string;
  photoUrl: string;
  linkedInProfile?: string | null;
}

export default function AlumniPage() {
  const [allAlumni, setAllAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await getAllAlumni();
        if (response.success && response.data) {
          const data = response.data;
          setAllAlumni(data);

          // Extract unique graduation years
          const uniqueYearStrings = Array.from(
            new Set(data.map((a) => a.graduationYear))
          );

          // Sort years descending
          // Assuming graduationYear is something like "2023" or "2024"
          const sortedYears = uniqueYearStrings.sort((a, b) => {
            const numA = parseInt(a) || 0;
            const numB = parseInt(b) || 0;
            return numB - numA; // Descending
          });

          setYears(sortedYears);
          if (sortedYears.length > 0) {
            setSelectedYear(sortedYears[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching alumni:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  const filteredAlumni = allAlumni.filter(
    (a) => a.graduationYear === selectedYear
  );

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
          Our Alumni
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Celebrating our graduates who are making their mark in the world.
        </p>
      </div>

      {years.length === 0 ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-2xl">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              No Alumni Yet
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl mb-8">
              Our alumni database is currently being built. Check back soon to
              meet our distinguished graduates!
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 text-blue-300 text-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Coming Soon</span>
            </div>
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

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 xxxsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 gap-y-8 sm:gap-y-12 justify-items-center px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500 key={selectedYear}">
            {filteredAlumni.map((alumniMember) => (
              <MemberCard
                key={alumniMember.id}
                name={alumniMember.name}
                imgURL={alumniMember.photoUrl}
                graduationYear={alumniMember.graduationYear}
                workDetails={`${alumniMember.currentPosition} at ${alumniMember.company}`}
                linkedInProfile={alumniMember.linkedInProfile}
              />
            ))}
          </div>

          {filteredAlumni.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No alumni found for the class of {selectedYear}.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
