import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ChevronDown,
  X,
  Store,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  NavLink,
} from "react-router-dom";

import {
  useSidebar,
} from "../../context/SidebarContext";

import {
  navigation,
} from "../../routes/routeConfig";


function MobileNavigationItem({
  item,
  closeSidebar,
}) {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const Icon = item.icon;

  if (item.children) {
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            setIsOpen(
              (current) => !current
            )
          }
          className="
            flex w-full
            items-center
            justify-between
            rounded-lg
            px-3 py-2.5
            text-sm
            font-medium
            text-text-muted
            hover:bg-primary/10
            hover:text-primary
          "
        >
          <span className="flex items-center gap-3">
            <Icon size={18} />

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
              className="
                overflow-hidden
                pl-5
              "
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
                        onClick={
                          closeSidebar
                        }
                        className={({
                          isActive,
                        }) =>
                          `
                          flex items-center
                          gap-3 rounded-lg
                          px-3 py-2
                          text-sm

                          ${
                            isActive
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-text-muted hover:bg-primary/5"
                          }
                          `
                        }
                      >
                        <ChildIcon
                          size={15}
                        />

                        {child.label}
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

  return (
    <NavLink
      to={item.path}
      onClick={
        closeSidebar
      }
      className={({
        isActive,
      }) =>
        `
        flex items-center
        gap-3 rounded-lg
        px-3 py-2.5
        text-sm font-medium

        ${
          isActive
            ? "bg-primary text-white"
            : "text-text-muted hover:bg-primary/10 hover:text-primary"
        }
        `
      }
    >
      <Icon size={18} />

      {item.label}
    </NavLink>
  );
}


export default function MobileSidebar() {
  const {
    isMobileOpen,
    closeMobileSidebar,
  } = useSidebar();

  return (
    <AnimatePresence>
      {isMobileOpen && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={
              closeMobileSidebar
            }
            className="
              fixed inset-0
              z-[1290]
              bg-black/50
              backdrop-blur-sm
              lg:hidden
            "
          />

          {/* Drawer */}

          <motion.aside
            initial={{
              x: "-100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100%",
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              fixed inset-y-0 left-0
              z-[1300]
              flex w-[280px]
              flex-col
              border-r border-border
              bg-surface
              lg:hidden
            "
          >
            {/* Header */}

            <div
              className="
                flex h-[68px]
                items-center
                justify-between
                border-b border-border
                px-5
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-9 w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary
                    text-white
                  "
                >
                  <Store size={19} />
                </div>

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
                      uppercase
                      tracking-wider
                      text-text-muted
                    "
                  >
                    Management
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  closeMobileSidebar
                }
                className="
                  btn btn-ghost
                  btn-sm btn-square
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation */}

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
                      key={
                        section.label
                      }
                    >
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

                      <div className="space-y-1">
                        {section.items.map(
                          (item) => (
                            <MobileNavigationItem
                              key={
                                item.label
                              }
                              item={
                                item
                              }
                              closeSidebar={
                                closeMobileSidebar
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
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}