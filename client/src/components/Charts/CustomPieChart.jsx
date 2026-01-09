import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { formatCompactAmount } from "../../utils/helper";

const CustomPieChart = ({ data = [], colors = [], totalAmount = "₹0", label = "NET WORTH" }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const hasData = data && data.length > 0;

  const getDisplayValue = (index) => { 
    if (index === null || !data[index]) return "0";
    const item = data[index];
    const value = item.raw !== undefined ? item.raw : item.amount;
    return formatCompactAmount(value);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center group">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[82%] h-[82%] border border-white/5 rounded-full" />
        <div className="absolute w-[95%] h-[95%] border border-dashed border-white/5 rounded-full opacity-10 animate-[spin_120s_linear_infinite]" />
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={hasData ? data : [{ amount: 1 }]}
            cx="50%" cy="50%"
            innerRadius="80%" outerRadius="92%"
            paddingAngle={hasData ? 12 : 0}
            dataKey="amount" stroke="none"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {hasData && data.map((entry, index) => (
              <Cell 
                key={index} 
                fill={colors[index % colors.length]} 
                style={{
                  filter: activeIndex === index ? `drop-shadow(0 0 10px ${colors[index % colors.length]})` : 'none',
                  opacity: activeIndex === null || activeIndex === index ? 1 : 0.3,
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6">
        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 mb-1 truncate w-full">
          {activeIndex !== null && data[activeIndex] ? data[activeIndex].name : label}
        </span>
        <h2 className="text-[var(--color-text)] font-black italic tracking-tighter leading-none"
            style={{ fontSize: "clamp(1.4rem, 8vw, 2.4rem)" }}>
          {activeIndex !== null ? `₹${getDisplayValue(activeIndex)}` : totalAmount}
        </h2>
        <div className="mt-3 flex gap-1">
          <div className={`h-[2px] w-4 rounded-full transition-all duration-500 ${activeIndex !== null ? 'bg-primary' : 'bg-white/10'}`} />
        </div>
      </div>
    </div>
  );
};

export default CustomPieChart;