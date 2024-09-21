import { Server } from 'boardgame.io/server';
import serve from 'koa-static';
import { TicTacToe } from './Game';

const server = Server({ games: [TicTacToe] });
const PORT = process.env.PORT || 8000;

server.app.use(serve('./build'))

server.run(PORT)