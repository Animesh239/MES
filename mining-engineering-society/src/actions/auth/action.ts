"use server";

import { eq } from "drizzle-orm";
import { DB_Connection } from "@/lib/db_connection";
import { usersTable } from "@/db/schema";
import { hashPassword, verifyPassword } from "@/lib/hash_password";
import { createSession, setSessionCookie, clearSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if ((!username && !email) || !password) {
    return { error: "Email/Username and password are required" };
  }

  try {
    let users;

    // Find user in database
    if (email) {
      users = await DB_Connection.select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);
    } else {
      users = await DB_Connection.select()
        .from(usersTable)
        .where(eq(usersTable.username, username))
        .limit(1);
    }

    if (users.length === 0) {
      return { error: "Invalid credentials" };
    }

    const user = users[0];

    // Verify password
    if (!verifyPassword(password, user.password)) {
      return { error: "Invalid credentials" };
    }

    // Create session
    const userRole = user.role || "user";
    const sessionToken = await createSession(user.id, user.username, userRole);
    await setSessionCookie(sessionToken);

    if (userRole === "admin") {
      redirect("/dashboard");
    } else {
      redirect("/dashboard/user");
    }
  } catch (error) {
    // Check if it's a redirect error (which is expected)
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest: unknown }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      // Re-throw redirect errors as they are expected
      throw error;
    }

    console.error("Login error:", error);
    return { error: "An error occurred during login" };
  }
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}

export async function createUserAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const collegeName = formData.get("collegeName") as string;
  const branch = formData.get("branch") as string;
  const graduationYear = formData.get("graduationYear") as string;
  const degree = formData.get("degree") as string;

  if (
    !username ||
    !password ||
    !name ||
    !email ||
    !phoneNumber ||
    !collegeName ||
    !branch ||
    !graduationYear ||
    !degree
  ) {
    return { error: "All fields are required" };
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

    const [newUser] = await DB_Connection.insert(usersTable)
      .values({
        username,
        password: hashedPassword,
        name,
        email,
        phoneNumber,
        collegeName,
        branch,
        graduationYear,
        degree,
        role: "user",
        createdAt,
      })
      .returning();

    // Auto login after signup
    const sessionToken = await createSession(
      newUser.id,
      newUser.username,
      "user"
    );
    await setSessionCookie(sessionToken);

    redirect("/dashboard/user");
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    console.error("Create user error:", error);
    return { error: "An error occurred while creating user" };
  }
}

export async function getUserDetails(userId: number) {
  try {
    const users = await DB_Connection.select({
      id: usersTable.id,
      username: usersTable.username,
      name: usersTable.name,
      email: usersTable.email,
      phoneNumber: usersTable.phoneNumber,
      collegeName: usersTable.collegeName,
      branch: usersTable.branch,
      graduationYear: usersTable.graduationYear,
      degree: usersTable.degree,
      role: usersTable.role,
      createdAt: usersTable.createdAt,
    })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (users.length === 0) {
      return { error: "User not found" };
    }

    return { data: users[0] };
  } catch (error) {
    console.error("Error fetching user details:", error);
    return { error: "Failed to fetch user details" };
  }
}
