import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { FinanceService } from "../../services/financeService";
import InsightCard from "../../components/Dashboard/InsightCard";
import { LuLightbulb } from "react-icons/lu";

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
      <div className="py-12 max-w-[1600px] mx-auto space-y-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[var(--color-text)]">
                Cognitive Analytics
              </h2>
              <div className="px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-[0.2em] animate-pulse">Neural Link Active</div>
            </div>
            <p className="text-[10px] font-black text-[var(--color-text-muted)] opacity-30 uppercase tracking-[0.3em]">
              Data Synthesis Protocols
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-white/[0.02] border border-white/5 rounded-[40px] animate-pulse"
              ></div>
            ))}
          </div>
        ) : insights.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 animate-in fade-in zoom-in-95 duration-1000">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 px-10 rounded-[56px] bg-[var(--color-surface)] border border-[var(--color-border)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative mb-10">
              <div className="absolute -inset-8 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-28 h-28 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center">
                <LuLightbulb size={48} className="text-primary opacity-40 group-hover:opacity-100 transition-opacity animate-pulse" />
              </div>
            </div>

            <h3 className="text-xl font-black text-[var(--color-text)] mb-4 uppercase tracking-[0.3em]">Intelligence Synthesis</h3>
            <p className="text-[var(--color-text-muted)] opacity-40 text-center max-w-sm mb-6 text-[10px] font-black uppercase tracking-[0.2em] leading-loose">
              SafeSpend AI is currently mining your transactional data for strategic patterns.
            </p>
            <p className="text-primary/60 text-center max-w-xs text-[9px] font-black uppercase tracking-[0.4em]">
              Establishing Neural Baseline...
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Insights;
