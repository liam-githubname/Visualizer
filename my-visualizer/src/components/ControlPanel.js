// src/components/ControlPanel.js
import React from 'react';

function ControlPanel({ onAlgorithmSelect, onStart, onReset }) {
  return (
    <div className="control-panel">
      <button onClick={() => onAlgorithmSelect('bubbleSort')}>Bubble Sort</button>
      <button onClick={() => onAlgorithmSelect('quickSort')}>Quick Sort</button>
      <button onClick={onStart}>Start</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default ControlPanel;

