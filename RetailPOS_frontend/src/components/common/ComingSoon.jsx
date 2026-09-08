import { motion } from "framer-motion";
import { Construction } from "lucide-react";

export default function ComingSoon({
  title,
  description = "This module will be implemented in the upcoming development phase.",
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="max-w-md text-center"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Construction
            size={30}
            className="text-primary"
          />
        </div>

        <h1 className="text-2xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-sm leading-6 text-base-content/60">
          {description}
        </p>
      </motion.div>
    </div>
  );
}