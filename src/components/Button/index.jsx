import React from 'react';
import { motion } from 'framer-motion';
import './index.css';

const Button = ({
  onClick,
  color = '#ffffff',
  backgroundColor = '#2c2c2c',
  children,
}) => {
  return (
    <div className="container">
      <motion.div
        className="button"
        whileHover={{ scale: 1.1, background: backgroundColor }}
        whileTap={{ scale: 0.8 }}
        onClick={onClick}
        style={{
          color: color,
          border: `2px solid ${color}`,
        }}
      >
        <div className="button-name">{children}</div>
      </motion.div>
    </div>
  );
};

export default Button;
