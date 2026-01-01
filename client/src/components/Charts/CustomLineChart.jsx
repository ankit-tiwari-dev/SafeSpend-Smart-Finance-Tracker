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

  // ✅ Loading / Skeleton State
  if (isLoading) {
    return (
      <div className="w-full h-[260px] sm:h-[300px] flex items-center justify-center border border-[var(--color-border)] rounded-2xl animate-pulse">
        <div className="w-3/4 h-40 bg-[var(--color-divider)] rounded-xl" />
      </div>
    );
  }

  // ✅ Empty State (prevents fake data accusation)
  if (!data.length) {
    return (
      <div className="w-full h-[260px] sm:h-[300px] flex items-center justify-center text-sm opacity-40 border border-dashed rounded-2xl">
        No income data available
      </div>
    );
  }

  // ✅ Tooltip (defensive & safe)
  const CustomToolTip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const { category, amount } = payload[0].payload || {};

    return (
      <div
        className="p-3 rounded-xl shadow-xl border"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">
          {category}
        </p>
        <p className="text-sm">
          Amount:{" "}
          <span className="font-semibold text-[var(--color-text)]">
            ₹{Number(amount).toLocaleString()}
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, opacity: 0.4, fontWeight: 600 }}
            stroke="none"
          />

          {/* ✅ Overflow-safe YAxis */}
          <YAxis
            stroke="none"
            tick={{ fontSize: 10, opacity: 0.4, fontWeight: 600 }}
            tickFormatter={(v) =>
              v >= 1_000_000
                ? `${(v / 1_000_000).toFixed(1)}M`
                : v >= 1_000
                ? `${(v / 1_000).toFixed(1)}k`
                : v
            }
            domain={["auto", "auto"]}
          />

          <Tooltip content={<CustomToolTip />} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="var(--color-chart-1)"
            strokeWidth={3}
            fill="url(#incomeGradient)"
            dot={{ r: 3, fill: "var(--color-chart-2)" }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
