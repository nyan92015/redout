import React, { useEffect, useState } from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { TicTacToe } from './Game';
import { TicTacToeBoard } from './Board';
import { LobbyClient } from 'boardgame.io/client';

const SERVER_URL = 'https://redout.onrender.com';
const gameName = 'tic-tac-toe';
const lobbyClient = new LobbyClient({ server: SERVER_URL });
const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: SocketIO({ server: SERVER_URL }),
});

// 1. ゲームを探す関数
async function findAvailableMatch() {
  const { matches } = await lobbyClient.listMatches(gameName);

  // 空いている席があるマッチを探す
  const availableMatch = matches.find(match => 
    match.players.some(player => !player.name) // プレイヤーの空席を確認
  );

  if (availableMatch) {
    const openSeat = availableMatch.players.find(player => !player.name);
    return { matchID: availableMatch.matchID, playerID: String(openSeat.id) };
  }

  return null;
}

// 2. ゲームを作る関数
async function createNewMatch(numPlayers = 2) {
  const { matchID } = await lobbyClient.createMatch(gameName, { numPlayers });
  return { matchID: matchID, playerID: '0' };
}

// 3. ゲームに参加する関数
async function joinMatch( matchID, playerID, playerName) {
  const { playerCredentials } = await lobbyClient.joinMatch(gameName, matchID, {
    playerID,
    playerName
  });
  return playerCredentials;
}

// セットアップゲームのメイン関数
async function SetUpGame() {
  const playerName = 'Alice';

  // 1. ゲームを探す
  let matchData = await findAvailableMatch();
  
  // 2. ゲームが見つからない場合、新しいゲームを作成
  if (!matchData) {
    matchData = await createNewMatch();
  }
  // 3. ゲームに参加
  await joinMatch(
    matchData.matchID, 
    matchData.playerID, 
    playerName
  );

  return matchData;
}

const App = () => {
  console.log("aaa")
  const [matchDetails, setMatchDetails] = useState(null);

  useEffect(() => {
    const initializeGame = async () => {
      const gameData = await SetUpGame();
      setMatchDetails(gameData);
      console.log(gameData)
    };

    initializeGame();
  }, []);

  if (!matchDetails) {
    return <div>Loading...</div>; // ローディング状態
  }

  return (
    <div>
      <TicTacToeClient playerID={matchDetails.playerID} matchID={matchDetails.matchID} />
    </div>
  );
};

export default App;
