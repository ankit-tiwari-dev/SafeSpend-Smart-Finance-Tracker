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
    <div className="flex flex-col gap-8 w-full md:max-w-[550px] mx-auto">
      {/* 1. Emoji Picker */}
      <div className="flex items-center gap-4 mb-2">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] opacity-60">
          Pick Icon
        </span>
      </div>

      {/* 2. Responsive Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
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
        <div className="md:col-span-2">
          <Input
            value={income.date}
            onChange={(e) => handleChange("date", e.target.value)}
            label="DATE"
            type="date"
          />
        </div>
      </div>

      {/* 3. Action Buttons - Row for Desktop, Column for Mobile */}
      <div className="flex flex-col md:flex-row items-center justify-end gap-8 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="order-2 md:order-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] opacity-60 hover:opacity-100 transition-all"
        >
          CANCEL
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="order-1 md:order-2 w-full md:w-auto px-12 py-4 text-[11px] font-black uppercase tracking-[0.15em] bg-[#00E5FF] text-black rounded-[20px] shadow-[0_8px_20px_rgba(0,229,255,0.3)] active:scale-95 transition-all"
        >
          AUTHORIZE INFLOW
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
