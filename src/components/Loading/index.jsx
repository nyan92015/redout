import React from 'react';
import { LineWave } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import './index.css';
import Stagger from '../../utils/Stagger';
import FadeIn from '../../utils/FadeIn';

const Loading = ({ letters = 'Loading', color = '#4fa94d' }) => {
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
    <FadeIn duration={0.8} className="loading">
      <LineWave
        visible={true}
        height="100"
        width="100"
        color={color}
        ariaLabel="line-wave-loading"
      />
      <Stagger duration={0.4} className="letters-container">
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
      </Stagger>
      <LineWave
        visible={true}
        height="100"
        width="100"
        color={color}
        ariaLabel="line-wave-loading"
      />
    </FadeIn>
  );
};

export default Loading;
