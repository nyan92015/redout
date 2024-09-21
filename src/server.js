import { Server } from 'boardgame.io/server';
import { TicTacToe } from './Game';

const server = Server({ games: [TicTacToe] });
const PORT = Number(process.env.PORT) || 8000; // ここで数値に変換

server.run(PORT);
