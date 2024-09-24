import React from 'react';

const LobbyPage = ({ initializeGame }) => {
  return (
    <div>
      <h1>redout</h1>
      <button onClick={initializeGame}>Start Matching</button>
    </div>
  );
};

export default LobbyPage;
