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
      setTitle(goalToEdit.title);
      setTargetAmount(goalToEdit.targetAmount);
      setCurrentAmount(goalToEdit.currentAmount);
      setDeadline(
        goalToEdit.deadline
          ? new Date(goalToEdit.deadline).toISOString().split("T")[0]
          : "",
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
      title,
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
      <div className="flex flex-col gap-4">
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

        {error && <p className="text-red-500 text-xs pt-2">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 text-sm text-[var(--color-text-muted)] opacity-60 hover:bg-[var(--color-divider)] rounded-lg transition-colors border border-transparent hover:border-[var(--color-border)]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
            onClick={handleSave}
          >
            {goalToEdit ? "Update Goal" : "Add Goal"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditGoalModal;
