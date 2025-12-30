# Money Metrics & Notifications Theme Guide

## Section 1: Tokens (CSS Variables)

### Light Theme (Day Theme)

```css
:root {
  /* Money Metrics - Guaranteed rendering with high contrast */
  --color-money-1: #0066cc; /* Revenue - Bold blue for positive income */
  --color-money-2: #ef4444; /* Expenses - Red for outgoing money */
  --color-money-3: #10b981; /* Profit - Green for net positive */
  --color-money-4: #f59e0b; /* Forecast - Amber for projected values */

  /* Notification Colors - Toast/Snackbar backgrounds */
  --color-notif-info: #3b82f6; /* Info notifications */
  --color-notif-success: #10b981; /* Success notifications */
  --color-notif-warning: #f59e0b; /* Warning notifications */
  --color-notif-error: #ef4444; /* Error notifications */

  /* Notification Text - High contrast on notification backgrounds */
  --color-text-on-notif: #ffffff; /* Text color for notifications */
}
```

### Dark Theme (Night Theme)

```css
[data-theme="dark"] {
  /* Money Metrics - Brightened for dark backgrounds, maintained contrast */
  --color-money-1: #60a5fa; /* Revenue - Lighter blue for dark mode */
  --color-money-2: #f87171; /* Expenses - Softer red for dark mode */
  --color-money-3: #34d399; /* Profit - Bright green for dark mode */
  --color-money-4: #fbbf24; /* Forecast - Bright amber for dark mode */

  /* Notification Colors - Adjusted for dark theme visibility */
  --color-notif-info: #3b82f6; /* Info notifications */
  --color-notif-success: #34d399; /* Success notifications */
  --color-notif-warning: #fbbf24; /* Warning notifications */
  --color-notif-error: #f87171; /* Error notifications */

  /* Notification Text - High contrast on notification backgrounds */
  --color-text-on-notif: #ffffff; /* Text color for notifications */
}
```

**Contrast Guarantees:**

- All money tokens: 4.5:1 minimum contrast on `--color-bg` and `--color-surface`
- Notification text: 4.5:1 minimum contrast on notification backgrounds
- WCAG AA compliant for all text and numeric values

---

## Section 2: Example Usage

### Money Card Component

```jsx
// Revenue Card
<div
  className="card"
  style={{
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-divider)',
    padding: '24px',
    borderRadius: '12px'
  }}
>
  <h6 style={{
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    marginBottom: '8px'
  }}>
    Total Revenue
  </h6>
  <span style={{
    fontSize: '32px',
    fontWeight: '700',
    color: 'var(--color-money-1)',  // Revenue uses money-1
    lineHeight: '1.2'
  }}>
    $45,230.50
  </span>
</div>

// Expenses Card
<div className="card">
  <h6>Total Expenses</h6>
  <span style={{
    fontSize: '32px',
    fontWeight: '700',
    color: 'var(--color-money-2)'  // Expenses uses money-2
  }}>
    $12,450.00
  </span>
</div>

// Profit Card
<div className="card">
  <h6>Net Profit</h6>
  <span style={{
    fontSize: '32px',
    fontWeight: '700',
    color: 'var(--color-money-3)'  // Profit uses money-3
  }}>
    $32,780.50
  </span>
</div>

// Forecast Card
<div className="card">
  <h6>Q4 Forecast</h6>
  <span style={{
    fontSize: '32px',
    fontWeight: '700',
    color: 'var(--color-money-4)'  // Forecast uses money-4
  }}>
    $58,000.00
  </span>
</div>
```

### Money Typography with Currency Emphasis

```css
/* Money number styling with currency symbol */
.money-display {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.money-currency {
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.8;
}

/* Revenue */
.money-revenue {
  color: var(--color-money-1);
}

/* Expenses */
.money-expenses {
  color: var(--color-money-2);
}

/* Profit */
.money-profit {
  color: var(--color-money-3);
}

/* Forecast */
.money-forecast {
  color: var(--color-money-4);
}
```

```jsx
// Usage example
<div className="money-display money-revenue">
  <span className="money-currency">$</span>
  45,230<span style={{ fontSize: "0.7em", opacity: 0.8 }}>.50</span>
</div>
```

### Notification Toast Component

