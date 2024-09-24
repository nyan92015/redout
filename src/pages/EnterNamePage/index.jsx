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
    setMatchDetails({ ...matchDetails, playerName });
    navigate('/lobby'); // ロビー画面へ遷移
  };

  return (
    <motion.div
      className="enter-name-page"
      initial={{ opacity: 0 }} //　初期状態
      animate={{ opacity: 1 }} // マウント時
      exit={{ opacity: 0 }} // アンマウント時
      transition={{duration: 0.8}}
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
