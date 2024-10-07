import React from 'react';
import { motion } from 'framer-motion';
import './index.css';

const SubmitBox = React.memo(
  ({ submitBoxPosition, submitBoxSize, isSubmit, isMine, children }) => {
    return (
      <motion.div
        className="submit-box"
        initial={{
          backgroundColor: '#2a2a2a',
          borderWidth: '6px',
          borderColor: '#ffffff',
          boxShadow: '0 0 30px #ffffff, inset 0 0 30px #ffffff',
        }}
        animate={
          isSubmit && isMine
            ? {
                backgroundColor: '#000000',
                borderWidth: '6px',
                borderColor: '#ff0000',
                boxShadow: '0 0 60px #ff0000, inset 0 0 60px #ff0000',
              }
            : isSubmit && !isMine
              ? {
                  backgroundColor: '#000000',
                  borderWidth: '6px',
                  borderColor: '#0000ff',
                  boxShadow: '0 0 60px #0000ff, inset 0 0 60px #0000ff',
                }
              : {}
        }
        transition={{
          duration: 0.8,
          repeatType: 'reverse',
          ease: 'backOut',
        }}
        style={{
          top: `${submitBoxPosition.y}px`,
          left: `${submitBoxPosition.x}px`,
          height: `${submitBoxSize}px`,
          width: `${submitBoxSize}px`,
        }}
      >
        {children}
      </motion.div>
    );
  },
);

export default SubmitBox;
