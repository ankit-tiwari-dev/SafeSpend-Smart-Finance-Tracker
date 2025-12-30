import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/", protect, getDashboardData);

export default router;
