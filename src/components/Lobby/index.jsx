import React, { useState } from 'react';

const Lobby = ({ initializeGame }) => {
  return (
    <div>
      <h1>redout</h1>
      <button onClick={initializeGame} /> // ボタンを押したらゲームを初期化
    </div>
  );
};

export default Lobby;
