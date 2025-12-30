import { Types } from "mongoose";
import Budget from "../models/budget.model.js";
import Expense from "../models/expense.model.js";
import moment from "moment";

// Get all budgets for authorized user with real-time spent calculation
export async function getBudgets(req, res) {
  try {
    const userObjectId = new Types.ObjectId(req.user.id);
    const budgets = await Budget.find({ userId: userObjectId }).sort({
      createdAt: -1,
    });

    // For each budget, calculate current spent amount from actual expenses
    const budgetsWithSpent = await Promise.all(
      budgets.map(async (budget) => {
        const startOfMonth = moment(budget.month, "YYYY-MM").startOf("month").toDate();
        const endOfMonth = moment(budget.month, "YYYY-MM").endOf("month").toDate();
        const escapedCategory = budget.category.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const expenses = await Expense.aggregate([
          {
            $match: {
              userId: userObjectId,
              date: { $gte: startOfMonth, $lte: endOfMonth }
            }
          },
          {
            $addFields: {
              trimmedCategory: { $trim: { input: "$category" } }
            }
          },
          {
            $match: {
              trimmedCategory: { $regex: new RegExp(`^${escapedCategory}$`, "i") }
            }
          },
          {
            $group: {
              _id: null,
              totalSpent: { $sum: "$amount" }
            }
          }
        ]);

        const totalSpent = expenses.length > 0 ? expenses[0].totalSpent : 0;

        return {
          ...budget.toObject(),
          spent: totalSpent
        };
      })
    );

    res.status(200).json(budgetsWithSpent);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

// Add new budget
export async function addBudget(req, res) {
  const { category, limit, month, icon } = req.body;
  const budgetMonth = month || moment().format("YYYY-MM");

  try {
    const userId = req.user.id;
    // Check if budget exists for this category/month
    const existingBudget = await Budget.findOne({
      userId,
      category: category.trim(),
      month: budgetMonth,
    });

    if (existingBudget) {
      return res.status(400).json({
        message: "Budget for this category already exists this month.",
      });
    }

    const budget = await Budget.create({
      userId,
      category: category.trim(),
      limit,
      month: budgetMonth,
      icon,
      spent: 0,
    });

    res.status(201).json(budget);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A budget for this category already exists for this month.",
      });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

// Update budget
export async function updateBudget(req, res) {
  const { category, limit, month, icon } = req.body;

  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Check ownership
    if (budget.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updateData = { category: category.trim(), limit, icon };
    if (month) updateData.month = month;

    budget = await Budget.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json(budget);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A budget for this category already exists for this month.",
      });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

// Delete budget
export async function deleteBudget(req, res) {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Keep this check simple for now
    if (budget.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await budget.deleteOne();
    res.status(200).json({ message: "Budget deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
