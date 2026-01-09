import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome, onClose }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setIncome((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!income.source || !income.amount || !income.date) return;
    onAddIncome({ ...income, amount: Number(income.amount) });
    setIncome({ source: "", amount: "", date: "", icon: "" });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Emoji Picker Section (Matching Expense style) */}
      <div className="flex items-center gap-4 mb-2">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
        <span className="text-xs font-bold text-[var(--color-text-muted)] opacity-80 uppercase tracking-widest">
          Pick Icon
        </span>
      </div>

      {/* 2. Inputs Section (Same spacing as Expense) */}
      <div className="flex flex-col gap-5">
        <Input
          value={income.source}
          onChange={(e) => handleChange("source", e.target.value)}
          label="INCOME SOURCE"
          placeholder="Freelance, Salary, etc."
        />
        <Input
          value={income.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          label="AMOUNT"
          placeholder="1000"
          type="number"
        />
        <Input
          value={income.date}
          onChange={(e) => handleChange("date", e.target.value)}
          label="DATE"
          type="date"
        />
      </div>

      {/* 3. Actions Section (Identical Layout to Add Expense) */}
      <div className="flex flex-col items-center gap-4 mt-6">
        {/* Large Action Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="
            w-full
            py-4
            text-[11px] font-black uppercase tracking-[0.15em]
            bg-[#00E5FF] text-black
            rounded-[20px]
            shadow-[0_8px_20px_rgba(0,229,255,0.3)]
            active:scale-95 transition-all
          "
        >
          AUTHORIZE INFLOW
        </button>

        {/* Centered Cancel Button */}
        <button
          type="button"
          onClick={onClose}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] opacity-60 hover:opacity-100 transition-all"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;