import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/backend/cloudinary";
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

    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Image data is required" },
        { status: 400 }
      );
    }

    const result = await uploadToCloudinary(image, "goshtghar_products");

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully to Cloudinary",
      url: result.url,
      isLocalFallback: result.isLocalFallback || false,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
