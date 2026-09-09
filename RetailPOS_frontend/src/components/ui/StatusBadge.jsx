const variants = {
    primary: "badge-primary",
    secondary: "badge-secondary",
    success: "badge-success",
    error: "badge-error",
    warning: "badge-warning",
    info: "badge-info",
    neutral: "badge-neutral",
  };
  
  export default function Badge({
    children,
    variant = "neutral",
    outline = true,
    className = "",
  }) {
    return (
      <span
        className={[
          "badge",
          outline ? "badge-outline" : "",
          variants[variant] ||
            variants.neutral,
          className,
        ].join(" ")}
      >
        {children}
      </span>
    );
  }