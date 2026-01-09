import { LuArrowRight, LuActivity } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import EmptyTransactionInfoCard from "../Cards/EmptyTransactionInfoCard";

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[40px] p-6 lg:p-10 shadow-2xl relative overflow-hidden">
      
      {/* Header Area matching your image style */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <LuActivity className="text-primary text-xs animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text)]">
              Transaction Logs
            </h5>
            <span className="text-[7px] font-bold text-primary/40 tracking-[0.2em] uppercase">Ledger Sync: Active</span>
          </div>
        </div>

        <button
          onClick={onSeeMore}
          className="group text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-all flex items-center gap-2"
        >
          See All 
          <LuArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Body Section */}
      {!transactions.length ? (
        <EmptyTransactionInfoCard
          title="Protocol Idle"
          description="You haven't made any transactions yet. Your financial footprint will appear here."
        />
      ) : (
        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
          {transactions.slice(0, 6).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("DD MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))}
        </div>
      )}

      {/* Technical Footer Decoration */}
      <div className="mt-8 flex items-center gap-4 opacity-10">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white" />
        <span className="text-[7px] font-black uppercase tracking-widest">End of Feed</span>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white" />
      </div>
    </div>
  );
};

export default RecentTransactions;