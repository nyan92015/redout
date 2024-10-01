import React from 'react';
import { motion } from 'framer-motion';
import './index.css';
import Stagger from '../../utils/Stagger';

const Logo = () => {
  const letters = ['R', 'e', 'd', 'o', 'u', 't', '.', 'i', 'o'];

  // ランダムにアニメーションを割り当てる関数
  const randomizeAnimations = () => {
    return letters.map((letter) =>
      Math.random() > 0.65 && letter !== '.' && letter !== 'o'
        ? 'rotating'
        : 'child',
    );
  };

  const animationTypes = randomizeAnimations();
  // アニメーション設定
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        repeat: Infinity,
        repeatDelay: 4,
        repeatType: 'reverse',
        duration: 1.3,
      },
    },
  };

  const rotating = {
    hidden: { opacity: 0, y: 20, rotate: 0 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 360, // 360度回転
      transition: {
        repeat: Infinity,
        repeatDelay: 5,
        repeatType: 'reverse',
        duration: 1.8,
      },
    },
  };

  return (
    <Stagger staggerDelay={0.2} className="logo-container">
      {letters.map((char, index) => (
        <motion.span
          key={index}
          className={`logo-letter`}
          style={{
            color: char === 'R' || char === '.' ? 'red' : 'black',
          }}
          variants={animationTypes[index] === 'rotating' ? rotating : child}
          drag
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Stagger>
  );
};

export default Logo;
