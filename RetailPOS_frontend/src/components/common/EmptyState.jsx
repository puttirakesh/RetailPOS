import { motion } from "framer-motion";
import {
  FileSearch,
  Plus,
} from "lucide-react";

export default function EmptyState({
  title = "No records found",
  message = "There are no records to display.",
  actionLabel,
  onAction,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[280px] items-center justify-center p-8"
    >
      <div className="max-w-sm text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-base-300 bg-base-200"
        >
          <FileSearch
            size={27}
            className="text-base-content/40"
          />
        </motion.div>

        <h3 className="mt-5 text-base font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-base-content/50">
          {message}
        </p>

        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="btn btn-primary btn-sm mt-6 gap-2"
          >
            <Plus size={15} />
            {actionLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
}