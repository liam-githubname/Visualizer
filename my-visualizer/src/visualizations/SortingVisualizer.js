// src/visualizations/SortingVisualizer.js
import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../utils/algorithms';

function SortingVisualizer() {
  const [array, setArray] = useState([5, 3, 8, 6, 2]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Trigger sorting and store the steps
    bubbleSort([...array], setSteps);
  }, []);

  useEffect(() => {
    // Update the displayed array state periodically
    if (currentStep < steps.length) {
      const interval = setInterval(() => {
        setArray(steps[currentStep]);
        setCurrentStep(currentStep + 1);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [currentStep, steps]);

  return (
    <div className="sorting-visualizer">
      {array.map((value, idx) => (
        <div key={idx} style={{ height: `${value * 20}px` }} className="bar">
          {value}
        </div>
      ))}
    </div>
  );
}

export default SortingVisualizer;

