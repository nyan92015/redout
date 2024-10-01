import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import InputField from '../../components/InputField';
import { useTypewriter } from 'react-simple-typewriter';
import { Match } from '../../App';
import FadeIn from '../../utils/FadeIn';

const EnterNamePage = () => {
  const { matchDetails, setMatchDetails } = useContext(Match);
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const [displayText] = useTypewriter({
    words: ['Please enter your name and press the Enter key to connect Lobby.'],
    loop: 1,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName) {
      setMatchDetails({ ...matchDetails, playerName, isPlayingSound: true });
      navigate('/lobby');
    }
  };

  return (
    <FadeIn className="enter-name-page" duration={3} delay={0.5}>
      <h1 className="enter-name-page-title">Redout.io</h1>
      <p className="description">{displayText}</p>
      <form onSubmit={handleSubmit}>
        <InputField
          value={playerName}
          setValue={setPlayerName}
          placeholder={'your name'}
        />
      </form>
    </FadeIn>
  );
};

export default EnterNamePage;
