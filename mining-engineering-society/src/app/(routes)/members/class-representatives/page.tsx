"use client";

import { useEffect, useState } from "react";
import MemberCard from "@/components/ui/card";
import { getAllClassRepresentatives } from "@/actions/mes/members/class-representatives/action";

interface ClassRepresentative {
  id: number;
  name: string;
  batch: string;
  photoUrl: string;
  linkedInProfile?: string | null;
}

export default function ClassRepresentativesPage() {
  const [representatives, setRepresentatives] = useState<ClassRepresentative[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepresentatives = async () => {
      try {
        const result = await getAllClassRepresentatives();
        if (result.success && result.data) {
          // Sort by batch (optional, but good for display)
          // valid assumption: batches might be numbers "2025" or text "Final Year"
          const sorted = result.data.sort((a, b) =>
            a.batch.localeCompare(b.batch)
          );
          setRepresentatives(sorted);
        }
      } catch (error) {
        console.error("Error fetching class representatives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepresentatives();
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
          Class Representatives
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          The voice of every batch, bridging the gap between students and the
          society.
        </p>
      </div>

      {representatives.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">
            Class representatives will be listed here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xxxsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10 justify-items-center">
          {representatives.map((rep) => (
            <MemberCard
              key={rep.id}
              name={rep.name}
              imgURL={rep.photoUrl}
              linkedInProfile={rep.linkedInProfile}
              graduationYear={rep.batch}
              position="Class Representative" // Fallback position text
            />
          ))}
        </div>
      )}
    </div>
  );
}