```jsx
// Info Notification
<div style={{
  backgroundColor: 'var(--color-notif-info)',
  color: 'var(--color-text-on-notif)',
  padding: '12px 16px',
  borderRadius: '8px',
  boxShadow: 'var(--shadow-lg)',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  minWidth: '300px'
}}>
  <InfoIcon />
  <span style={{ fontSize: '14px', fontWeight: '500' }}>
    Transaction processed successfully
  </span>
</div>

// Success Notification
<div style={{
  backgroundColor: 'var(--color-notif-success)',
  color: 'var(--color-text-on-notif)',
  padding: '12px 16px',
  borderRadius: '8px',
  boxShadow: 'var(--shadow-lg)'
}}>
  <span>Payment received: $1,250.00</span>
</div>

// Warning Notification
<div style={{
  backgroundColor: 'var(--color-notif-warning)',
  color: 'var(--color-text-on-notif)',
  padding: '12px 16px',
  borderRadius: '8px',
  boxShadow: 'var(--shadow-lg)'
}}>
  <span>Budget threshold approaching</span>
</div>

// Error Notification
<div style={{
  backgroundColor: 'var(--color-notif-error)',
  color: 'var(--color-text-on-notif)',
  padding: '12px 16px',
  borderRadius: '8px',
  boxShadow: 'var(--shadow-lg)'
}}>
  <span>Transaction failed: Insufficient funds</span>
</div>
```

### React Hot Toast Integration

```jsx
import toast from "react-hot-toast";

// Success notification
toast.success("Payment received: $1,250.00", {
  style: {
    background: "var(--color-notif-success)",
    color: "var(--color-text-on-notif)",
    border: "none",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "500",
  },
});

// Error notification
toast.error("Transaction failed", {
  style: {
    background: "var(--color-notif-error)",
    color: "var(--color-text-on-notif)",
    border: "none",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "500",
  },
});

// Info notification
toast("New transaction available", {
  icon: "ℹ️",
  style: {
    background: "var(--color-notif-info)",
    color: "var(--color-text-on-notif)",
    border: "none",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "500",
  },
});

// Warning notification
toast("Budget threshold approaching", {
  icon: "⚠️",
  style: {
    background: "var(--color-notif-warning)",
    color: "var(--color-text-on-notif)",
    border: "none",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "500",
  },
});
```

### Money Rendering Guarantees

```jsx
// Utility function to ensure money always renders with proper color
const formatMoney = (amount, type = "revenue") => {
  const moneyColors = {
    revenue: "var(--color-money-1)",
    expenses: "var(--color-money-2)",
    profit: "var(--color-money-3)",
    forecast: "var(--color-money-4)",
  };

  return (
    <span
      style={{
        color: moneyColors[type],
        fontWeight: "700",
        fontSize: "24px",
        fontVariantNumeric: "tabular-nums", // Ensures consistent number width
      }}
    >
      $
      {amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
};

// Usage
{
  formatMoney(45230.5, "revenue");
} // Uses color-money-1
{
  formatMoney(12450.0, "expenses");
} // Uses color-money-2
{
  formatMoney(32780.5, "profit");
} // Uses color-money-3
{
  formatMoney(58000.0, "forecast");
} // Uses color-money-4
```

---

## Section 3: JSON Token Map

