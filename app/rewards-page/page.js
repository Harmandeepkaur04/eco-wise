"use client";
import Leaderboard from './leaderboard';
import './styles.css';
import React, { useState, useEffect } from 'react';
import { Title, Button, Container, Group, TextInput } from '@mantine/core';
import questions from './quiz1';
import WasteManagementQuestions from './quiz2';
import Tips from './tips';
import Challenges from './challenges';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useAudio } from '../Audio'; 
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Quiz from './quiz';

const Home = () => {
  const { speak, isAudioOn, setIsAudioOn } = useAudio();
  const [showQuiz1, setShowQuiz1] = useState(false);
  const [showQuiz2, setShowQuiz2] = useState(false);
  const [username, setUsername] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    speak('Welcome to the Rewards page. Here you can test your knowledge about recycling, waste management, and earn points.');
  }, [speak]);

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

  const handleChallengeCompletion = async (name, points) => {
    try {
      const leaderboardRef = doc(db, 'rewards', 'leaderboard', 'scores', name);
      await setDoc(leaderboardRef, { name, points }, { merge: true });
      console.log('Leaderboard updated successfully');
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  };

  const updateTotalPoints = (points) => {
    setTotalPoints(points);
    if (username) {
      handleChallengeCompletion(username, points);
    }
  };

  return (
    <main>
      <Container>
        <header>
          <Title className='Rewards' order={2}>Rewards</Title>
        </header>

        {/* Audio Control Icon */}
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <div onClick={handleAudioToggle} style={{ cursor: 'pointer' }}>
            {isAudioOn ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
          </div>
        </div>

        <TextInput
          placeholder="Enter username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />

        <Leaderboard />
        <Challenges totalPoints={totalPoints} updateTotalPoints={updateTotalPoints} />
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
