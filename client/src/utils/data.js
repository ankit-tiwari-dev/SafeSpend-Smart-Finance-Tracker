import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
  LuUser,
  LuChartPie,
  LuLightbulb,
  LuTarget,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  { id: "01", label: "Dashboard", icon: LuLayoutDashboard, path: "/dashboard" },
  { id: "02", label: "Income", icon: LuWalletMinimal, path: "/income" },
  { id: "03", label: "Expense", icon: LuHandCoins, path: "/expense" },
  { id: "04", label: "Budgets", icon: LuChartPie, path: "/budgets" },
  { id: "05", label: "Insights", icon: LuLightbulb, path: "/insights" },
  { id: "06", label: "Goals", icon: LuTarget, path: "/goals" },
  { id: "07", label: "Profile", icon: LuUser, path: "/profile" },
  { id: "08", label: "Logout", icon: LuLogOut, path: "/logout" },
];
