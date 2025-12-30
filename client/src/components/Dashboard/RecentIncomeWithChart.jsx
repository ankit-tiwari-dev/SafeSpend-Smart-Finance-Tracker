import { useState, useEffect } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { CHART_COLORS } from "../../utils/chartColors";

const RecentIncomeWithChart = (props) => {
  const { data, totalIncome } = props;

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  }, [data]);

  return (
    <div className="card border-none bg-transparent shadow-none p-0">
      <div className="flex items-center justify-between mb-8 px-2">
        <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">
          Sector Analysis // Inflow
        </h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={totalIncome}
        showTextAnchor
        colors={CHART_COLORS}
      />
    </div>
  );
};
export default RecentIncomeWithChart;
