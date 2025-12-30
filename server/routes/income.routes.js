import { Router } from "express";
import { addIncome, getAllIncome, deleteAllIncome, deleteIncomeWithID, downloadIncomeExcel, updateIncome } from "../controllers/income.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/all", protect, deleteAllIncome);
router.delete("/:id", protect, deleteIncomeWithID);
router.put("/:id", protect, updateIncome);

export default router;
