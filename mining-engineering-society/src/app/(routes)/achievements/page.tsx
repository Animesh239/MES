"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardBody } from "@nextui-org/react";
import { getAllAchievements } from "@/actions/mes/achievements/action";

interface Achievement {
  id: number;
  name: string;
  year: string;
  achievement: string;
  photoUrl: string;
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const result = await getAllAchievements();
        if (result.success && result.data) {
          setAchievements(result.data);
        }
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

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

      {achievements.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">
            Achievements will be showcased here soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xxxsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10 justify-items-center">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="relative w-full max-w-[280px] sm:max-w-[300px] h-[380px] sm:h-[420px] group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300" />
              <Card
                className="relative py-4 px-3 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-transparent rounded-2xl h-full flex flex-col overflow-hidden transform transition-all duration-300 group-hover:shadow-2xl"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom right, rgba(17, 24, 39, 0.95), rgba(0, 0, 0, 0.98), rgba(17, 24, 39, 0.95))",
                }}
              >
                <CardBody className="py-2 flex flex-col h-full justify-between relative z-10">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                      <Image
                        alt={`${item.name}'s photo`}
                        className="object-cover rounded-full opacity-100 border-3 border-white/10 relative z-10"
                        src={item.photoUrl}
                        width={180}
                        height={180}
                        style={{
                          width: "180px",
                          height: "180px",
                          // sm breakpoint override
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center space-y-2">
                    <h3 className="text-xl sm:text-2xl uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 break-words line-clamp-2 px-2 group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300">
                      {item.name}
                    </h3>
                    <div className="space-y-1">
                      <p className="font-semibold text-sm sm:text-base text-blue-300 group-hover:text-blue-200 px-2 transition-colors duration-300">
                        {item.year}
                      </p>
                      <p className="font-medium text-xs sm:text-sm text-gray-300 group-hover:text-gray-200 line-clamp-3 px-2 transition-colors duration-300">
                        {item.achievement}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
