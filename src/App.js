import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EnterNamePage from './pages/EnterNamePage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';

const App = () => {
  const [matchDetails, setMatchDetails] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterNamePage setMatchDetails={setMatchDetails} />} />
        <Route
          path="/lobby"
          element={<LobbyPage matchDetails={matchDetails} setMatchDetails={setMatchDetails} />}
        />
        <Route path="/game" element={<GamePage matchDetails={matchDetails} />} />
      </Routes>
    </Router>
  );
};

export default App;
