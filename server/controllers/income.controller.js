import { utils, writeFile } from "xlsx";
import Income from "../models/income.model.js";

// Add Income Source
export async function addIncome(req, res) {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding income", error: error.message });
  }
}

// Get All Income Sources
export async function getAllIncome(req, res) {
  const userId = req.user.id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching income sources", error: error.message });
  }
}

// Delete All Income Sources
export async function deleteAllIncome(req, res) {
  try {
    const userId = req.user.id;
    await Income.deleteMany({ userId });
    res
      .status(200)
      .json({ message: "All income sources deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting all income sources",
      error: error.message,
    });
  }
}

// Delete Income Source by ID
export async function deleteIncomeWithID(req, res) {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting income", error: error.message });
  }
}

// Update Income Source
export async function updateIncome(req, res) {
  try {
    const { source, amount, date, icon } = req.body;
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      { source, amount, date: new Date(date), icon },
      { new: true, runValidators: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Income source not found" });
    }

    res.status(200).json(updatedIncome);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating income", error: error.message });
  }
}

// Download Income Sources as Excel
export async function downloadIncomeExcel(req, res) {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));

    const wb = utils.book_new();
    const ws = utils.json_to_sheet(data);
    utils.book_append_sheet(wb, ws, "Income");
    writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Error downloading income Excel",
      error: error.message,
    });
  }
}
