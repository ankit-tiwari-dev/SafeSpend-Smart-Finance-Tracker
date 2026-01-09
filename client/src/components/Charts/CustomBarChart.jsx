import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import { addThousandsSeparator } from "../../utils/helper";

const CustomBarChart = ({ data = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[32px] animate-pulse">
        <div className="w-2/3 h-40 bg-[var(--color-divider)] rounded-xl" />
      </div>
    );
  }

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { date, amount } = payload[0].payload;
      return (
        <div className="bg-[var(--color-surface)] p-4 rounded-2xl border border-[var(--color-border)] shadow-2xl">
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-1">
            {date}
          </p>
          <p className="text-sm font-black text-[var(--color-text)] tracking-tighter">
            ₹{addThousandsSeparator(amount)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[inherit]">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="currentColor"
            className="text-[var(--color-border)] opacity-20"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
            interval="preserveStartEnd"
            minTickGap={20}
            tick={{
              fontSize: 10,
              fill: "var(--color-text-muted)",
              fontWeight: 800,
              opacity: 0.6,
            }}
            dy={10}
          />

          <YAxis
            axisLine={{ stroke: "var(--color-border)", strokeWidth: 1 }}
            tickLine={{ stroke: "var(--color-border)" }}
            tick={{
              fontSize: 10,
              fill: "var(--color-text-muted)",
              fontWeight: 800,
              opacity: 0.6,
            }}
            tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
          />

          <Tooltip
            content={<CustomToolTip />}
            cursor={{ fill: "var(--color-text)", opacity: 0.05, radius: 8 }}
          />

          <Bar dataKey="amount" radius={[6, 6, 2, 2]} barSize={22}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                // Primary Cyan remains the accent for both modes
                fill="#00E5FF"
                style={{
                  filter: "drop-shadow(0px 4px 8px rgba(0, 229, 255, 0.3))",
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
