import multer from "multer";
import { CloudinaryStorage as cloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Configure Cloudinary storage for multer
const storage = new cloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "expense-tracker",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [
      {
        width: 500,
        height: 500,
        crop: "limit",
        quality: "auto",
      },
    ],
  },
});

// Filter for allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (allowedTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."
      ),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

export default { upload };
