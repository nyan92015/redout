import React from 'react';
import { createNewMatch, findAvailableMatch, joinMatch } from '../services/matchService';
import { useNavigate } from 'react-router-dom';

const LobbyPage = ({ matchDetails, setMatchDetails }) => {
  const navigate = useNavigate();
  const setUpGame = async () => {
    let matchData = await findAvailableMatch();

    if (!matchData) {
      matchData = await createNewMatch();
    }

    const playerCredentials = await joinMatch(
      matchData.matchID,
      matchData.playerID,
      matchDetails.playerName,
    );
    matchData.playerCredentials = playerCredentials;
    setMatchDetails({...matchDetails, matchData});
    navigate('/game');
  };

  return (
    <div>
      <h1>redout</h1>
      <button onClick={setUpGame}>Start Matching</button>
    </div>
  );
};

export default LobbyPage;
