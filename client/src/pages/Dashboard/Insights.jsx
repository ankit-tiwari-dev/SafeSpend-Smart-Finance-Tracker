import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { FinanceService } from "../../services/financeService";
import InsightCard from "../../components/Dashboard/InsightCard";
import { LuLightbulb, LuCpu } from "react-icons/lu";

const Insights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await FinanceService.getInsights();
        setInsights(data);
      } catch (error) {
        console.error("Failed to fetch insights", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return (
    <DashboardLayout activeMenu="Insights">
      <div className="py-8 sm:py-12 max-w-[1200px] mx-auto space-y-10 sm:space-y-16 px-4 sm:px-6">
        
        {/* Technical Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[var(--color-text)]">
                Cognitive Analytics
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[7px] sm:text-[8px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Neural Link Active
              </div>
            </div>
            <p className="text-[9px] sm:text-[10px] font-black text-[var(--color-text-muted)] opacity-30 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
              Data Synthesis Protocols
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-[var(--color-text-muted)] opacity-20">
            <LuCpu size={24} />
            <div className="h-8 w-px bg-current" />
            <div className="text-[8px] font-black uppercase tracking-widest leading-tight">
              AI Engine:<br />v2.0.4-Stable
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="space-y-8 sm:space-y-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 sm:h-40 bg-white/[0.02] border border-white/5 rounded-[32px] sm:rounded-[40px] animate-pulse"
              ></div>
            ))}
          </div>
        ) : insights.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {insights.map((insight) => (
              <InsightCard key={insight.id || insight._id} insight={insight} />
            ))}
          </div>
        ) : (
          /* Responsive Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-6 sm:py-32 sm:px-10 rounded-[40px] sm:rounded-[56px] bg-[var(--color-surface)] border border-[var(--color-border)] relative overflow-hidden group text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative mb-8 sm:mb-10">
              <div className="absolute -inset-8 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[24px] sm:rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <LuLightbulb size={40} className="text-primary opacity-40 group-hover:opacity-100 transition-opacity animate-pulse" />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-[var(--color-text)] mb-3 sm:mb-4 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
              Intelligence Synthesis
            </h3>
            <p className="text-[var(--color-text-muted)] opacity-40 max-w-sm mb-8 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-loose">
              SafeSpend AI is currently mining your transactional data for strategic patterns.
            </p>
            
            <div className="flex items-center gap-4">
               <div className="h-px w-8 bg-primary/20" />
               <p className="text-primary/60 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">
                 Establishing Neural Baseline
               </p>
               <div className="h-px w-8 bg-primary/20" />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Insights;