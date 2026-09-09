import { motion } from "framer-motion";

export default function Card({
  children,
  title,
  description,
  icon,
  actions,
  className = "",
  hover = false,
  padding = "p-5",
}) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -2,
            }
          : undefined
      }
      transition={{
        duration: 0.2,
      }}
      className={[
        "overflow-hidden rounded-2xl",
        "border border-base-300",
        "bg-base-100",
        "shadow-sm",
        hover
          ? "transition-shadow hover:shadow-xl"
          : "",
        className,
      ].join(" ")}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 border-b border-base-300 px-5 py-4">
          <div className="flex items-start gap-3">
            {icon && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {icon}
              </div>
            )}

            <div>
              {title && (
                <h2 className="text-sm font-semibold">
                  {title}
                </h2>
              )}

              {description && (
                <p className="mt-1 text-xs leading-5 text-base-content/50">
                  {description}
                </p>
              )}
            </div>
          </div>

          {actions}
        </div>
      )}

      <div className={padding}>
        {children}
      </div>
    </motion.div>
  );
}