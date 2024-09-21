import React, { useEffect, useState } from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { TicTacToe } from './Game';
import { TicTacToeBoard } from './Board';

const SERVER_URL = 'https://redout.onrender.com'; // サーバーURL

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: SocketIO({ server: SERVER_URL }),
});

const App = () => {
  const [matchID, setMatchID] = useState(null);
  const [playerID, setPlayerID] = useState(null);

  // マッチを探して参加するか、新しいマッチを作成する
  useEffect(() => {
    const findOrCreateMatch = async () => {
      try {
        // 既存の空きマッチを探す
        const existingMatch = await findExistingMatch();
        if (existingMatch) {
          // 空きがあればそのマッチに参加
          const playerID = existingMatch.players.findIndex(player => !player.name);
          await joinMatch(existingMatch.matchID, playerID.toString());
          setMatchID(existingMatch.matchID);
          setPlayerID(playerID.toString());
        } else {
          // 空きがなければ新しいマッチを作成
          const newMatchID = await createNewMatch();
          await joinMatch(newMatchID, '0'); // 最初のプレイヤーとして参加
          setMatchID(newMatchID);
          setPlayerID('0');
        }
      } catch (error) {
        console.error('Error finding or creating match:', error);
      }
    };

    findOrCreateMatch();
  }, []);

  // 既存のマッチを取得する関数
  const findExistingMatch = async () => {
    const response = await fetch(`${SERVER_URL}/games/tictactoe`);
    const matches = await response.json();

    // まだプレイヤーが参加していない空きのあるマッチを探す
    return matches.find(match => match.players.some(player => !player.name));
  };

  // マッチに参加する関数
  const joinMatch = async (matchID, playerID) => {
    await fetch(`${SERVER_URL}/games/tictactoe/${matchID}/join`, {
      method: 'POST',
      body: JSON.stringify({
        playerID: playerID,
        credentials: 'player-credentials', // 必要に応じて設定
      }),
    });
  };

  // 新しいマッチを作成する関数
  const createNewMatch = async () => {
    const response = await fetch(`${SERVER_URL}/games/tictactoe/create`, {
      method: 'POST',
    });
    const data = await response.json();
    return data.matchID;
  };

  return (
    <div>
      {matchID && playerID ? (
        <TicTacToeClient matchID={matchID} playerID={playerID} />
      ) : (
        <p>マッチング中...</p>
      )}
    </div>
  );
};

export default App;
