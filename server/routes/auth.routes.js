import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import uploadMiddleware from "../middleware/upload.middleware.js";
import { registerUser, loginUser, getUserInfo, deleteAccount, updateProfile } from "../controllers/auth.controller.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const { upload } = uploadMiddleware;
const router = Router();

// Helper to create JWT and redirect to client with token
function redirectWithToken(res, user) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  res.redirect(`${clientUrl}/dashboard?token=${token}`);
}

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);
router.put("/update-profile", protect, updateProfile);

router.post("/upload-image", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);

      // Check if it's a Cloudinary authentication error
      if (err.http_code === 401 || err.message?.includes("Unknown API key")) {
        return res.status(500).json({
          message:
            "Cloudinary configuration error. Please check your Cloudinary credentials in the .env file.",
          error: "Invalid Cloudinary API credentials",
        });
      }

      return res.status(400).json({
        message: err.message || "Error uploading file",
      });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      // Cloudinary returns the secure_url in req.file.path
      const imageUrl = req.file.path;
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error("Error processing upload:", error);
      res
        .status(500)
        .json({ message: "Error processing upload", error: error.message });
    }
  });
});

router.delete("/deleteAccount", protect, deleteAccount);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/gmail.send"],
    accessType: "offline",
    prompt: "consent",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      (process.env.CLIENT_URL || "http://localhost:5173") + "/login",
  }),
  (req, res) => {
    // Successful authentication, redirect with token
    redirectWithToken(res, req.user);
  }
);

export default router;
