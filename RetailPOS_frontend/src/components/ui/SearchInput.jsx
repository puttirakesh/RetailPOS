import {
    Search,
    X,
  } from "lucide-react";
  
  export default function SearchInput({
    value,
    onChange,
    placeholder = "Search...",
    onClear,
    className = "",
  }) {
    return (
      <div
        className={[
          "group relative",
          className,
        ].join(" ")}
      >
        <Search
          size={17}
          className="
            pointer-events-none
            absolute left-3.5 top-1/2
            -translate-y-1/2
            text-base-content/35
            transition-colors
            group-focus-within:text-primary
          "
        />
  
        <input
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder={placeholder}
          className="
            input input-bordered
            w-full rounded-xl
            bg-base-100
            pl-10 pr-10
            transition-all duration-200
            focus:border-primary
            focus:outline-none
            focus:ring-2
            focus:ring-primary/10
          "
        />
  
        {value && (
          <button
            type="button"
            onClick={
              onClear ||
              (() => onChange(""))
            }
            className="
              absolute right-2.5 top-1/2
              flex h-7 w-7
              -translate-y-1/2
              items-center
              justify-center
              rounded-lg
              text-base-content/40
              hover:bg-base-200
              hover:text-base-content
            "
          >
            <X size={15} />
          </button>
        )}
      </div>
    );
  }