import React from 'react';
import { motion } from 'framer-motion';
import './index.css';
import { BsFlag } from 'react-icons/bs';

const FlagButton = ({ onClick }) => {
  return (
    <motion.div
      className="flag-button"
      whileHover={{
        scale: 1.2,
        transition: {
          duration: 0.3,
        },
      }}
      whileTap={{
        scale: 0.9,
        transition: {
          duration: 0.2,
        },
      }}
      animate={{
        y: [-3, 2, -3],
        transition: {
          duration: 3,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
      onClick={onClick}
    >
      <BsFlag className="bs-flag" />
    </motion.div>
  );
};

export default FlagButton;
