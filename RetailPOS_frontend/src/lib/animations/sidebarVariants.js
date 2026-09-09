export const sidebarVariants = {
    expanded: {
      width: "var(--rp-sidebar-width)",
    },
  
    collapsed: {
      width: "var(--rp-sidebar-collapsed-width)",
    },
  };
  
  export const sidebarTransition = {
    duration: 0.25,
    ease: [0.22, 1, 0.36, 1],
  };
  
  export const mobileSidebarVariants = {
    hidden: {
      x: "-100%",
    },
  
    visible: {
      x: 0,
    },
  
    exit: {
      x: "-100%",
    },
  };
  
  export const mobileSidebarTransition = {
    duration: 0.25,
    ease: [0.22, 1, 0.36, 1],
  };