import { useState, useEffect } from "react";

/**
 * Custom hook for theme management
 * Handles theme switching, persistence, and system preference detection
 */
export const useTheme = () => {
  const [theme, setTheme] = useState("light");
  const [isSystemTheme, setIsSystemTheme] = useState(false);

  const applyTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
      setIsSystemTheme(false);
    } else {
      // Default to "light" (Studio Premiere) for a consistent first impression
      setTheme("light");
      applyTheme("light");
      setIsSystemTheme(false);
    }
  }, []);

  // Removed system theme listeners to ensure designer-intended stability
  useEffect(() => {
    // System preference listeners are disabled in Revision 17
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setIsSystemTheme(false);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const setThemeManually = (newTheme) => {
    if (newTheme === "light" || newTheme === "dark") {
      setTheme(newTheme);
      setIsSystemTheme(false);
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    }
  };

  const resetToSystem = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = mediaQuery.matches ? "dark" : "light";
    setTheme(systemTheme);
    setIsSystemTheme(true);
    localStorage.removeItem("theme");
    applyTheme(systemTheme);
  };

  return {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    isSystemTheme,
    toggleTheme,
    setTheme: setThemeManually,
    resetToSystem,
  };
};
