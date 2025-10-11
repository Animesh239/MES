'use server';

import { membersTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";

// CRUD Operations for Members

export const addMember = async (memberData: {
  name: string;
  role: string;
  photoUrl: string;
}) => {
  const newMember = await DB_Connection.insert(membersTable)
    .values(memberData)
    .returning();

  if (!newMember) {
    return {
      success: false,
      message: "Failed to add member.",
    };
  }
  return {
    success: true,
    message: "Member added successfully.",
    data: newMember,
  };
};

export const getAllMembers = async () => {
  const memberList = await DB_Connection.select().from(membersTable);
  if (!memberList) {
    return {
      success: false,
      message: "No members found.",
    };
  }
  return {
    success: true,
    message: "Members retrieved successfully.",
    data: memberList,
  };
};

export const updateMember = async (
  name: string,
  updatedData: {
    name?: string;
    role?: string;
    photoUrl?: string;
  }
) => {
  const updatedMember = await DB_Connection.update(membersTable)
    .set(updatedData)
    .where(eq(membersTable.name, name))
    .returning();

  if (!updatedMember) {
    return {
      success: false,
      message: "Failed to update member.",
    };
  }
  return {
    success: true,
    message: "Member updated successfully.",
    data: updatedMember,
  };
};

export const deleteMember = async (name: string) => {
  const deletedMember = await DB_Connection.delete(membersTable).where(
    eq(membersTable.name, name)
  );
  if (!deletedMember) {
    return {
      success: false,
      message: "Failed to delete member.",
    };
  }
  return {
    success: true,
    message: "Member deleted successfully.",
  };
};
