import React, { useContext, useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import Loading from '../Loading';
import { Match } from '../../App';
import {
  getListMatches,
  getMatch,
  leaveMatch,
} from '../../services/matchService';
import { useNavigate } from 'react-router-dom';
import CancelButton from '../CancelButton.jsx';
import { motion } from 'framer-motion';

import './index.css';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import Modal from '../Modal/index.jsx';
import useModal from '../../hooks/useModal.jsx';
import GiveUp from '../GiveUp/index.jsx';
import FlagButton from '../FlagButton/index.jsx';
import CardBoard from '../CardBoard/index.jsx';
export function TicTacToeBoard({
  ctx,
  G,
  moves,
  chatMessages,
  sendChatMessage,
}) {
  const { matchDetails, setMatchDetails } = useContext(Match);
  const [localStorageData, setLocalStorageData] = useLocalStorage(
    'matchData',
    {},
  );
  const [isPlayerJoined, setIsPlayerJoined] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (matchDetails.enemyName && !isPlayerJoined) {
      toast.success(`${matchDetails.enemyName} join the game.`);
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
    if (
      matchDetails.playerID &&
      matchDetails.matchID &&
      matchDetails.playerCredentials &&
      !matchDetails.enemyName
    ) {
      setLocalStorageData(matchDetails);
      if (!isPlayerJoined) {
        setIsPlayerJoined(true);
        sendChatMessage({
          senderName: matchDetails.playerName,
          message: `${matchDetails.playerName} join the game.`,
        });
      }
      (async () => {
        const matchData = await getMatch(matchDetails.matchID);
        if (matchData.players[0].name && matchData.players[1].name) {
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
  }, [chatMessages]);

  useEffect(() => {
    if (
      !(
        matchDetails.playerID &&
        matchDetails.matchID &&
        matchDetails.playerCredentials
      )
    ) {
      const checkLocalStorageAndLeaveGame = async () => {
        if (
          localStorageData.playerID &&
          localStorageData.matchID &&
          localStorageData.playerCredentials
        ) {
          const matches = await getListMatches();
          if (
            !matches.some(
              (matchData) => matchData.matchID === localStorageData.matchID,
            )
          ) {
            backToLobby();
          } else {
            const matchData = await getMatch(localStorageData.matchID);
            if (matchData.players[0].name && matchData.players[1].name) {
              backToLobby();
            } else if (matchData.players[0].name || matchData.players[1].name) {
              leaveGame(
                localStorageData.matchID,
                localStorageData.playerID,
                localStorageData.playerCredentials,
              );
            }
          }
        }
      };
      checkLocalStorageAndLeaveGame();
    }
  }, []);

  const { modalOpen, close, open } = useModal();
  return (
    <motion.div
      className="board-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
    >
      {matchDetails.enemyName ? (
        <div className="board">
          <div className="test">
            <div className="my-score">
              {G.playerData[matchDetails.myID].roundCard &&
                `${matchDetails.playerName} : set`}
            </div>
            <div className="enemy-score">
              {G.playerData[matchDetails.enemyID].roundCard &&
                `${matchDetails.enemyName} : set`}
            </div>
            <div className="my-score">{`${matchDetails.playerName} : ${G.playerData[matchDetails.myID].score}`}</div>
            <div className="enemy-score">{`${matchDetails.enemyName} : ${G.playerData[matchDetails.enemyID].score}`}</div>
          </div>
          <div className="card-board-container">
            <CardBoard
              cardBoardName={'card-board'}
              G={G}
              moves={moves}
              myID={matchDetails.myID}
              enemyID={matchDetails.enemyID}
              boardID={0}
            />
            <CardBoard
              cardBoardName={'card-board'}
              G={G}
              moves={moves}
              myID={matchDetails.enemyID}
              enemyID={matchDetails.myID}
              boardID={1}
            />
          </div>

          {ctx.gameover && (
            <div className="game-over">
              Game Over!
              {ctx.gameover.winner === matchDetails.myID
                ? matchDetails.playerName
                : matchDetails.enemyName}
              wins!
            </div>
          )}
          <FlagButton onClick={open} />
          {modalOpen && (
            <Modal handleClose={close}>
              <GiveUp backToLobby={backToLobby} handleClose={close} />
            </Modal>
          )}
        </div>
      ) : (
        <>
          <Loading letters="Matching" />

          <CancelButton
            onClick={() =>
              leaveGame(
                matchDetails.matchID,
                matchDetails.playerID,
                matchDetails.playerCredentials,
              )
            }
          />
        </>
      )}
      <Toaster position="top-center" richColors />
    </motion.div>
  );
}
