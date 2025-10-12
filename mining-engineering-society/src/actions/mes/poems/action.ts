"use server";

import { poemsTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";

// CRUD Operations for Poems

export const addPoem = async (poemData: {
  title: string;
  content: string; // MDX content
  author: string;
  publishDate: string;
}) => {
  const newPoem = await DB_Connection.insert(poemsTable)
    .values(poemData)
    .returning();

  if (!newPoem) {
    return {
      success: false,
      message: "Failed to add poem.",
    };
  }
  return {
    success: true,
    message: "Poem added successfully.",
    data: newPoem,
  };
};

export const getAllPoems = async () => {
  const poemsList = await DB_Connection.select().from(poemsTable);
  if (!poemsList) {
    return {
      success: false,
      message: "No poems found.",
    };
  }
  return {
    success: true,
    message: "Poems retrieved successfully.",
    data: poemsList,
  };
};

export const getPoemById = async (id: number) => {
  const poem = await DB_Connection.select()
    .from(poemsTable)
    .where(eq(poemsTable.id, id));

  if (!poem || poem.length === 0) {
    return {
      success: false,
      message: "Poem not found.",
    };
  }
  return {
    success: true,
    message: "Poem retrieved successfully.",
    data: poem[0],
  };
};

export const updatePoem = async (
  id: number,
  updatedData: {
    title?: string;
    content?: string;
    author?: string;
    publishDate?: string;
  }
) => {
  const updatedPoem = await DB_Connection.update(poemsTable)
    .set(updatedData)
    .where(eq(poemsTable.id, id))
    .returning();

  if (!updatedPoem) {
    return {
      success: false,
      message: "Failed to update poem.",
    };
  }
  return {
    success: true,
    message: "Poem updated successfully.",
    data: updatedPoem,
  };
};

export const deletePoem = async (id: number) => {
  const deletedPoem = await DB_Connection.delete(poemsTable).where(
    eq(poemsTable.id, id)
  );
  if (!deletedPoem) {
    return {
      success: false,
      message: "Failed to delete poem.",
    };
  }
  return {
    success: true,
    message: "Poem deleted successfully.",
  };
};
