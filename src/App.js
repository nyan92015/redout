import React, { useEffect, useState } from 'react';
import { createNewMatch, findAvailableMatch, joinMatch } from './services/matchService';
import Loading from './components/Loading';
import Lobby from './components/Lobby';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer'
import { TicTacToe } from './Game';
import { TicTacToeBoard } from './Board';
import { SERVER_URL } from './config';

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: SocketIO({ server: SERVER_URL }),
});

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
  matchData.playerCredentials = playerCredentials;

  return matchData;

  }

const App = () => {
  const [matchDetails, setMatchDetails] = useState(null);
  const [matchReady, setMatchReady] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [sendChatMessage, setSendChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState();
  console.log(chatMessages);
  useEffect(()=>{console.log(chatMessages, "bbb")},[chatMessages])


  // マッチングを初期化する関数
  const initializeGame = async () => {
    setLoading(true); // ローディング状態を開始
    const gameData = await SetUpGame(); // ゲームをセットアップ
    setMatchDetails(gameData); // マッチの詳細を保存
    if(gameData.playerID == 1){
      setSendChatMessage(`${gameData.playerName}が参加しました!`);
    }
    setLoading(false); 
    setMatchReady(true);
  };

  // ローディング中はローディング画面を表示
  if (loading || (matchDetails && !matchReady)) {
    return <Loading />; // 対戦相手が見つかるまでローディング画面を表示
  }

  // マッチングが完了したらゲーム画面を表示
  if (matchReady && matchDetails) {
    return (
      <TicTacToeClient
        credentials={matchDetails.playerCredentials}
        playerID={matchDetails.playerID}
        matchID={matchDetails.matchID}
        sendChatMessage={sendChatMessage}
        chatMessages={chatMessages}
      />
    );
  }

  return (
    <div>
      <Lobby initializeGame={initializeGame} /> {/* ロビー画面を表示 */}
    </div>
  );
};

export default App;