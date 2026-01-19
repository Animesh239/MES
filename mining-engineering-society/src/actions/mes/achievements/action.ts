"use server";

import { achievementsTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

// CRUD Operations for Achievements

export const addAchievement = async (achievementData: {
  name: string;
  year: string;
  achievement: string;
  photoUrl: string;
}) => {
  const newAchievement = await DB_Connection.insert(achievementsTable)
    .values(achievementData)
    .returning();

  if (!newAchievement) {
    return {
      success: false,
      message: "Failed to add achievement.",
    };
  }
  return {
    success: true,
    message: "Achievement added successfully.",
    data: newAchievement,
  };
};

export const getAllAchievements = async () => {
  noStore();
  const achievementList = await DB_Connection.select().from(achievementsTable);
  if (!achievementList) {
    return {
      success: false,
      message: "No achievements found.",
    };
  }
  return {
    success: true,
    message: "Achievements retrieved successfully.",
    data: achievementList,
  };
};

export const updateAchievement = async (
  id: number,
  updatedData: {
    name?: string;
    year?: string;
    achievement?: string;
    photoUrl?: string;
  }
) => {
  const updatedAchievement = await DB_Connection.update(achievementsTable)
    .set(updatedData)
    .where(eq(achievementsTable.id, id))
    .returning();

  if (!updatedAchievement) {
    return {
      success: false,
      message: "Failed to update achievement.",
    };
  }
  return {
    success: true,
    message: "Achievement updated successfully.",
    data: updatedAchievement,
  };
};

export const deleteAchievement = async (id: number) => {
  try {
    await DB_Connection.delete(achievementsTable).where(
      eq(achievementsTable.id, id)
    );

    return {
      success: true,
      message: "Achievement deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting achievement:", error);
    return {
      success: false,
      message: "Failed to delete achievement.",
    };
  }
};
