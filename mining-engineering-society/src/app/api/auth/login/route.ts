import { NextRequest, NextResponse } from "next/server";
import { loginAction } from "@/actions/auth/action";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const result = await loginAction(formData);

    if (result?.error) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
