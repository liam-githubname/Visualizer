// src/components/Visualizer.js
import React from 'react';
import SortingVisualizer from '../visualizations/SortingVisualizer';
import TreeVisualizer from '../visualizations/TreeVisualizer';

function Visualizer({ currentVisualization }) {
  return (
    <div className="visualizer-container">
      {currentVisualization === 'sorting' && <SortingVisualizer />}
      {currentVisualization === 'tree' && <TreeVisualizer />}
    </div>
  );
}

export default Visualizer;

