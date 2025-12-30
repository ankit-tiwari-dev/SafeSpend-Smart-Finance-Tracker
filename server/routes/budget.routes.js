import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getBudgets, addBudget, updateBudget, deleteBudget } from "../controllers/budget.controller.js";

const router = Router();

router.get("/", protect, getBudgets);
router.post("/", protect, addBudget);
router.put("/:id", protect, updateBudget);
router.delete("/:id", protect, deleteBudget);

export default router;
