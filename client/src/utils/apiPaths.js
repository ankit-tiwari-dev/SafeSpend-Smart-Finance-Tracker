export const BASE_URL = "http://localhost:5000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "api/v1/auth/login",
    REGISTER: "api/v1/auth/register",
    GET_USER_INFO: "api/v1/auth/getUser",
    DELETE_ACCOUNT: "api/v1/auth/deleteAccount",
    UPDATE_PROFILE: "api/v1/auth/update-profile",
  },
  DASHBOARD: {
    GET_DATA: "api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "api/v1/income/add",
    GET_ALL_INCOME: "api/v1/income/get",
    DELETE_INCOME: (incomeId) => `api/v1/income/${incomeId}`,
    UPDATE_INCOME: (incomeId) => `api/v1/income/${incomeId}`,
    DELETE_ALL_INCOME: "api/v1/income/all",
    DOWNLOAD_INCOME: "api/v1/income/downloadexcel",
  },
  EXPENSE: {
    ADD_EXPENSE: "api/v1/expense/add",
    GET_ALL_EXPENSE: "api/v1/expense/get",
    DELETE_EXPENSE: (expenseId) => `api/v1/expense/${expenseId}`,
    UPDATE_EXPENSE: (expenseId) => `api/v1/expense/${expenseId}`,
    DELETE_ALL_EXPENSE: "api/v1/expense/all",
    DOWNLOAD_EXPENSE: "api/v1/expense/downloadexcel",
  },
  IMAGE: {
    UPLOAD_IMAGE: "api/v1/auth/upload-image",
  },
  BUDGETS: {
    GET_BUDGETS: "api/v1/budgets",
    ADD_BUDGET: "api/v1/budgets",
    UPDATE_BUDGET: (id) => `api/v1/budgets/${id}`,
    DELETE_BUDGET: (id) => `api/v1/budgets/${id}`,
  },
  GOALS: {
    GET_GOALS: "api/v1/goals",
    ADD_GOAL: "api/v1/goals",
    UPDATE_GOAL: (id) => `api/v1/goals/${id}`,
    DELETE_GOAL: (id) => `api/v1/goals/${id}`,
  },
};
