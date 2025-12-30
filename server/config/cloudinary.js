import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Validate Cloudinary credentials
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (
  !cloudName ||
  !apiKey ||
  !apiSecret ||
  cloudName === "your-cloudinary-cloud-name" ||
  apiKey === "your-cloudinary-api-key" ||
  apiSecret === "your-cloudinary-api-secret"
) {
  console.warn("⚠️ Warning: Cloudinary credentials not configured properly!");
  console.warn(
    "Please update your .env file with valid Cloudinary credentials:"
  );
  console.warn("  - CLOUDINARY_CLOUD_NAME");
  console.warn("  - CLOUDINARY_API_KEY");
  console.warn("  - CLOUDINARY_API_SECRET");
  console.warn("Get your credentials from: https://cloudinary.com/console");
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export default cloudinary;
