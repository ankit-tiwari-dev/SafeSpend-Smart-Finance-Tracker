import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = (props) => {
  const { data } = props;

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-4 rounded-2xl shadow-2xl">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-1">
            {payload[0].payload.date}
          </p>
          <p className="text-lg font-bold text-[var(--color-text)] tabular-nums">
            ₹{payload[0].payload.amount}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 9, fill: "var(--color-text)", opacity: 0.3, fontWeight: 700 }}
            interval={5}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={35}
            tick={{ fontSize: 9, fill: "var(--color-text)", opacity: 0.3, fontWeight: 600 }}
            tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
          />
          <Tooltip
            content={<CustomToolTip />}
            cursor={{ fill: 'var(--color-text)', opacity: 0.05, radius: 10 }}
          />
          <Bar
            dataKey="amount"
            radius={[6, 6, 0, 0]}
            barSize={32}
          >
            {data.map((entry, index) => {
              const colors = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-3)', 'var(--color-chart-4)'];
              return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
