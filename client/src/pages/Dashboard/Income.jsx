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

  // Get All Income Transactions
  const fetchIncomeTransactions = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add/Update Income
  const handleSaveIncome = async (income) => {
    try {
      if (incomeToEdit) {
        await axiosInstance.put(API_PATHS.INCOME.UPDATE_INCOME(incomeToEdit._id), income);
        toast.success("Income updated successfully!");
      } else {
        await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, income);
        toast.success("Income added successfully!");
      }

      setOpenModal(false);
      fetchIncomeTransactions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Handle Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully!");
      fetchIncomeTransactions();
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  // Handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details.");
    }
  };

  useEffect(() => {
    fetchIncomeTransactions();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="py-12 max-w-[1600px] mx-auto space-y-16 px-4">
        <div className="space-y-3">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[var(--color-text)]">
            Capital Inflow
          </h2>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
            Optimization and tracking of all revenue streams
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-primary/40 to-transparent pt-0.5" />
        </div>

        <div className="grid grid-cols-1 gap-16">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => {
              setIncomeToEdit(null);
              setOpenModal(true);
            }}
          />

          <IncomeList
            transactions={incomeData}
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
        </div>

        <AddEditIncomeModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSaveIncome}
          incomeToEdit={incomeToEdit}
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
                deleteIncome(openDeleteAlert.data);
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

export default IncomePage;
