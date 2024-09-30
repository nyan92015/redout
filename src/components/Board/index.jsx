import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Loading from '../Loading';
import { Match } from '../../App';
import { getMatch, leaveMatch } from '../../services/matchService';
import { useNavigate } from 'react-router-dom';
import CancelButton from '../CancelButton.jsx';

import './index.css';
import useLocalStorage from '../../hooks/useLocalStorage.js';
export function TicTacToeBoard({ ctx, G, moves, chatMessages, sendChatMessage }) {
  const { matchDetails, setMatchDetails } = useContext(Match);
  const [localStorageData, setLocalStorageData] = useLocalStorage('matchData', {});
  const [isPlayerJoined, setPlayerJoined] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (matchDetails.playerID && matchDetails.matchID && matchDetails.playerCredentials) {
      setLocalStorageData(matchDetails);
      if (!isPlayerJoined) {
        sendChatMessage({
          senderName: matchDetails.playerName,
          message: `${matchDetails.playerName} join the game.`,
        });
        setPlayerJoined(true);
      }
      (async () => {
        const matchData = await getMatch(matchDetails.matchID);
        if (matchData.players[0].name && matchData.players[1].name && !matchDetails.enemyName) {
          if (matchDetails.playerID === '1') {
            setMatchDetails({
              ...matchDetails,
              enemyName: matchData.players[0].name,
              myID: 1,
              enemyID: 0,
            });
          }

          if (matchDetails.playerID === '0') {
            setMatchDetails({
              ...matchDetails,
              enemyName: matchData.players[1].name,
              myID: 0,
              enemyID: 1,
            });
          }
        }
      })();
    }
  }, [chatMessages, sendChatMessage, matchDetails, setMatchDetails]);

  useEffect(() => {
    if (chatMessages.length > 0) {
      if (chatMessages[chatMessages.length - 1].payload.senderName !== matchDetails.playerName) {
        toast.success(chatMessages[chatMessages.length - 1].payload.message);
      }
    }
  }, [chatMessages]);

  const backToLobby = () => {
    setMatchDetails({ playerName: matchDetails.playerName });
    setLocalStorageData({});
    navigate('/lobby');
  };

  const leaveGame = (matchID, playerID, playerCredentials) => {
    leaveMatch(matchID, playerID, playerCredentials);
    backToLobby();
  };

  useEffect(() => {
    if (!(matchDetails.playerID && matchDetails.matchID && matchDetails.playerCredentials)) {
      const checkLocalStorageAndLeaveGame = async () => {
        if (
          localStorageData.playerID &&
          localStorageData.matchID &&
          localStorageData.playerCredentials
        ) {
          console.log(localStorageData);
          const matchData = await getMatch(localStorageData.matchID);
          if (matchData.players[0].name && matchData.players[1].name) {
            backToLobby();
          } else {
            leaveGame(
              localStorageData.matchID,
              localStorageData.playerID,
              localStorageData.playerCredentials,
            );
          }
        }
      };
      checkLocalStorageAndLeaveGame();
    }
  }, [localStorageData]);

  const handleCardPlay = (card, playerID) => {
    moves.playCard(card, playerID);
  };

  return (
    <div>
      {matchDetails.enemyName ? (
        <div className="board">
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

          <CancelButton
            onClick={() =>
              leaveGame(matchDetails.matchID, matchDetails.playerID, matchDetails.playerCredentials)
            }
          />
        </>
      )}
    </div>
  );
}
