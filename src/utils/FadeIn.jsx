import { motion } from 'framer-motion';
import React from 'react';

const FadeIn = ({ children, className, delay = 0, duration = 0.5 }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
