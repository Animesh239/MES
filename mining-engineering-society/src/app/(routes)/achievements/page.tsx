"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllAchievements } from "@/actions/mes/achievements/action";
import { cn } from "@nextui-org/react";

interface Achievement {
  id: number;
  name: string;
  year: string;
  achievement: string;
  photoUrl: string;
}

export default function AchievementsPage() {
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const result = await getAllAchievements();
        if (result.success && result.data) {
          const data = result.data;
          setAllAchievements(data);

          // Extract unique years
          const uniqueYearStrings = Array.from(
            new Set(
              data.map((item) => item.year).filter((y): y is string => !!y)
            )
          );

          // Sort years descending (assuming numeric years, but handling strings gracefully)
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
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const filteredAchievements = allAchievements.filter(
    (item) => item.year === selectedYear
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
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl xxsm:text-6xl font-bold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
          Students Corner
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Celebrating the exceptional achievements and milestones of our
          talented students.
        </p>
      </div>

      {years.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">
            Achievements will be showcased here soon.
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

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 xxxsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10 justify-items-center animate-in fade-in slide-in-from-bottom-4 duration-500 key={selectedYear}">
            {filteredAchievements.map((item) => (
              <div
                key={item.id}
                className="group relative w-full max-w-[280px] sm:max-w-[300px] h-[380px] sm:h-[420px] perspective-1000"
              >
                {/* Card Container with Flip Logic */}
                <div
                  className="relative w-full h-full duration-700 transition-transform group-hover:[transform:rotateY(180deg)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute inset-0"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-75 blur-sm" />
                    <div className="relative h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-transparent rounded-2xl p-4 flex flex-col items-center justify-between overflow-hidden">
                      {/* Photo */}
                      <div className="relative w-40 h-40 sm:w-48 sm:h-48 mt-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-lg opacity-50" />
                        <Image
                          alt={`${item.name}'s photo`}
                          className="object-cover rounded-full border-3 border-white/10 relative z-10 w-full h-full"
                          src={item.photoUrl}
                          width={192}
                          height={192}
                        />
                      </div>

                      {/* Info (Front) - Name and Year */}
                      <div className="text-center mb-8 w-full z-10">
                        <h3 className="text-xl sm:text-2xl uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 break-words line-clamp-2 px-2">
                          {item.name}
                        </h3>
                        <div className="mt-2 text-white/50 text-sm font-semibold tracking-wider">
                          {item.year}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 [transform:rotateY(180deg)]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-75 blur-sm" />
                    <div className="relative h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-transparent rounded-2xl p-6 flex flex-col items-center justify-center text-center overflow-hidden">
                      <h3 className="text-xl font-bold text-white mb-4">
                        Achievement
                      </h3>

                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-4" />

                      <p className="text-gray-200 text-sm sm:text-base leading-relaxed overflow-y-auto max-h-[250px] scrollbar-hide">
                        {item.achievement}
                      </p>

                      <div className="mt-6 flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-100" />
                        <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No achievements found for {selectedYear}.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
