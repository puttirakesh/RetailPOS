import { LoaderCircle } from "lucide-react";

const variants = {
  primary:
    "bg-primary text-primary-content hover:bg-primary/90 shadow-sm hover:shadow-lg hover:shadow-primary/20",

  secondary:
    "bg-secondary text-secondary-content hover:bg-secondary/90",

  outline:
    "border border-base-300 bg-base-100 hover:border-primary/40 hover:bg-primary/5",

  ghost:
    "bg-transparent hover:bg-base-200",

  danger:
    "bg-error text-error-content hover:bg-error/90",

  warning:
    "bg-warning text-warning-content hover:bg-warning/90",

  success:
    "bg-success text-success-content hover:bg-success/90",
};

const sizes = {
  xs: "h-8 px-3 text-xs",
  sm: "h-9 px-3.5 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
  xl: "h-12 px-6 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconRight,
  fullWidth = false,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        "group inline-flex items-center justify-center gap-2 rounded-xl",
        "font-medium transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        "active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
    >
      {loading ? (
        <LoaderCircle
          size={16}
          className="animate-spin"
        />
      ) : (
        icon
      )}

      <span>{children}</span>

      {!loading && iconRight}
    </button>
  );
}