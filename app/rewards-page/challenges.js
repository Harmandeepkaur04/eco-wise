import { useState } from 'react';
import { Title, List, Text } from '@mantine/core';

const Challenges = () => {
  const [challenges, setChallenges] = useState([
    { id: 1, name: 'Recycle 10 items', completed: false, points: 10 },
    { id: 2, name: 'Use a reusable bag', completed: false, points: 5 },
    { id: 3, name: 'Plant a tree', completed: false, points: 20 },
    { id: 4, name: 'Reduce water usage by 10%', completed: false, points: 15 },
    { id: 5, name: 'Use public transport for a week', completed: false, points: 25 },
    { id: 6, name: 'Avoid single-use plastics for a month', completed: false, points: 30 },
    { id: 7, name: 'Start a compost bin', completed: false, points: 20 },
    { id: 8, name: 'Participate in a local clean-up event', completed: false, points: 15 },
  ]);
  
  const [totalPoints, setTotalPoints] = useState(0);

  const toggleCompletion = (id) => {
    setChallenges(
      challenges.map((challenge) =>
        challenge.id === id
          ? { ...challenge, completed: !challenge.completed }
          : challenge
      )
    );

    const challenge = challenges.find((challenge) => challenge.id === id);
    if (!challenge.completed) {
      setTotalPoints(totalPoints + challenge.points);
    } else {
      setTotalPoints(totalPoints - challenge.points);
    }
  };

  const allTasksCompleted = challenges.every(challenge => challenge.completed);

  return (
    <div className="challengeContainer">
      <Title order={2}>Monthly Challenges</Title>
      <List className="challengeList">
        {challenges.map((challenge) => (
          <List.Item key={challenge.id} className={`challengeItem ${challenge.completed ? 'completed' : ''}`} onClick={() => toggleCompletion(challenge.id)}>
            <span>{challenge.name} - {challenge.points} points</span>
          </List.Item>
        ))}
      </List>
      <Title order={3}>Total Points: {totalPoints}</Title>
      {allTasksCompleted && <Text className="completedMessage">All tasks completed! Come back tomorrow for more challenges.</Text>}
    </div>
  );
};

export default Challenges;
