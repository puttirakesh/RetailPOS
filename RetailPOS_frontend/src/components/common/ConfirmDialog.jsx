import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  X,
} from "lucide-react";

export default function ConfirmDialog({
  open,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "primary",
  loading = false,
}) {
  const confirmClass =
    variant === "danger"
      ? "btn-error"
      : variant === "warning"
        ? "btn-warning"
        : "btn-primary";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 16,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 16,
            }}
            transition={{
              duration: 0.2,
            }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-base-300 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
                  <AlertCircle
                    size={20}
                    className="text-warning"
                  />
                </div>

                <h2 className="font-semibold">
                  {title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onCancel}
                className="btn btn-ghost btn-sm btn-square"
                disabled={loading}
              >
                <X size={17} />
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm leading-6 text-base-content/60">
                {message}
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-base-300 p-5">
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-ghost"
                disabled={loading}
              >
                {cancelLabel}
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={`btn ${confirmClass}`}
              >
                {loading && (
                  <span className="loading loading-spinner loading-sm" />
                )}

                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}