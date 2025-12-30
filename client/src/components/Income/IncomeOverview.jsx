import { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareIncomeBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = (props) => {
  const { transactions, onAddIncome } = props;
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => { };
  }, [transactions]);

  return (
    <div className="bg-[var(--color-surface)] p-10 rounded-[56px] border border-[var(--color-border)] shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12 relative z-10">
        <div className="space-y-2">
          <h5 className="text-sm font-black uppercase tracking-[0.4em] text-[var(--color-text)]">
            Inflow Analytics
          </h5>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] opacity-20">
            Strategic performance metrics across all streams
          </p>
        </div>

        <button
          onClick={onAddIncome}
          className="group relative flex items-center gap-3 bg-primary py-4 px-10 rounded-2xl overflow-hidden transition-all hover:scale-[1.05] active:scale-95 shadow-2xl shadow-[0_12px_32px_color-mix(in_srgb,var(--color-primary),transparent_80%)]"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <LuPlus size={20} className="text-[var(--color-primary-contrast)] relative z-10" />
          <span className="text-[var(--color-primary-contrast)] font-black uppercase tracking-widest text-[10px] relative z-10">Inject Capital</span>
        </button>
      </div>

      <div className="h-[350px] w-full relative z-10">
        <CustomBarChart
          data={chartData}
          xAxisKey="date"
          yAxisKey="amount"
          title="Inflow Performance"
          color="#00e5ff"
        />
      </div>
    </div>
  );
};


export default IncomeOverview;
