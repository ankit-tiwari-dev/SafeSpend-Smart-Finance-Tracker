import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const MAX_AMOUNT = 1_000_000_000;

const AddIncomeForm = ({ onAddIncome }) => {
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

    const numericAmount = Number(income.amount);
    if (numericAmount <= 0 || numericAmount > MAX_AMOUNT) return;

    onAddIncome({
      ...income,
      amount: numericAmount,
    });

    setIncome({ source: "", amount: "", date: "", icon: "" });
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={(e) => handleChange("source", e.target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc."
        type="text"
      />

      <Input
        value={income.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
        inputMode="numeric"
        max={MAX_AMOUNT}
      />

      <Input
        value={income.date}
        onChange={(e) => handleChange("date", e.target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6 sm:mt-8">
        <button
          type="button"
          onClick={handleSubmit}
          className="
            px-6
            py-3
            text-xs sm:text-sm
            font-black
            uppercase
            tracking-widest
            bg-primary
            text-white
            rounded-2xl
            hover:bg-primary/90
            active:scale-95
            transition-all
          "
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
