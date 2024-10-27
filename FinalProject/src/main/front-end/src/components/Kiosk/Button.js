import React from 'react';

const Button = ({ onClick, children, ...props }) => {
  const playClickSound = () => {
    const audio = new Audio('/sounds/click.mp3');
    audio.play().catch(error => {
      console.error("Failed to play click sound:", error);
    });
  };

  const handleClick = (event) => {
    playClickSound();
    onClick(event); 
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
