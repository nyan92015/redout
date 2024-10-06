import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import { TbSkull } from 'react-icons/tb';
import { Match } from '../../App';

const Card = 
  ({
    submitBoxPosition,
    cardPosition,
    cardSize,
    submitBoxSize,
    cardName,
    cardID,
    playerID,
    moves,
  }) => {
    const { matchDetails } = useContext(Match);
    const handleAnimationComplete = () => {
      moves.unlockWaiting();
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
          x: cardPosition.x - submitBoxPosition.x,
          y: cardPosition.y - submitBoxPosition.y,
        },
        animate: {
          x: (submitBoxSize  - cardSize) / 2 - 5,
          y: (submitBoxSize - cardSize) / 2 - 5,
          transition: {
            duration: 0.8,
            ease: 'easeOut',
          },
        },
      };
      return (
        <motion.div
          className={`${cardName} card ${playerID === matchDetails.myID ? 'red-card' : 'blue-card'} ${cardClassName}`}
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
              className={`skull ${playerID === matchDetails.myID ? 'red-skull' : 'blue-skull'} ${cardName === 'red_skull' && 'black-skull'}`}
            />
          )}
        </motion.div>
      );
    }

    return (
      <motion.div
        className={`${cardName} card ${playerID === matchDetails.myID ? 'red-card' : 'blue-card'} ${cardClassName}`}
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
            className={`skull ${playerID === matchDetails.myID ? 'red-skull' : 'blue-skull'} ${cardName === 'red_skull' && 'black-skull'}`}
          />
        )}
      </motion.div>
    );
  };

export default Card;
