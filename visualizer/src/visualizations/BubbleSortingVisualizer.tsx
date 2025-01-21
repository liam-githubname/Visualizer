/* eslint-disable @typescript-eslint/no-explicit-any */
import p5 from "p5";
import Visualizer from "../components/Visualizer";
import Sketch from "react-p5";

function BubbleSortVisualizer() {

  function P5Sketch(divId: string, array: number[]) {

    //TODO: make it a ratio between the tallest and shortest elements so each bar of animation is relative to display size
    // let tallestElement = 0;
    let i = 0;
    let j = 0;
    let sorted = false;

    const setup = (p5: p5, canvasParentRef: any) => {

      const displayWidth = document.getElementById(divId)?.offsetWidth;
      const displayHeight = document.getElementById(divId)?.offsetHeight;

      p5.createCanvas(displayWidth, displayHeight, document.getElementById(divId)?.offsetWidth).parent(canvasParentRef);

      //TODO: create the animation with scaling relative to the tallest element
      // for (let i = 0; i < array.length; i++) {
      //     tallestElement = (array[i].valueOf() > tallestElement) ? array.indexOf(i) : tallestElement;
      // }

      // console.log(tallestElement);
    }

    const draw = (p5: p5) => {

      p5.frameRate(5);

      const displayWidth = document.getElementById(divId)?.offsetWidth;
      const displayHeight = document.getElementById(divId)?.offsetHeight;

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
      //TODO: draw the array's current status, add feature to highlight the swapping elements

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

          //FIXME: fix coloring for each element
          for (let idx = 0; idx < array.length; idx++) {

            p5.rect(barXValue * idx, displayHeight, barXValue, -barYValue * array[idx]);
            p5.fill(array[idx] * 10);

          };
        } else {

          sorted = true;

          for (let idx = 0; idx < array.length; idx++) {

            p5.rect(barXValue * idx, displayHeight, barXValue, -barYValue * array[idx]);
            p5.fill(30 + idx * 20);
          }

          p5.noLoop();
        }
      }
    }
    return <Sketch setup={setup} draw={draw} />
  }


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
      userInputData=""
      P5Sketch={P5Sketch}
      array={[0]}
      algorithmCode={bubbleSortCode}
    />
  );
};

export default BubbleSortVisualizer;

