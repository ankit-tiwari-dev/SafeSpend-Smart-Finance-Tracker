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

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div className="space-y-4 text-gray-900 dark:text-gray-100">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        label="Expense Category"
        placeholder="Food, Transport, etc."
        type="text"
        value={expense.category}
        onChange={(e) => handleChange("category", e.target.value)}
      />

      <Input
        label="Amount"
        placeholder="Enter amount"
        type="number"
        value={expense.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
      />

      <Input
        label="Date"
        type="date"
        value={expense.date}
        onChange={(e) => handleChange("date", e.target.value)}
      />

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={() => {
            onAddExpense(expense);
            setExpense({
              category: "",
              amount: "",
              date: "",
              icon: "",
            });
          }}
          className="add-btn primary-btn-fill"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
