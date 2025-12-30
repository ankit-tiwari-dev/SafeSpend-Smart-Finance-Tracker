import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import EmptyTransactionInfoCard from "../Cards/EmptyTransactionInfoCard";

const RecentTransactions = (props) => {
  const { transactions, onSeeMore } = props;

  return (
    <div className="card border-none bg-transparent shadow-none p-0">
      <div className="flex items-center justify-between mb-8 px-2">
        <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text-muted)] opacity-40">
          Transaction Feed // Ledger
        </h5>
        <button className="text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-all flex items-center gap-2" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {!transactions.length ? (
        <EmptyTransactionInfoCard
          title="No Transactions"
          description="You haven't made any transactions yet."
        />
      ) : (
        <div className="mt-6 h-full">
          {transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MM YYYY")}
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
