import { LobbyClient } from 'boardgame.io/client';
import { TicTacToe } from './Game';
import { TicTacToeBoard } from './Board';

export const SERVER_URL = 'https://redout.onrender.com';
export const gameName = 'tic-tac-toe';
export const lobbyClient = new LobbyClient({ server: SERVER_URL });
export const TicTacToeClient = Client({
    game: TicTacToe,
    board: TicTacToeBoard,
    multiplayer: SocketIO({ server: SERVER_URL }),
  });