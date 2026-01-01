import { useState, useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddEditIncomeModal from "../../components/Income/AddEditIncomeModal";
import { toast } from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import ConfirmAlert from "../../components/ConfirmAlert";

const IncomePage = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openModal, setOpenModal] = useState(false);
  const [incomeToEdit, setIncomeToEdit] = useState(null);

  const fetchIncomeTransactions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income transactions:", error);
      toast.error("Failed to synchronize inflow data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveIncome = async (income) => {
    try {
      if (incomeToEdit) {
        await axiosInstance.put(API_PATHS.INCOME.UPDATE_INCOME(incomeToEdit._id), income);
        toast.success("Revenue stream updated");
      } else {
        await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, income);
        toast.success("New inflow logged successfully");
      }

      setOpenModal(false);
      fetchIncomeTransactions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Protocol error: check connectivity");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Transaction purged from registry");
      fetchIncomeTransactions();
    } catch (error) {
      toast.error("Failed to redact transaction");
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Inflow_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Export protocol failed");
    }
  };

  useEffect(() => {
    fetchIncomeTransactions();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="py-8 sm:py-12 max-w-[1600px] mx-auto space-y-10 sm:space-y-16 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="relative group">
          <div className="space-y-3 relative z-10">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[var(--color-text)]">
              Capital Inflow
            </h2>
            <p className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em] opacity-80">
              Optimization and tracking of all revenue streams
            </p>
            <div className="h-[2px] w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-48" />
          </div>
          {/* Background Highlight */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 blur-[60px] pointer-events-none" />
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 gap-12 sm:gap-16">
          
          {/* Overview Section - Charts & Stats */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <IncomeOverview
              transactions={incomeData}
              isLoading={loading}
              onAddIncome={() => {
                setIncomeToEdit(null);
                setOpenModal(true);
              }}
            />
          </section>

          {/* List Section - Table/Records */}
          <section className="rounded-[32px] sm:rounded-[48px] border border-white/5 bg-white/[0.01] overflow-hidden">
            <IncomeList
              transactions={incomeData}
              isLoading={loading}
              onEdit={(income) => {
                setIncomeToEdit(income);
                setOpenModal(true);
              }}
              onDelete={(id) => {
                setOpenDeleteAlert({
                  show: true,
                  data: id,
                });
              }}
              onDownload={handleDownloadIncomeDetails}
            />
          </section>
        </div>

        {/* Modal Components */}
        <AddEditIncomeModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSaveIncome}
          incomeToEdit={incomeToEdit}
        />

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Security Override"
        >
          <div className="p-4 sm:p-6 bg-[#0a0a0a]">
            <ConfirmAlert
              content="This action is irreversible. Are you sure you want to purge this revenue transaction from the ledger?"
              onConfirm={() => deleteIncome(openDeleteAlert.data)}
              confirmContent="Purge Transaction"
              color="error"
            />
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default IncomePage;