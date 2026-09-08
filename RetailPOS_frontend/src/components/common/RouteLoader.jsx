import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

export default function RouteLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="flex flex-col items-center gap-3"
      >
        <LoaderCircle
          size={32}
          className="animate-spin text-primary"
        />

        <span className="text-sm text-base-content/50">
          Loading...
        </span>
      </motion.div>
    </div>
  );
}