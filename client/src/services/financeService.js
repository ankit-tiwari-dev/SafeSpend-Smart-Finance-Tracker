import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

// --- SERVICE METHODS ---

export const FinanceService = {
  // --- DASHBOARD ---
  getDashboardData: async () => {
    const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
    return response.data;
  },

  getAllIncome: async () => {
    const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
    return response.data;
  },

  getAllExpense: async () => {
    const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
    return response.data;
  },

  // --- BUDGETS (REAL API) ---
  getBudgets: async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.BUDGETS.GET_BUDGETS);
      return response.data;
    } catch (error) {
      console.error("Error fetching budgets:", error);
      throw error;
    }
  },

  addBudget: async (budget) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.BUDGETS.ADD_BUDGET,
        budget,
      );
      return response.data;
    } catch (error) {
      console.error("Error adding budget:", error);
      throw error;
    }
  },

  updateBudget: async (id, budget) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.BUDGETS.UPDATE_BUDGET(id),
        budget,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating budget:", error);
      throw error;
    }
  },

  deleteBudget: async (id) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.BUDGETS.DELETE_BUDGET(id),
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting budget:", error);
      throw error;
    }
  },

  // --- GOALS (REAL API) ---
  getGoals: async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.GOALS.GET_GOALS);
      return response.data;
    } catch (error) {
      console.error("Error fetching goals:", error);
      throw error;
    }
  },

  addGoal: async (goal) => {
    try {
      const response = await axiosInstance.post(API_PATHS.GOALS.ADD_GOAL, goal);
      return response.data;
    } catch (error) {
      console.error("Error adding goal:", error);
      throw error;
    }
  },

  updateGoal: async (id, goal) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.GOALS.UPDATE_GOAL(id),
        goal,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating goal:", error);
      throw error;
    }
  },

  deleteGoal: async (id) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.GOALS.DELETE_GOAL(id),
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting goal:", error);
      throw error;
    }
  },

  // --- INSIGHTS (HYBRID / MOCKED FOR NOW) ---
  // Note: Insights logic usually involves heavy backend calculation.
  // For Phase 2, we will keep this ruled-based on Client Side or Mocked
  // until a dedicated Insights Controller is built.
  getInsights: async () => {
    // Mock delay to simulate calculation
    return new Promise((resolve) => {
      const MOCK_INSIGHTS = [
        {
          id: "i1",
          type: "warning",
          message: "You exceeded your Entertainment budget by ₹200.",
          date: new Date().toISOString(),
        },
        {
          id: "i2",
          type: "info",
          message: "You spent 32% of your income on food this month.",
          date: new Date().toISOString(),
        },
        {
          id: "i3",
          type: "success",
          message: "You saved more than last month!",
          date: new Date().toISOString(),
        },
      ];
      setTimeout(() => resolve(MOCK_INSIGHTS), 500);
    });
  },
};
