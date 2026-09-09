import { useState } from "react";

export default function Tooltip({
  children,
  content,
  position = "top",
}) {
  const [visible, setVisible] =
    useState(false);

  const positionClass = {
    top:
      "bottom-full left-1/2 mb-2 -translate-x-1/2",
    bottom:
      "left-1/2 top-full mt-2 -translate-x-1/2",
    left:
      "right-full top-1/2 mr-2 -translate-y-1/2",
    right:
      "left-full top-1/2 ml-2 -translate-y-1/2",
  };

  return (
    <div className="relative inline-flex">
      <div
        onMouseEnter={() =>
          setVisible(true)
        }
        onMouseLeave={() =>
          setVisible(false)
        }
      >
        {children}
      </div>

      <div
        className={[
          "pointer-events-none absolute z-[3000]",
          "whitespace-nowrap rounded-lg",
          "bg-neutral px-3 py-2",
          "text-xs font-medium text-neutral-content",
          "shadow-xl transition-all duration-150",
          positionClass[position] ||
            positionClass.top,
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "scale-95 opacity-0",
        ].join(" ")}
      >
        {content}
      </div>
    </div>
  );
}