import { Router } from "express";
import { addExpense, getAllExpense, deleteAllExpenses, deleteExpenseWithID, downloadExpenseExcel, updateExpense } from "../controllers/expense.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/all", protect, deleteAllExpenses);
router.delete("/:id", protect, deleteExpenseWithID);
router.put("/:id", protect, updateExpense);

export default router;
