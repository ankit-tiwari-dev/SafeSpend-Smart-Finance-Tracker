import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import EmptyTransactionInfoCard from "../Cards/EmptyTransactionInfoCard";

const RecentIncome = (props) => {
  const { transactions, onSeeMore } = props;

  return (
    <div className="card border-none bg-transparent shadow-none p-0">
      <div className="flex items-center justify-between mb-8 px-2">
        <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text-muted)] opacity-40">
          Inflow Streams // Revenue
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
        <div className="mt-6">
          {transactions?.slice(0, 5)?.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              hideDeleteBtn
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentIncome;
