import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { LuDownload } from "react-icons/lu";

const IncomeList = (props) => {
  const { transactions, onDelete, onDownload, onEdit } = props;

  return (
    <div className="bg-[var(--color-surface)] backdrop-blur-xl p-8 rounded-[38px] border border-[var(--color-border)] shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h5 className="text-2xl font-black tracking-tight text-[var(--color-text)]">Revenue Ledger</h5>
          <div className="hidden sm:block px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest">{transactions?.length || 0} Entries</div>
        </div>

        <button
          onClick={onDownload}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] opacity-60 hover:text-primary transition-colors bg-[var(--color-divider)] py-2 px-4 rounded-xl border border-[var(--color-border)] hover:border-primary/30"
        >
          <LuDownload size={14} /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {transactions?.length > 0 ? (
          transactions.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
              onEdit={() => onEdit(income)}
            />
          ))
        ) : (
          <div className="col-span-full py-10 flex flex-col items-center justify-center opacity-40">
            <p className="text-sm font-bold uppercase tracking-widest">No income data available</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default IncomeList;
