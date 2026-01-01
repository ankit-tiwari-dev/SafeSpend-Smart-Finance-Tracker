import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const MAX_AMOUNT = 1_000_000_000; // 1 Billion (safe frontend limit)

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

    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (numericAmount > MAX_AMOUNT) {
      setError("Amount is too large.");
      return;
    }

    onSave({
      _id: incomeToEdit?._id,
      source: source.trim(),
      amount: numericAmount,
      date,
      icon,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={incomeToEdit ? "Edit Income" : "Add Income"}
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        <EmojiPickerPopup
          icon={icon}
          onSelect={(selectedIcon) => setIcon(selectedIcon)}
        />

        <Input
          value={source}
          onChange={(e) => setSource(e.target.value)}
          label="Income Source"
          placeholder="Freelance, Salary, etc."
          type="text"
          aria-required="true"
        />

        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          label="Amount"
          placeholder="e.g. 5000"
          type="number"
          inputMode="numeric"
          max={MAX_AMOUNT}
          aria-required="true"
        />

        <Input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          label="Date"
          type="date"
          aria-required="true"
        />

        {error && (
          <p className="text-red-500 text-xs sm:text-sm pt-2">{error}</p>
        )}

        <div className="flex justify-end gap-3 mt-8 sm:mt-10">
          <button
            onClick={onClose}
            className="
              px-5 sm:px-6
              py-3
              text-xs sm:text-sm
              font-black
              uppercase
              tracking-widest
              text-[var(--color-text-muted)]
              opacity-60
              hover:opacity-100
              hover:bg-[var(--color-divider)]
              rounded-2xl
              transition-all
              border
              border-transparent
              hover:border-[var(--color-border)]
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
              px-6 sm:px-8
              py-3
              text-xs sm:text-sm
              font-black
              uppercase
              tracking-widest
              text-[var(--color-primary-contrast)]
              bg-primary
              hover:bg-primary/90
              rounded-2xl
              transition-all
              shadow-lg
              shadow-primary/20
              hover:scale-[1.02]
              active:scale-[0.98]
            "
          >
            {incomeToEdit ? "Update Protocol" : "Authorize Inflow"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditIncomeModal;
