import { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareIncomeBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = ({ transactions = [], onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(prepareIncomeBarChartData(transactions));
  }, [transactions]);

  return (
    <section
      className="
        bg-[var(--color-surface)]
        p-5 sm:p-8 lg:p-10
        rounded-[28px] sm:rounded-[40px] lg:rounded-[56px]
        border border-[var(--color-border)]
        shadow-2xl
        relative
        overflow-hidden
        group
        w-full
      "
      aria-labelledby="income-overview-title"
    >
      {/* Atmospheric hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12 relative z-10">
        <div className="space-y-2">
          <h5
            id="income-overview-title"
            className="text-xs sm:text-sm font-black uppercase tracking-[0.35em] text-[var(--color-text)]"
          >
            Inflow Analytics
          </h5>
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] opacity-30 max-w-xs">
            Strategic performance metrics across all streams
          </p>
        </div>

        <button
          onClick={onAddIncome}
          aria-label="Add new income"
          className="
            group relative
            flex items-center gap-3
            bg-primary
            py-3 sm:py-4
            px-6 sm:px-8 lg:px-10
            rounded-xl sm:rounded-2xl
            overflow-hidden
            transition-all
            hover:scale-[1.05]
            active:scale-95
            shadow-xl
            shadow-primary/25
            w-full sm:w-auto
            justify-center
          "
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <LuPlus size={18} className="text-[var(--color-primary-contrast)] relative z-10" />
          <span className="text-[var(--color-primary-contrast)] font-black uppercase tracking-widest text-[9px] sm:text-[10px] relative z-10 whitespace-nowrap">
            Inject Capital
          </span>
        </button>
      </header>

      {/* Chart */}
      <div
        className="
          h-[260px] sm:h-[300px] lg:h-[350px]
          w-full
          relative
          z-10
        "
      >
        <CustomBarChart
          data={chartData}
          xAxisKey="date"
          yAxisKey="amount"
          title="Inflow Performance"
          color="#00e5ff"
        />
      </div>
    </section>
  );
};

export default IncomeOverview;
