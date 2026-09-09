import {
    AnimatePresence,
    motion,
  } from "framer-motion";
  
  import {
    ChevronDown,
    Check,
  } from "lucide-react";
  
  import {
    useEffect,
    useRef,
    useState,
  } from "react";
  
  export default function Dropdown({
    label,
    trigger,
    items = [],
    align = "right",
    onSelect,
    className = "",
  }) {
    const [open, setOpen] =
      useState(false);
  
    const ref = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (
        event
      ) => {
        if (
          ref.current &&
          !ref.current.contains(
            event.target
          )
        ) {
          setOpen(false);
        }
      };
  
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
  
      return () =>
        document.removeEventListener(
          "mousedown",
          handleClickOutside
        );
    }, []);
  
    return (
      <div
        ref={ref}
        className={[
          "relative inline-block",
          className,
        ].join(" ")}
      >
        <button
          type="button"
          onClick={() =>
            setOpen((current) => !current)
          }
          className="flex items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-3.5 py-2.5 text-sm transition hover:border-primary/30 hover:bg-primary/5"
        >
          {trigger || label}
  
          <ChevronDown
            size={15}
            className={`transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
  
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 5,
              }}
              transition={{
                duration: 0.15,
              }}
              className={[
                "absolute z-[1500] mt-2 min-w-[190px]",
                "overflow-hidden rounded-2xl",
                "border border-base-300 bg-base-100",
                "p-1.5 shadow-xl",
                align === "left"
                  ? "left-0"
                  : "right-0",
              ].join(" ")}
            >
              {items.map((item) => {
                if (item.divider) {
                  return (
                    <div
                      key={item.id}
                      className="my-1 border-t border-base-300"
                    />
                  );
                }
  
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={
                      item.disabled
                    }
                    onClick={() => {
                      if (!item.disabled) {
                        onSelect?.(
                          item
                        );
                        setOpen(false);
                      }
                    }}
                    className={[
                      "flex w-full items-center gap-3",
                      "rounded-xl px-3 py-2.5",
                      "text-left text-sm",
                      "transition-colors",
                      item.danger
                        ? "text-error hover:bg-error/10"
                        : "hover:bg-base-200",
                      item.disabled
                        ? "cursor-not-allowed opacity-40"
                        : "",
                    ].join(" ")}
                  >
                    {item.icon && (
                      <span className="shrink-0">
                        {item.icon}
                      </span>
                    )}
  
                    <span className="flex-1">
                      {item.label}
                    </span>
  
                    {item.selected && (
                      <Check
                        size={15}
                        className="text-primary"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }