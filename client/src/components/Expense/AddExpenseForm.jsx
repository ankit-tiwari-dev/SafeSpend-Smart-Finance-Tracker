import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setExpense((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-4">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(icon) => handleChange("icon", icon)}
      />

      <Input label="Expense Category" value={expense.category} onChange={(e) => handleChange("category", e.target.value)} />
      <Input label="Amount" type="number" value={expense.amount} onChange={(e) => handleChange("amount", e.target.value)} />
      <Input label="Date" type="date" value={expense.date} onChange={(e) => handleChange("date", e.target.value)} />

      <button
        onClick={() => {
          onAddExpense({ ...expense, type: "expense" });
          setExpense({ category: "", amount: "", date: "", icon: "" });
        }}
        className="w-full sm:w-auto px-6 py-3 text-sm font-bold rounded-xl bg-primary text-white hover:opacity-90 transition"
      >
        Add Expense
      </button>
    </div>
  );
};

export default AddExpenseForm;
