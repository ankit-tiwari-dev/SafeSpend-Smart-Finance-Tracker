import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { addThousandsSeparator } from "../../utils/helper";

const CustomBarChart = ({ data = [], isLoading = false }) => {
  // ✅ Loading State
  if (isLoading) {
    return (
      <div className="w-full h-[320px] flex items-center justify-center rounded-2xl border border-[var(--color-border)] animate-pulse">
        <div className="w-2/3 h-40 bg-[var(--color-divider)] rounded-xl" />
      </div>
    );
  }

  // ✅ Empty State
  if (!data.length) {
    return (
      <div className="w-full h-[320px] flex items-center justify-center text-sm opacity-40 border border-dashed rounded-2xl">
        No data available
      </div>
    );
  }

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { date, amount } = payload[0].payload;
      return (
        <div className="bg-[var(--color-surface)] p-3 rounded-xl shadow-xl border">
          <p className="text-[10px] uppercase tracking-widest opacity-50">{date}</p>
          <p className="text-lg font-bold">₹{addThousandsSeparator(amount)}</p>
        </div>
      );
    }
    return null;
  };

  // ✅ Determine maximum amount to scale colors (optional)
  const maxAmount = Math.max(...data.map(d => d.amount));

  return (
    <div className="w-full h-[260px] sm:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 9, opacity: 0.4 }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 9, opacity: 0.4 }}
            tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
          />
          <Tooltip content={<CustomToolTip />} cursor={{ fill: 'var(--color-text)', opacity: 0.05, radius: 10 }} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={28}>
            {data.map((entry, i) => {
              const colors = [
                "var(--color-chart-1)",
                "var(--color-chart-2)",
                "var(--color-chart-3)",
                "var(--color-chart-4)",
              ];
              // Optionally, make bars with high values darker
              const color = entry.amount > maxAmount * 0.8 ? "#F97316" : colors[i % colors.length];
              return <Cell key={i} fill={color} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
