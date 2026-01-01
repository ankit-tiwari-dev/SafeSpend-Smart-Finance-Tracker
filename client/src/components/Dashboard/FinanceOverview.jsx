import React, { useMemo } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { CHART_COLORS } from "../../utils/chartColors";
import { formatCompactAmount } from "../../utils/helper";
import { LuActivity } from "react-icons/lu";

const FinanceOverview = ({
  totalBalance = 0,
  totalIncome = 0,
  totalExpense = 0,
}) => {
  const { balanceData, stats } = useMemo(() => {
    const income = Math.max(0, Number(totalIncome) || 0);
    const expense = Math.max(0, Number(totalExpense) || 0);
    const balance = Math.max(0, Number(totalBalance) || 0);
    const MAX_VAL = Math.max(income, expense, balance, 1);

    return {
      balanceData: [
        { name: "Net Balance", amount: (balance / MAX_VAL) * 100, raw: balance, color: CHART_COLORS[0] },
        { name: "Expenses", amount: (expense / MAX_VAL) * 100, raw: expense, color: CHART_COLORS[1] },
        { name: "Income", amount: (income / MAX_VAL) * 100, raw: income, color: CHART_COLORS[2] },
      ],
      stats: { balance }
    };
  }, [totalIncome, totalExpense, totalBalance]);

  return (
    <div className="flex flex-col items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[40px] p-6 lg:p-10 overflow-hidden shadow-2xl relative w-full">
      
      {/* 1. Header Area */}
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <LuActivity className="text-primary text-xs animate-pulse" />
          <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text)] opacity-80">
            Liquidity Matrix
          </h5>
        </div>
        <span className="text-[8px] font-bold text-primary/40 tracking-[0.2em] uppercase">Neural Link: Stable</span>
      </div>

      {/* 2. Central Chart - Constrained for Laptop sizing */}
      <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] my-4">
        <CustomPieChart
          data={balanceData}
          label="Net Worth"
          totalAmount={`₹${formatCompactAmount(stats.balance)}`}
          colors={CHART_COLORS}
        />
      </div>

      {/* 3. Horizontal Legend - Placed Below Chart */}
      <div className="w-full grid grid-cols-3 gap-2 sm:gap-4 mt-6">
        {balanceData.map((item, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group"
          >
            {/* Color Indicator & Label */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <div 
                className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" 
                style={{ color: item.color, backgroundColor: 'currentColor' }} 
              />
              <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-[var(--color-text-muted)] opacity-50 group-hover:opacity-100 truncate">
                {item.name.split(' ')[1] || item.name} 
              </span>
            </div>
            
            {/* Amount */}
            <span className="text-xs sm:text-lg font-black text-[var(--color-text)] tracking-tighter">
              ₹{formatCompactAmount(item.raw)}
            </span>
          </div>
        ))}
      </div>

      {/* Decorative Bottom Line */}
      <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent mt-8" />
    </div>
  );
};

export default FinanceOverview;