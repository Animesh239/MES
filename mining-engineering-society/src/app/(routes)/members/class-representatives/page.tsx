"use client";

import { useEffect, useState } from "react";
import MemberCard from "@/components/ui/card";
import { getAllClassRepresentatives } from "@/actions/mes/members/class-representatives/action";
import { cn } from "@nextui-org/react";

interface ClassRepresentative {
  id: number;
  name: string;
  batch: string;
  class?: string | null;
  photoUrl: string;
  linkedInProfile?: string | null;
}

export default function ClassRepresentativesPage() {
  const [allRepresentatives, setAllRepresentatives] = useState<
    ClassRepresentative[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string>("B.Tech");
  const [selectedBatch, setSelectedBatch] = useState<string>("");

  // Extracted unique values for filters
  const [classes, setClasses] = useState<string[]>([]);
  // const [batches, setBatches] = useState<string[]>([]);

  useEffect(() => {
    const fetchRepresentatives = async () => {
      try {
        const result = await getAllClassRepresentatives();
        if (result.success && result.data) {
          const data = result.data;
          setAllRepresentatives(data);

          // Extract Unique Classes
          const uniqueClasses = Array.from(
            new Set(
              data.map((match) => match.class || "B.Tech").filter(Boolean)
            )
          ).sort();
          setClasses(uniqueClasses);

          // Extract Unique Batches
          const uniqueBatches = Array.from(
            new Set(data.map((match) => match.batch).filter(Boolean))
          ).sort((a, b) => b.localeCompare(a)); // Descending order
          // setBatches(uniqueBatches);

          // Set default selections
          if (uniqueClasses.length > 0) {
            // Prefer B.Tech if available
            setSelectedClass(
              uniqueClasses.includes("B.Tech") ? "B.Tech" : uniqueClasses[0]
            );
          }
          if (uniqueBatches.length > 0) {
            setSelectedBatch(uniqueBatches[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching class representatives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepresentatives();
  }, []);

  // Filter Logic
  const filteredReps = allRepresentatives.filter((rep) => {
    const repClass = rep.class || "B.Tech"; // Default to B.Tech if null
    return repClass === selectedClass && rep.batch === selectedBatch;
  });

  // Calculate Batches available for the selected class to potentially hide empty batches (optional)
  // For now, we show global batches or we could filter batches based on class.
  // Let's filter batches based on selected class to be more user friendly.
  const availableBatchesForClass = Array.from(
    new Set(
      allRepresentatives
        .filter((rep) => (rep.class || "B.Tech") === selectedClass)
        .map((rep) => rep.batch)
        .filter(Boolean)
    )
  ).sort((a, b) => b.localeCompare(a));

  // Auto-select first batch if current selection is invalid for new class
  useEffect(() => {
    if (
      availableBatchesForClass.length > 0 &&
      !availableBatchesForClass.includes(selectedBatch)
    ) {
      setSelectedBatch(availableBatchesForClass[0]);
    }
  }, [selectedClass, availableBatchesForClass, selectedBatch]);

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

      {allRepresentatives.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">
            Class representatives will be listed here.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Filters Container */}
          <div className="flex flex-col items-center space-y-8">
            {/* Class Tabs */}
            <div className="flex flex-wrap justify-center gap-4">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={cn(
                    "px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 border border-white/10",
                    selectedClass === cls
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-105"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {cls}
                </button>
              ))}
            </div>

            {/* Batch Tabs (Secondary Filter) */}
            {availableBatchesForClass.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {availableBatchesForClass.map((batch) => (
                  <button
                    key={batch}
                    onClick={() => setSelectedBatch(batch)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border border-white/10",
                      selectedBatch === batch
                        ? "bg-white text-black shadow-lg scale-105"
                        : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
                    )}
                  >
                    Batch {batch}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Representatives Grid */}
          <div className="min-h-[400px]">
            {filteredReps.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  No representatives found for {selectedClass} - {selectedBatch}
                  .
                </p>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 xxsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10 justify-items-center animate-in fade-in slide-in-from-bottom-4 duration-500"
                key={`${selectedClass}-${selectedBatch}`}
              >
                {filteredReps.map((rep) => (
                  <MemberCard
                    key={rep.id}
                    name={rep.name}
                    imgURL={rep.photoUrl}
                    linkedInProfile={rep.linkedInProfile}
                    graduationYear={rep.batch}
                    position={`${selectedClass} Representative`}
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
