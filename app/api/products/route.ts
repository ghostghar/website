import { NextResponse } from "next/server";
import { dataStore } from "@/backend/store";
import { verifyToken } from "@/backend/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat") || undefined;
    const search = searchParams.get("search") || undefined;
    const topPick = searchParams.get("topPick") === "true" ? true : undefined;

    const products = await dataStore.getProducts(cat, search, topPick);
    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch products" },
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

    const body = await req.json();
    if (!body.name || !body.cat || !body.newPrice) {
      return NextResponse.json(
        { success: false, error: "Product name, category, and price are required" },
        { status: 400 }
      );
    }

    const createdProduct = await dataStore.createProduct(body);

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: createdProduct,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
