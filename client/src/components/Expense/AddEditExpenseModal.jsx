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
      setCategory(""); setAmount(""); setDate(""); setIcon("");
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
      title={expenseToEdit ? "EDIT EXPENSE" : "ADD EXPENSE"}
    >
      {/* FIX: Added 'px-4' for mobile gutter and 'overflow-hidden' 
        to ensure boxes don't bleed out of the right panel 
      */}
      <div className="w-full md:w-[380px] px-4 md:px-0 flex flex-col gap-3 mx-auto box-border overflow-hidden">
        
        {/* EMOJI PICKER: Scaled down to match sleek UI */}
        <div className="flex items-center scale-90 origin-left">
          <EmojiPickerPopup
            icon={icon}
            onSelect={setIcon}
          />
        </div>

        {/* INPUT GRID: Tightened and aligned internally */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex flex-col">
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="CATEGORY"
              placeholder="Food, Rent..."
              type="text"
              className="w-full px-3 py-2 text-[11px] leading-tight"
            />
          </div>

          <div className="flex flex-col">
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              label="AMOUNT"
              placeholder="1000"
              type="number"
              className="w-full px-3 py-2 text-[11px] leading-tight"
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              label="DATE"
              type="date"
              className="w-full px-3 py-2 text-[11px] leading-tight"
            />
          </div>
        </div>

        {error && (
          <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">
            {error}
          </p>
        )}

        {/* ACTIONS: Compacted and aligned to right on desktop */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-2 mt-2 pb-1">
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
            className="w-full md:w-auto px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.1em] text-white bg-[#F04461] rounded-xl shadow-lg active:scale-95 transition-all"
          >
            {expenseToEdit ? "UPDATE" : "AUTHORIZE"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditExpenseModal;