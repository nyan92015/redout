import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './index.css';
import InputField from '../../components/InputField';
import { useTypewriter } from 'react-simple-typewriter';

const EnterNamePage = ({ matchDetails, setMatchDetails }) => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const [displayText] = useTypewriter({
    words: ['Please enter your name and press the Enter key to connect Lobby.'],
    loop: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName) {
      setMatchDetails({ ...matchDetails, playerName });
      navigate('/lobby');
    }
  };

  return (
    <motion.div
      className="enter-name-page"
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      exit={{ filter: 'blur(10px)', opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Redout.io</h1>
      <p className="description">{displayText}</p>
      <form onSubmit={handleSubmit}>
        <InputField value={playerName} setValue={setPlayerName} placeholder={'your name'} />
      </form>
    </motion.div>
  );
};

export default EnterNamePage;
