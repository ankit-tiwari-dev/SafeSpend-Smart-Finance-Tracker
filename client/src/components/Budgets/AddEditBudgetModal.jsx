import React, { useState, useEffect } from "react";
import moment from "moment";
import Modal from "../Modal";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddEditBudgetModal = ({ isOpen, onClose, onSave, budgetToEdit }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [icon, setIcon] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (budgetToEdit) {
      setAmount(budgetToEdit.limit);
      setCategory(budgetToEdit.category);
      setMonth(budgetToEdit.month);
      setIcon(budgetToEdit.icon || "");
    } else {
      setAmount("");
      setCategory("");
      setMonth(moment().format("YYYY-MM"));
      setIcon("");
    }
    setError(null);
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

    onSave({
      _id: budgetToEdit?._id,
      category: category.trim(),
      limit: Number(amount),
      spent: budgetToEdit?.spent || 0,
      icon,
      month,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={budgetToEdit ? "Edit Budget" : "Add Budget"}
    >
      <div className="flex flex-col gap-4">
        <EmojiPickerPopup
          icon={icon}
          onSelect={(selectedIcon) => setIcon(selectedIcon)}
        />

        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
          placeholder="e.g. Food, Transport"
          type="text"
        />

        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          label="Budget Limit"
          placeholder="e.g. 5000"
          type="number"
        />

        <Input
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          label="Budget Month"
          type="month"
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
            {budgetToEdit ? "Update Budget" : "Add Budget"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditBudgetModal;
