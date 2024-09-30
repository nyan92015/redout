import React, { useEffect, createContext, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import EnterNamePage from './pages/EnterNamePage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import { AnimatePresence } from 'framer-motion';
import useLocalStorage from './hooks/useLocalStorage';
import { Toaster } from 'sonner';

export const Match = createContext();

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [matchDetails, setMatchDetails] = useState({ playerName: 'guest' });

  useEffect(() => {
    if (matchDetails.matchID && matchDetails.playerID && matchDetails.playerCredentials) {
      navigate('/game');
    }
  }, [matchDetails]);

  return (
    <AnimatePresence>
      <Toaster position="top-center" richColors />
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
