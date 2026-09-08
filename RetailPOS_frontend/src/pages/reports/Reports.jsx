import {
    BarChart3,
    CalendarDays,
    Download,
    FileText,
    TrendingUp,
  } from "lucide-react";
  
  const stats = [
    {
      title: "Today's Sales",
      value: "₹48,650",
      change: "+12.4%",
    },
    {
      title: "This Month",
      value: "₹8,42,350",
      change: "+8.7%",
    },
    {
      title: "Transactions",
      value: "1,248",
      change: "+6.2%",
    },
    {
      title: "Average Bill",
      value: "₹675",
      change: "+3.8%",
    },
  ];
  
  export default function Reports() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Reports
            </h1>
  
            <p className="mt-1 text-sm text-base-content/60">
              Analyse sales, inventory and business performance.
            </p>
          </div>
  
          <button className="btn btn-outline gap-2">
            <Download size={16} />
            Export Report
          </button>
        </div>
  
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-base-300 bg-base-100 p-5"
            >
              <p className="text-sm text-base-content/50">
                {stat.title}
              </p>
  
              <p className="mt-2 text-2xl font-bold">
                {stat.value}
              </p>
  
              <div className="mt-3 flex items-center gap-2 text-xs text-success">
                <TrendingUp size={14} />
                {stat.change} from previous period
              </div>
            </div>
          ))}
        </div>
  
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <BarChart3
                  size={19}
                  className="text-primary"
                />
              </div>
  
              <div>
                <h2 className="font-semibold">
                  Sales Overview
                </h2>
  
                <p className="text-xs text-base-content/50">
                  Monthly sales performance
                </p>
              </div>
            </div>
  
            <div className="flex h-64 items-end gap-3">
              {[45, 60, 52, 75, 65, 82, 90, 72, 88, 94, 76, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 items-end"
                  >
                    <div
                      className="w-full rounded-t-lg bg-primary/70 transition-all hover:bg-primary"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>
                )
              )}
            </div>
          </div>
  
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <FileText
                  size={19}
                  className="text-primary"
                />
              </div>
  
              <div>
                <h2 className="font-semibold">
                  Available Reports
                </h2>
  
                <p className="text-xs text-base-content/50">
                  Generate detailed reports
                </p>
              </div>
            </div>
  
            <div className="space-y-3">
              {[
                "Daily Sales Report",
                "Monthly Sales Report",
                "Product Performance",
                "Inventory Valuation",
                "Customer Ledger",
                "Supplier Ledger",
              ].map((report) => (
                <button
                  key={report}
                  className="flex w-full items-center justify-between rounded-xl border border-base-300 p-4 text-left transition hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="text-sm font-medium">
                    {report}
                  </span>
  
                  <Download
                    size={16}
                    className="text-base-content/40"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
  
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
          <div className="flex items-center gap-3">
            <CalendarDays
              size={18}
              className="text-primary"
            />
  
            <span className="text-sm text-base-content/60">
              Report date range
            </span>
          </div>
  
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <input
              type="date"
              className="input input-bordered"
            />
  
            <input
              type="date"
              className="input input-bordered"
            />
  
            <button className="btn btn-primary">
              Generate
            </button>
          </div>
        </div>
      </div>
    );
  }