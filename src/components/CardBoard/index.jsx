import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import Card from '../Card';
import SubmitBox from '../SubmitBox';
import QuestionCard from '../QuestionCard';

const CardBoard = ({ cardBoardName, G, moves, myID, enemyID, boardID }) => {
  const borderSize = 10;
  const [cardPositions, setCardPositions] = useState([]);
  const requestRef = useRef();
  const boardRef = useRef();

  // 初期化時に親要素のサイズを取得し、その後更新しない

  const cardSize = useMemo(() => {
    if (boardRef.current) {
      const boardRect = boardRef.current.getBoundingClientRect();
      return boardRect.width / 5;
    }
    return null;
  }, [boardRef.current]);

  const submitBoxSize = useMemo(() => {
    if (boardRef.current) {
      const boardRect = boardRef.current.getBoundingClientRect();
      return boardRect.width / 3.4;
    }
    return null;
  }, [boardRef.current]);

  const submitBoxPosition = useMemo(() => {
    if (boardRef.current && submitBoxSize) {
      const boardRect = boardRef.current.getBoundingClientRect();
      return {
        x: (boardRect.left + boardRect.right - submitBoxSize) / 2,
        y: (boardRect.top + boardRect.bottom - submitBoxSize) / 2,
      };
    }
    return null;
  }, [boardRef.current, submitBoxSize]);

  const isMyCardSubmit = useMemo(() => {
    if (G.playerData[myID].roundCard) return true;
    return false;
  }, [G.playerData]);

  const isEnemyCardSubmit = useMemo(() => {
    if (G.playerData[enemyID].roundCard) return true;
    return false;
  }, [G.playerData]);

  const isMine = useMemo(() => {
    if (boardID === 0) return true;
    return false;
  }, [boardID]);

  const selectedCardPosition = useMemo(() => {
    if (isMyCardSubmit) {
      return cardPositions[G.playerData[myID].roundCardID - 1].position;
    }
    return null;
  }, [G.playerData]);

  useEffect(() => {
    // 親要素のサイズを取得
    const boardRect = boardRef.current.getBoundingClientRect();
    const angleIncrement = (2 * Math.PI) / (G.cardCount / 2); // 360度をカードの数で均等に分ける
    let cardOrder = 0;
    // 初期ボールの設定
    const initialBalls = Array(10)
      .fill()
      .map((_, index) => {
        const angle = cardOrder * angleIncrement; // 各カードの角度
        const speed = 40 / G.cardCount;
        if (
          (index >= 5 && G.playerData[1].hands[index % 5]) ||
          (index < 5 && G.playerData[0].hands[index % 5])
        )
          cardOrder += 1;
        return {
          position: {
            x: (boardRect.left + boardRect.right - cardSize) / 2,
            y: (boardRect.top + boardRect.bottom - cardSize) / 2,
          },
          velocity: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed,
          },
        };
      });
    setCardPositions(initialBalls);
  }, [G.cardCount, cardSize, boardRef]);

  const update = () => {
    const boardRect = boardRef.current.getBoundingClientRect(); // 親要素の最新のサイズ

    setCardPositions((prevBalls) =>
      prevBalls.map((ball) => {
        const newPosition = {
          x: ball.position.x + ball.velocity.x,
          y: ball.position.y + ball.velocity.y,
        };
        //空気抵抗
        ball.velocity.x *= 0.997;
        ball.velocity.y *= 0.997;
        // 壁との衝突判定
        if (
          newPosition.x <= boardRect.left + borderSize ||
          newPosition.x >= boardRect.right - (cardSize + borderSize)
        ) {
          ball.velocity.x *= -0.9; // x方向の反発
        }
        if (
          newPosition.y <= boardRect.top + borderSize ||
          newPosition.y >= boardRect.bottom - (cardSize + borderSize)
        ) {
          ball.velocity.y *= -0.9; // y方向の反発
        }

        // ボールの新しい位置を設定
        return {
          ...ball,
          position: {
            x: Math.min(
              Math.max(newPosition.x, boardRect.left + borderSize),
              boardRect.right - (cardSize + borderSize),
            ), // 親要素内に制限
            y: Math.min(
              Math.max(newPosition.y, boardRect.top + borderSize),
              boardRect.bottom - (cardSize + borderSize),
            ),
          },
        };
      }),
    );
    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [cardSize]);

  return (
    <motion.div ref={boardRef} className={`card-board ${cardBoardName}`}>
      {submitBoxPosition && (
        <SubmitBox
          submitBoxPosition={submitBoxPosition}
          submitBoxSize={submitBoxSize}
          isSubmit={isMyCardSubmit}
          isMine={isMine}
        >
          {G.playerData[myID].hands.map((card, cardIndex) => {
            if (
              isMyCardSubmit &&
              card &&
              card.id === G.playerData[myID].roundCardID &&
              selectedCardPosition
            ) {
              if ((isMyCardSubmit && isEnemyCardSubmit) || isMine) {
                return (
                  <Card
                    key={cardIndex}
                    submitBoxPosition={submitBoxPosition}
                    cardPosition={selectedCardPosition}
                    cardSize={cardSize}
                    submitBoxSize={submitBoxSize}
                    cardName={card.name}
                    cardID={card.id}
                    playerID={myID}
                    boardID={boardID}
                    isSubmit={isMyCardSubmit && isEnemyCardSubmit}
                    moves={moves}
                  />
                );
              } else {
                return (
                  <QuestionCard
                    cardSize={cardSize}
                    submitBoxSize={submitBoxSize}
                  />
                );
              }
            }
          })}
        </SubmitBox>
      )}
      {G.playerData[myID].hands.map((card, cardIndex) => {
        if (
          !(isMyCardSubmit && isEnemyCardSubmit) &&
          card &&
          card.id !== G.playerData[myID].roundCardID &&
          cardPositions[card.id - 1] &&
          (!isMyCardSubmit || isMine)
        ) {
          return (
            <Card
              key={cardIndex}
              cardPosition={cardPositions[card.id - 1].position}
              cardSize={cardSize}
              cardName={card.name}
              cardID={card.id}
              playerID={myID}
              boardID={boardID}
              moves={moves}
            />
          );
        }
      })}
    </motion.div>
  );
};

export default CardBoard;
