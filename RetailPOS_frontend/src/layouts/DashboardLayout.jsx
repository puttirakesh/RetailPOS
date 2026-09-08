import {
  Outlet,
} from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import MobileSidebar from "../components/layout/MobileSidebar";
import Topbar from "../components/layout/Topbar";
import Breadcrumbs from "../components/layout/Breadcrumbs";

import {
  useSidebar,
} from "../context/SidebarContext";

export default function DashboardLayout() {
  const {
    isCollapsed,
  } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop */}
      <Sidebar />
      {/* Mobile */}
      <MobileSidebar />

      <div
        className={`
          min-h-screen
          transition-[padding]
          duration-300
          ${
            isCollapsed
              ? "lg:pl-[var(--rp-sidebar-collapsed-width)]"
              : "lg:pl-[var(--rp-sidebar-width)]"
          }
        `}
      >
        <Topbar />

        <main className="pt-[68px]">
          <div className="border-b border-border bg-surface px-4 py-3 lg:px-6">
            <Breadcrumbs />
          </div>

          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}