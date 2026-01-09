import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import EmptyTransactionInfoCard from "../Cards/EmptyTransactionInfoCard";

const RecentIncome = ({ transactions = [], onSeeMore }) => {
  const hasTransactions = transactions.length > 0;

  return (
    <div className="w-full">
      {/* 1. External Section Title - Matches image_ffceaf.png */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-text)]">
          Inflow Streams
        </h2>
        {/* Decorative Protocol Label */}
        <span className="text-[7px] font-bold text-primary/40 tracking-[0.2em] uppercase hidden sm:block">
          Neural Link: Stable
        </span>
      </div>

      {/* 2. Main Container with Cyber Aesthetic */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[40px] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Background Cyber-Grid for Empty State Consistency */}
        {!hasTransactions && (
          <div className="absolute inset-0 cyber-grid opacity-[0.02] pointer-events-none" />
        )}

        {/* 3. Internal Feed Header - Matches image_ffceaf.png layout */}
        <div className="flex items-center justify-between mb-8">
          <h5 className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-40">
            Inflow Streams // <span className="text-primary/60">Revenue</span>
          </h5>

          <button
            onClick={onSeeMore}
            aria-label="View all income transactions"
            className="group flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary hover:text-primary transition-all"
          >
            See All 
            <LuArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4. Content Section */}
        {!hasTransactions ? (
          <EmptyTransactionInfoCard
            title="No Income Records"
            description="Your income transactions will appear here."
          />
        ) : (
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
            {transactions.slice(0, 5).map((income) => (
              <TransactionInfoCard
                key={income._id}
                title={income.source}
                icon={income.icon}
                date={moment(income.date).format("DD MMM YYYY")}
                amount={income.amount}
                type="income"
                hideDeleteBtn
              />
            ))}
          </div>
        )}

        {/* 5. Bottom Decorative interface detail */}
        <div className="mt-6 flex items-center gap-2 opacity-10">
           <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white" />
           <div className="w-1 h-1 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
};

export default RecentIncome;