import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import EmptyTransactionInfoCard from "../Cards/EmptyTransactionInfoCard";

const ExpenseTransactions = (props) => {
  const { transactions, onSeeMore } = props;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>

        <button className="card-btn" onClick={onSeeMore}>
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
          {transactions.slice(0, 5).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseTransactions;
