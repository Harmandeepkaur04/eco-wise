"use client"
// pages/rewards/index.js
import Link from 'next/link';
import Leaderboard from './leaderboard';
import './styles.css';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const scores = [
  { name: 'Alice', points: 10 },
  { name: 'Bob', points: 7 },
  { name: 'Charlie', points: 5 },
];

const Quiz1 = () => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const questions = [
    { question: 'What material is commonly recycled into new paper products?', options: ['Plastic', 'Glass', 'Paper', 'Metal'], answer: 'Paper', fact: 'Paper can be recycled up to 7 times before the fibers become too short.' },
    { question: 'Which of these items can be recycled?', options: ['Plastic bottles', 'Styrofoam', 'Ceramics', 'Food waste'], answer: 'Plastic bottles', fact: 'Plastic bottles are one of the most commonly recycled items.' },
    { question: 'What is the recycling symbol for aluminum?', options: ['♻️', '⚛️', '🔄', '♿'], answer: '♻️', fact: 'The recycling symbol ♻️ is universally recognized.' },
    { question: 'Which type of plastic is often recycled into clothing and textiles?', options: ['PET', 'PVC', 'LDPE', 'HDPE'], answer: 'PET', fact: 'PET is commonly used to make polyester for clothing.' },
    { question: 'What is the process of breaking down organic waste into nutrient-rich soil called?', options: ['Recycling', 'Composting', 'Incineration', 'Landfilling'], answer: 'Composting', fact: 'Composting helps reduce landfill waste and enriches soil.' },
    { question: 'Which of these metals is most commonly recycled?', options: ['Gold', 'Silver', 'Aluminum', 'Titanium'], answer: 'Aluminum', fact: 'Recycling aluminum saves 95% of the energy required to produce it from raw materials.' },
    { question: 'What is the main benefit of recycling glass?', options: ['Reduces water pollution', 'Saves energy', 'Increases landfill space', 'Produces more waste'], answer: 'Saves energy', fact: 'Recycling glass reduces the need for raw materials and saves energy.' },
    { question: 'Which of these items should not be placed in a recycling bin?', options: ['Cardboard', 'Plastic bags', 'Glass jars', 'Metal cans'], answer: 'Plastic bags', fact: 'Plastic bags can get tangled in recycling machinery and should be taken to specific recycling points.' },
    { question: 'What is the term for materials that can be recycled multiple times without degrading?', options: ['Biodegradable', 'Non-renewable', 'Sustainable', 'Closed-loop'], answer: 'Closed-loop', fact: 'Closed-loop recycling allows materials to be reused indefinitely.' },
    { question: 'Which of these is a common use for recycled rubber?', options: ['Fuel', 'Roads', 'Packaging', 'Furniture'], answer: 'Roads', fact: 'Recycled rubber is often used in asphalt for roads.' },
  ];

  const handleAnswer = (option) => {
    const isCorrect = option === questions[questionIndex].answer;
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect!');
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setQuestionIndex(questionIndex + 1);
  };

  return (
    <div className="quiz">
      {questionIndex < questions.length ? (
        <div>
          <h2>{questions[questionIndex].question}</h2>
          {questions[questionIndex].options.map((option) => (
            <button key={option} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
          {showFeedback && (
            <div>
              <p>{feedback}</p>
              <p>{questions[questionIndex].fact}</p>
              <button onClick={handleNextQuestion}>Next Question</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Your score: {score}</h2>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const router = useRouter();

  const handleQuizRedirect = () => {
    // Navigate to the Quiz 1 page
    router.push("/rewards/quiz1");
  };

  return (
    <div className="container">
      <header>
        <h1>Recycling Rewards</h1>
      </header>
      <Leaderboard scores={scores} />
      <Quiz1 />
      <footer>
        <p>© 2024 Recycling Rewards. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
