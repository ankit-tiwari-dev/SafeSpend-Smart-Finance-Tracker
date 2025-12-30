# Enterprise Finance SaaS Theme System - Usage Examples

## Overview

This document provides practical examples for using the enterprise finance SaaS theme system. The theme is designed for financial teams, executives, and operations with a focus on reliability, data-driven insights, and enterprise-grade accessibility.

---

## Section 1: CSS Variables (Tokens)

### Light Theme Usage

```css
/* Import the theme file */
@import "./styles/themes.css";

/* Use CSS variables in your components */
.my-component {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

### Dark Theme Usage

```css
/* Dark theme is automatically applied when data-theme="dark" is set */
[data-theme="dark"] .my-component {
  /* Variables automatically switch to dark values */
  background-color: var(--color-surface);
  color: var(--color-text);
}
```

---

## Section 2: Example Usage Snippets

### Button - Primary

```jsx
// Primary button with brand color
<button
  className="btn-primary"
  style={{
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-primary-contrast)',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer'
  }}
>
  Submit Transaction
</button>

// Hover state
.btn-primary:hover {
  background-color: var(--color-primary-600);
}
```

### Card Component

```jsx
// Card with surface color and divider border
<div
  className="card"
  style={{
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-divider)",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "var(--shadow-md)",
  }}
>
  <h3 style={{ color: "var(--color-text)" }}>Financial Overview</h3>
  <p style={{ color: "var(--color-text-muted)" }}>
    Total balance and transaction summary
  </p>
</div>
```

### Status Indicators

```jsx
// Success indicator
<div style={{ color: 'var(--color-success)' }}>
  ✓ Transaction completed
</div>

// Warning indicator
<div style={{ color: 'var(--color-warning)' }}>
  ⚠ Pending approval
</div>

// Error indicator
<div style={{ color: 'var(--color-error)' }}>
  ✕ Transaction failed
</div>
```

### Chart Implementation

```jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Chart with theme colors
const ChartComponent = ({ data }) => {
  return (
    <BarChart data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="revenue" fill="var(--color-chart-1)" name="Revenue" />
      <Bar dataKey="expenses" fill="var(--color-chart-2)" name="Expenses" />
      <Bar dataKey="profit" fill="var(--color-chart-3)" name="Profit" />
    </BarChart>
  );
};

// Chart color mapping notes:
// - color-chart-1: Primary metric (Revenue, Main KPI)
// - color-chart-2: Secondary metric (Expenses, Costs)
// - color-chart-3: Tertiary metric (Profit, Additional series)
// - color-chart-4: Quaternary metric (Highlights, Outliers)
```

### Input Fields

```jsx
// Input with theme colors
<input
  type="text"
  style={{
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '12px',
    width: '100%'
  }}
  placeholder="Enter amount"
/>

// Focus state
input:focus {
  outline: '2px solid var(--color-primary)',
  outlineOffset: '2px',
  borderColor: 'var(--color-primary)'
}
```

### Secondary Actions

```jsx
// Secondary button
<button
  style={{
    backgroundColor: "transparent",
    color: "var(--color-secondary)",
    border: "1px solid var(--color-secondary)",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  View Details
</button>
```

---

## Section 3: Theme Toggle Implementation

### React Theme Toggle Component

```jsx
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text)",
        border: "1px solid var(--color-border)",
        padding: "8px 16px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
```

### System Preference Detection

```jsx
// Auto-detect system preference
useEffect(() => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const systemTheme = mediaQuery.matches ? "dark" : "light";

  // Use system preference if no user preference is saved
  if (!localStorage.getItem("theme")) {
    setTheme(systemTheme);
    document.documentElement.setAttribute("data-theme", systemTheme);
  }

  // Listen for system theme changes
  const handleChange = (e) => {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  mediaQuery.addEventListener("change", handleChange);
  return () => mediaQuery.removeEventListener("change", handleChange);
}, []);
```

---

## Section 4: Integration with Existing Components

### Updating Tailwind Theme

```css
/* In index.css, update @theme block */
@theme {
  --font-display: "Poppins", "sans-serif";
  --breakpoint-3xl: 1920px;

  /* Map theme variables to Tailwind */
  --color-primary: var(--color-primary);
  --color-secondary: var(--color-secondary);
  --color-success: var(--color-success);
  --color-warning: var(--color-warning);
  --color-error: var(--color-error);
}
```

### Updating Existing Button Classes

```css
/* Update btn-primary to use theme variables */
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--color-primary-600);
}
```

### Updating Card Classes

```css
/* Update card to use theme variables */
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-divider);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-md);
}
```

---

## Section 5: Chart Color Mapping Guide

### Recommended Chart Color Usage

```javascript
// Chart color constants
export const CHART_COLORS = {
  primary: "var(--color-chart-1)", // #0066CC - Revenue, Main KPI
  secondary: "var(--color-chart-2)", // #00A3A3 - Expenses, Costs
  tertiary: "var(--color-chart-3)", // #8B5CF6 - Profit, Additional
  quaternary: "var(--color-chart-4)", // #F59E0B - Highlights, Outliers
};

