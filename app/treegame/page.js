import { useState, useEffect } from 'react';

export default function PlantGame() {
  const [stage, setStage] = useState(0);
  const [weather, setWeather] = useState('sunny');
  const [energy, setEnergy] = useState(0);
  const [gameMode, setGameMode] = useState(false);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const weatherConditions = ['sunny', 'rainy', 'cloudy', 'stormy'];
    const interval = setInterval(() => {
      setWeather(weatherConditions[Math.floor(Math.random() * weatherConditions.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Randomly generate energy tokens on the screen
  useEffect(() => {
    const interval = setInterval(() => {
      if (tokens.length < 5) { // Limit the number of tokens on screen
        setTokens(prevTokens => [
          ...prevTokens,
          {
            id: Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
          },
        ]);
      }
    }, 2000); // Generate new token every 2 seconds

    return () => clearInterval(interval);
  }, [tokens]);

  // Collect energy by clicking tokens
  const collectEnergy = (id) => {
    const energyToAdd = weather === 'sunny' ? 10 : weather === 'rainy' ? 5 : weather === 'cloudy' ? 7 : 3;
    setEnergy(prev => prev + energyToAdd);
    setTokens(tokens.filter(token => token.id !== id)); // Remove token after collection
  };

  const growPlant = () => {
    const energyNeeded = [50, 60, 70, 80, 90, 100];
    if (energy >= energyNeeded[stage]) {
      setStage((prevStage) => (prevStage < 6 ? prevStage + 1 : prevStage));
      setEnergy((prev) => prev - energyNeeded[stage]);
    }
  };

  const stages = [
    { text: '🌱 Seed', color: '#8B4513' },
    { text: '🌿 Sprout', color: '#228B22' },
    { text: '🌳 Growing Tree', color: '#32CD32' },
    { text: '🌼 Budding Tree', color: '#FFD700' },
    { text: '🌸 Blossoming Tree', color: '#FF69B4' },
    { text: '🍎 Fruit-bearing Tree', color: '#FF4500' },
    { text: '🌲 Fully Grown Tree', color: '#006400' },
  ];

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to bottom, #74ebd5, #acb6e5)',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh', // Adjusted height to make the container smaller
      margin: '0 auto', // Center the container horizontally
    position: 'relative', // Needed for absolute positioning of tokens
    maxWidth: '1300px',
      position: 'relative', // Needed for absolute positioning of tokens
    },
    content: {
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '15px',
      padding: '20px', // Adjusted padding to make the content smaller
      maxWidth: '400px', // Adjusted maxWidth to make the content smaller
      width: '90%',
      textAlign: 'center',
    },
    title: {
      fontSize: '2em', // Adjusted font size to make the title smaller
      color: '#2e8b57',
      marginBottom: '10px', // Adjusted margin to make the title smaller
      fontWeight: 'bold',
    },
    stageDisplay: {
      fontSize: '1.2em', // Adjusted font size to make the stage display smaller
      fontWeight: 'bold',
      margin: '10px 0', // Adjusted margin to make the stage display smaller
      color: stages[stage].color,
    },
    progressBarContainer: {
      width: '100%',
      background: '#e0e0e0',
      borderRadius: '10px',
      overflow: 'hidden',
      margin: '15px 0', // Adjusted margin to make the progress bar container smaller
    },
    progressBar: {
      height: '20px', // Adjusted height to make the progress bar smaller
      background: '#32cd32',
      width: `${(energy / 100) * 100}%`,
      transition: 'width 0.5s ease',
    },
    weatherDisplay: {
      fontSize: '1.1em', // Adjusted font size to make the weather display smaller
      fontWeight: 'bold',
      margin: '15px 0', // Adjusted margin to make the weather display smaller
      color: '#555',
    },
    button: {
      background: '#87ceeb',
      color: '#fff',
      margin: '8px 4px', // Adjusted margin to make the button smaller
      padding: '10px 18px', // Adjusted padding to make the button smaller
      border: 'none',
      borderRadius: '10px',
      fontSize: '0.9em', // Adjusted font size to make the button text smaller
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    growButton: {
      background: '#ff8c00',
      marginTop: '12px', // Adjusted margin to make the grow button smaller
    },
    token: {
      position: 'absolute',
      width: '25px', // Adjusted width to make the tokens smaller
      height: '25px', // Adjusted height to make the tokens smaller
      cursor: 'pointer',
      borderRadius: '50%',
      backgroundColor: 'yellow',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.2em', // Adjusted font size to make the token text smaller
      color: '#fff',
    },
    sunToken: {
      backgroundColor: '#ffdd00',
    },
    rainToken: {
      backgroundColor: '#00bfff',
    },
    airToken: {
      backgroundColor: '#87ceeb',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Grow Your Plant</h1>
        <div style={styles.stageDisplay}>{stages[stage].text}</div>
        <div style={styles.progressBarContainer}>
          <div style={styles.progressBar}></div>
        </div>
        <div style={styles.weatherDisplay}>Collect Water, Rain, and Air</div>
        <p>Energy: {energy}/100</p>
        <button style={styles.button} onClick={growPlant}>
          Grow Plant
        </button>
      </div>
      {tokens.map((token) => (
        <div
          key={token.id}
          style={{
            ...styles.token,
            left: `${token.x}%`,
            top: `${token.y}%`,
            backgroundColor: weather === 'sunny' ? styles.sunToken.backgroundColor : weather === 'rainy' ? styles.rainToken.backgroundColor : styles.airToken.backgroundColor,
          }}
          onClick={() => collectEnergy(token.id)}
        >
          {weather === 'sunny' ? '☀️' : weather === 'rainy' ? '💧' : '🌥️'}
        </div>
      ))}
    </div>
  );
}