"use server";

import { minareEventsTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

// CRUD Operations for MINARE Events

export const addMinareEvent = async (eventData: {
  title: string;
  type: string;
  imageLinks: string[];
}) => {
  // Validate type field
  if (eventData.type !== "upcoming" && eventData.type !== "past") {
    return {
      success: false,
      message: "Type must be either 'upcoming' or 'past'.",
    };
  }

  const newEvent = await DB_Connection.insert(minareEventsTable)
    .values(eventData)
    .returning();

  if (!newEvent) {
    return {
      success: false,
      message: "Failed to add event.",
    };
  }
  return {
    success: true,
    message: "Event added successfully.",
    data: newEvent,
  };
};

export const getAllMinareEvents = async () => {
  noStore();
  const eventList = await DB_Connection.select().from(minareEventsTable);
  if (!eventList) {
    return {
      success: false,
      message: "No events found.",
    };
  }
  return {
    success: true,
    message: "Events retrieved successfully.",
    data: eventList,
  };
};

export const getUpcomingMinareEvents = async () => {
  noStore();
  const eventList = await DB_Connection.select()
    .from(minareEventsTable)
    .where(eq(minareEventsTable.type, "upcoming"));
  if (!eventList) {
    return {
      success: false,
      message: "No upcoming events found.",
    };
  }
  return {
    success: true,
    message: "Upcoming events retrieved successfully.",
    data: eventList,
  };
};

export const getPastMinareEvents = async () => {
  noStore();
  const eventList = await DB_Connection.select()
    .from(minareEventsTable)
    .where(eq(minareEventsTable.type, "past"));
  if (!eventList) {
    return {
      success: false,
      message: "No past events found.",
    };
  }
  return {
    success: true,
    message: "Past events retrieved successfully.",
    data: eventList,
  };
};

export const updateMinareEvent = async (
  title: string,
  updatedData: {
    title?: string;
    type?: string;
    imageLinks?: string[];
  }
) => {
  // Validate type field if it's being updated
  if (
    updatedData.type &&
    updatedData.type !== "upcoming" &&
    updatedData.type !== "past"
  ) {
    return {
      success: false,
      message: "Type must be either 'upcoming' or 'past'.",
    };
  }

  const updatedEvent = await DB_Connection.update(minareEventsTable)
    .set(updatedData)
    .where(eq(minareEventsTable.title, title))
    .returning();

  if (!updatedEvent) {
    return {
      success: false,
      message: "Failed to update event.",
    };
  }
  return {
    success: true,
    message: "Event updated successfully.",
    data: updatedEvent,
  };
};

export const deleteMinareEvent = async (title: string) => {
  try {
    await DB_Connection.delete(minareEventsTable).where(
      eq(minareEventsTable.title, title)
    );

    return {
      success: true,
      message: "Event deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      success: false,
      message: "Failed to delete event.",
    };
  }
};
