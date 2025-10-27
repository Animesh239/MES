"use server";

import { alumniTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";

// CRUD Operations for Alumni

export const addAlumni = async (alumniData: {
  name: string;
  graduationYear: string;
  currentPosition: string;
  company: string;
  photoUrl: string;
  linkedInProfile?: string;
}) => {
  const newAlumni = await DB_Connection.insert(alumniTable)
    .values(alumniData)
    .returning();

  if (!newAlumni) {
    return {
      success: false,
      message: "Failed to add alumni.",
    };
  }
  return {
    success: true,
    message: "Alumni added successfully.",
    data: newAlumni,
  };
};

export const getAllAlumni = async () => {
  const alumniList = await DB_Connection.select().from(alumniTable);
  if (!alumniList) {
    return {
      success: false,
      message: "No alumni found.",
    };
  }
  return {
    success: true,
    message: "Alumni retrieved successfully.",
    data: alumniList,
  };
};

export const updateAlumni = async (
  name: string,
  updatedData: {
    name?: string;
    graduationYear?: string;
    currentPosition?: string;
    company?: string;
    photoUrl?: string;
    linkedInProfile?: string;
  }
) => {
  const updatedAlumni = await DB_Connection.update(alumniTable)
    .set(updatedData)
    .where(eq(alumniTable.name, name))
    .returning();

  if (!updatedAlumni) {
    return {
      success: false,
      message: "Failed to update alumni.",
    };
  }
  return {
    success: true,
    message: "Alumni updated successfully.",
    data: updatedAlumni,
  };
};

export const deleteAlumni = async (name: string) => {
  try {
    await DB_Connection.delete(alumniTable).where(eq(alumniTable.name, name));

    return {
      success: true,
      message: "Alumni deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting alumni:", error);
    return {
      success: false,
      message: "Failed to delete alumni.",
    };
  }
};
