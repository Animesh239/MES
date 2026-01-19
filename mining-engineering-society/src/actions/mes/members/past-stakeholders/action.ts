"use server";

import { pastStakeholdersTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

// CRUD Operations for Past Stakeholders

export const addPastStakeholder = async (stakeholderData: {
  name: string;
  role: string;
  year: string;
  numericYear?: number;
  photoUrl: string;
  linkedInProfile?: string;
}) => {
  const newStakeholder = await DB_Connection.insert(pastStakeholdersTable)
    .values(stakeholderData)
    .returning();

  if (!newStakeholder) {
    return {
      success: false,
      message: "Failed to add past stakeholder.",
    };
  }
  return {
    success: true,
    message: "Past stakeholder added successfully.",
    data: newStakeholder,
  };
};

export const getAllPastStakeholders = async () => {
  noStore();
  const stakeholderList = await DB_Connection.select().from(
    pastStakeholdersTable
  );
  if (!stakeholderList) {
    return {
      success: false,
      message: "No past stakeholders found.",
    };
  }
  return {
    success: true,
    message: "Past stakeholders retrieved successfully.",
    data: stakeholderList,
  };
};

export const getPastStakeholdersByYear = async (year: string) => {
  noStore();
  const stakeholderList = await DB_Connection.select()
    .from(pastStakeholdersTable)
    .where(eq(pastStakeholdersTable.year, year));

  if (!stakeholderList) {
    return {
      success: false,
      message: `No past stakeholders found for year ${year}.`,
    };
  }
  return {
    success: true,
    message: "Past stakeholders retrieved successfully.",
    data: stakeholderList,
  };
};

export const updatePastStakeholder = async (
  id: number,
  updatedData: {
    name?: string;
    role?: string;
    year?: string;
    numericYear?: number;
    photoUrl?: string;
    linkedInProfile?: string;
  }
) => {
  const updatedStakeholder = await DB_Connection.update(pastStakeholdersTable)
    .set(updatedData)
    .where(eq(pastStakeholdersTable.id, id))
    .returning();

  if (!updatedStakeholder) {
    return {
      success: false,
      message: "Failed to update past stakeholder.",
    };
  }
  return {
    success: true,
    message: "Past stakeholder updated successfully.",
    data: updatedStakeholder,
  };
};

export const deletePastStakeholder = async (id: number) => {
  try {
    await DB_Connection.delete(pastStakeholdersTable).where(
      eq(pastStakeholdersTable.id, id)
    );

    return {
      success: true,
      message: "Past stakeholder deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting past stakeholder:", error);
    return {
      success: false,
      message: "Failed to delete past stakeholder.",
    };
  }
};
