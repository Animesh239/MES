"use client";

import React, { useState, useMemo } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { AlumniData } from "@/config/Members/Alumni/Data";

interface Employee {
  slno: number;
  name: string;
  batch: string;
  company: string;
  designation: string;
  contact: string;
}

const sampleData: Employee[] = AlumniData;

export default function AlumniTable() {
  const [data] = useState<Employee[]>(sampleData);
  const [sortColumn, setSortColumn] = useState<keyof Employee>("slno");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [visibleRows, setVisibleRows] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColumn, setFilterColumn] = useState<
    "name" | "batch" | "company"
  >("name");

  const sortData = (column: keyof Employee) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredAndSortedData = useMemo(() => {
    return [...data]
      .filter((employee) =>
        employee[filterColumn].toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [data, sortColumn, sortOrder, searchTerm, filterColumn]);

  const loadMore = () => {
    setVisibleRows((prevVisibleRows) => prevVisibleRows + 10);
  };

  return (
    <div className="container mx-auto p-4 mb-12">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded font-semibold text-lg flex-grow border bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-padding focus:outline-none w-full md:w-auto"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundImage: "linear-gradient(to right, #60A5FA, #9333EA)",
          }}
        />
        <select
          value={filterColumn}
          onChange={(e) =>
            setFilterColumn(e.target.value as "name" | "batch" | "company")
          }
          className="p-3.5 rounded font-semibold text-lg border bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-padding focus:outline-none w-full md:w-auto"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundImage: "linear-gradient(to right, #60A5FA, #9333EA)",
          }}
        >
          <option value="name">Name</option>
          <option value="batch">Batch</option>
          <option value="company">Company</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white font-semibold sm:text-xl">
              {[
                "slno",
                "name",
                "batch",
                "company",
                "designation",
                "contact",
              ].map((column) => (
                <th
                  key={column}
                  className={`p-2 text-left ${
                    ["slno", "name", "batch", "company"].includes(column)
                      ? "cursor-pointer"
                      : ""
                  }`}
                  onClick={() =>
                    ["slno", "name", "batch", "company"].includes(column) &&
                    sortData(column as keyof Employee)
                  }
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  {["slno", "name", "batch", "company"].includes(column) &&
                    (sortColumn === column ? (
                      sortOrder === "asc" ? (
                        <ChevronUpIcon className="inline ml-1" />
                      ) : (
                        <ChevronDownIcon className="inline ml-1" />
                      )
                    ) : null)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.slice(0, visibleRows).map((employee) => (
              <tr key={employee.slno} className="bg-black text-white">
                <td className="p-2 border-t border-gray-700">
                  {employee.slno}
                </td>
                <td className="p-2 border-t border-gray-700">
                  {employee.name}
                </td>
                <td className="p-2 border-t border-gray-700">
                  {employee.batch}
                </td>
                <td className="p-2 border-t border-gray-700">
                  {employee.company}
                </td>
                <td className="p-2 border-t border-gray-700">
                  {employee.designation}
                </td>
                <td className="p-2 border-t border-gray-700">
                  {employee.contact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibleRows < filteredAndSortedData.length && (
        <div className="mt-4 text-center">
          <button
            onClick={loadMore}
            className="px-6 py-2 text-white text-xl font-semibold rounded-xl bg-black border border-white  transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Load More
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
