import { motion } from "framer-motion";

export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  variant = "pill",
}) {
  return (
    <div
      className={
        variant === "underline"
          ? "flex border-b border-base-300"
          : "flex flex-wrap gap-2 rounded-2xl bg-base-200/70 p-1.5"
      }
    >
      {tabs.map((tab) => {
        const active =
          activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() =>
              onChange(tab.id)
            }
            className={[
              "relative flex items-center gap-2",
              "text-sm font-medium transition-all duration-200",
              variant === "underline"
                ? "px-4 py-3"
                : "rounded-xl px-4 py-2.5",
              active
                ? variant === "underline"
                  ? "text-primary"
                  : "bg-base-100 text-primary shadow-sm"
                : "text-base-content/50 hover:text-base-content",
            ].join(" ")}
          >
            {tab.icon}

            {tab.label}

            {tab.count !==
              undefined && (
              <span
                className={
                  active
                    ? "badge badge-primary badge-sm"
                    : "badge badge-ghost badge-sm"
                }
              >
                {tab.count}
              </span>
            )}

            {variant ===
              "underline" &&
              active && (
                <motion.span
                  layoutId="active-tab"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                />
              )}
          </button>
        );
      })}
    </div>
  );
}