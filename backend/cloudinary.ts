import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const apiKey = process.env.CLOUDINARY_API_KEY || "";
const apiSecret = process.env.CLOUDINARY_API_SECRET || "";

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export async function uploadToCloudinary(fileData: string, folder = "goshtghar_products") {
  // If credentials are present, upload to Cloudinary
  if (cloudName && apiKey && apiSecret) {
    try {
      const res = await cloudinary.uploader.upload(fileData, {
        folder,
        resource_type: "auto",
      });
      return {
        success: true,
        url: res.secure_url,
        public_id: res.public_id,
      };
    } catch (err: any) {
      console.error("Cloudinary upload failed:", err);
      throw new Error(err.message || "Cloudinary upload failed");
    }
  }

  // Graceful fallback for local development before Cloudinary keys are set
  // Returns the base64 / data URL so image works immediately in admin panel & shop page!
  return {
    success: true,
    url: fileData,
    isLocalFallback: true,
  };
}
