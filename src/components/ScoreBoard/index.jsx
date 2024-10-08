import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './index.css';

const ScoreBoard = ({ G, moves, myID, enemyID }) => {
  const myScoreControls = useAnimation();
  const enemyScoreControls = useAnimation();

  const handleAnimationComplete = () => {
    moves.unlockJudgePhaseWaiting(myID);
  };

  useEffect(() => {
    if (G.round.winner === 3) handleAnimationComplete();
    if (G.round.winner === myID + 1) {
      myScoreControls.start({
        scale: [1, 1.3, 1],
        transition: { duration: 0.8, delay: 0, repeat: 2 },
      });
    } else if (G.round.winner === enemyID + 1) {
      enemyScoreControls.start({
        scale: [1, 1.3, 1], // 拡大してから元のサイズに戻る
        transition: { duration: 0.8, delay: 0, repeat: 2 },
      });
    }
  }, [G.round.winner, myScoreControls, enemyScoreControls]);

  return (
    <div style={{ textAlign: 'center' }}>
      <motion.div className="score-board">
        <motion.div
          style={{ color: '#ff0000', textShadow: '0 0 30px #ff0000' }}
          animate={myScoreControls}
          onAnimationComplete={handleAnimationComplete}
        >
          {G.playerData[myID].score}
        </motion.div>{' '}
        -{' '}
        <motion.div
          style={{ color: '#0000ff', textShadow: '0 0 30px #0000ff' }}
          animate={enemyScoreControls}
          onAnimationComplete={handleAnimationComplete}
        >
          {G.playerData[enemyID].score}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScoreBoard;
