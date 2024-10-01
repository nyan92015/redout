import React, { Children, cloneElement, useRef } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import Stagger from '../../utils/Stagger';

const CardBoard = ({ cardBoardName, children }) => {
  const constraintsRef = useRef(null);
  return (
    <motion.div ref={constraintsRef}>
      <Stagger className={`card-board ${cardBoardName}`} staggerDelay={0.2}>
        {children}
      </Stagger>
    </motion.div>
  );
};

export default CardBoard;
