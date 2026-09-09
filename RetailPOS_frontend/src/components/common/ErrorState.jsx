import { motion } from "framer-motion";
import {
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this section.",
  onRetry,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[320px] items-center justify-center rounded-2xl border border-error/20 bg-error/5 p-8"
    >
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-error/10">
          <AlertTriangle
            size={25}
            className="text-error"
          />
        </div>

        <h2 className="mt-5 text-lg font-semibold">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-base-content/60">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="btn btn-outline btn-sm mt-6 gap-2"
          >
            <RefreshCw size={15} />
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
}