// Usage in Recharts
const data = [
  { name: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { name: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
];

<BarChart data={data}>
  <Bar dataKey="revenue" fill={CHART_COLORS.primary} />
  <Bar dataKey="expenses" fill={CHART_COLORS.secondary} />
  <Bar dataKey="profit" fill={CHART_COLORS.tertiary} />
</BarChart>;
```

### Legend Notes

- **Chart-1 (Blue)**: Primary business metric - typically revenue, total income, or main KPI
- **Chart-2 (Teal)**: Secondary metric - expenses, costs, or comparative data
- **Chart-3 (Purple)**: Tertiary metric - profit margins, additional series, or supporting data
- **Chart-4 (Amber)**: Highlights - outliers, alerts, or special attention items

---

## Section 6: Accessibility Best Practices

### Contrast Ratios

All color combinations meet WCAG AA standards:

- **Text on background**: 4.5:1 minimum
- **Large text**: 3:1 minimum
- **Interactive elements**: 3:1 minimum

### Status Indicators

```jsx
// Don't rely solely on color - include icons or text
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <span
    style={{
      color: "var(--color-success)",
      fontWeight: "bold",
    }}
  >
    ✓
  </span>
  <span style={{ color: "var(--color-text)" }}>Transaction successful</span>
</div>
```

### Focus States

```css
/* Ensure all interactive elements have visible focus */
button:focus-visible,
input:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## Section 7: JSON Token Map Usage

### Loading Tokens in JavaScript

```javascript
import tokens from "./styles/tokens.json";

// Access light theme tokens
const lightPrimary = tokens.light.primary.base;
const lightChart1 = tokens.light.charts["chart-1"].value;

// Access dark theme tokens
const darkPrimary = tokens.dark.primary.base;
const darkChart1 = tokens.dark.charts["chart-1"].value;

// Use in component
const MyComponent = () => {
  const theme = "light"; // or 'dark'
  const primaryColor = tokens[theme].primary.base;

  return <div style={{ color: primaryColor }}>Themed content</div>;
};
```

### TypeScript Type Definitions (Optional)

```typescript
// types/theme.ts
export interface ThemeTokens {
  light: {
    primary: {
      base: string;
      "600": string;
      "500": string;
      contrast: string;
    };
    // ... other tokens
  };
  dark: {
    // ... dark theme tokens
  };
}
```

---

## Brand Customization Notes

### Replacing Brand Colors

To customize the brand colors, update the CSS variables in `themes.css`:

```css
:root {
  /* Replace with your brand's primary color */
  --color-primary: #YOUR_BRAND_COLOR;
  --color-primary-600: #YOUR_DARKER_SHADE;
}
```

### Maintaining Consistency

- Keep semantic meaning consistent (primary = main action, success = positive, etc.)
- Ensure contrast ratios remain accessible after changes
- Test both light and dark themes when making adjustments
- Update JSON tokens file to reflect changes

---

## Quick Reference

### Most Common Variables

```css
/* Colors */
var(--color-primary)           /* Main brand color */
var(--color-primary-contrast)  /* Text on primary */
var(--color-surface)           /* Card/container background */
var(--color-bg)                /* Page background */
var(--color-text)              /* Primary text */
var(--color-text-muted)        /* Secondary text */
var(--color-border)            /* Component borders */
var(--color-divider)           /* Section dividers */

/* Status */
var(--color-success)           /* Success states */
var(--color-warning)           /* Warning states */
var(--color-error)             /* Error states */

/* Charts */
var(--color-chart-1)          /* Primary metric */
var(--color-chart-2)           /* Secondary metric */
var(--color-chart-3)           /* Tertiary metric */
var(--color-chart-4)           /* Quaternary metric */
```
