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
      setSource(""); setAmount(""); setDate(""); setIcon("");
    }
    setError(null);
  }, [incomeToEdit, isOpen]);

  const handleSave = () => {
    if (!source || !amount || !date) {
      setError("Please fill in all required fields.");
      return;
    }
    onSave({ _id: incomeToEdit?._id, source: source.trim(), amount: Number(amount), date, icon });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={incomeToEdit ? "EDIT INCOME" : "ADD INCOME"}>
      <div className="flex flex-col gap-8">
        
        {/* 1. Emoji Picker Section - Cleans up the double "Pick Icon" text */}
        <div className="flex justify-center">
          <EmojiPickerPopup 
            icon={icon} 
            onSelect={(selectedIcon) => setIcon(selectedIcon)} 
            // Note: If EmojiPickerPopup has its own internal label, 
            // we don't need to add another <span> here.
          />
        </div>

        {/* 2. Inputs Section - Vertical Stack (Matches your Add Expense image) */}
        <div className="flex flex-col gap-6">
          <Input 
            value={source} 
            onChange={(e) => setSource(e.target.value)} 
            label="INCOME SOURCE" 
            placeholder="Freelance, Salary, etc." 
          />
          <Input 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            label="AMOUNT" 
            placeholder="1000" 
            type="number" 
          />
          <Input 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            label="DATE" 
            type="date" 
          />
        </div>

        {/* 3. Error Handling */}
        {error && (
          <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">
            {error}
          </p>
        )}

        {/* 4. Actions Section - Stacked Layout (Matches Add Expense perfectly) */}
        <div className="flex flex-col items-center gap-5 mt-2">
          <button
            type="button"
            onClick={handleSave}
            className="
              w-full
              py-4
              text-[11px] font-black uppercase tracking-[0.2em]
              bg-[#00E5FF] text-black
              rounded-[18px]
              shadow-[0_10px_25px_rgba(0,229,255,0.4)]
              active:scale-95 transition-all duration-300
            "
          >
            {incomeToEdit ? "UPDATE INCOME" : "ADD INCOME"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] opacity-50 hover:opacity-100 transition-opacity"
          >
            CANCEL
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditIncomeModal;