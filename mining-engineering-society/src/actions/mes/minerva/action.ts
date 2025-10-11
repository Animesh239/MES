import { minervaTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";

// CRUD Operations for Minerva

export const addMinerva = async (minervaData: {
  title: string;
  issueDate: string;
  pdfLink: string;
  coverImageLink: string;
}) => {
  const newMinerva = await DB_Connection.insert(minervaTable)
    .values(minervaData)
    .returning();

  if (!newMinerva) {
    return {
      success: false,
      message: "Failed to add Minerva issue.",
    };
  }
  return {
    success: true,
    message: "Minerva issue added successfully.",
    data: newMinerva,
  };
};

export const getAllMinerva = async () => {
  const minervaList = await DB_Connection.select().from(minervaTable);
  if (!minervaList) {
    return {
      success: false,
      message: "No Minerva issues found.",
    };
  }
  return {
    success: true,
    message: "Minerva issues retrieved successfully.",
    data: minervaList,
  };
};

export const updateMinerva = async (
  title: string,
  updatedData: {
    title?: string;
    issueDate?: string;
    pdfLink?: string;
    coverImageLink?: string;
  }
) => {
  const updatedMinerva = await DB_Connection.update(minervaTable)
    .set(updatedData)
    .where(eq(minervaTable.title, title))
    .returning();

  if (!updatedMinerva) {
    return {
      success: false,
      message: "Failed to update Minerva issue.",
    };
  }
  return {
    success: true,
    message: "Minerva issue updated successfully.",
    data: updatedMinerva,
  };
};

export const deleteMinerva = async (title: string) => {
  const deletedMinerva = await DB_Connection.delete(minervaTable).where(
    eq(minervaTable.title, title)
  );
  if (!deletedMinerva) {
    return {
      success: false,
      message: "Failed to delete Minerva issue.",
    };
  }
  return {
    success: true,
    message: "Minerva issue deleted successfully.",
  };
};
