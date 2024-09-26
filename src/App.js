import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import EnterNamePage from './pages/EnterNamePage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const location = useLocation();
  const [matchDetails, setMatchDetails] = useState({ playerName: 'aaa' });

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
