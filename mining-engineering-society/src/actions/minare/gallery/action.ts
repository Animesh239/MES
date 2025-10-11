"use server";

import { galleryTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";

// CRUD Operations for Gallary

export const addGalleryImage = async (imageData: { imageUrl: string }) => {
  const newImage = await DB_Connection.insert(galleryTable)
    .values(imageData)
    .returning();

  if (!newImage) {
    return {
      success: false,
      message: "Failed to add gallery image.",
    };
  }
  return {
    success: true,
    message: "Gallery image added successfully.",
    data: newImage,
  };
};

export const getAllGalleryImages = async () => {
  const imageList = await DB_Connection.select().from(galleryTable);
  if (!imageList) {
    return {
      success: false,
      message: "No gallery images found.",
    };
  }
  return {
    success: true,
    message: "Gallery images retrieved successfully.",
    data: imageList,
  };
};

export const deleteGalleryImage = async (id: number) => {
  const deletedImage = await DB_Connection.delete(galleryTable).where(
    eq(galleryTable.id, id)
  );
  if (!deletedImage) {
    return {
      success: false,
      message: "Failed to delete gallery image.",
    };
  }
  return {
    success: true,
    message: "Gallery image deleted successfully.",
    data: deletedImage,
  };
};
