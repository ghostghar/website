import { NextResponse } from "next/server";
import { dataStore } from "@/backend/store";
import { verifyToken } from "@/backend/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await dataStore.getProductById(params.id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: product });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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
    const updated = await dataStore.updateProduct(params.id, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || "";

    if (!verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid or missing admin token" },
        { status: 401 }
      );
    }

    const deleted = await dataStore.deleteProduct(params.id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
