import React from 'react';
import Button from '../Button';
import { motion } from 'framer-motion';
import './index.css';
const GiveUp = ({ backToLobby, handleClose }) => {
  return (
    <motion.div
      className="giveup"
      animate={{
        y: [-4, 4, -4],
        transition: {
          duration: 3,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
    >
      <h1 className="giveup-title">give up?</h1>
      <div className="button-container">
        <Button onClick={backToLobby} color="red">
          Yes . . .
        </Button>
        <Button onClick={handleClose}>No !</Button>
      </div>
    </motion.div>
  );
};

export default GiveUp;
