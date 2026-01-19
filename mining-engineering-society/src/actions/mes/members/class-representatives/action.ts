"use server";

import { classRepresentativesTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

// CRUD Operations for Class Representatives

export const addClassRepresentative = async (repData: {
  name: string;
  batch: string;
  photoUrl: string;
  linkedInProfile?: string;
}) => {
  const newRep = await DB_Connection.insert(classRepresentativesTable)
    .values(repData)
    .returning();

  if (!newRep) {
    return {
      success: false,
      message: "Failed to add class representative.",
    };
  }
  return {
    success: true,
    message: "Class representative added successfully.",
    data: newRep,
  };
};

export const getAllClassRepresentatives = async () => {
  noStore();
  const repList = await DB_Connection.select().from(classRepresentativesTable);
  if (!repList) {
    return {
      success: false,
      message: "No class representatives found.",
    };
  }
  return {
    success: true,
    message: "Class representatives retrieved successfully.",
    data: repList,
  };
};

export const updateClassRepresentative = async (
  id: number,
  updatedData: {
    name?: string;
    batch?: string;
    photoUrl?: string;
    linkedInProfile?: string;
  }
) => {
  const updatedRep = await DB_Connection.update(classRepresentativesTable)
    .set(updatedData)
    .where(eq(classRepresentativesTable.id, id))
    .returning();

  if (!updatedRep) {
    return {
      success: false,
      message: "Failed to update class representative.",
    };
  }
  return {
    success: true,
    message: "Class representative updated successfully.",
    data: updatedRep,
  };
};

export const deleteClassRepresentative = async (id: number) => {
  try {
    await DB_Connection.delete(classRepresentativesTable).where(
      eq(classRepresentativesTable.id, id)
    );

    return {
      success: true,
      message: "Class representative deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting class representative:", error);
    return {
      success: false,
      message: "Failed to delete class representative.",
    };
  }
};
