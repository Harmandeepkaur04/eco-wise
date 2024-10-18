import { Title, List } from '@mantine/core';


const Leaderboard = ({ scores }) => {
  return (
    <div>
      <Title order={2}>Leaderboard</Title>
      <List>
        {scores.map((score, index) => (
          <List.Item key={index}>
            {score.name}: {score.points}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default Leaderboard;
