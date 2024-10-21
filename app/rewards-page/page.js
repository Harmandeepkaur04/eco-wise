"use client"
import Leaderboard from './leaderboard';
import './styles.css';
import React, { useState, useEffect } from 'react';
import { Title, Button, Container, Group } from '@mantine/core';
import questions from './quiz1';
import WasteManagementQuestions from './quiz2';
import Tips from './tips';
import Challenges from './challenges';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useAudio } from '../Audio'; 
import ThemeToggle, { useTheme } from "../darkmode/page";

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
    <main>
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
          <Button className='retake-button' onClick={handleRetakeQuiz}>Retake Quiz</Button>
        </div>
      )}
    </div>
    </main>
  );
};

const Home = () => {
  const { speak, isAudioOn, setIsAudioOn } = useAudio();
  const [showQuiz1, setShowQuiz1] = useState(false);
  const [showQuiz2, setShowQuiz2] = useState(false);

  useEffect(() => {
    speak('Welcome to the Rewards page. Here you can test your knowledge about recycling , waste management and can earn points');
  }, [speak, isAudioOn]);

  const handleAudioToggle = () => {
    setIsAudioOn((prev) => !prev);
  };

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
    <main>
    <ThemeToggle/>
    <Container>
      {/* Audio Control Icon */}
      <div className='audio-icon'  style={{ textAlign: 'center', margin: '20px 0' }}>
        <div onClick={handleAudioToggle} style={{ cursor: 'pointer' }}>
          {isAudioOn ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
        </div>
      </div>

      <header>
        <Title className='Rewards' order={2}>Rewards</Title>
      </header>

       

      <Leaderboard scores={scores} />
      <Challenges />
      <Title order={3}>Test Your Knowledge!</Title>
      <Group className="quiz-tiles" spacing="md">
        <div className={`quiz-tile ${showQuiz1 ? 'active' : ''}`} onClick={handleShowQuiz1}>
          <Title className='quiz1' order={4}>Quiz 1: Recycling</Title>
          {showQuiz1 && <Quiz questions={questions} onRetake={handleRetakeQuiz} />}
        </div>
        <div className={`quiz-tile ${showQuiz2 ? 'active' : ''}`} onClick={handleShowQuiz2}>
          <Title className='quiz2' order={4}>Quiz 2: Waste Management</Title>
          {showQuiz2 && <Quiz questions={WasteManagementQuestions} onRetake={handleRetakeQuiz} />}
        </div>
      </Group>
      <Tips />
    </Container>
    </main>
  );
};

export default Home;
