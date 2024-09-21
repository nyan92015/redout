import { Server } from 'boardgame.io/server';
import serve from 'koa-static';
import Koa from 'koa';
import cors from '@koa/cors'; // CORSミドルウェアのインポート
import { TicTacToe } from './Game';

const app = new Koa();
const server = Server({ 
  name: 'tic-tac-toe', 
  games: [TicTacToe],
});

const PORT = process.env.PORT || 8000;

// CORS設定
app.use(cors({
  origin: [
    'https://redout.onrender.com',
    'http://localhost:8000' // スキームを含めて指定する
  ],
}));

// 静的ファイルの提供
app.use(serve('./build'));

// サーバーを実行
server.app = app; // ServerのappをKoaのappに設定
server.run(PORT);
