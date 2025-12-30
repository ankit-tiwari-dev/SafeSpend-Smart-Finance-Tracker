import Goal from "../models/goal.model.js";

// Get all goals
export async function getGoals(req, res) {
  try {
    const goals = await Goal.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

// Add new goal
export async function addGoal(req, res) {
  const { title, targetAmount, deadline, currentAmount } = req.body;

  try {
    const goal = await Goal.create({
      userId: req.user.id,
      title,
      targetAmount,
      currentAmount: currentAmount || 0,
      deadline,
      color: req.body.color || "#2563eb",
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

// Delete goal
export async function deleteGoal(req, res) {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    if (goal.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await goal.deleteOne();
    res.status(200).json({ message: "Goal deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
// Update goal
export async function updateGoal(req, res) {
  const { title, targetAmount, currentAmount, deadline, color } = req.body;

  try {
    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    if (goal.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { title, targetAmount, currentAmount, deadline, color },
      { new: true, runValidators: true }
    );

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
