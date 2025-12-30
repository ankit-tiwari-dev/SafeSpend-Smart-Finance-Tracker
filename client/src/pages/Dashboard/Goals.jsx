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
      const data = await FinanceService.getGoals();
      setGoals(data);
    } catch (error) {
      console.error("Failed to fetch goals", error);
      toast.error("Failed to load goals");
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
        toast.success("Goal updated successfully");
      } else {
        await FinanceService.addGoal(goalData);
        toast.success("Goal added successfully");
      }
      fetchGoals();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await FinanceService.deleteGoal(id);
      toast.success("Goal deleted");
      fetchGoals();
    } catch (err) {
      toast.error("Failed to delete goal");
    }
  };

  return (
    <DashboardLayout activeMenu="Goals">
      <div className="py-12 max-w-[1600px] mx-auto space-y-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[var(--color-text)]">
              Target Acquisition
            </h2>
            <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">
              Aspirational Strategic Objectives
            </p>
          </div>
          <button
            onClick={handleAddGoal}
            className="group relative flex items-center gap-3 bg-secondary py-4 px-10 rounded-2xl overflow-hidden transition-all hover:scale-[1.05] active:scale-95 shadow-2xl shadow-secondary/20"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <LuPlus size={20} className="text-[var(--color-primary-contrast)] relative z-10" />
            <span className="text-[var(--color-primary-contrast)] font-black uppercase tracking-widest text-xs relative z-10">Initialize Objective</span>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-[320px] bg-white/[0.02] border border-white/5 rounded-[40px] animate-pulse"
              ></div>
            ))}
          </div>
        ) : goals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
          <div className="flex flex-col items-center justify-center py-32 px-10 rounded-[56px] bg-[var(--color-surface)] border border-[var(--color-border)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative mb-10">
              <div className="absolute -inset-8 bg-secondary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-28 h-28 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">
                <LuTarget size={48} className="text-secondary opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <h3 className="text-xl font-black text-[var(--color-text)] mb-4 uppercase tracking-[0.3em] text-center">No Active Objectives</h3>
            <p className="text-[var(--color-text-muted)] opacity-40 text-center max-w-sm mb-12 text-[10px] font-black uppercase tracking-[0.2em] leading-loose">
              Every financial empire requires a target. Define your conquest and track your progress through the forge.
            </p>

            <button
              onClick={handleAddGoal}
              className="px-12 py-5 bg-secondary text-[var(--color-primary-contrast)] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-2xl shadow-[0_12px_32px_color-mix(in_srgb,var(--color-secondary),transparent_80%)]"
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