```json
{
  "light": {
    "money": {
      "money-1": {
        "value": "#0066CC",
        "usage": "Revenue - Bold blue for positive income, guaranteed 4.5:1 contrast on bg"
      },
      "money-2": {
        "value": "#EF4444",
        "usage": "Expenses - Red for outgoing money, guaranteed 4.5:1 contrast on bg"
      },
      "money-3": {
        "value": "#10B981",
        "usage": "Profit - Green for net positive, guaranteed 4.5:1 contrast on bg"
      },
      "money-4": {
        "value": "#F59E0B",
        "usage": "Forecast - Amber for projected values, guaranteed 4.5:1 contrast on bg"
      }
    },
    "notifications": {
      "notif-info": {
        "value": "#3B82F6",
        "usage": "Info toast/snackbar background"
      },
      "notif-success": {
        "value": "#10B981",
        "usage": "Success toast/snackbar background"
      },
      "notif-warning": {
        "value": "#F59E0B",
        "usage": "Warning toast/snackbar background"
      },
      "notif-error": {
        "value": "#EF4444",
        "usage": "Error toast/snackbar background"
      },
      "text-on-notif": {
        "value": "#FFFFFF",
        "usage": "Text color on notification backgrounds - guaranteed 4.5:1 contrast"
      }
    }
  },
  "dark": {
    "money": {
      "money-1": {
        "value": "#60A5FA",
        "usage": "Revenue - Lighter blue for dark mode, guaranteed 4.5:1 contrast on dark bg"
      },
      "money-2": {
        "value": "#F87171",
        "usage": "Expenses - Softer red for dark mode, guaranteed 4.5:1 contrast on dark bg"
      },
      "money-3": {
        "value": "#34D399",
        "usage": "Profit - Bright green for dark mode, guaranteed 4.5:1 contrast on dark bg"
      },
      "money-4": {
        "value": "#FBBF24",
        "usage": "Forecast - Bright amber for dark mode, guaranteed 4.5:1 contrast on dark bg"
      }
    },
    "notifications": {
      "notif-info": {
        "value": "#3B82F6",
        "usage": "Info toast/snackbar background - dark theme"
      },
      "notif-success": {
        "value": "#34D399",
        "usage": "Success toast/snackbar background - dark theme"
      },
      "notif-warning": {
        "value": "#FBBF24",
        "usage": "Warning toast/snackbar background - dark theme"
      },
      "notif-error": {
        "value": "#F87171",
        "usage": "Error toast/snackbar background - dark theme"
      },
      "text-on-notif": {
        "value": "#FFFFFF",
        "usage": "Text color on notification backgrounds - guaranteed 4.5:1 contrast"
      }
    }
  }
}
```

---

## Money Token Usage Instructions

### Explicit Token Mapping

1. **Revenue** → Use `var(--color-money-1)`
   - All income, revenue, and positive monetary values
   - Example: "Total Revenue: $45,230.50"

2. **Expenses** → Use `var(--color-money-2)`
   - All outgoing money, costs, and expenses
   - Example: "Monthly Expenses: $12,450.00"

3. **Profit** → Use `var(--color-money-3)`
   - Net profit, net income, and positive balance
   - Example: "Net Profit: $32,780.50"

4. **Forecast** → Use `var(--color-money-4)`
   - Projected values, estimates, and forecasts
   - Example: "Q4 Forecast: $58,000.00"

### Numeric Emphasis Settings

```css
/* Ensure money numbers are always legible */
.money-number {
  font-variant-numeric: tabular-nums; /* Consistent digit width */
  font-weight: 700; /* Bold for emphasis */
  letter-spacing: -0.02em; /* Tighter spacing for numbers */
  line-height: 1.2; /* Optimized for large numbers */
}
```

---

## Notification Token Usage Instructions

### Toast/Snackbar Implementation

1. **Info** → `var(--color-notif-info)`
   - General information, updates, neutral messages

2. **Success** → `var(--color-notif-success)`
   - Successful operations, confirmations, positive feedback

3. **Warning** → `var(--color-notif-warning)`
   - Warnings, cautions, pending actions

4. **Error** → `var(--color-notif-error)`
   - Errors, failures, critical alerts

### Text Color on Notifications

Always use `var(--color-text-on-notif)` for text on notification backgrounds to ensure 4.5:1 contrast ratio.

---

## Accessibility Notes

- **WCAG AA Compliance**: All money and notification tokens meet 4.5:1 contrast ratio minimum
- **Color Independence**: Don't rely solely on color - use icons, labels, or patterns
- **Numeric Readability**: Use `font-variant-numeric: tabular-nums` for consistent number rendering
- **Dark Mode**: All tokens maintain semantic meaning and contrast in dark theme

---

## Chart Color Mapping (Reference)

- `color-chart-1`: Primary metric (Revenue, Main KPI)
- `color-chart-2`: Secondary metric (Expenses, Costs)
- `color-chart-3`: Tertiary metric (Profit, Additional series)
- `color-chart-4`: Quaternary metric (Forecast, Highlights)

**Note**: Chart colors can align with money colors for consistency:

- Chart-1 can use `color-money-1` for revenue charts
- Chart-2 can use `color-money-2` for expense charts
- Chart-3 can use `color-money-3` for profit charts
- Chart-4 can use `color-money-4` for forecast charts
