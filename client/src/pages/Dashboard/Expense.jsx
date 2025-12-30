import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddEditExpenseModal from "../../components/Expense/AddEditExpenseModal";
import Modal from "../../components/Modal";
import ExpenseList from "../../components/Expense/ExpenseList";
import ConfirmAlert from "../../components/ConfirmAlert";

const ExpensePage = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openModal, setOpenModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  // Get All Expense Transactions
  const fetchExpenseTransactions = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE,
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expense transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExpense = async (expense) => {
    try {
      if (expenseToEdit) {
        await axiosInstance.put(API_PATHS.EXPENSE.UPDATE_EXPENSE(expenseToEdit._id), expense);
        toast.success("Expense updated successfully!");
      } else {
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, expense);
        toast.success("Expense added successfully!");
      }

      setOpenModal(false);
      fetchExpenseTransactions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Handle Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully!");
      fetchExpenseTransactions();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details.");
    }
  };

  useEffect(() => {
    fetchExpenseTransactions();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="py-12 max-w-[1600px] mx-auto space-y-16 px-4">
        <div className="space-y-3">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[var(--color-text)]">
            Outflow Control
          </h2>
          <p className="text-[10px] font-black text-[var(--color-chart-4)] uppercase tracking-[0.3em]">
            Monitor and mitigate your financial burn rate
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-[var(--color-chart-4)]/40 to-transparent pt-0.5" />
        </div>

        <div className="grid grid-cols-1 gap-16">
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => {
              setExpenseToEdit(null);
              setOpenModal(true);
            }}
          />

          <ExpenseList
            transactions={expenseData}
            onEdit={(expense) => {
              setExpenseToEdit(expense);
              setOpenModal(true);
            }}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <AddEditExpenseModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSaveExpense}
          expenseToEdit={expenseToEdit}
        />

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Transaction"
        >
          <div className="p-4">
            <ConfirmAlert
              content="This action is irreversible. Are you sure you want to purge this transaction?"
              onConfirm={() => {
                deleteExpense(openDeleteAlert.data);
              }}
              confirmContent="Purge Transaction"
              color="error"
            />
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default ExpensePage;
