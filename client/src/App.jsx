import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import VerifySignUp from "./pages/Auth/VerifySignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import Profile from "./pages/Dashboard/Profile";
import LandingPage from "./pages/LandingPage";
import PrivacyPolicy from "./pages/Public/PrivacyPolicy";
import TermsAndConditions from "./pages/Public/TermsAndConditions";
import Contact from "./pages/Public/Contact";
import Feedback from "./pages/Public/Feedback";

import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./hooks/useTheme";

import Budgets from "./pages/Dashboard/Budgets";
import Insights from "./pages/Dashboard/Insights";
import Goals from "./pages/Dashboard/Goals";

// Theme initializer component
const ThemeInitializer = () => {
  useTheme();
  return null;
};

// Parse token from the query string on app startup and store in localStorage
const TokenHandler = () => {
  // run once
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      try {
        localStorage.setItem("token", token);
      } catch (e) {
        console.error("Failed to store token in localStorage", e);
      }
      params.delete("token");
      const newSearch = params.toString();
      const newUrl =
        window.location.pathname +
        (newSearch ? `?${newSearch}` : "") +
        window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    }
  }
  return null;
};

function App() {
  return (
    <UserProvider>
      <ThemeInitializer />
      <TokenHandler />
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-signup" element={<VerifySignUp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "8px",
            padding: "12px 16px",
            boxShadow: "var(--shadow-lg)",
            border: "none",
          },
        }}
        position="top-right"
      />
    </UserProvider>
  );
}

export default App;
