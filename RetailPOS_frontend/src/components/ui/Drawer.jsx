import {
    AnimatePresence,
    motion,
  } from "framer-motion";
  
  import { X } from "lucide-react";
  
  export default function Drawer({
    open,
    onClose,
    title,
    children,
    side = "right",
    width = "w-[420px]",
  }) {
    const from =
      side === "left"
        ? { x: "-100%" }
        : { x: "100%" };
  
    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[1900]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
  
            <motion.aside
              initial={from}
              animate={{
                x: 0,
              }}
              exit={from}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={[
                "absolute inset-y-0",
                side === "left"
                  ? "left-0"
                  : "right-0",
                width,
                "flex max-w-[92vw] flex-col",
                "border-base-300 bg-base-100 shadow-2xl",
                side === "left"
                  ? "border-r"
                  : "border-l",
              ].join(" ")}
            >
              <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
                <h2 className="text-base font-semibold">
                  {title}
                </h2>
  
                <button
                  onClick={onClose}
                  className="btn btn-ghost btn-sm btn-square"
                >
                  <X size={17} />
                </button>
              </div>
  
              <div className="min-h-0 flex-1 overflow-y-auto p-5">
                {children}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    );
  }