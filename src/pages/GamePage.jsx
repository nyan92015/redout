import React from 'react';
import Loading from '../components/Loading';
import { TicTacToe } from '../components/Game';
import { TicTacToeBoard } from '../components/Board';
import { SERVER_URL } from '../config';
import { Client, Lobby } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

const GamePage = ({ matchDetails }) => {
  if (!matchDetails) {
    return <Loading/>;
  }

  const TicTacToeClient = Client({
    game: TicTacToe,
    board: TicTacToeBoard,
    multiplayer: SocketIO({ server: SERVER_URL }),
    loading: Loading,
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
