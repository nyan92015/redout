import { Server } from 'boardgame.io/server';
import serve from 'koa-static';
import { TicTacToe } from './Game';

const server = Server({ name: 'tic-tac-toe', games: [TicTacToe],origins: [
    'https://redout.onrender.com',
    'localhost:8000'
  ],});
const PORT = process.env.PORT || 8000;

server.app.use(serve('./build'))

server.on('matchJoined', (matchID) => {
    const match = server.matches[matchID];
    if (match && match.players.length === 2) {
      // 2人目が参加した場合
      const players = match.players;
      players.forEach(player => {
        if (player.socket) {
          player.socket.emit('playersReady', matchID); // カスタムイベントを発火
        }
      });
    }
  });

server.run(PORT)