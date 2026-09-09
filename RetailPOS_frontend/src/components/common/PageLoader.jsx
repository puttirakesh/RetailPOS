import { motion } from "framer-motion";
import { LoaderCircle, Store } from "lucide-react";

export default function PageLoader({
  message = "Loading RetailPOS...",
  fullscreen = false,
}) {
  return (
    <div
      className={[
        "flex items-center justify-center",
        fullscreen
          ? "fixed inset-0 z-[9999] bg-base-100/95 backdrop-blur-md"
          : "min-h-[320px] w-full",
      ].join(" ")}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10"
          >
            <Store size={22} className="text-primary" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="absolute -inset-1 rounded-[18px] border border-dashed border-primary/30"
          />
        </div>

        <div className="mt-5 flex items-center gap-2">
          <LoaderCircle
            size={15}
            className="animate-spin text-primary"
          />

          <p className="text-sm font-medium text-base-content/60">
            {message}
          </p>
        </div>
      </motion.div>
    </div>
  );
}