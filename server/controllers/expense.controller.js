import { utils, writeFile } from "xlsx";
import Expense from "../models/expense.model.js";

// Add Expense
export async function addExpense(req, res) {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding expense", error: error.message });
  }
}

// Get All Expense
export async function getAllExpense(req, res) {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching expense", error: error.message });
  }
}

// Delete All Expenses
export async function deleteAllExpenses(req, res) {
  try {
    const userId = req.user.id;
    await Expense.deleteMany({ userId });
    res.status(200).json({ message: "All expenses deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting all expenses", error: error.message });
  }
}

// Delete Expense With ID
export async function deleteExpenseWithID(req, res) {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting expense", error: error.message });
  }
}

// Update Expense
export async function updateExpense(req, res) {
  try {
    const { category, amount, date, icon } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { category, amount, date: new Date(date), icon },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating expense", error: error.message });
  }
}

// Download Expense as Excel
export async function downloadExpenseExcel(req, res) {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));

    const wb = utils.book_new();
    const ws = utils.json_to_sheet(data);
    utils.book_append_sheet(wb, ws, "Expense");
    writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Error downloading expense Excel",
      error: error.message,
    });
  }
}
