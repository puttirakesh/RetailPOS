import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    required = false,
    leftIcon,
    rightIcon,
    className = "",
    containerClassName = "",
    id,
    ...props
  },
  ref
) {
  const generatedId = useId();

  const inputId =
    id || generatedId;

  return (
    <div
      className={[
        "w-full",
        containerClassName,
      ].join(" ")}
    >
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-base-content"
        >
          {label}

          {required && (
            <span className="ml-1 text-error">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          {...props}
          className={[
            "input input-bordered w-full rounded-xl",
            "bg-base-100 transition-all duration-200",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10",
            "placeholder:text-base-content/30",
            error
              ? "border-error focus:border-error focus:ring-error/10"
              : "",
            leftIcon
              ? "pl-10"
              : "",
            rightIcon
              ? "pr-10"
              : "",
            className,
          ].join(" ")}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-error">
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-base-content/45">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default Input;