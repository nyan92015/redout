import React from 'react';
import { LineWave } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import './index.css';

const Loading = ({ letters = 'Loading' }) => {
  const container = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const waveAnimation = {
    hidden: { y: 0 },
    visible: {
      y: [0, 20, 0],
      transition: {
        repeat: Infinity,
        duration: 0.7,
      },
    },
  };

  return (
    <div className="loading">
      <LineWave
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave-loading"
      />
      <motion.div
        className="letters-container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {letters.split('').map((char, index) => (
          <motion.span key={index} className={'wave-letter'} variants={waveAnimation}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
      <LineWave
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave-loading"
      />
    </div>
  );
};

export default Loading;
