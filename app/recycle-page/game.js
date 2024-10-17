"use client"
import { useState } from 'react';
import Confetti from 'react-confetti';
import './Game.css';

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
  const [confetti, setConfetti] = useState(false);

  const handleAnswer = (answer) => {
    if (answer === items[currentItem].correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct!');
      setConfetti(true);

      setTimeout(() => {
        setConfetti(false);
      }, 2000);
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
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div className="game-inner">
        <h1>Recycling Game</h1>
        {isGameEnd ? (
          <div>
            <p>Your final score is: {score}</p>
            <button onClick={restartGame}>Play Again</button>
          </div>
        ) : (
          <div className="game-content">
            <p>Score: {score}</p>
            <p>Is this item recyclable or trash?</p>
            
            {/* Display item image */}
            <div className="item-image-container">
              <img src={items[currentItem].image} alt={items[currentItem].name} className="item-image" />
            </div>

            <h2>{items[currentItem].name}</h2>
            <button className="btn recycle-btn" onClick={() => handleAnswer('recycle')}>
              Recycle
            </button>
            <button className="btn trash-btn" onClick={() => handleAnswer('trash')}>
              Trash
            </button>
            <p className={feedback === 'Correct!' ? 'correct' : 'incorrect'}>{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
