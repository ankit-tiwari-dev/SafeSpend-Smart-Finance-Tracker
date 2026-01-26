import { Router } from "express";
import { submitContact, submitFeedback } from "../controllers/contact.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Public Contact Route
router.post("/contact", submitContact);

// Public/Private Feedback Route (User ID is optional in controller)
// We use a flexible middleware approach or just handle it in the controller checking req.user if middleware was applied
// Since we want allow anonymous feedback, we won't enforce `protect` but we can try to extract user if token exists.
// For simplicity, let's treat it as a public route, but we can support authenticated users if the client sends the token.
// To support both, we might need a "lazy" auth middleware, but for now let's keep it simple.
// If the user IS logged in, the frontend should probably send the request to a protected endpoint or we check the token.
// Let's make a separate route for authenticated feedback if needed, or just keep it public for now.
router.post("/feedback", submitFeedback);

export default router;
