// pages/rewards/Leaderboard.js
const Leaderboard = ({ scores }) => {
    return (
      <div>
        <h2>Leaderboard</h2>
        <ul>
          {scores.map((score, index) => (
            <li key={index}>{score.name}: {score.points}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Leaderboard;
  