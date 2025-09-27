import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 30, startDelay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Start after the initial delay
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!isTyping || isFinished) return;

    if (displayedText.length === text.length) {
      setIsFinished(true);
      return;
    }

    const typingTimer = setTimeout(() => {
      setDisplayedText(text.substring(0, displayedText.length + 1));
    }, speed);

    return () => clearTimeout(typingTimer);
  }, [displayedText, isTyping, isFinished, text, speed]);

  return (
    <span className={isFinished ? '' : 'typewriter-cursor'}>
      {displayedText}
    </span>
  );
};

export default TypewriterText;
