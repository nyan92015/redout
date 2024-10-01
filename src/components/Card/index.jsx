import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import { TbSkull } from 'react-icons/tb';
import { Match } from '../../App';

const Card = ({ cardName, player, moves }) => {
  const { matchDetails, setMatchDetails } = useContext(Match);
  const handleCardPlay = () => {
    moves.playCard(cardName, matchDetails.playerID);
  };
  const variants = {
    hidden: {  opacity: 0 }, 
    visible: {
      opacity: 1,
      transition: {
        duration: 4, 
        ease: 'easeOut', 
        type: 'spring', 
        stiffness: 50,
      },
    },
  };

  
  const cardClassName = 
  cardName === 'white_skull' || cardName === 'white_card'
    ? 'white-card'
    : cardName === 'black_skull' || cardName === 'black_card'
    ? 'black-card'
    : cardName === 'red_skull'
    ? 'black-skull'
    : '';

  return (
    <motion.div
      className={`${cardName} card ${player === matchDetails.myID ? 'red-card' : 'blue-card'} ${cardClassName}`}
      whileHover={{
        scale: 1.12,
        transition: {
          duration: 0.3,
        },
      }}
      variants={variants}
      drag
      onClick={handleCardPlay}
    >
      {cardName !== 'black_card' && cardName !== 'white_card' && (
        <TbSkull
          className={`skull ${player === matchDetails.myID ? 'red-skull' : 'blue-skull'} ${cardName === 'red_skull' && 'black-skull'}`}
        />
      )}
    </motion.div>
  );
};

export default Card;
