import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PlantGame() {
  const [stage, setStage] = useState(0);
  const [weather, setWeather] = useState('sunny');
  const [actions, setActions] = useState({ water: false, fertilizer: false, prune: false, protect: false });
  const [plantType, setPlantType] = useState('Tree');

  useEffect(() => {
    const weatherConditions = ['sunny', 'rainy', 'cloudy', 'stormy'];
    const interval = setInterval(() => {
      setWeather(weatherConditions[Math.floor(Math.random() * weatherConditions.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (action) => {
    setActions((prevActions) => ({ ...prevActions, [action]: true }));
  };

  const growPlant = () => {
    if (Object.values(actions).every(action => action)) {
      setStage((prevStage) => (prevStage < 6 ? prevStage + 1 : prevStage));
      setActions({ water: false, fertilizer: false, prune: false, protect: false });
    }
  };

  const resetPlant = () => {
    setStage(0);
    setActions({ water: false, fertilizer: false, prune: false, protect: false });
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

  return (
    <div className="game-container">
      <div className="game-content">
        <h1 className="game-title">Grow Your Plant</h1>
        <div className="plant-type-container">
          <label className="plant-type-label">Choose Plant Type:
            <select className="plant-type-select" value={plantType} onChange={(e) => setPlantType(e.target.value)}>
              <option value="Tree">Tree</option>
              <option value="Flower">Flower</option>
              <option value="Bush">Bush</option>
            </select>
          </label>
        </div>
        <div className="stage-display" style={{ color: stages[stage].color }}>
          {stages[stage].text}
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${(stage / 6) * 100}%` }}></div>
        </div>
        <div className="weather-display">Current Weather: {weather}</div>
        <div className="actions-container">
          <button className="action-button" onClick={() => handleAction('water')}>Water</button>
          <button className="action-button" onClick={() => handleAction('fertilizer')}>Fertilizer</button>
          <button className="action-button" onClick={() => handleAction('prune')}>Prune</button>
          <button className="action-button" onClick={() => handleAction('protect')}>Protect</button>
        </div>
        <button className="grow-button" onClick={growPlant}>Grow</button>
        <button className="reset-button" onClick={resetPlant}>Reset</button>
      </div>
    </div>
  );
}