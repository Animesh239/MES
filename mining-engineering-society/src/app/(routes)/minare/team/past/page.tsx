"use client";

import { useEffect, useState } from "react";
import { getAllMembers } from "@/actions/minare/members/action";
import MemberCard from "@/components/MinareComponents/ui/Members/MembersCard";
import { cn } from "@nextui-org/react";

interface Member {
  id: number;
  name: string;
  role: string;
  photoUrl: string;
  linkedInProfile?: string | null;
  year?: string | null;
  type?: string | null;
}

export default function PastTeamPage() {
  const [pastMembers, setPastMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const result = await getAllMembers();
        if (result.success && result.data) {
          // Filter ONLY past members
          const past = result.data.filter((m) => m.type === "past");
          setPastMembers(past);

          // Extract unique years
          const uniqueYears = Array.from(
            new Set(past.map((m) => m.year).filter(Boolean) as string[])
          ).sort((a, b) => b.localeCompare(a)); // Descending sort

          setYears(uniqueYears);
          if (uniqueYears.length > 0) {
            setSelectedYear(uniqueYears[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = pastMembers.filter((m) => m.year === selectedYear);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl xxsm:text-6xl font-bold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
          Legacy of Leadership
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Honoring the past teams who have shaped Minare into what it is today.
        </p>
      </div>

      {pastMembers.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">No past team records found.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Year Tabs */}
          <div className="flex flex-wrap justify-center gap-4">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={cn(
                  "px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 border border-white/10",
                  selectedYear === year
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-105"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Members Grid */}
          <div className="min-h-[400px]">
            {filteredMembers.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  No members found for {selectedYear}.
                </p>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 xxsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10 justify-items-center animate-in fade-in slide-in-from-bottom-4 duration-500"
                key={selectedYear}
              >
                {filteredMembers.map((member) => (
                  <MemberCard
                    key={member.id}
                    name={member.name}
                    designation={member.role}
                    image={member.photoUrl}
                    linkedInProfile={member.linkedInProfile}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
