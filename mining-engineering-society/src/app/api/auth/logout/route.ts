import { NextResponse } from "next/server";
import { logoutAction } from "@/actions/auth/action";

export async function POST() {
  try {
    await logoutAction();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
