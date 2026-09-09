export function formatCurrency(
    value,
    currency = "INR"
  ) {
    const numericValue =
      Number(value) || 0;
  
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }
    ).format(numericValue);
  }
  
  export function formatNumber(
    value,
    options = {}
  ) {
    const numericValue =
      Number(value) || 0;
  
    return new Intl.NumberFormat(
      "en-IN",
      options
    ).format(numericValue);
  }
  
  export function formatDate(
    value,
    options = {}
  ) {
    if (!value) return "-";
  
    const date = new Date(value);
  
    if (Number.isNaN(date.getTime())) {
      return "-";
    }
  
    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        ...options,
      }
    ).format(date);
  }
  
  export function formatDateTime(
    value
  ) {
    if (!value) return "-";
  
    const date = new Date(value);
  
    if (Number.isNaN(date.getTime())) {
      return "-";
    }
  
    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(date);
  }
  
  export function formatPercentage(
    value,
    decimals = 2
  ) {
    const numericValue =
      Number(value) || 0;
  
    return `${numericValue.toFixed(
      decimals
    )}%`;
  }
  
  export function formatCompactNumber(
    value
  ) {
    const numericValue =
      Number(value) || 0;
  
    return new Intl.NumberFormat(
      "en-IN",
      {
        notation: "compact",
        maximumFractionDigits: 1,
      }
    ).format(numericValue);
  }
  
  export function truncateText(
    value,
    maxLength = 40
  ) {
    if (!value) return "";
  
    const text = String(value);
  
    return text.length > maxLength
      ? `${text.slice(
          0,
          maxLength
        )}...`
      : text;
  }
  
  export function formatInitials(
    name
  ) {
    if (!name) return "";
  
    return String(name)
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(
        (part) =>
          part.charAt(0).toUpperCase()
      )
      .join("");
  }