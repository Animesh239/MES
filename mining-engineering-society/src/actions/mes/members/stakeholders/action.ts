"use server";

import { stakeholdersTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

// CRUD Operations for Stakeholders

export const addStakeholder = async (stakeholderData: {
  name: string;
  role: string;
  tenure: string;
  photoUrl: string;
  linkedInProfile?: string;
}) => {
  // Validate tenure field
  if (
    stakeholderData.tenure !== "current" &&
    stakeholderData.tenure !== "past"
  ) {
    return {
      success: false,
      message: "Tenure must be either 'current' or 'past'.",
    };
  }

  const newStakeholder = await DB_Connection.insert(stakeholdersTable)
    .values(stakeholderData)
    .returning();

  if (!newStakeholder) {
    return {
      success: false,
      message: "Failed to add stakeholder.",
    };
  }
  return {
    success: true,
    message: "Stakeholder added successfully.",
    data: newStakeholder,
  };
};

export const getAllStakeholders = async () => {
  noStore();
  const stakeholderList = await DB_Connection.select().from(stakeholdersTable);
  if (!stakeholderList) {
    return {
      success: false,
      message: "No stakeholders found.",
    };
  }
  return {
    success: true,
    message: "Stakeholders retrieved successfully.",
    data: stakeholderList,
  };
};

export const getCurrentStakeholders = async () => {
  noStore();
  const stakeholderList = await DB_Connection.select()
    .from(stakeholdersTable)
    .where(eq(stakeholdersTable.tenure, "current"));
  if (!stakeholderList) {
    return {
      success: false,
      message: "No current stakeholders found.",
    };
  }
  return {
    success: true,
    message: "Current stakeholders retrieved successfully.",
    data: stakeholderList,
  };
};

export const getPastStakeholders = async () => {
  noStore();
  const stakeholderList = await DB_Connection.select()
    .from(stakeholdersTable)
    .where(eq(stakeholdersTable.tenure, "past"));
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

export const updateStakeholder = async (
  name: string,
  updatedData: {
    name?: string;
    role?: string;
    tenure?: string;
    photoUrl?: string;
    linkedInProfile?: string;
  }
) => {
  // Validate tenure field if it's being updated
  if (
    updatedData.tenure &&
    updatedData.tenure !== "current" &&
    updatedData.tenure !== "past"
  ) {
    return {
      success: false,
      message: "Tenure must be either 'current' or 'past'.",
    };
  }

  const updatedStakeholder = await DB_Connection.update(stakeholdersTable)
    .set(updatedData)
    .where(eq(stakeholdersTable.name, name))
    .returning();

  if (!updatedStakeholder) {
    return {
      success: false,
      message: "Failed to update stakeholder.",
    };
  }
  return {
    success: true,
    message: "Stakeholder updated successfully.",
    data: updatedStakeholder,
  };
};

export const deleteStakeholder = async (name: string) => {
  try {
    await DB_Connection.delete(stakeholdersTable).where(
      eq(stakeholdersTable.name, name)
    );

    return {
      success: true,
      message: "Stakeholder deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting stakeholder:", error);
    return {
      success: false,
      message: "Failed to delete stakeholder.",
    };
  }
};
