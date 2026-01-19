import { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div
      className="
        bg-[var(--color-surface)]
        p-8 sm:p-10
        rounded-[40px] sm:rounded-[56px]
        border border-[var(--color-border)]
        shadow-2xl
        relative
        overflow-hidden
        group
      "
    >
      {/* 1. Dynamic Background Glow: Uses theme-aware primary/pink - Simplified for performance */}
      <div className="absolute inset-0 bg-[#FF4B7D]/[0.02] pointer-events-none" />

      {/* 2. Cyber Grid: Now uses border variable for multi-theme visibility */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 relative z-10">
        <div className="space-y-1">
          {/* Header Typography: Switched to variable text color */}
          <h5 className="text-[11px] sm:text-[13px] font-black uppercase tracking-[0.4em] text-[var(--color-text)]">
            Burn Dynamics
          </h5>
          <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-muted)] opacity-50">
            Real-time tracking of systemic financial outflows
          </p>
        </div>

        {/* Action Button: Retains its signature pink color for branding */}
        <button
          onClick={onAddExpense}
          aria-label="Add Expense"
          className="
            group
            relative
            flex
            items-center
            gap-3
            bg-[#FF4B7D]
            hover:bg-[#FF356A]
            py-3 sm:py-4
            px-8 sm:px-10
            rounded-[20px]
            transition-all
            duration-300
            hover:scale-[1.02]
            active:scale-95
            shadow-[0_12px_24px_rgba(255,75,125,0.25)]
            hover:shadow-[0_16px_32px_rgba(255,75,125,0.4)]
          "
        >
          <LuPlus size={18} className="text-white relative z-10" />
          <span className="text-white font-black uppercase tracking-[0.2em] text-[10px] relative z-10">
            Commit Log
          </span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      <div className="h-[280px] sm:h-[320px] lg:h-[380px] w-full relative z-10">
        <CustomLineChart data={chartData} />
      </div>

      {/* 3. Technical Footer: Now uses theme variables for visibility */}
      <div className="mt-8 flex items-center gap-3 opacity-30">
        <span className="text-[7px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
          System Telemetry: Live
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--color-border)] to-transparent" />
      </div>
    </div>
  );
};

export default ExpenseOverview;