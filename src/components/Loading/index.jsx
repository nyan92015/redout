import React from 'react';
import { LineWave } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import './index.css';

const Loading = ({ letters = 'Loading', color = '#4fa94d' }) => {
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
    <motion.div
      className="loading"
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      exit={{ filter: 'blur(10px)', opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <LineWave
        visible={true}
        height="100"
        width="100"
        color={color}
        ariaLabel="line-wave-loading"
      />
      <motion.div
        className="letters-container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {letters.split('').map((char, index) => (
          <motion.span
            key={index}
            className={'wave-letter'}
            style={{
              color: color,
            }}
            variants={waveAnimation}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
      <LineWave
        visible={true}
        height="100"
        width="100"
        color={color}
        ariaLabel="line-wave-loading"
      />
    </motion.div>
  );
};

export default Loading;
