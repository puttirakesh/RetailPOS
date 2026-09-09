export const modalBackdropVariants = {
    hidden: {
      opacity: 0,
    },
  
    visible: {
      opacity: 1,
    },
  
    exit: {
      opacity: 0,
    },
  };
  
  export const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 18,
    },
  
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 18,
    },
  };
  
  export const modalTransition = {
    duration: 0.22,
    ease: [0.22, 1, 0.36, 1],
  };