import { useTheme } from "../hooks/useTheme";
import { LuSun, LuMoon } from "react-icons/lu";

/**
 * Theme Toggle Component
 * Provides a button to switch between light and dark themes
 */
const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme, isSystemTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text)",
        border: "1px solid var(--color-border)",
        padding: "8px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.2s ease",
      }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Current: ${theme} theme${isSystemTheme ? " (system)" : ""}`}
    >
      {theme === "light" ? (
        <>
          <LuMoon size={18} />
          <span>Dark</span>
        </>
      ) : (
        <>
          <LuSun size={18} />
          <span>Light</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
