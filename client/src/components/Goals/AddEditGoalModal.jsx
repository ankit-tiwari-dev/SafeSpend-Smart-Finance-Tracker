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
      setTitle(""); setTargetAmount(""); setCurrentAmount(""); setDeadline("");
    }
    setError(null);
  }, [goalToEdit, isOpen]);

  const handleSave = () => {
    if (!title || !targetAmount) {
      setError("Title and target amount are required.");
      return;
    }
    if (isNaN(targetAmount) || Number(targetAmount) <= 0) {
      setError("Enter a valid target amount.");
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
      title={goalToEdit ? "EDIT GOAL" : "ADD GOAL"}
    >
      {/* 1. CONTAINER: Enforced width and px-4 gutter to fix right-side settlement */}
      <div className="w-full md:w-[380px] px-4 md:px-0 flex flex-col gap-3 mx-auto box-border overflow-hidden">
        
        {/* INPUT GRID: grid-cols-1 ensures proper mobile stacking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3">
          <div className="md:col-span-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="GOAL TITLE"
              placeholder="e.g. New Laptop"
              type="text"
              className="w-full px-3 py-2 text-[11px] leading-tight"
            />
          </div>

          <Input
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            label="TARGET"
            placeholder="50000"
            type="number"
            className="w-full px-3 py-2 text-[11px] leading-tight"
          />

          <Input
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            label="SAVED"
            placeholder="10000"
            type="number"
            className="w-full px-3 py-2 text-[11px] leading-tight"
          />

          <div className="md:col-span-2">
            <Input
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              label="TARGET DATE"
              type="date"
              className="w-full px-3 py-2 text-[11px] leading-tight"
            />
          </div>
        </div>

        {/* ERROR: Compacted matching other modals */}
        {error && (
          <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">
            {error}
          </p>
        )}

        {/* ACTIONS: Standardized scale and "AUTHORIZE" style */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-2 mt-1 pb-1">
          <button
            type="button"
            onClick={onClose}
            className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)] opacity-50 py-1"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="w-full md:w-auto px-6 py-2.5 text-[9px] font-black uppercase tracking-[0.1em] text-white bg-primary rounded-xl shadow-lg active:scale-95 transition-all"
          >
            {goalToEdit ? "UPDATE" : "AUTHORIZE"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditGoalModal;