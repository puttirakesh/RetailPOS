import AnimatedPage from "../common/AnimatedPage";

export default function PageContainer({
  children,
  title,
  description,
  actions,
  className = "",
}) {
  return (
    <AnimatedPage
      className={[
        "w-full",
        className,
      ].join(" ")}
    >
      {(title || description || actions) && (
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            {title && (
              <h1 className="text-2xl font-bold tracking-tight">
                {title}
              </h1>
            )}

            {description && (
              <p className="mt-1 text-sm leading-6 text-base-content/60">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex flex-wrap items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}

      {children}
    </AnimatedPage>
  );
}