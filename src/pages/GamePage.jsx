import React, { useContext } from 'react';
import Loading from '../components/Loading';
import { TicTacToe } from '../components/Game';
import { TicTacToeBoard } from '../components/Board';
import { SERVER_URL } from '../config';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Match } from '../App';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
  const navigate = useNavigate();
  const { matchDetails } = useContext(Match);
  if (!matchDetails) {
    navigate('/lobby');
  }
  console.log(matchDetails);

  const TicTacToeClient = Client({
    game: TicTacToe,
    board: TicTacToeBoard,
    multiplayer: SocketIO({ server: SERVER_URL }),
    loading: () => <Loading letters="Connecting" color="yellow" />,
    debug: false,
  });
  return (
    <TicTacToeClient
      credentials={matchDetails.playerCredentials}
      playerID={matchDetails.playerID}
      playerName={matchDetails.playerName}
      matchID={matchDetails.matchID}
    />
  );
};

export default GamePage;
