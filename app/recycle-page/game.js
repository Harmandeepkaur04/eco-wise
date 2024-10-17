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

  const handleAnswer = (answer) => {
    if (answer === items[currentItem].correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect!');
    }

    setTimeout(() => {
      setFeedback('');
      setCurrentItem((prev) => (prev + 1) % items.length);
    }, 1000);
  };

  return (
    <div>
      <h1>Recycling Game</h1>
      <p>Score: {score}</p>
      <p>Is this item recyclable or trash?</p>
      <h2>{items[currentItem].name}</h2>
      <button onClick={() => handleAnswer('recycle')}>Recycle</button>
      <button onClick={() => handleAnswer('trash')}>Trash</button>
      <p>{feedback}</p>
    </div>
  );
};

export default Game;
