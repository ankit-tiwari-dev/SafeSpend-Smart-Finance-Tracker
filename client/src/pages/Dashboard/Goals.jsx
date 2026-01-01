import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { FinanceService } from "../../services/financeService";
import GoalCard from "../../components/Goals/GoalCard";
import AddEditGoalModal from "../../components/Goals/AddEditGoalModal";
import { LuPlus, LuTarget } from "react-icons/lu";
import toast from "react-hot-toast";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const data = await FinanceService.getGoals();
      setGoals(data);
    } catch (error) {
      console.error("Failed to fetch goals", error);
      toast.error("Connectivity issue: Failed to sync objectives.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = () => {
    setGoalToEdit(null);
    setOpenModal(true);
  };

  const handleEditGoal = (goal) => {
    setGoalToEdit(goal);
    setOpenModal(true);
  };

  const handleSaveGoal = async (goalData) => {
    try {
      if (goalToEdit) {
        await FinanceService.updateGoal(goalToEdit._id, goalData);
        toast.success("Objective updated successfully");
      } else {
        await FinanceService.addGoal(goalData);
        toast.success("New objective initialized");
      }
      fetchGoals();
      setOpenModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Data validation protocol failed");
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await FinanceService.deleteGoal(id);
      toast.success("Objective purged");
      fetchGoals();
    } catch (err) {
      toast.error("Failed to delete objective");
    }
  };

  return (
    <DashboardLayout activeMenu="Goals">
      <div className="py-8 sm:py-12 max-w-[1600px] mx-auto space-y-10 sm:space-y-16 px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-8">
          <div className="space-y-3 relative group">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[var(--color-text)]">
              Target Acquisition
            </h2>
            <p className="text-[9px] sm:text-[10px] font-black text-secondary uppercase tracking-[0.2em] sm:tracking-[0.3em]">
              Aspirational Strategic Objectives
            </p>
            <div className="h-[2px] w-20 bg-gradient-to-r from-secondary to-transparent group-hover:w-32 transition-all duration-500" />
          </div>

          <button
            onClick={handleAddGoal}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 bg-secondary py-4 px-8 sm:px-10 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] sm:hover:scale-[1.05] active:scale-95 shadow-xl shadow-secondary/20"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <LuPlus size={18} className="text-[var(--color-primary-contrast)] relative z-10" />
            <span className="text-[var(--color-primary-contrast)] font-black uppercase tracking-widest text-[10px] sm:text-xs relative z-10">
              Initialize Objective
            </span>
          </button>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[280px] sm:h-[320px] bg-white/[0.02] border border-white/5 rounded-[32px] sm:rounded-[40px] animate-pulse"
              ></div>
            ))}
          </div>
        ) : goals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {goals.map((goal) => (
              <GoalCard
                key={goal._id || goal.id}
                goal={goal}
                onEdit={handleEditGoal}
                onDelete={handleDeleteGoal}
              />
            ))}
          </div>
        ) : (
          /* Empty State - Centered and Responsive */
          <div className="flex flex-col items-center justify-center py-20 px-6 sm:py-32 sm:px-10 rounded-[40px] sm:rounded-[56px] bg-[var(--color-surface)] border border-[var(--color-border)] relative overflow-hidden group mx-auto max-w-2xl text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative mb-8 sm:mb-10">
              <div className="absolute -inset-8 bg-secondary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-[24px] sm:rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">
                <LuTarget className="text-secondary opacity-40 group-hover:opacity-100 transition-opacity w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-[var(--color-text)] mb-3 sm:mb-4 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
              No Active Objectives
            </h3>
            <p className="text-[var(--color-text-muted)] opacity-40 max-w-[280px] sm:max-w-sm mb-8 sm:mb-12 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-loose">
              Every financial empire requires a target. Define your conquest and track your progress through the forge.
            </p>

            <button
              onClick={handleAddGoal}
              className="w-full sm:w-auto px-10 py-4 sm:py-5 bg-secondary text-[var(--color-primary-contrast)] rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:scale-105 transition-all shadow-xl shadow-secondary/20"
            >
              Forge New Objective
            </button>
          </div>
        )}
      </div>

      <AddEditGoalModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveGoal}
        goalToEdit={goalToEdit}
      />
    </DashboardLayout>
  );
};

export default Goals;