import { Origins, Server } from 'boardgame.io/server';
import serve from 'koa-static';
import { TicTacToe } from './components/Game';

const server = Server({
  name: 'tic-tac-toe',
  games: [TicTacToe],
  origins: ['https://redout-frontend.onrender.com', Origins.LOCALHOST],
});
const PORT = process.env.PORT || 8000;

server.app.use(serve('./build'));

server.run(PORT);
