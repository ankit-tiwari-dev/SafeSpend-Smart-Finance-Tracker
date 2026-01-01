import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { FinanceService } from "../../services/financeService";
import BudgetCard from "../../components/Budgets/BudgetCard";
import AddEditBudgetModal from "../../components/Budgets/AddEditBudgetModal";
import { LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState(null);

  const fetchBudgets = async () => {
    try {
      const data = await FinanceService.getBudgets();
      setBudgets(data);
    } catch (error) {
      console.error("Failed to fetch budgets", error);
      toast.error("Failed to load budget data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleAddBudget = () => {
    setBudgetToEdit(null);
    setOpenModal(true);
  };

  const handleEditBudget = (budget) => {
    setBudgetToEdit(budget);
    setOpenModal(true);
  };

  const handleSaveBudget = async (budget) => {
    try {
      if (budgetToEdit) {
        await FinanceService.updateBudget(budgetToEdit._id, budget);
        toast.success("Budget updated successfully");
      } else {
        await FinanceService.addBudget(budget);
        toast.success("Budget added successfully");
      }
      fetchBudgets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await FinanceService.deleteBudget(id);
      setBudgets(budgets.filter((b) => b._id !== id));
      toast.success("Budget deleted");
    } catch (err) {
      toast.error("Failed to delete budget");
    }
  };

  return (
    <DashboardLayout activeMenu="Budgets">
      <div className="py-8 sm:py-12 max-w-[1920px] mx-auto space-y-10 sm:space-y-16 px-4 sm:px-8">
        
        {/* Responsive Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-8">
          <div className="space-y-2 sm:space-y-3 w-full sm:w-auto">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[var(--color-text)] break-words">
              Budgetary Rails
            </h2>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em]">
              Strategic Allocation Protocols
            </p>
          </div>
          
          <button
            onClick={handleAddBudget}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 bg-primary py-4 px-8 sm:px-10 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] sm:hover:scale-[1.05] active:scale-95 shadow-xl shadow-primary/20"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <LuPlus size={20} className="text-[var(--color-primary-contrast)] relative z-10" />
            <span className="text-[var(--color-primary-contrast)] font-black uppercase tracking-widest text-xs relative z-10">
              Deploy Protocol
            </span>
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          // Responsive Skeletons
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[280px] sm:h-[300px] bg-white/[0.02] border border-white/5 rounded-[32px] sm:rounded-[40px] animate-pulse"
              ></div>
            ))}
          </div>
        ) : budgets.length > 0 ? (
          // Responsive Grid System
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {budgets.map((budget) => (
              <BudgetCard
                key={budget._id}
                budget={budget}
                onEdit={handleEditBudget}
                onDelete={handleDeleteBudget}
              />
            ))}
          </div>
        ) : (
          // Responsive Empty State
          <div className="flex flex-col items-center justify-center py-20 px-6 sm:py-32 sm:px-10 rounded-[40px] sm:rounded-[56px] bg-[var(--color-surface)] border border-[var(--color-border)] relative overflow-hidden group mx-auto max-w-2xl text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative mb-8 sm:mb-10">
              <div className="absolute -inset-8 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-[24px] sm:rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
                <LuPlus className="text-primary opacity-40 group-hover:opacity-100 transition-opacity w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-[var(--color-text)] mb-3 sm:mb-4 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
              No Active Rails
            </h3>
            <p className="text-[var(--color-text-muted)] opacity-40 max-w-[260px] sm:max-w-sm mb-8 sm:mb-12 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-loose">
              Initialize your financial parameters to establish spending discipline across the sector.
            </p>

            <button
              onClick={handleAddBudget}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-primary text-[var(--color-primary-contrast)] rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:scale-[1.02] sm:hover:scale-105 transition-all shadow-xl shadow-[0_12px_32px_color-mix(in_srgb,var(--color-primary),transparent_80%)]"
            >
              Initialize Financial Rail
            </button>
          </div>
        )}
      </div>

      <AddEditBudgetModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveBudget}
        budgetToEdit={budgetToEdit}
      />
    </DashboardLayout>
  );
};

export default Budgets;