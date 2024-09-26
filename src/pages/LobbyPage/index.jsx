import React from 'react';
import { createNewMatch, findAvailableMatch, joinMatch } from '../../services/matchService';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import './index.css';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import useModal from '../../hooks/useModal';
import Modal from '../../components/Modal';

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
    setMatchDetails({ ...matchDetails, ...matchData });
    navigate('/game');
  };

  const { modalOpen, close, open } = useModal();

  return (
    <motion.div
      className="enter-name-page"
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      exit={{ filter: 'blur(10px)', opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo-container">
        <Logo />
      </div>
      <div className="button-container">
        <Button onClick={setUpGame}>Start</Button>
        <Button onClick={open}>How to play</Button>
      </div>
      {modalOpen && <Modal modalOpen={modalOpen} handleClose={close}></Modal>}
    </motion.div>
  );
};

export default LobbyPage;
