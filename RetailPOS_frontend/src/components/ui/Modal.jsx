import {
    AnimatePresence,
    motion,
  } from "framer-motion";
  
  import { X } from "lucide-react";
  
  export default function Modal({
    open,
    onClose,
    title,
    description,
    children,
    footer,
    size = "md",
    closeOnOverlay = true,
  }) {
    const sizes = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
      full: "max-w-6xl",
    };
  
    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                closeOnOverlay &&
                onClose()
              }
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
  
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 14,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 14,
              }}
              transition={{
                duration: 0.22,
              }}
              className={[
                "relative z-10 w-full",
                "overflow-hidden rounded-3xl",
                "border border-base-300",
                "bg-base-100 shadow-2xl",
                sizes[size] || sizes.md,
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4 border-b border-base-300 p-5">
                <div>
                  <h2 className="text-base font-semibold">
                    {title}
                  </h2>
  
                  {description && (
                    <p className="mt-1 text-xs leading-5 text-base-content/50">
                      {description}
                    </p>
                  )}
                </div>
  
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-ghost btn-sm btn-square shrink-0"
                >
                  <X size={17} />
                </button>
              </div>
  
              <div className="max-h-[70vh] overflow-y-auto p-5">
                {children}
              </div>
  
              {footer && (
                <div className="border-t border-base-300 p-5">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }