/**
 * Chart color utilities using theme variables
 * These colors automatically adapt to light/dark theme
 */

// Get computed CSS variable values
const getComputedColor = (variable) => {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
  }
  return "";
};

// Chart color array using theme variables
export const CHART_COLORS = [
  "var(--color-chart-1)", // Primary metric - Blue
  "var(--color-chart-2)", // Secondary metric - Teal
  "var(--color-chart-3)", // Tertiary metric - Purple
  "var(--color-chart-4)", // Quaternary metric - Amber
];

// Get chart color by index (for dynamic color assignment)
export const getChartColor = (index) => {
  return CHART_COLORS[index % CHART_COLORS.length];
};

// Get all chart colors as an array
export const getAllChartColors = () => {
  return CHART_COLORS;
};
