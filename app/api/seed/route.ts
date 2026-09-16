import { NextResponse } from "next/server";
import { dataStore } from "@/backend/store";
import { verifyToken } from "@/backend/auth";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || "";

    if (!verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid or missing admin token" },
        { status: 401 }
      );
    }

    const result = await dataStore.seedDatabase();
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Database seed error" },
      { status: 500 }
    );
  }
}
