// src/components/layout/PageContainer.jsx

export default function PageContainer({
    children,
    className = "",
  }) {
    return (
      <main
        className={`
          min-h-[calc(100vh-68px)]
          bg-app-bg
          px-4 py-5
          sm:px-6
          lg:px-8
          ${className}
        `}
      >
        {children}
      </main>
    );
  }