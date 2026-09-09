const statusStyles = {
    active: "badge-success",
    inactive: "badge-error",
    success: "badge-success",
    error: "badge-error",
    warning: "badge-warning",
    pending: "badge-warning",
    info: "badge-info",
    neutral: "badge-neutral",
  };
  
  export default function StatusBadge({
    status,
    label,
    size = "sm",
  }) {
    const normalized = String(
      status || ""
    ).toLowerCase();
  
    const style =
      statusStyles[normalized] ||
      "badge-neutral";
  
    return (
      <span
        className={[
          "badge badge-outline",
          style,
          size === "xs"
            ? "badge-xs"
            : "",
        ].join(" ")}
      >
        {label || status}
      </span>
    );
  }