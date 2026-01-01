import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Input from "../Inputs/Input";

const AddEditGoalModal = ({ isOpen, onClose, onSave, goalToEdit }) => {
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (goalToEdit) {
      setTitle(goalToEdit.title || "");
      setTargetAmount(goalToEdit.targetAmount || "");
      setCurrentAmount(goalToEdit.currentAmount || "");
      setDeadline(
        goalToEdit.deadline
          ? new Date(goalToEdit.deadline).toISOString().split("T")[0]
          : ""
      );
    } else {
      setTitle("");
      setTargetAmount("");
      setCurrentAmount("");
      setDeadline("");
    }
    setError(null);
  }, [goalToEdit, isOpen]);

  const handleSave = () => {
    if (!title || !targetAmount) {
      setError("Please fill in title and target amount.");
      return;
    }

    if (isNaN(targetAmount) || Number(targetAmount) <= 0) {
      setError("Please enter a valid target amount.");
      return;
    }

    onSave({
      _id: goalToEdit?._id,
      title: title.trim(),
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount) || 0,
      deadline: deadline ? new Date(deadline) : null,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={goalToEdit ? "Edit Goal" : "Add Goal"}
    >
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Inputs */}
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Goal Title"
          placeholder="e.g. New Laptop"
          type="text"
        />

        <Input
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          label="Target Amount"
          placeholder="e.g. 50000"
          type="number"
        />

        <Input
          value={currentAmount}
          onChange={(e) => setCurrentAmount(e.target.value)}
          label="Saved So Far (Optional)"
          placeholder="e.g. 10000"
          type="number"
        />

        <Input
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          label="Target Date (Optional)"
          type="date"
        />

        {/* Error */}
        {error && (
          <p className="text-red-500 text-xs sm:text-sm pt-1">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-semibold text-[var(--color-text-muted)] opacity-70 hover:opacity-100 hover:bg-[var(--color-divider)] rounded-xl transition-all border border-transparent hover:border-[var(--color-border)]"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            {goalToEdit ? "Update Goal" : "Add Goal"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditGoalModal;
