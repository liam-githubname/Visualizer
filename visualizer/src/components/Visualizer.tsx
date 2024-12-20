import React, { useState } from "react";
import Sketch from "react-p5";

interface VisualizerProps {
  title: string;
  initialData: number[];
  generateVisualizationData: (data: number[]) => any[];
  steps: string[];
  drawVisualization: (p5: p5, data: any) => void;
  codeLines: string[];
}


const Visualizer: React.FC<VisualizerProps> = ({
  title,
  initialData,
  generateVisualizationData,
  steps,
  drawVisualization,
  codeLines,
}) => {
  const [inputData, setInputData] = useState(initialData || []);
  const [currentStep, setCurrentStep] = useState(0);
  const [visualizationData, setVisualizationData] = useState([]);
  const [running, setRunning] = useState(false);

  // Handle user input
  const handleInputChange = (e) => {
    const value = e.target.value;
    try {
      const parsedData = JSON.parse(value);
      setInputData(parsedData);
    } catch {
      console.error("Invalid input data. Ensure it is a valid JSON array.");
    }
  };

  // Generate visualization data based on user input
  const handleGenerate = () => {
    const data = generateVisualizationData(inputData);
    setVisualizationData(data);
    setCurrentStep(0);
    setRunning(false);
  };

  // Start the visualization
  const handleStart = () => {
    if (visualizationData.length > 0) {
      setRunning(true);
    }
  };

  // Move to the next step
  const handleNextStep = () => {
    if (currentStep < visualizationData.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setRunning(false); // Stop when done
    }
  };

  // Render p5.js visualization
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(220);
    if (visualizationData.length > 0) {
      drawVisualization(p5, visualizationData[currentStep]);
    }
    if (running) {
      handleNextStep();
    }
  };

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      {/* Title Section */}
      <h2>{title}</h2>

      {/* User Input Section */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Input Data (JSON):
          <input
            type="text"
            value={JSON.stringify(inputData)}
            onChange={handleInputChange}
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
        <button onClick={handleGenerate}>Generate Visualization</button>
        <button onClick={handleStart}>Start Visualization</button>
      </div>

      {/* Visualization Area */}
      <div style={{ border: "1px solid #000", marginBottom: "10px" }}>
        <Sketch setup={setup} draw={draw} />
      </div>

      {/* Steps Explanation */}
      <div style={{ marginBottom: "10px" }}>
        <h3>Steps:</h3>
        <p>{steps[currentStep]}</p>
      </div>

      {/* Code Step-Through */}
      <div>
        <h3>Code:</h3>
        <pre>
          <code>
            {codeLines.map((line, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: index === currentStep ? "#d3d3d3" : "transparent",
                }}
              >
                {line}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default Visualizer;

