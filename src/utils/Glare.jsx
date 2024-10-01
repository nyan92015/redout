import React from 'react';

const Glare = ({ size }) => {
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
        backdropFilter: `blur(${size}px)`,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Glare;
