import React from 'react';
import { motion } from 'framer-motion';
import './index.css';

const BackDrop = ({ children, onClick }) => {
  return (
    <motion.div className="backdrop" onClick={onClick}>
      {children}
    </motion.div>
  );
};

export default BackDrop;
