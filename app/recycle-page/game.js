"use client"
import { useState } from 'react';

const items = [
  { name: 'Plastic Bottle', correctAnswer: 'recycle' },
  { name: 'Banana Peel', correctAnswer: 'trash' },
  { name: 'Newspaper', correctAnswer: 'recycle' },
];

const Game = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isGameEnd, setIsGameEnd] = useState(false);

  const handleAnswer = (answer) => {
    if (answer === items[currentItem].correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect!');
    }

    setTimeout(() => {
      setFeedback('');
      if (currentItem + 1 < items.length) {
        setCurrentItem(currentItem + 1);
      } else {
        setIsGameEnd(true);
      }
    }, 1000);
  };

  const restartGame = () => {
    setCurrentItem(0);
    setScore(0);
    setIsGameEnd(false);
  };

  return (
    <div>
      <h1>Recycling Game</h1>
      {isGameEnd ? (
        <div>
          <p>Your final score is: {score}</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      ) : (
        <div>
          <p>Score: {score}</p>
          <p>Is this item recyclable or trash?</p>
          <h2>{items[currentItem].name}</h2>
          <button onClick={() => handleAnswer('recycle')}>Recycle</button>
          <button onClick={() => handleAnswer('trash')}>Trash</button>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
