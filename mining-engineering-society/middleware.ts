import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function middleware(request: NextRequest) {
  // Check if the request is for dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const session = await getSession();

    if (!session || session.expires < new Date()) {
      // Redirect to login if not authenticated or session expired
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
