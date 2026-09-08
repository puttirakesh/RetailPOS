// src/pages/dashboard/Dashboard.jsx

import {
    ArrowUpRight,
    Package,
    ShoppingCart,
    Users,
    WalletCards,
  } from "lucide-react";
  
  import {
    motion,
  } from "framer-motion";
  
  const stats = [
    {
      label: "Today's Sales",
      value: "₹84,620",
      change: "+12.8%",
      icon: WalletCards,
    },
    {
      label: "Orders",
      value: "384",
      change: "+8.4%",
      icon: ShoppingCart,
    },
    {
      label: "Products",
      value: "1,245",
      change: "+4.2%",
      icon: Package,
    },
    {
      label: "Customers",
      value: "2,431",
      change: "+6.7%",
      icon: Users,
    },
  ];
  
  export default function Dashboard() {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-text-muted">
            Monday, September 7
          </p>
  
          <h1 className="
            mt-1 text-2xl font-bold tracking-tight text-text
            sm:text-3xl
          ">
            Good morning, Administrator
          </h1>
  
          <p className="
            mt-1 text-sm text-text-muted
          ">
            Here's what's happening across your retail operation.
          </p>
        </div>
  
        <div className="
          grid gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        ">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
  
            return (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.3,
                }}
                className="
                  rounded-xl
                  border border-border
                  bg-surface
                  p-5
                  shadow-token-sm
                  rp-hover-lift
                "
              >
                <div className="
                  flex items-start
                  justify-between
                ">
                  <div className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-lg
                    bg-primary/10
                    text-primary
                  ">
                    <Icon size={19} />
                  </div>
  
                  <span className="
                    flex items-center gap-1
                    text-xs font-semibold
                    text-success
                  ">
                    {stat.change}
                    <ArrowUpRight size={13} />
                  </span>
                </div>
  
                <p className="
                  mt-5 text-xs font-medium
                  text-text-muted
                ">
                  {stat.label}
                </p>
  
                <p className="
                  mt-1 text-2xl font-bold
                  tracking-tight text-text
                ">
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </div>
  
        <div className="
          grid gap-4
          lg:grid-cols-[1.4fr_1fr]
        ">
          <div className="
            min-h-[320px]
            rounded-xl
            border border-border
            bg-surface
            p-6
            shadow-token-sm
          ">
            <h2 className="
              text-base font-semibold text-text
            ">
              Sales Overview
            </h2>
  
            <p className="
              mt-1 text-sm text-text-muted
            ">
              Your sales performance will appear here.
            </p>
          </div>
  
          <div className="
            min-h-[320px]
            rounded-xl
            border border-border
            bg-surface
            p-6
            shadow-token-sm
          ">
            <h2 className="
              text-base font-semibold text-text
            ">
              Recent Activity
            </h2>
  
            <p className="
              mt-1 text-sm text-text-muted
            ">
              Recent system activity will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }