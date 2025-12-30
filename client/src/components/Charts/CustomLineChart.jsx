import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomLineChart = (props) => {
  const { data } = props;
  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            padding: "8px",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "var(--color-primary)",
              marginBottom: "4px",
            }}
          >
            {payload[0].payload.category}
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text-muted)",
            }}
          >
            Amount:{" "}
            <span
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "var(--color-text)",
              }}
            >
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
  };

  return (
    <div className="bg-transparent">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-chart-1)"
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor="var(--color-chart-1)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: "var(--color-text)", opacity: 0.3, fontWeight: 700 }}
            stroke="none"
          />
          <YAxis
            tick={{ fontSize: 10, fill: "var(--color-text)", opacity: 0.3, fontWeight: 700 }}
            stroke="none"
          />
          <Tooltip content={<CustomToolTip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="var(--color-chart-1)"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#incomeGradient)"
            dot={{ r: 3, fill: "var(--color-chart-2)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
