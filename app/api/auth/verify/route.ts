import { NextResponse } from "next/server";
import { verifyToken } from "@/backend/auth";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || "";

    const isValid = verifyToken(token);

    if (!isValid) {
      return NextResponse.json(
        { success: false, valid: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      valid: true,
      message: "Token is valid",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, valid: false, error: err.message || "Failed to verify token" },
      { status: 500 }
    );
  }
}
