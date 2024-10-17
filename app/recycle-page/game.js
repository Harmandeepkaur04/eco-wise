"use client"
import { useState } from 'react';
import './game.css'; // Ensure your CSS file is imported

const items = [
  { name: 'Plastic Bottle', correctAnswer: 'recycle', image: '/plastic-bottle.png' },
  { name: 'Banana Peel', correctAnswer: 'trash', image: '/banana-peel.png' },
  { name: 'Newspaper', correctAnswer: 'recycle', image: '/newspaper.png' },
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
    <div className="game-container">
      <div className="game-inner">
        <h1>Recycling Game</h1>
        {isGameEnd ? (
          <div>
            <p>Your final score is: {score}</p>
            <button onClick={restartGame} className="btn">Play Again</button>
          </div>
        ) : (
          <div className="game-content">
            <p>Score: {score}</p>
            <p>Is this item recyclable or trash?</p>
            <div className="button-image-container">
              <button onClick={() => handleAnswer('recycle')} className="btn recycle-btn">Recycle</button>
              <div className="item-image-container">
                <h2>{items[currentItem].name}</h2>
                <img
                  src={`path_to_your_images/${items[currentItem].name}.jpg`} // Adjust path as needed
                  alt={items[currentItem].name}
                  className="item-image"
                />
              </div>
              <button onClick={() => handleAnswer('trash')} className="btn trash-btn">Trash</button>
            </div>
            <p>{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
