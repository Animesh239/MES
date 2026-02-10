"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { updateRegistrationStatus } from "@/actions/minare/registration/action";
import { toast } from "react-hot-toast";

interface Registration {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  collegeName: string;
  branch: string;
  graduationYear: string;
  photoUrl: string | null;
  paymentProofUrl: string;
  status: string;
  createdAt: string;
  gender?: string | null;
}

export function RegistrationsTable({
  initialData,
}: {
  initialData: Registration[];
}) {
  const [registrations, setRegistrations] =
    useState<Registration[]>(initialData);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleStatusUpdate = async (
    id: number,
    status: "approved" | "rejected"
  ) => {
    setLoadingId(id);
    try {
      const result = await updateRegistrationStatus(id, status);
      if (result.success) {
        setRegistrations((prev) =>
          prev.map((reg) => (reg.id === id ? { ...reg, status } : reg))
        );
        toast.success(`Registration ${status}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setLoadingId(null);
    }
  };

  const downloadCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "College",
      "Branch",
      "Year",
      "Gender",
      "Status",
      "Payment Proof",
    ];

    const csvContent = [
      headers.join(","),
      ...registrations.map((reg) =>
        [
          `"${reg.name}"`,
          `"${reg.email}"`,
          `"${reg.phoneNumber}"`,
          `"${reg.collegeName}"`,
          `"${reg.branch}"`,
          `"${reg.graduationYear}"`,
          `"${reg.gender || "N/A"}"`,
          `"${reg.status}"`,
          `"${reg.paymentProofUrl}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "minare_registrations.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={downloadCSV}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export CSV
        </Button>
      </div>
      <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">College</TableHead>
              <TableHead className="text-gray-400">Branch/Year</TableHead>
              <TableHead className="text-gray-400">Gender</TableHead>
              <TableHead className="text-gray-400">Proof</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.length === 0 ? (
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-500 py-8"
                >
                  No registrations found.
                </TableCell>
              </TableRow>
            ) : (
              registrations.map((reg) => (
                <TableRow
                  key={reg.id}
                  className="border-white/10 hover:bg-white/5"
                >
                  <TableCell className="font-medium text-white">
                    <div>{reg.name}</div>
                    <div className="text-xs text-gray-500">{reg.email}</div>
                    <div className="text-xs text-gray-500">
                      {reg.phoneNumber}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {reg.collegeName}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {reg.branch} - {reg.graduationYear}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {reg.gender || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs border-white/20 hover:bg-white/10"
                        >
                          View Proof
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-black/90 border-white/10 text-white sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Payment Proof - {reg.name}</DialogTitle>
                        </DialogHeader>
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-white/5">
                          <Image
                            src={reg.paymentProofUrl}
                            alt="Payment Proof"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        reg.status === "approved"
                          ? "bg-green-500/10 text-green-500"
                          : reg.status === "rejected"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-green-500 hover:text-green-400 hover:bg-green-500/20"
                      onClick={() => handleStatusUpdate(reg.id, "approved")}
                      disabled={
                        loadingId === reg.id || reg.status === "approved"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-red-500/20"
                      onClick={() => handleStatusUpdate(reg.id, "rejected")}
                      disabled={
                        loadingId === reg.id || reg.status === "rejected"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
