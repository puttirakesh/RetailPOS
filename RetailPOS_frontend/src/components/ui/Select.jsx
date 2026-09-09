import { forwardRef, useId } from "react";

const Select = forwardRef(function Select(
  {
    label,
    error,
    helperText,
    options = [],
    placeholder = "Select an option",
    required = false,
    className = "",
    containerClassName = "",
    id,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const selectId =
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
          htmlFor={selectId}
          className="mb-2 block text-sm font-medium"
        >
          {label}

          {required && (
            <span className="ml-1 text-error">
              *
            </span>
          )}
        </label>
      )}

      <select
        ref={ref}
        id={selectId}
        aria-invalid={Boolean(error)}
        {...props}
        className={[
          "select select-bordered w-full rounded-xl",
          "bg-base-100 transition-all duration-200",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10",
          error
            ? "border-error focus:border-error"
            : "",
          className,
        ].join(" ")}
      >
        {placeholder && (
          <option value="">
            {placeholder}
          </option>
        )}

        {options.map((option) => {
          const normalized =
            typeof option ===
            "object"
              ? option
              : {
                  value: option,
                  label: option,
                };

          return (
            <option
              key={String(
                normalized.value
              )}
              value={
                normalized.value
              }
              disabled={
                normalized.disabled
              }
            >
              {normalized.label}
            </option>
          );
        })}
      </select>

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

export default Select;