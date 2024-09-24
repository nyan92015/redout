import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { createNewMatch, findAvailableMatch, joinMatch } from './services/matchService';
import EnterNamePage from './pages/EnterNamePage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';

async function SetUpGame(playerName) {
  let matchData = await findAvailableMatch();

  if (!matchData) {
    matchData = await createNewMatch();
  }

  const playerCredentials = await joinMatch(matchData.matchID, matchData.playerID, playerName);
  matchData.playerName = playerName;
  matchData.playerCredentials = playerCredentials;

  return matchData;
}

const App = () => {
  const [matchDetails, setMatchDetails] = useState(null);
  const navigate = useNavigate();

  const initializeGame = async () => {
    const gameData = await SetUpGame(matchDetails.playerName);
    setMatchDetails(gameData);
    navigate('/game'); // ゲーム画面へ遷移
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterNamePage setMatchDetails={setMatchDetails} />} />
        <Route path="/lobby" element={<LobbyPage initializeGame={initializeGame} />} />
        <Route path="/game" element={<GamePage matchDetails={matchDetails} />} />
      </Routes>
    </Router>
  );
};

export default App;
