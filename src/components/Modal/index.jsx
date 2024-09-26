import React from 'react';
import { motion } from 'framer-motion';
import './index.css';
import BackDrop from '../BackDrop';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

const Modal = ({ handleClose, children }) => {
  return (
    <BackDrop onClick={handleClose}>
      <motion.div
        className="modal-howtoplay"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </BackDrop>
  );
};

export default Modal;
