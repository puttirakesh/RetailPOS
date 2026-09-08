import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Store,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  useSidebar,
} from "../../context/SidebarContext";

import {
  navigation,
} from "../../routes/routeConfig";


function NavigationItem({
  item,
  isCollapsed,
}) {
  const location = useLocation();

  const Icon = item.icon;

  /*
  |--------------------------------------------------------------------------
  | Check whether any child route is active
  |--------------------------------------------------------------------------
  */

  const hasActiveChild =
    item.children?.some(
      (child) =>
        location.pathname === child.path ||
        location.pathname.startsWith(
          `${child.path}/`
        )
    );

  const [
    isOpen,
    setIsOpen,
  ] = useState(
    Boolean(hasActiveChild)
  );

  /*
  |--------------------------------------------------------------------------
  | Automatically open menu when current route belongs to this section
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    }
  }, [hasActiveChild]);

  /*
  |--------------------------------------------------------------------------
  | Parent with children
  |--------------------------------------------------------------------------
  */

  if (item.children) {
    /*
    |--------------------------------------------------------------------------
    | COLLAPSED SIDEBAR
    |--------------------------------------------------------------------------
    */

    if (isCollapsed) {
      return (
        <div className="group relative">
          <button
            type="button"
            className="
              flex h-10 w-full items-center
              justify-center rounded-lg
              text-text-muted
              transition-colors duration-200
              hover:bg-primary/10
              hover:text-primary
            "
            title={item.label}
          >
            <Icon
              size={18}
              strokeWidth={1.9}
            />
          </button>

          {/* Hover submenu */}

          <div
            className="
              pointer-events-none
              absolute left-full top-0 z-50
              ml-2 w-52
              rounded-xl border border-border
              bg-surface p-2
              opacity-0 shadow-lg
              transition-opacity
              group-hover:pointer-events-auto
              group-hover:opacity-100
            "
          >
            <p
              className="
                px-2 py-1.5
                text-xs font-semibold
                text-text-muted
              "
            >
              {item.label}
            </p>

            <div className="space-y-1">
              {item.children.map(
                (child) => {
                  const ChildIcon =
                    child.icon;

                  return (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({
                        isActive,
                      }) =>
                        `
                        flex items-center
                        gap-2 rounded-lg
                        px-2 py-2
                        text-sm
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-text-muted hover:bg-primary/10 hover:text-primary"
                        }
                        `
                      }
                    >
                      <ChildIcon
                        size={15}
                      />

                      <span>
                        {child.label}
                      </span>
                    </NavLink>
                  );
                }
              )}
            </div>
          </div>
        </div>
      );
    }

    /*
    |--------------------------------------------------------------------------
    | EXPANDED SIDEBAR
    |--------------------------------------------------------------------------
    */

    return (
      <div>
        <button
          type="button"
          onClick={() =>
            setIsOpen(
              (current) => !current
            )
          }
          className={`
            flex w-full
            items-center justify-between
            rounded-lg px-3 py-2.5
            text-sm font-medium
            transition-all duration-200

            ${
              hasActiveChild
                ? "bg-primary/5 text-primary"
                : "text-text-muted hover:bg-primary/10 hover:text-text"
            }
          `}
        >
          <span className="flex items-center gap-3">
            <Icon
              size={18}
              strokeWidth={1.9}
            />

            <span>
              {item.label}
            </span>
          </span>

          <motion.span
            animate={{
              rotate: isOpen
                ? 180
                : 0,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <ChevronDown
              size={15}
            />
          </motion.span>
        </button>

        <AnimatePresence
          initial={false}
        >
          {isOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="overflow-hidden pl-4"
            >
              <div
                className="
                  mt-1 space-y-1
                  border-l border-border
                  pl-3
                "
              >
                {item.children.map(
                  (child) => {
                    const ChildIcon =
                      child.icon;

                    return (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({
                          isActive,
                        }) =>
                          `
                          flex items-center
                          gap-3 rounded-lg
                          px-3 py-2
                          text-sm
                          transition-all duration-200

                          ${
                            isActive
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-text-muted hover:bg-primary/5 hover:text-text"
                          }
                          `
                        }
                      >
                        <ChildIcon
                          size={15}
                        />

                        <span>
                          {child.label}
                        </span>
                      </NavLink>
                    );
                  }
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | NORMAL SINGLE NAVIGATION ITEM
  |--------------------------------------------------------------------------
  */

  return (
    <NavLink
      to={item.path}
      title={
        isCollapsed
          ? item.label
          : undefined
      }
      className={({
        isActive,
      }) =>
        `
        group relative
        flex items-center
        gap-3 rounded-lg
        px-3 py-2.5
        text-sm font-medium
        transition-all duration-200

        ${
          isActive
            ? "bg-primary text-white shadow-token-sm"
            : "text-text-muted hover:bg-primary/10 hover:text-text"
        }

        ${
          isCollapsed
            ? "justify-center px-0"
            : ""
        }
        `
      }
    >
      <Icon
        size={18}
        strokeWidth={1.9}
      />

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.span
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{
              opacity: 1,
              width: "auto",
            }}
            exit={{
              opacity: 0,
              width: 0,
            }}
            className="
              overflow-hidden
              whitespace-nowrap
            "
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {isCollapsed && (
        <span
          className="
            pointer-events-none
            absolute left-full z-50
            ml-2
            rounded-lg
            bg-neutral px-3 py-2
            text-xs text-white
            opacity-0 shadow-lg
            transition-opacity
            group-hover:opacity-100
          "
        >
          {item.label}
        </span>
      )}
    </NavLink>
  );
}


export default function Sidebar() {
  const {
    isCollapsed,
    toggleSidebar,
  } = useSidebar();

  return (
    <motion.aside
      animate={{
        width: isCollapsed
          ? "var(--rp-sidebar-collapsed-width)"
          : "var(--rp-sidebar-width)",
      }}
      transition={{
        duration: 0.25,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="
        fixed inset-y-0 left-0
        z-[1200]
        hidden
        flex-col
        border-r border-border
        bg-surface
        lg:flex
      "
    >
      {/* =====================================================
          LOGO
      ===================================================== */}

      <div
        className={`
          flex h-[68px]
          items-center
          border-b border-border

          ${
            isCollapsed
              ? "justify-center"
              : "justify-between px-5"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl
              bg-primary
              text-white
              shadow-token-sm
            "
          >
            <Store size={19} />
          </div>

          {!isCollapsed && (
            <div>
              <p
                className="
                  text-sm font-bold
                  text-text
                "
              >
                RetailPOS
              </p>

              <p
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-wider
                  text-text-muted
                "
              >
                Management
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-3 py-4
        "
      >
        <div className="space-y-5">
          {navigation.map(
            (section) => (
              <div
                key={section.label}
              >
                {!isCollapsed && (
                  <p
                    className="
                      mb-2 px-3
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-text-subtle
                    "
                  >
                    {section.label}
                  </p>
                )}

                <div className="space-y-1">
                  {section.items.map(
                    (item) => (
                      <NavigationItem
                        key={
                          item.label
                        }
                        item={item}
                        isCollapsed={
                          isCollapsed
                        }
                      />
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* =====================================================
          COLLAPSE BUTTON
      ===================================================== */}

      <div
        className="
          border-t border-border
          p-3
        "
      >
        <button
          type="button"
          onClick={
            toggleSidebar
          }
          className="
            flex h-10 w-full
            items-center
            justify-center
            rounded-lg
            border border-border
            text-text-muted
            transition-all duration-200
            hover:border-primary/30
            hover:bg-primary/5
            hover:text-primary
          "
          aria-label={
            isCollapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          {isCollapsed ? (
            <ChevronRight
              size={17}
            />
          ) : (
            <>
              <ChevronLeft
                size={17}
              />

              <span
                className="
                  ml-2
                  text-xs
                  font-medium
                "
              >
                Collapse
              </span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}