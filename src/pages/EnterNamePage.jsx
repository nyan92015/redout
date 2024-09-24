import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnterNamePage = ({ matchDetails, setMatchDetails }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMatchDetails({...matchDetails, name});
    navigate('/lobby'); // ロビー画面へ遷移
  };

  return (
    <div>
      <h2>Enter your name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Join Lobby</button>
      </form>
    </div>
  );
};

export default EnterNamePage;
