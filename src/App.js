import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import EnterNamePage from './pages/EnterNamePage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import { AnimatePresence } from 'framer-motion';
import { leaveMatch } from './services/matchService';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [matchDetails, setMatchDetails] = useState({
    playerName: 'guest',
    playerID: null,
    matchID: null,
    playerCredentials: null,
  });

  useEffect(() => {
    if (location.pathname !== '/game' && matchDetails.matchID) {
      const { matchID, playerID, playerCredentials } = matchDetails;
      leaveMatch(matchID, playerID, playerCredentials);
    }
  }, [location.pathname, matchDetails.matchID, matchDetails.playerCredentials]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<EnterNamePage matchDetails={matchDetails} setMatchDetails={setMatchDetails} />}
        />
        <Route
          path="/lobby"
          element={<LobbyPage matchDetails={matchDetails} setMatchDetails={setMatchDetails} />}
        />
        <Route path="/game" element={<GamePage matchDetails={matchDetails} />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
