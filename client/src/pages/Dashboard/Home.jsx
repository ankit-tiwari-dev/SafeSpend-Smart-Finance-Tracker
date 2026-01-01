import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect, useState } from "react";
import InfoCard from "../../components/Cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal, LuActivity } from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import DashboardSlider from "../../components/Dashboard/DashboardSlider";

const HomePage = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
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
  }, []);

  // Loading Skeleton for a Premium Feel
  if (loading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="py-8 sm:py-12 max-w-[1600px] mx-auto space-y-12 px-4 sm:px-8">
          <div className="h-48 w-full bg-white/[0.02] rounded-[40px] animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-white/[0.02] rounded-3xl animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 h-[600px] bg-white/[0.02] rounded-[56px] animate-pulse" />
            <div className="lg:col-span-5 h-[600px] bg-white/[0.02] rounded-[56px] animate-pulse" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="py-6 sm:py-10 max-w-[1600px] mx-auto space-y-12 sm:space-y-20 px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Highlight Slider - Top Section */}
        <section className="animate-in fade-in zoom-in-95 duration-700">
          <div className="flex items-center gap-2 mb-4 ml-2 sm:ml-6">
            <LuActivity className="text-primary text-xs" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">Market Dynamics</p>
          </div>
          <DashboardSlider />
        </section>

        {/* Strategic Metrics Grid - Info Cards */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2 sm:px-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text)] opacity-70">System Analytics</h2>
            <div className="hidden sm:block h-px flex-1 mx-12 bg-gradient-to-r from-[var(--color-border)] to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <InfoCard
              icon={<IoMdCard />}
              label="Current Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              moneyType="profit"
              className="hover:translate-y-[-4px] transition-transform duration-300"
            />
            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              moneyType="revenue"
              className="hover:translate-y-[-4px] transition-transform duration-300"
            />
            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expenses"
              value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
              moneyType="expenses"
              className="hover:translate-y-[-4px] transition-transform duration-300"
            />
            <InfoCard
              icon={<LuWalletMinimal />}
              label="Monthly Yield"
              value={addThousandsSeparator((dashboardData?.totalIncome || 0) - (dashboardData?.totalExpenses || 0))}
              moneyType="forecast"
              className="hover:translate-y-[-4px] transition-transform duration-300"
            />
          </div>
        </section>

        {/* Operational Core - Charts and Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16">
          
          {/* Main Column (Financial Pulse & Transactions) */}
          <div className="lg:col-span-7 space-y-12 sm:space-y-20">
            <section className="group">
              <div className="flex items-center justify-between mb-6 px-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text)]">Financial Pulse</h2>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">Live Optimization</p>
                </span>
              </div>
              <div className="bg-[var(--color-surface)] p-6 sm:p-10 rounded-[40px] sm:rounded-[56px] border border-[var(--color-border)] shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-primary/20">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                <button 
                  onClick={() => navigate("/expense")} 
                  className="text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-all hover:tracking-[0.3em]"
                >
                  Expand Protocol
                </button>
              </div>
              <div className="bg-[var(--color-surface)] p-2 sm:p-8 rounded-[40px] sm:rounded-[56px] border border-[var(--color-border)] shadow-2xl overflow-hidden">
                <RecentTransactions
                  transactions={dashboardData?.recentTransactions || []}
                  onSeeMore={() => navigate("/expense")}
                />
              </div>
            </section>
          </div>

          {/* Sidebar (Analysis & Inflow) */}
          <div className="lg:col-span-5 space-y-12 sm:space-y-20">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text)] mb-6 px-4">Sector Analysis</h2>
              <div className="bg-[var(--color-surface)] p-6 sm:p-10 rounded-[40px] sm:rounded-[56px] border border-[var(--color-border)] shadow-2xl h-auto min-h-[400px] hover:border-white/10 transition-colors">
                <Last30DaysExpenses data={dashboardData?.last30DaysExpenses?.transactions || []} />
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text)] mb-6 px-4">Inflow Streams</h2>
              <div className="bg-[var(--color-surface)] p-6 sm:p-10 rounded-[40px] sm:rounded-[56px] border border-[var(--color-border)] shadow-2xl overflow-hidden min-h-[400px] hover:border-white/10 transition-colors">
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