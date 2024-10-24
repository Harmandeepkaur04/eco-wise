import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Title } from '@mantine/core';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const querySnapshot = await getDocs(collection(db, 'rewards', 'leaderboard'));
      const scoresData = querySnapshot.docs.map(doc => doc.data());
      setScores(scoresData);
    };

    fetchScores();
  }, []);

  return (
    <div className="leaderboard">
      <Title order={3}>Leaderboard</Title>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.name}: {score.points} points (Rank: {score.rank})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
