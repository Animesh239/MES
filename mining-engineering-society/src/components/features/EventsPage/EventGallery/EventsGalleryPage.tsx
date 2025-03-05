"use client";
import { useState } from "react";
import { SelectYear } from "./Selectyear";
import { YearEventGallery } from "./YearEventGallery";

export const EventsGalleryPage = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 h-auto py-32">
      <SelectYear handleSelectYear={handleSelectYear} />
      <YearEventGallery year={selectedYear} />
    </div>
  );
};
