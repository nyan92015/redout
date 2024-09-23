import React, { useEffect, useState } from 'react';
import { createNewMatch, findAvailableMatch, joinMatch } from './services/matchService';
import Loading from './components/Loading';
import Lobby from './components/Lobby';
import { TicTacToeClient } from './config';
import { sendWelcomeMessage } from './services/chatService';

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
  const [loading, setLoading] = useState(false);
  const [matchReady, setMatchReady] = useState(false); 

  const chatMessage = TicTacToeClient.chatMessages;
  console.log(chatMessage);

  // マッチングを初期化する関数
  const initializeGame = async () => {
    setLoading(true); // ローディング状態を開始
    const gameData = await SetUpGame(); // ゲームをセットアップ
    if(gameData.playerID == 1){
      sendWelcomeMessage(gameData.playerName);
    }
    setMatchDetails(gameData); // マッチの詳細を保存
    setLoading(false); 
    setMatchReady(true);
  };
  useEffect(() =>{console.log(chatMessage, "bbb")},[chatMessage])

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