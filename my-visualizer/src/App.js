// src/App.js
import React, { useState } from 'react';
import Visualizer from './components/Visualizer';
import ControlPanel from './components/ControlPanel';

function App() {
  const [currentVisualization, setCurrentVisualization] = useState('sorting');
  const [isRunning, setIsRunning] = useState(false);

  const handleAlgorithmSelect = (algorithm) => {
    setCurrentVisualization(algorithm);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
  };

  return (
    <div className="app">
      <ControlPanel
        onAlgorithmSelect={handleAlgorithmSelect}
        onStart={handleStart}
        onReset={handleReset}
      />
      <Visualizer currentVisualization={currentVisualization} isRunning={isRunning} />
    </div>
  );
}

export default App;

