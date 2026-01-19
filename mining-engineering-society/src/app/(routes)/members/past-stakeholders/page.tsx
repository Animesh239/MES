"use client";

import { useEffect, useState } from "react";
import MemberCard from "@/components/ui/card";
import { getAllPastStakeholders } from "@/actions/mes/members/past-stakeholders/action";
import { cn } from "@nextui-org/react";

interface PastStakeholder {
  id: number;
  name: string;
  role: string;
  year: string;
  numericYear?: number | null;
  photoUrl: string;
  linkedInProfile?: string | null;
}

export default function PastStakeholdersPage() {
  const [allStakeholders, setAllStakeholders] = useState<PastStakeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const fetchStakeholders = async () => {
      try {
        const result = await getAllPastStakeholders();
        if (result.success && result.data) {
          const data = result.data;
          setAllStakeholders(data);

          // Extract unique years
          const uniqueYearStrings = Array.from(
            new Set(data.map((s) => s.year))
          );

          // Sort years descending, leveraging numericYear if available
          const sortedYears = uniqueYearStrings.sort((a, b) => {
            const stakeA = data.find((s) => s.year === a);
            const stakeB = data.find((s) => s.year === b);

            // Fallback to parsing the string if numericYear is missing
            // This handles "2023-24" by taking "2023" via parseInt
            const numA = stakeA?.numericYear || parseInt(a) || 0;
            const numB = stakeB?.numericYear || parseInt(b) || 0;

            return numB - numA; // Descending
          });

          setYears(sortedYears);
          if (sortedYears.length > 0) {
            setSelectedYear(sortedYears[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching past stakeholders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStakeholders();
  }, []);

  const filteredStakeholders = allStakeholders.filter(
    (s) => s.year === selectedYear
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl xxsm:text-6xl font-bold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
          Past Executive Council
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Honoring the legacy of our past leaders who have shaped the society.
        </p>
      </div>

      {years.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">
            Past council members will be listed here.
          </p>
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

          {/* Stakeholders Grid */}
          <div className="grid grid-cols-1 xxxsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10 justify-items-center animate-in fade-in slide-in-from-bottom-4 duration-500 key={selectedYear}">
            {filteredStakeholders.map((stakeholder) => (
              <MemberCard
                key={stakeholder.id}
                name={stakeholder.name}
                position={stakeholder.role}
                imgURL={stakeholder.photoUrl}
                linkedInProfile={stakeholder.linkedInProfile}
                // We pass year as graduationYear mostly for display style,
                // or we could leave it out if redundant with the tab title.
                // But the user requested "image url, name, year, designation" schema.
                // MemberCard displays graduationYear as "Class of {year}".
                // Let's pass it to show it on the card too.
                graduationYear={stakeholder.year}
              />
            ))}
          </div>

          {filteredStakeholders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No members found for this year.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
