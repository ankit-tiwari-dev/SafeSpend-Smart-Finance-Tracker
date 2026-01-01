import { useState, useEffect } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { CHART_COLORS } from "../../utils/chartColors";
import { formatCompactAmount } from "../../utils/helper";

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data.length) {
      setChartData([]);
      return;
    }

    // ✅ FIXED: Added 'raw' field so CustomPieChart hover state works correctly
    setChartData(
      data.map((item) => ({
        name: item?.source ?? "Unknown",
        amount: Number(item?.amount) || 0,
        raw: Number(item?.amount) || 0, // Used for the center text on hover
      }))
    );
  }, [data]);

  return (
    <section
      role="region"
      aria-label="Income sector analysis"
      className="flex flex-col items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[40px] p-6 lg:p-10 overflow-hidden shadow-2xl relative w-full"
    >
      {/* 1. Header Area */}
      <div className="w-full flex items-center justify-between mb-2 px-2">
        <h5 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.45em] text-[var(--color-text-muted)] opacity-40">
          Sector Analysis <span className="hidden sm:inline">// Inflow</span>
        </h5>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-primary/40 animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-primary/20" />
        </div>
      </div>

      {/* 2. Central Chart - Size constrained for Laptops */}
      <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] my-4">
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={`₹${formatCompactAmount(totalIncome)}`}
          colors={CHART_COLORS}
        />
      </div>

      {/* 3. Horizontal Legend - Placed Below Chart for better Laptop visibility */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mt-6">
        {chartData.slice(0, 3).map((item, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group"
          >
            <div className="flex items-center gap-1.5 mb-1.5 overflow-hidden w-full justify-center">
              <div 
                className="w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]" 
                style={{ color: CHART_COLORS[idx % CHART_COLORS.length], backgroundColor: 'currentColor' }} 
              />
              <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-[var(--color-text-muted)] opacity-50 group-hover:opacity-100 truncate">
                {item.name}
              </span>
            </div>
            <span className="text-xs sm:text-lg font-black text-[var(--color-text)] tracking-tighter">
              ₹{formatCompactAmount(item.raw)}
            </span>
          </div>
        ))}
      </div>

      {/* Decorative interface detail */}
      <div className="mt-8 flex justify-center w-full">
         <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </section>
  );
};

export default RecentIncomeWithChart;