import React from 'react';
import { motion } from 'framer-motion';
import './index.css';
import { SlArrowLeftCircle } from 'react-icons/sl';

const CancelButton = ({ onClick }) => {
  return (
    <div className="container">
      <motion.div
        className="cancel-button"
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
          y: [-4, 4, -4],
          transition: {
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }}
        onClick={onClick}
      >
        <SlArrowLeftCircle className="sl-arrow-left-circle" />
      </motion.div>
    </div>
  );
};

export default CancelButton;
