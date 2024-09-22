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

  // ゲームを探す
  let matchData = await findAvailableMatch();
  
  // ゲームが見つからない場合、新しいゲームを作成
  if (!matchData) {
    matchData = await createNewMatch();
  }
  //  ゲームに参加
  const playerCredentials  = await joinMatch(
    matchData.matchID, 
    matchData.playerID, 
    playerName,
  );
    console.log(playerCredentials)
  matchData.playerCredentials = playerCredentials;

  return matchData;
}

const App = () => {
  const [matchDetails, setMatchDetails] = useState(null);

  useEffect(() => {
    const initializeGame = async () => {
      const gameData = await SetUpGame();
      setMatchDetails(gameData);
    };
    initializeGame();
  }, []);

  if (!matchDetails) {
    return <div>Loading...</div>; // ローディング状態
  }
  console.log(matchDetails)
  return (
    <div>
      <TicTacToeClient credentials={matchDetails.playerCredentials} playerID={matchDetails.playerID} matchID={matchDetails.matchID} />
    </div>
  );
};

export default App;
