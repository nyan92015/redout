import React, { useContext, useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import Loading from '../Loading';
import { Match } from '../../App';
import { getMatch, leaveMatch } from '../../services/matchService';
import { useNavigate } from 'react-router-dom';
import CancelButton from '../CancelButton.jsx';

import './index.css';
export function TicTacToeBoard({ ctx, G, moves, sendChatMessage, chatMessages }) {
  const { matchDetails, setMatchDetails } = useContext(Match);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const matchData = await getMatch(matchDetails.matchID);
      if (matchData.players.length === 2 && !matchDetails.enemyName) {
        if (
          (matchDetails.playerID === '1' && matchData.players[0].name) ||
          (matchDetails.playerID === '0' && matchData.players[1].name)
        ) {
          sendChatMessage({
            senderName: matchDetails.playerName,
            message: `${matchDetails.playerName} join the game.`,
          });
          
          if (matchDetails.playerID === '1'){
            toast.success(`${matchData.players[1].name} join the game.`)
            setMatchDetails({
              ...matchDetails,
              enemyName: matchData.players[0].name,
              myID: 1,
              enemyID: 0,
            });
          }
            
          if (matchDetails.playerID === '0'){
            toast.success(`${matchData.players[1].name} join the game.`)
            setMatchDetails({
              ...matchDetails,
              enemyName: matchData.players[1].name,
              myID: 0,
              enemyID: 1,
            });
          }
        }
      }
    })();
  }, [chatMessages]);

  useEffect(() => {
    toast.success("aaa")
    console.log(chatMessages)
  }, [chatMessages]);

  const backToLobby = () => {
    setMatchDetails({ playerName: matchDetails.playerName });
    navigate('/lobby');
  };

  const leaveGame = () => {
    leaveMatch(matchDetails.matchID, matchDetails.playerID, matchDetails.playerCredentials);
    backToLobby();
  };

  const handleCardPlay = (card, playerID) => {
    moves.playCard(card, playerID);
  };

  return (
    <div>
      {matchDetails.enemyName ? (
        <div className="board">
          <button onClick={() => {sendChatMessage("aaa")}}>aaa</button>
          <h2>RedOut Game</h2>
          <div className="scoreboard">
            <div>
              {matchDetails.playerName}: {G.playerData[matchDetails.myID].score}
            </div>
            <div>
              {matchDetails.enemyName}: {G.playerData[matchDetails.enemyID].score}
            </div>
          </div>
          <div className="hands">
            {G.playerData.map((player, index) => (
              <div key={index} className="hand">
                <h3>
                  {index === matchDetails.myID ? matchDetails.playerName : matchDetails.enemyName}
                </h3>
                <div className={index === matchDetails.myID ? 'cards' : 'enemy-cards'}>
                  {player.hands.map((card, index) => (
                    <div
                      key={index}
                      className="card"
                      onClick={() => handleCardPlay(card, matchDetails.playerID)} // カードをクリックしたときにプレイ
                    >
                      {card}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="round-info">
            <div>
              <h3>Round Cards</h3>
              {G.playerData[matchDetails.myID].roundCard && (
                <div>{matchDetails.playerName} set </div>
              )}
              {G.playerData[matchDetails.enemyID].roundCard && (
                <div>{matchDetails.enemyName} set</div>
              )}
            </div>
          </div>
          {ctx.gameover && (
            <div className="game-over">
              Game Over! Player{' '}
              {ctx.gameover.winner === matchDetails.myID
                ? matchDetails.playerName
                : matchDetails.enemyName}{' '}
              wins!
            </div>
          )}
          <CancelButton onClick={backToLobby} />
        </div>
      ) : (
        <>
          <Loading letters="Matching" />

          <CancelButton onClick={leaveGame} />
        </>
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
}
