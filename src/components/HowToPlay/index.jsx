import React from 'react';

const HowToPlay = () => {
  return (
    <div
      className="glare"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        pointerEvents: 'none',
      }}
    />
  );
};

export default Glare;
