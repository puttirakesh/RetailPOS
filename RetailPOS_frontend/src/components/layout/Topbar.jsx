// src/components/layout/Topbar.jsx

import { Bell, Menu, Moon, Search, Sun, UserRound } from "lucide-react";

import { useSidebar } from "../../context/SidebarContext";
import { useTheme } from "../../context/ThemeContext";

export default function Topbar() {
  const { openMobileSidebar } = useSidebar();

  const { mode, toggleTheme } = useTheme();
  return (
    <header
      className="
    fixed right-0 top-0 z-[1100]
    h-[68px]
    border-b border-border
    bg-surface/90
    backdrop-blur-xl
    transition-[left]
    duration-300
    max-lg:left-0
  "
      style={{
        left: "var(--rp-sidebar-width)",
      }}
    >
      <div className="flex h-full items-center gap-4 px-4 lg:px-6">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={openMobileSidebar}
          className="
    btn btn-ghost
    btn-sm btn-square
    lg:hidden
  "
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="hidden max-w-xl flex-1 md:block">
          <div className="relative">
            <Search
              size={17}
              className="
                  pointer-events-none absolute left-3
                  top-1/2 -translate-y-1/2
                  text-text-subtle
                "
            />

            <input
              type="search"
              placeholder="Search anything..."
              className="
                  h-10 w-full rounded-lg
                  border border-border
                  bg-base-200/70
                  pl-10 pr-4
                  text-sm text-text
                  outline-none
                  transition-all
                  placeholder:text-text-subtle
                  focus:border-primary/50
                  focus:bg-surface
                  focus:ring-4
                  focus:ring-primary/10
                "
            />

            <div
              className="
                pointer-events-none absolute right-2
                top-1/2 hidden -translate-y-1/2
                rounded-md border border-border
                bg-surface px-2 py-1
                text-[10px] font-medium
                text-text-subtle xl:block
              "
            >
              Ctrl K
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Branch */}
          <button
            type="button"
            className="
                hidden items-center gap-2 rounded-lg
                border border-border px-3 py-2
                text-left md:flex
                hover:bg-base-200
              "
          >
            <div
              className="
                h-2 w-2 rounded-full bg-success
              "
            />

            <div>
              <p className="text-[10px] text-text-subtle">Branch</p>

              <p className="text-xs font-semibold text-text">Main Branch</p>
            </div>
          </button>

          {/* Theme */}
          <button
            type="button"
            onClick={toggleTheme}
            className="
                flex h-9 w-9 items-center justify-center
                rounded-lg text-text-muted
                transition-colors
                hover:bg-base-200 hover:text-text
              "
            aria-label="Toggle theme"
          >
            {mode === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="
                relative flex h-9 w-9
                items-center justify-center
                rounded-lg text-text-muted
                hover:bg-base-200 hover:text-text
              "
          >
            <Bell size={18} />

            <span
              className="
                absolute right-2 top-2
                h-1.5 w-1.5 rounded-full
                bg-danger
              "
            />
          </button>

          {/* User */}
          <button
            type="button"
            className="
                ml-1 flex items-center gap-2
                rounded-lg p-1.5
                transition-colors
                hover:bg-base-200
              "
          >
            <div
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg bg-primary/10
                text-primary
              "
            >
              <UserRound size={17} />
            </div>

            <div className="hidden text-left xl:block">
              <p className="text-xs font-semibold text-text">Administrator</p>

              <p className="text-[10px] text-text-muted">Admin</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
