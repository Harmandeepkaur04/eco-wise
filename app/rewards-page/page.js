"use client"
import Link from 'next/link';
import Leaderboard from './Leaderboard';
import './styles.css';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Title, Button, Container, Group } from '@mantine/core';
import questions from './quiz1';
import WasteManagementQuestions from './quiz2';
import Tips from './tips';
import Challenges from './challenges';

const scores = [
  { name: 'Alice', points: 10 },
  { name: 'Bob', points: 7 },
  { name: 'Charlie', points: 5 },
];

const Quiz = ({ questions, onRetake }) => {
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
          <Title order={3}>{questions[questionIndex].question}</Title>
          {questions[questionIndex].options.map((option) => (
            <Button key={option} onClick={() => handleAnswer(option)}>{option}</Button>
          ))}
          {showFeedback && (
            <div className="feedback">
              <p>{feedback}</p>
              <p>{questions[questionIndex].fact}</p>
              <Button onClick={handleNextQuestion}>Next Question</Button>
            </div>
          )}
        </div>
      ) : (
        <div className="score-card">
          <Title order={4}>Your score: {score}</Title>
          <Button onClick={handleRetakeQuiz}>Retake Quiz</Button>
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
    <Container>
      <header>
        <Title order={2}>Rewards</Title>
      </header>
      <Leaderboard scores={scores} />
      <Challenges />
      <Title order={3}>Test Your Knowledge!</Title>
      <Group spacing="md">
        <div className={`quiz-tile ${showQuiz1 ? 'active' : ''}`} onClick={handleShowQuiz1}>
          <Title order={4}>Quiz 1: Recycling</Title>
          {showQuiz1 && <Quiz questions={questions} onRetake={handleRetakeQuiz} />}
        </div>
        <div className={`quiz-tile ${showQuiz2 ? 'active' : ''}`} onClick={handleShowQuiz2}>
          <Title order={4}>Quiz 2: Waste Management</Title>
          {showQuiz2 && <Quiz questions={WasteManagementQuestions} onRetake={handleRetakeQuiz} />}
        </div>
      </Group>
      <Tips />
      <footer>
        <p>© 2024 Recycling Rewards. All rights reserved.</p>
      </footer>
    </Container>
  );
};

export default Home;
