import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (fullName) => {
  if (!fullName) return "";
  const names = fullName.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(names.length, 2); i++) {
    initials += names[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, decimalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

const fmt = (d) => moment(d).format("DD MMM");

export const prepareExpanseBarChartData = (data = []) => {
  const grouped = {};
  let maxDate = new Date();

  data.forEach(({ date, amount }) => {
    const d = new Date(date);
    if (d > maxDate) maxDate = new Date(d);

    // Use local date string YYYY-MM-DD for grouping
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    grouped[key] = (grouped[key] || 0) + amount;
  });

  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(maxDate);
    d.setDate(d.getDate() - (29 - i));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return { date: fmt(d), amount: grouped[key] || 0 };
  });
};

export const prepareIncomeBarChartData = (data = []) => {
  const grouped = {};
  let maxDate = new Date();

  data.forEach(({ date, amount }) => {
    const d = new Date(date);
    if (d > maxDate) maxDate = new Date(d);

    // Use local date string YYYY-MM-DD for grouping
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    grouped[key] = (grouped[key] || 0) + amount;
  });

  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(maxDate);
    d.setDate(d.getDate() - (29 - i));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return { date: fmt(d), amount: grouped[key] || 0 };
  });
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};
