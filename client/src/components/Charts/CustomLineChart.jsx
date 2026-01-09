import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomLineChart = ({ data = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="w-full h-[260px] flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[32px] animate-pulse">
        <div className="w-3/4 h-32 bg-[var(--color-divider)] rounded-2xl" />
      </div>
    );
  }

  const CustomToolTip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const { month, amount } = payload[0].payload || {};

    return (
      <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-xl shadow-2xl">
        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#00E5FF]/60 mb-1">
          {month}
        </p>
        <p className="text-sm font-black text-[var(--color-text)] tracking-tighter">
          Amount: ₹{Number(amount).toLocaleString()}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full h-full relative">
      {/* Dynamic L-bracket decoration */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-border)] opacity-30 rounded-tl-sm pointer-events-none" />
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 10 }}>
          <defs>
            <linearGradient id="burnGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Clean Grid - Responsive to theme variables */}
          <CartesianGrid 
            vertical={false} 
            stroke="var(--color-border)" 
            strokeOpacity={0.1}
            strokeDasharray="4 4" 
          />

          {/* Technical XAxis - Dynamic Visibility */}
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ 
              fontSize: 9, 
              fill: "var(--color-text-muted)", 
              fontWeight: 900,
              letterSpacing: '0.1em',
              opacity: 0.5
            }}
            dy={10}
          />

          {/* Technical YAxis - Dynamic Visibility */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ 
              fontSize: 9, 
              fill: "var(--color-text-muted)", 
              fontWeight: 900,
              opacity: 0.5
            }}
            tickFormatter={(v) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
            }
          />

          <Tooltip 
            content={<CustomToolTip />} 
            cursor={{ stroke: 'var(--color-border)', strokeWidth: 1, strokeOpacity: 0.2 }}
          />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#00E5FF" 
            strokeWidth={2.5}
            fill="url(#burnGradient)"
            animationBegin={200}
            animationDuration={1200}
            style={{ filter: "drop-shadow(0px 0px 12px rgba(0, 229, 255, 0.3))" }}
            dot={false}
            activeDot={{ 
              r: 4, 
              fill: "#00E5FF", 
              stroke: "var(--color-surface)", 
              strokeWidth: 2 
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;