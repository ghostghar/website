import { NextResponse } from "next/server";
import { dataStore } from "@/backend/store";
import { verifyToken } from "@/backend/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await dataStore.getCategories();
    return NextResponse.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

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

    const { name, description } = await req.json();
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      );
    }

    const category = await dataStore.createCategory(name, description);
    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        data: category,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
