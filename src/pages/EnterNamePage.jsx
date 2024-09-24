import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnterNamePage = ({ matchDetails, setMatchDetails }) => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMatchDetails({...matchDetails, playerName});
    navigate('/lobby'); // ロビー画面へ遷移
  };

  return (
    <div>
      <h2>Enter your name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Join Lobby</button>
      </form>
    </div>
  );
};

export default EnterNamePage;
