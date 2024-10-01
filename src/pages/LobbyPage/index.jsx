import React, { useContext, useEffect } from 'react';
import {
  createNewMatch,
  findAvailableMatch,
  joinMatch,
} from '../../services/matchService';
import { useNavigate } from 'react-router-dom';

import './index.css';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import useModal from '../../hooks/useModal';
import Modal from '../../components/Modal';
import Glare from '../../utils/Glare';
import { Match } from '../../App';
import FadeIn from '../../utils/FadeIn';
import useSound from 'use-sound';

const LobbyPage = ({ play }) => {
  const navigate = useNavigate();
  const { matchDetails, setMatchDetails } = useContext(Match);
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

  useEffect(() => {
    if (matchDetails.isPlayingSound)
      setTimeout(() => {
        play();
      }, 800); // 2000ミリ秒（2秒）;
  }, [matchDetails.isPlayingSound]);
  return (
    <FadeIn className="lobby-page">
      <div className="logo-container">
        <Logo />
      </div>
      <div className="button-container">
        <Button onClick={setUpGame}>Start</Button>
        <Button onClick={open}>How to play</Button>
      </div>
      {modalOpen && (
        <Modal handleClose={close}>
          <h1>How to play</h1>
        </Modal>
      )}
      <Glare size={'10'} />
    </FadeIn>
  );
};

export default LobbyPage;
