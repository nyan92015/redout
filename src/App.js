import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import EnterNamePage from './pages/EnterNamePage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import { AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import lobbyBGM from './sounds/bgm/lobby.mp3';

export const Match = createContext();

const App = () => {
  const location = useLocation();
  const [matchDetails, setMatchDetails] = useState({ playerName: 'guest' });
  const [play, { stop }] = useSound(lobbyBGM, { volume: 0.7, loop: true });

  useEffect(() => {
    return () => {
      stop();
    };
  }, [location, stop]);

  return (
    <AnimatePresence>
      <Match.Provider value={{ matchDetails, setMatchDetails }}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<EnterNamePage />} />
          <Route path="/lobby" element={<LobbyPage play={play} />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Match.Provider>
    </AnimatePresence>
  );
};

export default App;
