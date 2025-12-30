import CustomPieChart from "../Charts/CustomPieChart";
import { CHART_COLORS } from "../../utils/chartColors";

const FinanceOverview = (props) => {
  const { totalBalance, totalIncome, totalExpense } = props;

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="card border-none bg-transparent shadow-none p-0">
      <div className="flex items-center justify-between mb-8 px-2">
        <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text-muted)] opacity-40">
          Analytics Overview // Spectrum
        </h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${totalBalance}`}
        colors={CHART_COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
