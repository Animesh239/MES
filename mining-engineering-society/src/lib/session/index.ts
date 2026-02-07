import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export interface SessionData {
  userId: number;
  username: string;
  role: string;
  expires: Date;
}

export async function createSession(
  userId: number,
  username: string,
  role: string
): Promise<string> {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

  const session = await new SignJWT({ userId, username, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expires.getTime() / 1000))
    .sign(secret);

  return session;
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(sessionCookie.value, secret);
    return {
      userId: payload.userId as number,
      username: payload.username as string,
      role: payload.role as string,
      expires: new Date(payload.exp! * 1000),
    };
  } catch {
    return null;
  }
}

export async function setSessionCookie(sessionToken: string): Promise<void> {
  const cookieStore = await cookies();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

  cookieStore.set("session", sessionToken, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null && session.expires > new Date();
}
