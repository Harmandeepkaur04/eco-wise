"use client"
// pages/rewards/index.js
import Link from 'next/link';
import Leaderboard from './leaderboard';
import './styles.css';

const scores = [
  { name: 'Alice', points: 10 },
  { name: 'Bob', points: 7 },
  { name: 'Charlie', points: 5 },
];


const Home = () => {
  return (
    <div>
      <h1>Recycling Rewards</h1>
      <div>
        <Link href="./quiz1">Take Quiz 1</Link>
      </div>
      <div>
        <Link href="quiz2">Take Quiz 2</Link>
      </div>
      <Leaderboard scores={scores} />
    </div>
  );
};

export default Home;
