import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import EnterNamePage from './pages/EnterNamePage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import { AnimatePresence } from 'framer-motion';

export const Match = createContext();

const App = () => {
  const location = useLocation();
  const [matchDetails, setMatchDetails] = useState({ playerName: 'guest' });

  return (
    <AnimatePresence>
      <Match.Provider value={{ matchDetails, setMatchDetails }}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<EnterNamePage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Match.Provider>
    </AnimatePresence>
  );
};

export default App;
