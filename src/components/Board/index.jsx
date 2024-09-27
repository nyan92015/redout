import React, { useContext, useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import Loading from '../Loading';
import { Match } from '../../App';
import { getMatch, leaveMatch } from '../../services/matchService';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

export function TicTacToeBoard({ ctx, G, moves, sendChatMessage, chatMessages }) {
  const { matchDetails, setMatchDetails } = useContext(Match);
  const [isPlayerJoined, setIsPlayerJoined] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(chatMessages);
    (async () => {
      const matchData = await getMatch(matchDetails.matchID);
      if (matchData.players.length === 2 && !isPlayerJoined) {
        if ((matchDetails.playerID === '1' && matchData.players[0].name) || (matchDetails.playerID === '0' && matchData.players[1].name)) {
          setIsPlayerJoined(true);
          sendChatMessage({senderName: matchDetails.playerName, message: `${matchDetails.playerName} join the game.`})
        }
      }
    })();
  }, [chatMessages]);


  const backToLobby = () => {
    setMatchDetails({ playerName: matchDetails.playerName });
    navigate('/lobby');
  };

  const leaveGame = () => {
    leaveMatch(matchDetails.matchID, matchDetails.playerID, matchDetails.playerCredentials);
    backToLobby();
  };

  const onClick = (id) => moves.clickCell(id);
  let winner = '';
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
    leaveGame();
  }

  const cellStyle = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  };

  let tbody = [];
  for (let i = 0; i < 3; i++) {
    let cells = [];
    for (let j = 0; j < 3; j++) {
      const id = 3 * i + j;
      cells.push(
        <td key={id}>
          {G.cells[id] ? (
            <div style={cellStyle}>{G.cells[id]}</div>
          ) : (
            <button style={cellStyle} onClick={() => onClick(id)} />
          )}
        </td>,
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <div>
      {isPlayerJoined ? (
        <div>
          <Button onClick={backToLobby}>aaa</Button>
          <table id="board">
            <tbody>{tbody}</tbody>
          </table>
          {winner}
        </div>
      ) : (
        <>
          <Loading letters="Matching" />

          <Button onClick={leaveGame}>aaa</Button>
        </>
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
}
