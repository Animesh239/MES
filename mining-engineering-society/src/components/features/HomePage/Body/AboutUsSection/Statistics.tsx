"use client";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Statistics = () => {
  const [statistics, setStatistics] = useState<{
    faculties: number | string;
    students: number | string;
    alumni: number | string;
  }>({
    faculties: 0,
    students: 0,
    alumni: 0,
  });

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    amount: 0.5,
  });

  useEffect(() => {
    if (isInView) {
      const targetCounts = {
        faculties: 14,
        students: 351,
        alumni: 10000,
      };

      let facultiesStart = 0;
      let studentsStart = 0;
      let alumniStart = 0;

      const interval = setInterval(() => {
        setStatistics((prev) => {
          const updated = { ...prev };

          if (facultiesStart < targetCounts.faculties) {
            facultiesStart += 1;
            updated.faculties = facultiesStart;
          }
          if (studentsStart < targetCounts.students) {
            studentsStart += 10;
            updated.students = studentsStart;
          }
          if (alumniStart < targetCounts.alumni) {
            alumniStart += 500;
            updated.alumni = alumniStart;
          }

          return updated;
        });

        if (
          facultiesStart >= targetCounts.faculties &&
          studentsStart >= targetCounts.students &&
          alumniStart >= targetCounts.alumni
        ) {
          clearInterval(interval);
          setStatistics({
            faculties: "14",
            students: "350*",
            alumni: "1200+",
          });
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  const statisticsData = [
    { item: "Faculties", count: statistics.faculties },
    { item: "Students", count: statistics.students },
    { item: "Alumni", count: statistics.alumni },
  ];

  return (
    <div
      ref={ref}
      className="bg-gradient-to-r flex justify-between gap-2 xsm:gap-3 items-center px-5 from-white/[0.01] via-white/[0.10] to-white/[0.01] w-full h-auto py-10 xsm:h-[200px] border-t-[1px] border-b-[1px] border-white/[0.10]"
    >
      <div className="text-white/[0.9] font-bold text-lg xsm:text-xl sm:text-2xl md:text-4xl">
        Members in MES
      </div>
      {statisticsData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center gap-2"
        >
          <div className="text-white text-base xsm:text-lg sm:text-xl md:text-3xl font-semibold leading-relaxed tracking-wider">
            {item.count}
          </div>
          <div className="text-white/[0.5] text-xs xsm:text-base sm:text-xl font-normal leading-relaxed tracking-wider">
            {item.item}
          </div>
        </div>
      ))}
    </div>
  );
};
