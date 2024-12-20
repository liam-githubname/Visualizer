import React from "react";
import Visualizer from "../components/Visualizer";

const BubbleSortVisualizer = () => {
  const generateBubbleSortData = (array) => {
    const steps = [];
    const arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        steps.push([...arr]); // Save the state before swapping
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
          steps.push([...arr]); // Save the state after swapping
        }
      }
    }
    return steps;
  };

  const drawBubbleSort = (p5, array) => {
    const barWidth = p5.width / array.length;
    for (let i = 0; i < array.length; i++) {
      p5.fill("blue");
      p5.rect(
        i * barWidth,
        p5.height - array[i] * 3,
        barWidth - 2,
        array[i] * 3
      );
    }
  };

  const bubbleSortSteps = ["Step 1: Compare elements", "Step 2: Swap if necessary", "..."];
  const bubbleSortCode = [
    "for (let i = 0; i < arr.length - 1; i++) {",
    "  for (let j = 0; j < arr.length - i - 1; j++) {",
    "    if (arr[j] > arr[j + 1]) {",
    "      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];",
    "    }",
    "  }",
    "}",
  ];

  return (
    <Visualizer
      title="Bubble Sort Visualization"
      initialData={[50, 40, 30, 20, 10]}
      generateVisualizationData={generateBubbleSortData}
      steps={bubbleSortSteps}
      drawVisualization={drawBubbleSort}
      codeLines={bubbleSortCode}
    />
  );
};

export default BubbleSortVisualizer;

