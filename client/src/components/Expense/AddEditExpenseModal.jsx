import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddEditExpenseModal = ({ isOpen, onClose, onSave, expenseToEdit }) => {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [icon, setIcon] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (expenseToEdit) {
            setCategory(expenseToEdit.category || "");
            setAmount(expenseToEdit.amount || "");
            setDate(expenseToEdit.date ? expenseToEdit.date.split("T")[0] : "");
            setIcon(expenseToEdit.icon || "");
        } else {
            setCategory("");
            setAmount("");
            setDate("");
            setIcon("");
        }
        setError(null);
    }, [expenseToEdit, isOpen]);

    const handleSave = () => {
        if (!category || !amount || !date) {
            setError("Please fill in all required fields.");
            return;
        }

        if (isNaN(amount) || Number(amount) <= 0) {
            setError("Please enter a valid amount.");
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
            title={expenseToEdit ? "Edit Expense" : "Add Expense"}
        >
            <div className="flex flex-col gap-4">
                <EmojiPickerPopup
                    icon={icon}
                    onSelect={(selectedIcon) => setIcon(selectedIcon)}
                />

                <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                    placeholder="e.g. Food, Rent"
                    type="text"
                />

                <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    label="Amount"
                    placeholder="e.g. 1000"
                    type="number"
                />

                <Input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    label="Date"
                    type="date"
                />

                {error && <p className="text-red-500 text-xs pt-2">{error}</p>}

                <div className="flex justify-end gap-3 mt-10">
                    <button
                        className="px-6 py-3 text-sm font-black uppercase tracking-widest text-[var(--color-text-muted)] opacity-60 hover:opacity-100 hover:bg-[var(--color-divider)] rounded-2xl transition-all border border-transparent hover:border-[var(--color-border)] cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-8 py-3 text-sm font-black uppercase tracking-widest text-white bg-[var(--color-chart-4)] hover:bg-[var(--color-chart-4)]/90 rounded-2xl transition-all shadow-lg shadow-[var(--color-chart-4)]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        onClick={handleSave}
                    >
                        {expenseToEdit ? "Update Ledger" : "Authorize Burn"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AddEditExpenseModal;
