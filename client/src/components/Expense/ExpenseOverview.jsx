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
        p-6 sm:p-8 lg:p-10
        rounded-[32px] sm:rounded-[56px]
        border border-[var(--color-border)]
        shadow-2xl
        relative
        overflow-hidden
        group
      "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff3366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-12 relative z-10">
        <div className="space-y-2">
          <h5 className="text-xs sm:text-sm font-black uppercase tracking-[0.35em] text-[var(--color-text)]">
            Burn Dynamics
          </h5>
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] opacity-30">
            Real-time tracking of systemic financial outflows
          </p>
        </div>

        <button
          onClick={onAddExpense}
          aria-label="Add Expense"
          className="
            group
            relative
            flex
            items-center
            gap-3
            bg-[var(--color-error)]
            py-3 sm:py-4
            px-6 sm:px-10
            rounded-2xl
            overflow-hidden
            transition-all
            hover:scale-[1.05]
            active:scale-95
            shadow-2xl
            shadow-[var(--color-error)]/20
          "
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <LuPlus size={18} className="text-white relative z-10" />
          <span className="text-white font-black uppercase tracking-widest text-[9px] sm:text-[10px] relative z-10">
            Commit Log
          </span>
        </button>
      </div>

      <div className="h-[260px] sm:h-[300px] lg:h-[350px] w-full relative z-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
