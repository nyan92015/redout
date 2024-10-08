import React from 'react';
import Button from '../Button';
import { motion } from 'framer-motion';
import './index.css';
const GameSetModal = ({ isWin, winnerName, onClick }) => {
  return (
    <motion.div
      className={`gameset ${isWin ? 'winner' : 'loser'}`}
      animate={{
        y: [-4, 4, -4],
        transition: {
          duration: 5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
    >
      <h1 className={`gameset-title ${isWin ? 'winner' : 'loser'}`}>
        {isWin ? 'You win !' : 'You lose ...'}
      </h1>
      <div className="button-container">
        <Button
          onClick={onClick}
          color="#ffffff"
          backgroundColor={
            isWin ? 'rgba(107, 57, 57, 0.681)' : 'rgba(59, 57, 107, 0.681)'
          }
        >
          Back to lobby
        </Button>
      </div>
    </motion.div>
  );
};

export default GameSetModal;
