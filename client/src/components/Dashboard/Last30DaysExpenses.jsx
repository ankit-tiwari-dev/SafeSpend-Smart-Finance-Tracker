import { useState, useEffect } from "react";
import { prepareExpanseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = (prop) => {
  const { data } = prop;

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpanseBarChartData(data);
    setChartData(result);

    return () => { };
  }, [data]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-10 px-2">
        <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text-muted)] opacity-40">
          Expense Velocity // 30D
        </h5>
      </div>

      <div className="flex-1 w-full">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default Last30DaysExpenses;
