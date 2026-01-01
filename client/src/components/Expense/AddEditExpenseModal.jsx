import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddEditExpenseModal = ({ isOpen, onClose, onSave, expenseToEdit }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [icon, setIcon] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (expenseToEdit) {
      setCategory(expenseToEdit.category || "");
      setAmount(expenseToEdit.amount || "");
      setDate(expenseToEdit.date?.split("T")[0] || "");
      setIcon(expenseToEdit.icon || "");
    } else {
      setCategory("");
      setAmount("");
      setDate("");
      setIcon("");
    }
    setError("");
  }, [expenseToEdit, isOpen]);

  const handleSave = () => {
    if (!category.trim() || !amount || !date) {
      setError("All fields are required.");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    onSave({
      _id: expenseToEdit?._id,
      category: category.trim(),
      amount: Number(amount),
      date,
      icon,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={expenseToEdit ? "Edit Expense" : "Add Expense"}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        {/* Emoji Picker */}
        <div className="flex justify-center sm:justify-start">
          <EmojiPickerPopup
            icon={icon}
            onSelect={setIcon}
          />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            placeholder="Food, Rent, Travel"
            type="text"
            required
          />

          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label="Amount"
            placeholder="1000"
            type="number"
            min="1"
            required
          />

          <div className="sm:col-span-2">
            <Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              label="Date"
              type="date"
              required
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p
            role="alert"
            className="text-xs text-red-500 font-medium pt-1"
          >
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] opacity-60 hover:opacity-100 hover:bg-[var(--color-divider)] rounded-2xl transition-all border border-transparent hover:border-[var(--color-border)]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto px-8 py-3 text-xs font-black uppercase tracking-widest text-white bg-[var(--color-chart-4)] hover:bg-[var(--color-chart-4)]/90 rounded-2xl transition-all shadow-lg shadow-[var(--color-chart-4)]/20 hover:scale-[1.02] active:scale-[0.97]"
          >
            {expenseToEdit ? "Update Expense" : "Add Expense"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditExpenseModal;
