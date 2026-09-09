import {
    ChevronLeft,
    ChevronRight,
  } from "lucide-react";
  
  export default function TablePagination({
    page,
    totalPages,
    onPageChange,
    totalItems,
    pageSize,
  }) {
    if (
      totalPages <= 1 &&
      !totalItems
    ) {
      return null;
    }
  
    const start =
      totalItems === 0
        ? 0
        : (page - 1) *
            pageSize +
          1;
  
    const end = Math.min(
      page * pageSize,
      totalItems
    );
  
    const pages = [];
  
    for (
      let number = 1;
      number <= totalPages;
      number += 1
    ) {
      if (
        number === 1 ||
        number === totalPages ||
        Math.abs(
          number - page
        ) <= 1
      ) {
        pages.push(number);
      } else if (
        pages[pages.length - 1] !==
        "..."
      ) {
        pages.push("...");
      }
    }
  
    return (
      <div className="flex flex-col gap-3 border-t border-base-300 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-base-content/50">
          Showing{" "}
          <span className="font-medium text-base-content">
            {start}
          </span>{" "}
          to{" "}
          <span className="font-medium text-base-content">
            {end}
          </span>{" "}
          of{" "}
          <span className="font-medium text-base-content">
            {totalItems}
          </span>{" "}
          records
        </p>
  
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() =>
              onPageChange(
                page - 1
              )
            }
            className="btn btn-ghost btn-sm btn-square"
          >
            <ChevronLeft size={16} />
          </button>
  
          {pages.map(
            (number, index) =>
              number === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-xs text-base-content/40"
                >
                  ...
                </span>
              ) : (
                <button
                  key={number}
                  type="button"
                  onClick={() =>
                    onPageChange(
                      number
                    )
                  }
                  className={[
                    "btn btn-sm min-w-9 rounded-lg",
                    number === page
                      ? "btn-primary"
                      : "btn-ghost",
                  ].join(" ")}
                >
                  {number}
                </button>
              )
          )}
  
          <button
            type="button"
            disabled={
              page >= totalPages
            }
            onClick={() =>
              onPageChange(
                page + 1
              )
            }
            className="btn btn-ghost btn-sm btn-square"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }