"use server";

import { DB_Connection as db } from "@/lib/db_connection";
import { minareRegistrationsTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { usersTable } from "@/db/schema";

export async function submitRegistration(
  userId: number,
  paymentProofUrl: string
) {
  try {
    if (!userId || !paymentProofUrl) {
      return { success: false, error: "Missing required fields" };
    }

    // Fetch user details
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (users.length === 0) {
      return { success: false, error: "User not found" };
    }

    const user = users[0];

    await db.insert(minareRegistrationsTable).values({
      name: user.name || user.username,
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      collegeName: user.collegeName || "",
      branch: user.branch || "",
      graduationYear: user.graduationYear || "",
      photoUrl: "", // Optional, or fetch from user if available
      paymentProofUrl: paymentProofUrl,
      userId: userId,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    revalidatePath("/dashboard/user");
    revalidatePath("/dashboard/minare/registrations");
    return { success: true };
  } catch (error) {
    console.error("Registration submission error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed",
    };
  }
}

export async function getUserRegistration(userId: number) {
  try {
    const registrations = await db
      .select()
      .from(minareRegistrationsTable)
      .where(eq(minareRegistrationsTable.userId, userId))
      .limit(1);

    if (registrations.length > 0) {
      return { success: true, data: registrations[0] };
    }
    return { success: true, data: null };
  } catch (error) {
    console.error("Error fetching user registration:", error);
    return { success: false, error: "Failed to fetch registration" };
  }
}

export async function getMinareRegistrations() {
  try {
    const registrations = await db
      .select()
      .from(minareRegistrationsTable)
      .orderBy(desc(minareRegistrationsTable.createdAt));
    return { success: true, data: registrations };
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return { success: false, error: "Failed to fetch registrations" };
  }
}

export async function updateRegistrationStatus(
  id: number,
  status: "approved" | "rejected"
) {
  try {
    await db
      .update(minareRegistrationsTable)
      .set({ status, updatedAt: new Date().toISOString() })
      .where(eq(minareRegistrationsTable.id, id));

    revalidatePath("/dashboard/minare/registrations");
    return { success: true };
  } catch (error) {
    console.error("Error updating registration status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
