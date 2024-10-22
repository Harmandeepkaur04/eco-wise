import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Title } from '@mantine/core';

const Leaderboard = ({ currentUser }) => {
  const [scores, setScores] = useState([]);
  const [previousScores, setPreviousScores] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rewards', 'leaderboard', 'scores'), (snapshot) => {
      const scoresData = snapshot.docs.map(doc => doc.data());
      // Sort scores in descending order
      scoresData.sort((a, b) => b.points - a.points);
      // Assign ranks based on sorted scores
      scoresData.forEach((score, index) => {
        score.rank = index + 1;
      });
      setPreviousScores(scores);
      setScores(scoresData);
    });

    return () => unsubscribe();
  }, []);

  const getRewardLevel = (points) => {
    if (points >= 80) return 'Planet Protector';
    if (points >= 50) return 'Eco Advocate';
    return 'Recycler';
  };

  const getAnimationClass = (currentRank, previousRank) => {
    if (previousRank === undefined) return 'fadeIn';
    return currentRank < previousRank ? 'moveUp' : 'moveDown';
  };

  const getRankClass = (rank) => {
    if (rank === 1) return 'top-rank';
    if (rank === 2) return 'second-rank';
    if (rank === 3) return 'third-rank';
    return '';
  };

  return (
    <div className="leaderboard">
      <Title order={3} className="title">Leaderboard</Title>
      <ul>
        {scores.map((score, index) => {
          const previousRank = previousScores.find(prev => prev.name === score.name)?.rank;
          const isCurrentUser = score.name === currentUser;
          return (
            <li key={score.name + score.points} className={`${getAnimationClass(score.rank, previousRank)} ${getRankClass(score.rank)} ${isCurrentUser ? 'user-entry' : ''}`}>
              <span>
                <img src={`https://robohash.org/${score.name}.png?set=set5`} alt={`${score.name}'s avatar`} />
                Rank: {score.rank} - {score.name}
              </span>
              <span>{score.points} points ({getRewardLevel(score.points)})</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;
