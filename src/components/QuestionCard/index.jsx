import React from 'react';
import { LiaQuestionSolid } from 'react-icons/lia';
import { motion } from 'framer-motion';
import './index.css';

const QuestionCard = ({ cardSize, submitBoxSize }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: (submitBoxSize - cardSize) / 2 - 5,
        y: (submitBoxSize - cardSize) / 2 - 5,
      }}
      animate={{
        opacity: 1,
        x: (submitBoxSize - cardSize) / 2 - 5,
        y: (submitBoxSize - cardSize) / 2 - 5,
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.2,
      }}
      style={{
        position: 'fixed',
        height: `${cardSize}px`,
        width: `${cardSize}px`,
      }}
      className="question-card"
    >
      <LiaQuestionSolid className="question" />
    </motion.div>
  );
};

export default QuestionCard;
