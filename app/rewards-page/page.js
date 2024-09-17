"use client"
// pages/rewards/index.js
import Link from 'next/link';
import Leaderboard from './leaderboard';
import './styles.css';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import questions from './quiz1';
import WasteManagementQuestions from './quiz2';

const scores = [
  { name: 'Alice', points: 10 },
  { name: 'Bob', points: 7 },
  { name: 'Charlie', points: 5 },
];

const Quiz1 = ({ onRetake }) => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

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

  const handleRetakeQuiz = () => {
    setScore(0);
    setQuestionIndex(0);
    setShowFeedback(false);
    setFeedback('');
    onRetake();
  };

  return (
    <div className="quiz">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(questionIndex / questions.length) * 100}%` }}></div>
      </div>
      {questionIndex < questions.length ? (
        <div className="question-card">
          <h1>{questions[questionIndex].question}</h1>
          {questions[questionIndex].options.map((option) => (
            <button key={option} className="option-button" onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
          {showFeedback && (
            <div className="feedback">
              <p>{feedback}</p>
              <p>{questions[questionIndex].fact}</p>
              <button className="next-button" onClick={handleNextQuestion}>Next Question</button>
            </div>
          )}
        </div>
      ) : (
        <div className="score-card">
          <h2>Your score: {score}</h2>
          <button className="retake-button" onClick={handleRetakeQuiz}>Retake Quiz</button>
        </div>
      )}
    </div>
  );
};

const Quiz2 = ({ onRetake }) => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleAnswer = (option) => {
    const isCorrect = option === WasteManagementQuestions[questionIndex].answer;
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

  const handleRetakeQuiz = () => {
    setScore(0);
    setQuestionIndex(0);
    setShowFeedback(false);
    setFeedback('');
    onRetake();
  };

  return (
    <div className="quiz">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(questionIndex / WasteManagementQuestions.length) * 100}%` }}></div>
      </div>
      {questionIndex < WasteManagementQuestions.length ? (
        <div className="question-card">
          <h1>{WasteManagementQuestions[questionIndex].question}</h1>
          {WasteManagementQuestions[questionIndex].options.map((option) => (
            <button key={option} className="option-button" onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
          {showFeedback && (
            <div className="feedback">
              <p>{feedback}</p>
              <p>{WasteManagementQuestions[questionIndex].fact}</p>
              <button className="next-button" onClick={handleNextQuestion}>Next Question</button>
            </div>
          )}
        </div>
      ) : (
        <div className="score-card">
          <h2>Your score: {score}</h2>
          <button className="retake-button" onClick={handleRetakeQuiz}>Retake Quiz</button>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const [showQuiz1, setShowQuiz1] = useState(false);
  const [showQuiz2, setShowQuiz2] = useState(false);

  const handleShowQuiz1 = () => {
    setShowQuiz1(true);
    setShowQuiz2(false);
  };

  const handleShowQuiz2 = () => {
    setShowQuiz1(false);
    setShowQuiz2(true);
  };

  const handleRetakeQuiz = () => {
    setShowQuiz1(false);
    setShowQuiz2(false);
  };

  return (
    <div className="container">
      <header>
        <h1>Recycling Rewards</h1>
      </header>
      <Leaderboard scores={scores} />
      <h2>Test Your Knowledge!</h2>
      <div className="quiz-tiles">
        <div className={`quiz-tile ${showQuiz1 ? 'active' : ''}`} onClick={handleShowQuiz1}>
          <h3>Quiz 1: Recycling</h3>
          {showQuiz1 && <Quiz1 onRetake={handleRetakeQuiz} />}
        </div>
        <div className={`quiz-tile ${showQuiz2 ? 'active' : ''}`} onClick={handleShowQuiz2}>
          <h3>Quiz 2: Waste Management</h3>
          {showQuiz2 && <Quiz2 onRetake={handleRetakeQuiz} />}
        </div>
      </div>
      <footer>
        <p>© 2024 Recycling Rewards. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
