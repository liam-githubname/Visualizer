import React, { useState } from 'react';
import styles from '../css/Visualizer.module.css';
import inputStyles from '../css/InputInterface.module.css';

interface VisualizerProperties {
  title: string;
  algorithmCode: string[];
  userInputData: string;
  P5Sketch: (divId: string, data: number[]) => void;
}

const Visualizer: React.FC<VisualizerProperties> = ({
  title,
  P5Sketch,
  algorithmCode,
}) => {
  const [array, setArray] = useState([5, 4, 3, 2, 1]);

  const handleUserInputDataChange = () => {
    const inputData = (document.getElementById("textInput") as HTMLInputElement).value;
    const numberArray = inputData
      .split(",")
      .map((num: string) => Number(num.trim()));
    setArray(numberArray);
  };

  const generateRandomData = () => {
    const tmpArray: number[] = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 100)
    );
    setArray(tmpArray);
  };

  function Animation() {
    return <>{P5Sketch("displayWindow", array)}</>;
  }

  function WindowContainer() {
    return (
      <div className={styles.windowContainer}>
        <AnimationWindow />
        <CodeWindow />
      </div>
    );
  }

  function AnimationWindow() {
    return (
      <div id="displayWindow" className={styles.animationWindow}>
        <Animation />
      </div>
    );
  }

  function CodeWindow() {
    return (
      <div id="codeWindow" className={styles.codeWindow}>
        <pre className={styles.code}>
          <code>{algorithmCode.join("\n")}</code>
        </pre>
      </div>
    );
  }

  function InputInterface() {
    return (
      <div className={inputStyles.inputContainer}>
        <input
          type="text"
          id="textInput"
          className={inputStyles.input}
          placeholder="Type a set of numbers in this format: 5,4,3,2,1"
        />
        <br />
        <button
          onClick={handleUserInputDataChange}
          className={inputStyles.updateButton}
        >
          Update
        </button>
        <button
          onClick={generateRandomData}
          className={inputStyles.generateButton}
        >
          Generate Random Array
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <WindowContainer />
      <InputInterface />
    </div>
  );
};

export default Visualizer;
