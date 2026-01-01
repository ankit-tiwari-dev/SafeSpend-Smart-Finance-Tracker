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

  const fetchExpenseTransactions = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expense transactions:", error);
      toast.error("Failed to sync transaction data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExpense = async (expense) => {
    try {
      if (expenseToEdit) {
        await axiosInstance.put(API_PATHS.EXPENSE.UPDATE_EXPENSE(expenseToEdit._id), expense);
        toast.success("Transaction updated successfully!");
      } else {
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, expense);
        toast.success("Transaction logged successfully!");
      }

      setOpenModal(false);
      fetchExpenseTransactions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Protocol error: check connectivity");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Transaction purged successfully!");
      fetchExpenseTransactions();
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to purge data point.");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `SafeSpend_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Export protocol failed.");
    }
  };

  useEffect(() => {
    fetchExpenseTransactions();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      {/* Container with dynamic padding for various screen sizes */}
      <div className="py-8 sm:py-12 max-w-[1600px] mx-auto space-y-10 sm:space-y-16 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with Premium Accents */}
        <div className="relative">
          <div className="space-y-3 relative z-10">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[var(--color-text)]">
              Outflow Control
            </h2>
            <p className="text-[9px] sm:text-[10px] font-black text-[var(--color-chart-4)] uppercase tracking-[0.2em] sm:tracking-[0.3em] opacity-80">
              Monitor and mitigate your financial burn rate
            </p>
            <div className="h-[2px] w-24 sm:w-32 bg-gradient-to-r from-[var(--color-chart-4)] to-transparent" />
          </div>
          {/* Subtle background glow */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--color-chart-4)]/5 blur-[80px] pointer-events-none" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-10 sm:gap-16">
          
          {/* Expense Overview Section */}
          <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => {
                setExpenseToEdit(null);
                setOpenModal(true);
              }}
            />
          </div>

          {/* Detailed Transaction List */}
          <div className="rounded-[32px] sm:rounded-[40px] border border-white/5 bg-white/[0.01] overflow-hidden">
             <ExpenseList
              transactions={expenseData}
              isLoading={loading}
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
        </div>

        {/* Modal Interfaces */}
        <AddEditExpenseModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSaveExpense}
          expenseToEdit={expenseToEdit}
        />

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Security Override"
        >
          <div className="p-4 sm:p-6 bg-[#0a0a0a]">
            <ConfirmAlert
              content="This action will permanently redact this transaction from your history. Proceed with data purge?"
              onConfirm={() => deleteExpense(openDeleteAlert.data)}
              confirmContent="Confirm Purge"
              color="error"
            />
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default ExpensePage;