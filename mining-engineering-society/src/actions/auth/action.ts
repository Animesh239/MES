"use server";

import { eq } from "drizzle-orm";
import { DB_Connection } from "@/lib/db_connection";
import { usersTable } from "@/db/schema";
import { hashPassword, verifyPassword } from "@/lib/hash_password";
import { createSession, setSessionCookie, clearSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    // Find user in database
    const users = await DB_Connection.select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);

    if (users.length === 0) {
      return { error: "Invalid username or password" };
    }

    const user = users[0];

    // Verify password
    if (!verifyPassword(password, user.password)) {
      return { error: "Invalid username or password" };
    }

    // Create session
    const sessionToken = await createSession(user.id, user.username);
    await setSessionCookie(sessionToken);

    redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred during login" };
  }
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}

export async function createUserAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    // Check if user already exists
    const existingUsers = await DB_Connection.select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);

    if (existingUsers.length > 0) {
      return { error: "Username already exists" };
    }

    // Hash password and create user
    const hashedPassword = hashPassword(password);
    const createdAt = new Date().toISOString();

    await DB_Connection.insert(usersTable).values({
      username,
      password: hashedPassword,
      createdAt,
    });

    return { success: "User created successfully" };
  } catch (error) {
    console.error("Create user error:", error);
    return { error: "An error occurred while creating user" };
  }
}
