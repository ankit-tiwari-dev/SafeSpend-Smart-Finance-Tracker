# Enterprise Finance SaaS Theme System

A comprehensive, enterprise-grade theme system designed for financial SaaS applications with a focus on reliability, data-driven insights, and accessibility.

## 📁 Files Overview

- **`themes.css`** - Complete CSS variable definitions for light and dark themes
- **`tokens.json`** - JSON token manifest with all color values and metadata
- **`theme-examples.md`** - Detailed usage examples and integration guide

## 🎨 Design Philosophy

**Persona**: Innovative + Enterprise-focused  
**Values**: Reliability, forward-thinking, data-driven, scalable, secure  
**Target Users**: Financial teams, executives, operations, finance admins  
**Tone**: Modern, precise, minimal clutter, high readability

## 🚀 Quick Start

### 1. Import the Theme

The theme is automatically imported in `index.css`. If you need to import it elsewhere:

```css
@import "./styles/themes.css";
```

### 2. Use Theme Variables

```jsx
<div
  style={{
    backgroundColor: "var(--color-surface)",
    color: "var(--color-text)",
    border: "1px solid var(--color-border)",
  }}
>
  Content
</div>
```

### 3. Toggle Theme

```jsx
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <div>
      <ThemeToggle />
      {/* Your app content */}
    </div>
  );
}
```

Or use the hook directly:

```jsx
import { useTheme } from "./hooks/useTheme";

function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();

  return <button onClick={toggleTheme}>Current: {theme}</button>;
}
```

## 🎯 Color Tokens

### Primary Colors

- `--color-primary` - Main brand color (Blue: #0066CC)
- `--color-primary-600` - Darker shade for hover states
- `--color-primary-500` - Standard primary
- `--color-primary-contrast` - Text color on primary background

### Secondary Colors

- `--color-secondary` - Complementary actions (Teal: #00A3A3)
- `--color-secondary-600` - Darker secondary shade

### Background & Surface

- `--color-bg` - Page background
- `--color-surface` - Card/container backgrounds

### Text Colors

- `--color-text` - Primary text (high contrast)
- `--color-text-muted` - Secondary/muted text

### Borders & Dividers

- `--color-border` - Component borders
- `--color-divider` - Section dividers

### Status Colors

- `--color-success` - Success states, positive actions
- `--color-success-600` - Darker success shade
- `--color-warning` - Warning states, pending actions
- `--color-error` - Error states, destructive actions

### Chart Colors

- `--color-chart-1` - Primary metric (Revenue, Main KPI)
- `--color-chart-2` - Secondary metric (Expenses, Costs)
- `--color-chart-3` - Tertiary metric (Profit, Additional series)
- `--color-chart-4` - Quaternary metric (Highlights, Outliers)

## 🌓 Theme Switching

The theme system supports automatic switching between light and dark modes:

1. **Manual Toggle**: Use `ThemeToggle` component or `useTheme` hook
2. **System Preference**: Automatically detects OS preference (if no manual preference is set)
3. **Persistence**: User preference is saved to localStorage

### Implementation

```jsx
import { useTheme } from "../hooks/useTheme";

const { theme, toggleTheme, setTheme, resetToSystem } = useTheme();

// Toggle between light/dark
toggleTheme();

// Set specific theme
setTheme("dark");

// Reset to system preference
resetToSystem();
```

## 📊 Chart Color Usage

Recommended color mapping for data visualization:

```javascript
// Primary metric - Main KPI, Revenue
const revenueColor = "var(--color-chart-1)"; // Blue

// Secondary metric - Expenses, Costs
const expenseColor = "var(--color-chart-2)"; // Teal

// Tertiary metric - Profit, Additional series
const profitColor = "var(--color-chart-3)"; // Purple

// Quaternary metric - Highlights, Outliers
const highlightColor = "var(--color-chart-4)"; // Amber
```

## ♿ Accessibility

All color combinations meet **WCAG AA** standards:

- Text contrast: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

### Best Practices

1. **Don't rely solely on color** - Use icons, text, or patterns for status indicators
2. **Test contrast ratios** - Use browser dev tools to verify accessibility
3. **Support keyboard navigation** - Ensure all interactive elements are keyboard accessible
4. **Provide focus indicators** - Use `--color-primary` for focus outlines

## 🔧 Customization

### Updating Brand Colors

Edit `themes.css` to customize colors:

```css
:root {
  --color-primary: #YOUR_BRAND_COLOR;
  --color-primary-600: #YOUR_DARKER_SHADE;
}
```

**Important**: After changing colors, verify contrast ratios remain accessible.

### JSON Token Access

```javascript
import tokens from "./styles/tokens.json";

const primaryColor = tokens.light.primary.base;
const chartColors = tokens.light.charts;
```

## 📚 Additional Resources

- **`theme-examples.md`** - Comprehensive usage examples
- **`tokens.json`** - Complete token reference with descriptions
- **Component Examples** - See `ThemeToggle.jsx` for implementation reference

## 🎨 Light Theme Palette

- **Primary**: #0066CC (Bold Blue)
- **Secondary**: #00A3A3 (Teal)
- **Background**: #FAFBFC (Off-white)
- **Surface**: #FFFFFF (White)
- **Text**: #1A1F2E (Near-black)
- **Text Muted**: #6B7280 (Gray)

## 🌙 Dark Theme Palette

- **Primary**: #3B82F6 (Bright Blue)
- **Secondary**: #14B8A6 (Bright Teal)
- **Background**: #0F1419 (Near-black)
- **Surface**: #1A1F2E (Dark gray)
- **Text**: #F9FAFB (Near-white)
- **Text Muted**: #9CA3AF (Light gray)

## 🔄 Migration from Existing Styles

If you're migrating from the existing purple theme:

1. Replace hardcoded colors with CSS variables
2. Update Tailwind config to reference theme variables
3. Test both light and dark themes
4. Verify accessibility contrast ratios

Example migration:

```css
/* Before */
.my-button {
  background-color: #875cf5;
  color: white;
}

/* After */
.my-button {
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
}
```

## 📝 Notes

- Theme variables automatically switch when `data-theme="dark"` is set on the root element
- Transitions are included for smooth theme switching
- System preference detection is built into the `useTheme` hook
- All tokens are documented in `tokens.json` with usage descriptions

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Maintained by**: Enterprise Finance SaaS Team
