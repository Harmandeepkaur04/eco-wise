import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Title } from '@mantine/core';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rewards', 'leaderboard', 'scores'), (snapshot) => {
      const scoresData = snapshot.docs.map(doc => doc.data());
      // Sort scores in descending order
      scoresData.sort((a, b) => b.points - a.points);
      // Assign ranks based on sorted scores
      scoresData.forEach((score, index) => {
        score.rank = index + 1;
      });
      setScores(scoresData);
    });

    return () => unsubscribe();
  }, []);

  const getRewardLevel = (points) => {
    if (points >= 80) return 'Planet Protector';
    if (points >= 50) return 'Eco Advocate';
    return 'Recycler';
  };

  return (
    <div className="leaderboard">
      <Title order={3}>Leaderboard</Title>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            Rank: {score.rank} - {score.name}: {score.points} points ({getRewardLevel(score.points)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
