
import Visualizer from "../components/Visualizer";
import Sketch from "react-p5";

function BubbleSortVisualizer() {

  function P5Sketch(divId: string, array: number[]) {

    let i = 0;
    let j = 0;
    let sorted = false;

    const setup = (p5: import("/Users/liam/Programming/Projects/visualizer/visualizer/node_modules/react-p5/node_modules/@types/p5/index.d.ts"), canvasParentRef: Element) => {

      const displayWidth = document.getElementById(divId)?.offsetWidth || 1;
      const displayHeight = document.getElementById(divId)?.offsetHeight || 1;

      p5.createCanvas(displayWidth, displayHeight).parent(canvasParentRef);
    }


    //FIXME: Use a set of sketches instead, to get around memory complexity problem I can save only the unsorted state of the array, instead of the whole array. (check if that reduces memory complexity to 2n instead of n^2)
    const draw = (p5: import("/Users/liam/Programming/Projects/visualizer/visualizer/node_modules/react-p5/node_modules/@types/p5/index.d.ts")) => {

      p5.frameRate(5);

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
          if (j < array.length) {
            if (array[j] > array[j + 1]) {
              const temp = array[j];
              array[j] = array[j + 1];
              array[j + 1] = temp;
            }
            j++;
          } else {
            j = 0;
            i++;
          }

          for (let idx = 0; idx < array.length; idx++) {

            p5.fill(Math.floor(array[idx] / 255) * 100 + 10, array[idx], array[idx])
            p5.rect(barXValue * idx, displayHeight, barXValue, -barYValue * array[idx]);

          };
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


  //const bubbleSortSteps = ["Step 1: Compare elements", "Step 2: Swap if necessary", "..."];
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
      userInputData=""
      P5Sketch={P5Sketch}
      algorithmCode={bubbleSortCode}
    />
  );
};

export default BubbleSortVisualizer;

