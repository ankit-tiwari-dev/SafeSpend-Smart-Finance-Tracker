import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Sector,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";
import { addThousandsSeparator } from "../../utils/helper";

const CustomPieChart = (props) => {
  const { data, label, totalAmount, colors, showTextAnchor } = props;
  const [activeIndex, setActiveIndex] = useState(-1);

  const formattedAmount = typeof totalAmount === 'string' && totalAmount.startsWith('₹')
    ? `₹${addThousandsSeparator(totalAmount.substring(1))}`
    : totalAmount;

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {colors.map((color, index) => (
              <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={1} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={140}
            innerRadius={110}
            paddingAngle={2}
            labelLine={false}
            stroke="none"
            activeIndex={activeIndex}
            activeShape={(props) => {
              const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
              return (
                <g>
                  <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 6}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                  />
                </g>
              );
            }}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient-${index % colors.length})`}
                className="transition-all duration-500 cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip colors={colors} data={data} />} />
          <Legend content={<CustomLegend />} />

          {showTextAnchor && (
            <g>
              <text
                x="50%"
                y="50%"
                dy={-10}
                textAnchor="middle"
                fill="var(--color-primary)"
                fontSize="10px"
                fontWeight="800"
                className="uppercase tracking-[0.5em] opacity-40 shadow-sm"
              >
                {label}
              </text>
              <text
                x="50%"
                y="50%"
                dy={26}
                textAnchor="middle"
                fill="var(--color-text)"
                fontSize="36px"
                fontWeight="700"
                className="tracking-tighter tabular-nums drop-shadow-md"
              >
                {formattedAmount}
              </text>
            </g>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
