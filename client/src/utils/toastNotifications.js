/**
 * Toast notification utilities using theme notification tokens
 * Ensures guaranteed rendering with proper contrast
 */
import toast from "react-hot-toast";

const toastStyle = {
  borderRadius: "8px",
  padding: "12px 16px",
  fontSize: "14px",
  fontWeight: "500",
  boxShadow: "var(--shadow-lg)",
  border: "none",
};

/**
 * Show success notification
 */
export const showSuccessToast = (message) => {
  return toast.success(message, {
    style: {
      ...toastStyle,
      background: "var(--color-notif-success)",
      color: "var(--color-text-on-notif)",
    },
    duration: 4000,
  });
};

/**
 * Show error notification
 */
export const showErrorToast = (message) => {
  return toast.error(message, {
    style: {
      ...toastStyle,
      background: "var(--color-notif-error)",
      color: "var(--color-text-on-notif)",
    },
    duration: 5000,
  });
};

/**
 * Show info notification
 */
export const showInfoToast = (message, icon = "ℹ️") => {
  return toast(message, {
    icon,
    style: {
      ...toastStyle,
      background: "var(--color-notif-info)",
      color: "var(--color-text-on-notif)",
    },
    duration: 4000,
  });
};

/**
 * Show warning notification
 */
export const showWarningToast = (message) => {
  return toast(message, {
    icon: "⚠️",
    style: {
      ...toastStyle,
      background: "var(--color-notif-warning)",
      color: "var(--color-text-on-notif)",
    },
    duration: 5000,
  });
};

/**
 * Show notification with money amount
 */
export const showMoneyToast = (message, amount, type = "success") => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  const fullMessage = `${message}: ${formattedAmount}`;

  if (type === "success") {
    return showSuccessToast(fullMessage);
  } else if (type === "error") {
    return showErrorToast(fullMessage);
  } else if (type === "warning") {
    return showWarningToast(fullMessage);
  } else {
    return showInfoToast(fullMessage);
  }
};
