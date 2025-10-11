import { eventsTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";

// CRUD Operations for Events

export const addEvent = async (eventData: {
  title: string;
  type: string;
  imageLinks: string[];
}) => {
  const newEvent = await DB_Connection.insert(eventsTable)
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

export const getAllEvents = async () => {
  const eventList = await DB_Connection.select().from(eventsTable);
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

export const updateEvent = async (
  title: string,
  updatedData: {
    title?: string;
    type?: string;
    imageLinks?: string[];
  }
) => {
  const updatedEvent = await DB_Connection.update(eventsTable)
    .set(updatedData)
    .where(eq(eventsTable.title, title))
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

export const deleteEvent = async (title: string) => {
  const deletedEvent = await DB_Connection.delete(eventsTable).where(
    eq(eventsTable.title, title)
  );
  if (!deletedEvent) {
    return {
      success: false,
      message: "Failed to delete event.",
    };
  }
  return {
    success: true,
    message: "Event deleted successfully.",
  };
};
