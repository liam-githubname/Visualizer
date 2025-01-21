import React, { useState } from 'react';

interface VisualizerProperties {

  title: string
  algorithmCode: string[]
  userInputData: string
  //TODO: maybe I should make this a series of sketches instead
  P5Sketch: (divId: string, data: number[]) => void
  array: number[]

}

const Visualizer: React.FC<VisualizerProperties> = ({

  title,
  P5Sketch,
  algorithmCode,

}) => {


  //THIS WORKS BECAUSE USESTATE RE-RENDERS THE PAGE
  const [array, setArray] = useState([5, 4, 3, 2, 1]);
  const [userInputData, setUserInputData] = useState("");
  const currentShownData = array



  //TODO: add sanitization and error catching
  const handleUserInputDataChange = () => {
    const inputData = document.getElementById("textInput").value

    const numberArray = inputData
      .split(",")
      .map(num => Number(num.trim()))

    setArray(numberArray)
  }


  const generateRandomData = () => {

    const tmpArray: number[] = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

    setUserInputData(tmpArray);
    setArray(tmpArray)

  }


  function Animation() {
    return (
      <>
        {P5Sketch("displayWindow", array)}
      </>
    )
  }


  function WindowContainer() {
    return (
      <>
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
            <Animation />
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
            <pre style={{ fontSize: "0.9rem", lineHeight: "1.4", textAlign: 'left' }}>
              <code>
                {algorithmCode.join("\n")}
              </code>
            </pre>
          </div>
        </div>
      </>
    )
  }

  //TODO: make a box that tells the current array
  function InputInterface() {
    return (
      <>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            id="textInput"
            placeholder="Type a set of numbers..."
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
      </>
    )
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      {/* Title */}
      <h1 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>{title}</h1>
      {/* Visualization and Code Window Container */}
      <WindowContainer />
      {/* Input Section */}
      <InputInterface />
    </div>
  );
};

export default Visualizer;

