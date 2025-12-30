import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getGoals, addGoal, updateGoal, deleteGoal } from "../controllers/goal.controller.js";

const router = Router();

router.get("/", protect, getGoals);
router.post("/", protect, addGoal);
router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);

export default router;
