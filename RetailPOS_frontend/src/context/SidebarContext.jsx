import {
  createContext,
  useContext,
  useState,
} from "react";

const SidebarContext =
  createContext(null);

export function SidebarProvider({
  children,
}) {
  const [
    isCollapsed,
    setIsCollapsed,
  ] = useState(false);

  const [
    isMobileOpen,
    setIsMobileOpen,
  ] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(
      (current) => !current
    );
  };

  const openMobileSidebar = () => {
    setIsMobileOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,

        isMobileOpen,
        openMobileSidebar,
        closeMobileSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context =
    useContext(
      SidebarContext
    );

  if (!context) {
    throw new Error(
      "useSidebar must be used inside SidebarProvider"
    );
  }

  return context;
}