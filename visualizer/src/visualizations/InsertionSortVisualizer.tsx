import Visualizer from "../components/Visualizer";
import Sketch from "react-p5";

function InsertionSortVisualizer() {
  function P5Sketch(divId: string, array: number[]) {

    let i = 1;
    let sorted = false;

    const setup = (p5: import("/Users/liam/Programming/Projects/visualizer/visualizer/node_modules/react-p5/node_modules/@types/p5/index.d.ts"), canvasParentRef: Element) => {
      const displayWidth = document.getElementById(divId)?.offsetWidth || 1;
      const displayHeight = document.getElementById(divId)?.offsetHeight || 1;
      p5.createCanvas(displayWidth, displayHeight).parent(canvasParentRef);
    }

    const draw = (p5: import("/Users/liam/Programming/Projects/visualizer/visualizer/node_modules/react-p5/node_modules/@types/p5/index.d.ts")) => {
      p5.frameRate(1);
      const displayWidth = document.getElementById(divId)?.offsetWidth || 1;
      const displayHeight = document.getElementById(divId)?.offsetHeight || 1;
      let tallestElement = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i] > tallestElement) {
          tallestElement = array[i];
        }
      }
      const barXValue = displayWidth / array.length;
      const barYValue = displayHeight / tallestElement;


      p5.background(200);
      p5.fill(10);

      if (!sorted) {

        if (i < array.length) {

          const key = array[i]
          let j = i - 1

          while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1
          }
          array[j + 1] = key

          i++

          for (let idx = 0; idx < array.length; idx++) {
            p5.fill(Math.floor(array[idx] / 255) * 100, array[idx] + 75, array[idx] + 75)
            p5.rect(barXValue * idx, displayHeight, barXValue, -barYValue * array[idx]);
          }
        } else {
          sorted = true;
          for (let idx = 0; idx < array.length; idx++) {
            p5.fill(Math.floor(array[idx] / 255) * 100, array[idx] + 75, array[idx] + 75)
            p5.rect(barXValue * idx, displayHeight, barXValue, -barYValue * array[idx]);
          }
          p5.noLoop();
        }
      }
    }
    return <Sketch setup={setup} draw={draw} />
  }

  const insertionSortCode = [
    "for (int i = 1; i < n; ++i) {",
    "    int key = arr[i];",
    "    int j = i - 1;",
    "    while (j >= 0 && arr[j] > key) {",
    "        arr[j + 1] = arr[j];",
    "        j = j - 1;",
    "    }",
    "    arr[j + 1] = key;",
    "}"
  ];

  return (
    <Visualizer
      title="Insertion Sort Visualization"
      userInputData=""
      P5Sketch={P5Sketch}
      algorithmCode={insertionSortCode}
    />
  );
}

export default InsertionSortVisualizer
