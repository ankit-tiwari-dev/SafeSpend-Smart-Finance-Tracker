import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddEditIncomeModal = ({ isOpen, onClose, onSave, incomeToEdit }) => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [icon, setIcon] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (incomeToEdit) {
      setSource(incomeToEdit.source || "");
      setAmount(incomeToEdit.amount?.toString() || "");
      setDate(incomeToEdit.date ? incomeToEdit.date.split("T")[0] : "");
      setIcon(incomeToEdit.icon || "");
    } else {
      setSource("");
      setAmount("");
      setDate("");
      setIcon("");
    }
    setError(null);
  }, [incomeToEdit, isOpen]);

  const handleSave = () => {
    if (!source || !amount || !date) {
      setError("Please fill in all required fields.");
      return;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }
    onSave({
      _id: incomeToEdit?._id,
      source: source.trim(),
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
      title={incomeToEdit ? "EDIT INCOME" : "ADD INCOME"}
    >
      {/* 1. WIDTH: Use w-full with a max-width for desktop, and px-4 for mobile safe-zone.
          2. SPACING: Reduced gaps and added 'box-sizing' safety.
      */}
      <div className="w-full md:w-[380px] px-4 md:px-0 flex flex-col gap-3 mx-auto box-border">
        
        {/* ICON SECTION: Scale down slightly to match sleek mobile UI */}
        <div className="flex items-center scale-90 origin-left">
          <EmojiPickerPopup icon={icon} onSelect={setIcon} />
        </div>

        {/* INPUT GRID: grid-cols-1 ensures inputs stay within mobile bounds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex flex-col">
            <Input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              label="INCOME SOURCE"
              placeholder="Freelance..."
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

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">
            {error}
          </p>
        )}

        {/* ACTION BUTTONS: Centered and scaled for mobile */}
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
            className="w-full md:w-auto px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.1em] bg-[#00E5FF] text-black rounded-xl shadow-lg active:scale-95 transition-all"
          >
            {incomeToEdit ? "UPDATE" : "AUTHORIZE"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditIncomeModal;
