import React, { useState, useEffect } from "react";
import moment from "moment";
import Modal from "../Modal";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { formatAmount } from "../../utils/helper";

const AddEditBudgetModal = ({ isOpen, onClose, onSave, budgetToEdit }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [icon, setIcon] = useState("");
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Populate fields if editing
  useEffect(() => {
    if (budgetToEdit) {
      setAmount(budgetToEdit.limit || "");
      setCategory(budgetToEdit.category || "");
      setMonth(budgetToEdit.month || moment().format("YYYY-MM"));
      setIcon(budgetToEdit.icon || "");
    } else {
      setAmount("");
      setCategory("");
      setMonth(moment().format("YYYY-MM"));
      setIcon("");
    }
    setError(null);
    setIsSaving(false);
  }, [budgetToEdit, isOpen]);

  const handleSave = () => {
    if (!amount || !category) {
      setError("Please fill in all fields.");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setIsSaving(true);

    // Save the budget
    onSave({
      _id: budgetToEdit?._id,
      category: category.trim(),
      limit: Number(amount),
      spent: budgetToEdit?.spent || 0,
      icon,
      month,
    });

    // Close modal after saving
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={budgetToEdit ? "Edit Budget" : "Add Budget"}
    >
      <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
        {/* Emoji picker */}
        <div className="flex justify-center sm:justify-start">
          <EmojiPickerPopup icon={icon} onSelect={(selectedIcon) => setIcon(selectedIcon)} />
        </div>

        {/* Category */}
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
          placeholder="e.g. Food, Transport"
          type="text"
        />

        {/* Amount */}
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          label="Budget Limit"
          placeholder="e.g. 5000"
          type="number"
        />

        {/* Month */}
        <Input
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          label="Budget Month"
          type="month"
        />

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-xs pt-1 text-center sm:text-left">{error}</p>
        )}

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-4">
          <button
            className="w-full sm:w-auto px-4 py-2 text-sm text-[var(--color-text-muted)] opacity-70 hover:opacity-100 hover:bg-[var(--color-divider)] rounded-lg transition-colors border border-transparent hover:border-[var(--color-border)]"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>

          <button
            className="w-full sm:w-auto px-4 py-2 text-sm text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving
              ? "Saving..."
              : budgetToEdit
              ? `Update Budget`
              : `Add Budget`}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditBudgetModal;
