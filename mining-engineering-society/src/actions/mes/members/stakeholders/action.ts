import { stakeholdersTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";

// CRUD Operations for Stakeholders

export const addStakeholder = async (stakeholderData: {
  name: string;
  role: string;
  tenure: string;
}) => {
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

export const updateStakeholder = async (
  name: string,
  updatedData: {
    name?: string;
    role?: string;
    tenure?: string;
  }
) => {
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
  const deletedStakeholder = await DB_Connection.delete(
    stakeholdersTable
  ).where(eq(stakeholdersTable.name, name));

  if (!deletedStakeholder) {
    return {
      success: false,
      message: "Failed to delete stakeholder.",
    };
  }
  return {
    success: true,
    message: "Stakeholder deleted successfully.",
    data: deletedStakeholder,
  };
};
