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
  const [isSaving, setIsSaving] = useState(false);

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
      title={budgetToEdit ? "EDIT BUDGET" : "ADD BUDGET"}
    >
      {/* FIX: Added 'px-4' for mobile and 'md:px-0' for desktop.
          This prevents the input boxes from touching the right-side edge 
          of the modal background.
      */}
      <div className="w-full md:w-[380px] px-4 md:px-0 flex flex-col gap-3 mx-auto box-border overflow-hidden">
        {/* EMOJI PICKER: Scaled and left-aligned */}
        <div className="flex items-center scale-90 origin-left">
          <EmojiPickerPopup
            icon={icon}
            onSelect={(selectedIcon) => setIcon(selectedIcon)}
          />
        </div>

        {/* INPUT GRID: grid-cols-1 for mobile, 2 for desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3">
          <div className="flex flex-col">
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="CATEGORY"
              placeholder="e.g. Food..."
              type="text"
              className="w-full px-3 py-2 text-[11px] leading-tight"
            />
          </div>

          <div className="flex flex-col">
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              label="BUDGET LIMIT"
              placeholder="e.g. 5000"
              type="number"
              className="w-full px-3 py-2 text-[11px] leading-tight"
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <Input
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              label="BUDGET MONTH"
              type="month"
              className="w-full px-3 py-2 text-[11px] leading-tight"
            />
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">
            {error}
          </p>
        )}

        {/* ACTION BUTTONS: AUTHORIZE is w-full on mobile for better touch */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-2 mt-1 pb-1">
          <button
            type="button"
            onClick={onClose}
            className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)] opacity-50 py-1"
            disabled={isSaving}
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="w-full md:w-auto px-6 py-2.5 text-[9px] font-black uppercase tracking-[0.1em] text-white bg-[#1A1C2E] rounded-xl shadow-lg active:scale-95 transition-all disabled:opacity-60"
          >
            {isSaving ? "SAVING..." : budgetToEdit ? "UPDATE" : "AUTHORIZE"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditBudgetModal;
