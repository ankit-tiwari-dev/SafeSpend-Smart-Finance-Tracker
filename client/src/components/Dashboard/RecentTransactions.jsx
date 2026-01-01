import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import EmptyTransactionInfoCard from "../Cards/EmptyTransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card border-none bg-transparent shadow-none p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-2">
        <h5 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[var(--color-text-muted)] opacity-40">
          Transaction Feed // Ledger
        </h5>

        <button
          onClick={onSeeMore}
          className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          See All <LuArrowRight className="text-sm sm:text-base" />
        </button>
      </div>

      {/* Body */}
      {!transactions.length ? (
        <EmptyTransactionInfoCard
          title="No Transactions"
          description="You haven't made any transactions yet."
        />
      ) : (
        <div className="mt-4 max-h-[420px] overflow-y-auto pr-1 space-y-2">
          {transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
