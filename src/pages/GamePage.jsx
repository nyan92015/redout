import React from 'react';
import Loading from '../components/Loading';
import { TicTacToe } from '../components/Game';
import { TicTacToeBoard } from '../components/Board';
import { SERVER_URL } from '../config';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

const GamePage = ({ matchDetails }) => {
  if (!matchDetails) {
    return <Loading letters={'Matching'} />;
  }

  const TicTacToeClient = Client({
    game: TicTacToe,
    board: TicTacToeBoard,
    multiplayer: SocketIO({ server: SERVER_URL }),
    loading: Loading,
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
