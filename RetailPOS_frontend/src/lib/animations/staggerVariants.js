export const staggerContainer = {
    hidden: {},
  
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.02,
      },
    },
  };
  
  export const staggerItem = {
    hidden: {
      opacity: 0,
      y: 12,
    },
  
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  
  export const staggerScaleItem = {
    hidden: {
      opacity: 0,
      scale: 0.97,
    },
  
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };