import React from 'react';
import { motion } from 'framer-motion';
import './index.css';
import { TbSkull } from 'react-icons/tb';

const Card = ({
  submitBoxPosition,
  cardPosition,
  cardSize,
  submitBoxSize,
  cardName,
  cardID,
  playerID,
  boardID,
  isSubmit,
  moves,
}) => {
  const handleAnimationComplete = () => {
    moves.unlockWaiting(playerID);
  };
  const handleCardPlay = () => {
    moves.playCard(cardID, cardName, playerID);
  };

  const cardClassName =
    cardName === 'white_skull' || cardName === 'white_card'
      ? 'white-card'
      : cardName === 'black_skull' || cardName === 'black_card'
        ? 'black-card'
        : cardName === 'red_skull'
          ? 'black-skull'
          : '';

  if (submitBoxPosition && cardPosition) {
    const submitVariants = {
      initial: {
        opacity: boardID === 0 ? 1 : 0,
        x:
          boardID === 0 || isSubmit
            ? cardPosition.x - submitBoxPosition.x
            : (submitBoxSize - cardSize) / 2 - 5,
        y:
          boardID === 0 || isSubmit
            ? cardPosition.y - submitBoxPosition.y
            : (submitBoxSize - cardSize) / 2 - 5,
      },
      animate: {
        opacity: 1,
        x: (submitBoxSize - cardSize) / 2 - 5,
        y: (submitBoxSize - cardSize) / 2 - 5,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
        },
      },
    };
    return (
      <motion.div
        className={`${cardName} card ${boardID === 0 ? 'red-card' : 'blue-card'} ${cardClassName}`}
        layout
        variants={submitVariants}
        initial="initial"
        animate="animate"
        onAnimationComplete={handleAnimationComplete}
        style={{
          position: 'fixed',
          height: `${cardSize}px`,
          width: `${cardSize}px`,
        }}
      >
        {cardName !== 'black_card' && cardName !== 'white_card' && (
          <TbSkull
            className={`skull ${boardID === 0 ? 'red-skull' : 'blue-skull'} ${cardName === 'red_skull' && 'black-skull'}`}
          />
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${cardName} card ${boardID === 0 ? 'red-card' : 'blue-card'} ${cardClassName}`}
      whileHover={{
        scale: 1.12,
        transition: {
          duration: 0.3,
        },
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.2,
      }}
      style={{
        position: 'fixed',
        height: `${cardSize}px`,
        width: `${cardSize}px`,
        left: `${cardPosition.x}px`,
        top: `${cardPosition.y}px`,
      }}
      onClick={handleCardPlay}
    >
      {cardName !== 'black_card' && cardName !== 'white_card' && (
        <TbSkull
          className={`skull ${boardID === 0 ? 'red-skull' : 'blue-skull'} ${cardName === 'red_skull' && 'black-skull'}`}
        />
      )}
    </motion.div>
  );
};

export default Card;
