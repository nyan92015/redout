import { Origins, Server } from 'boardgame.io/server';
import { RedOut } from './components/Game';
import { gameName } from './config';

const server = Server({
  name: gameName,
  games: [RedOut],
  origins: ['https://redout-frontend.onrender.com', Origins.LOCALHOST],
});

const PORT = process.env.PORT || 8000;
server.run(PORT);
