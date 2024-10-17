"use client"
import { useState } from 'react';
import { Button, Container, Text, Title, Group } from '@mantine/core';
import './game.css';  // Import external CSS file

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
    <Container className="game-container">
      <Container className="game-inner">
        <Title order={1} align="center" mb={20}>
          Recycling Game
        </Title>

        {isGameEnd ? (
          <div>
            <Text align="center" size="xl">
              Your final score is: {score}
            </Text>
            <Button onClick={restartGame} mt={20} color="teal">
              Play Again
            </Button>
          </div>
        ) : (
          <div>
            <Text align="center" size="lg">
              Score: {score}
            </Text>
            <Text align="center" size="xl" mt={10}>
              Is this item recyclable or trash?
            </Text>
            <Title order={2} align="center" mt={20}>
              {items[currentItem].name}
            </Title>
            <Group position="center" mt={20}>
              <Button onClick={() => handleAnswer('recycle')} color="teal" size="lg">
                Recycle
              </Button>
              <Button onClick={() => handleAnswer('trash')} color="red" size="lg">
                Trash
              </Button>
            </Group>
            <Text
              align="center"
              size="lg"
              mt={10}
              className={feedback === 'Correct!' ? 'correct' : 'incorrect'}
            >
              {feedback}
            </Text>
          </div>
        )}
      </Container>
    </Container>
  );
};

export default Game;
