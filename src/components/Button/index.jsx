import React from 'react';
import { motion } from 'framer-motion';
import './index.css';

const Button = ({ onClick, children }) => {
  return (
    <div className="container">
      <motion.div
        className="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        onClick={onClick}
      >
        <div className="button-name">{children}</div>
      </motion.div>
    </div>
  );
};

export default Button;
