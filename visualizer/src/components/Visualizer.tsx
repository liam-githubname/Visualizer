/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface VisualizerProperties {

  title: string;
  userInputData: string;
  P5Sketch: (divId: string, data: number[]) => void;
  array: number[];

}

const Visualizer: React.FC<VisualizerProperties> = ({

  title,
  P5Sketch,

}) => {

  let data = [100,99,98,97,96];

  const [userInputData, setUserInputData] = useState("");
  const [currentShownData, setCurrentShownData] = useState("");


  const handleCurrentShownDataChange = (userInput: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentShownData(userInput.target.value);
  }

  const handleUserInputDataChange = () => {
    setUserInputData(currentShownData);
  }


  const generateRandomData = () => {

    const array: number[] = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

    // setCurrentShownData(array.toString);
    data = array;
    console.log(data);

    parseUserInputData();
  }

  //TODO: turn string into number array then set the data variable
  const parseUserInputData = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tmp = userInputData;
  }

  function Animation() {
    return (
      <>
        {P5Sketch("displayWindow", data)}
      </>
    )
  }

  function WindowContainer() {
    return (
      <>

      </>
    )
  }


return (
  <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
    {/* Title */}
    <h1 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>{title}</h1>
    {/* Visualization and Code Window Container */}
    <div
      id="windowContainer"
      style={{
        display: "flex",
        flexWrap: "wrap", // Enables wrapping for smaller screens
        gap: "20px",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      {/* Display Window */}
      <div
        id="displayWindow"
        style={{
          flex: "1 1 60%", // Default width of 60%, but can shrink or grow
          minWidth: "300px", // Minimum width for responsive design
          height: "400px",
          border: "1px solid #000",
          background: "#FFF",
          overflow: "hidden",
        }}
      >
        {P5Sketch("displayWindow", data)}
      </div>

      {/* Code Window */}
      <div
        id="codeWindow"
        style={{
          flex: "1 1 100%", // Full width when wrapping
          minWidth: "300px",
          height: "400px",
          border: "1px solid #000",
          background: "#F8F8F8",
          overflow: "auto",
          padding: "10px",
        }}
      >
        {/* Replace this with dynamic code rendering */}
        <pre style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
          {`// Code for visualization\nlet array = [1, 2, 3];`}
        </pre>
      </div>
    </div>

    {/* Input Section */}
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        id="textInput"
        placeholder="Type a set of numbers..."
        value={currentShownData}
        onChange={handleCurrentShownDataChange}
        style={{
          padding: "10px",
          border: "1px solid #CCC",
          borderRadius: "4px",
          width: "70%",
          marginBottom: "10px",
        }}
      />
      <br />
      <button
        onClick={handleUserInputDataChange}
        style={{
          padding: "10px 20px",
          margin: "5px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Update
      </button>
      <button
        onClick={generateRandomData}
        style={{
          padding: "10px 20px",
          margin: "5px",
          backgroundColor: "#28A745",
          color: "#FFF",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Generate Random Array
      </button>
    </div>
  </div>
);

};

export default Visualizer;

