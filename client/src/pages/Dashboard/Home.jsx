import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect, useState } from "react";
import InfoCard from "../../components/Cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import DashboardSlider from "../../components/Dashboard/DashboardSlider";

const HomePage = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`,
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="py-6 max-w-[1600px] mx-auto space-y-16 px-4">
        {/* Dynamic Highlight Slider */}
        <section className="animate-in fade-in zoom-in-95 duration-1000">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 ml-6">Market Dynamics</p>
          <DashboardSlider />
        </section>

        {/* Strategic Metrics Grid */}
        <section>
          <div className="flex items-center justify-between mb-8 px-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text)]">System Analytics</h2>
            <div className="h-px flex-1 mx-12 bg-gradient-to-r from-[var(--color-border)] to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            <InfoCard
              icon={<IoMdCard />}
              label="Current Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              moneyType="profit"
            />
            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              moneyType="revenue"
            />
            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expenses"
              value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
              moneyType="expenses"
            />
            <InfoCard
              icon={<LuWalletMinimal />}
              label="Monthly Yield"
              value={addThousandsSeparator((dashboardData?.totalIncome || 0) - (dashboardData?.totalExpenses || 0))}
              moneyType="forecast"
            />
          </div>
        </section>

        {/* Operational Core */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 px-2">
          <div className="lg:col-span-7 space-y-16">
            <section>
              <div className="flex items-center justify-between mb-6 px-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text)]">Financial Pulse</h2>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">Live Optimization</p>
              </div>
              <div className="bg-[var(--color-surface)] p-8 rounded-[56px] border border-[var(--color-border)] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <FinanceOverview
                  totalBalance={dashboardData?.totalBalance || 0}
                  totalIncome={dashboardData?.totalIncome || 0}
                  totalExpense={dashboardData?.totalExpenses || 0}
                />
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6 px-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text)]">Transaction Logs</h2>
                <button onClick={() => navigate("/expense")} className="text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-all hover:tracking-[0.4em]">Expand Protocol</button>
              </div>
              <div className="bg-[var(--color-surface)] p-8 rounded-[56px] border border-[var(--color-border)] shadow-2xl">
                <RecentTransactions
                  transactions={dashboardData?.recentTransactions || []}
                  onSeeMore={() => navigate("/expense")}
                />
              </div>
            </section>
          </div>

          {/* Side Intelligence Panel */}
          <div className="lg:col-span-5 space-y-16">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text)] mb-6 px-4">Sector Analysis</h2>
              <div className="bg-[var(--color-surface)] p-8 rounded-[56px] border border-[var(--color-border)] shadow-2xl h-[450px]">
                <Last30DaysExpenses data={dashboardData?.last30DaysExpenses?.transactions || []} />
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text)] mb-6 px-4">Inflow Streams</h2>
              <div className="bg-[var(--color-surface)] p-8 rounded-[56px] border border-[var(--color-border)] shadow-2xl overflow-hidden min-h-[400px]">
                <RecentIncome
                  transactions={dashboardData?.last60DaysIncome?.transactions || []}
                  onSeeMore={() => navigate("/income")}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
