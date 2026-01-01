import { useMemo } from "react";
import { prepareExpanseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data = [] }) => {
  /**
   * ✅ useMemo instead of useEffect + state
   * - avoids extra render
   * - derived data stays deterministic
   */
  const chartData = useMemo(() => {
    return prepareExpanseBarChartData(data);
  }, [data]);

  return (
    <section
      role="region"
      aria-label="Last 30 days expense chart"
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-10 px-2">
        <h5 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.45em] text-[var(--color-text-muted)] opacity-40">
          Expense Velocity <span className="hidden sm:inline">// 30D</span>
        </h5>
      </div>

      {/* Chart container */}
      <div className="flex-1 w-full min-h-[220px] sm:min-h-[280px]">
        <CustomBarChart data={chartData} />
      </div>
    </section>
  );
};

export default Last30DaysExpenses;
