import Visualizer from "../components/Visualizer";
import Sketch from "react-p5";

function SelectionSortVisualizer() {

  function P5Sketch(divId: string, array: number[]) {


    let i = 0;
    let j = 0;
    let sorted = false;

    const setup = (p5: import("/Users/liam/Programming/Projects/visualizer/visualizer/node_modules/react-p5/node_modules/@types/p5/index.d.ts"), canvasParentRef: Element) => {
      const displayWidth = document.getElementById(divId)?.offsetWidth || 1;
      const displayHeight = document.getElementById(divId)?.offsetHeight || 1;
      p5.createCanvas(displayWidth, displayHeight).parent(canvasParentRef);
    }




    const draw = (p5: import("/Users/liam/Programming/Projects/visualizer/visualizer/node_modules/react-p5/node_modules/@types/p5/index.d.ts")) => {
      p5.frameRate(1)
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

        if (i < array.length - 1) {
          let min_idx = i;
          for (j = i + 1; j < array.length; j++) {
            if (array[j] < array[min_idx]) {
              min_idx = j
              console.log(array[j])
            }
          }
          const tmp = array[i]
          array[i] = array[min_idx]
          array[min_idx] = tmp
          for (let idx = 0; idx < array.length; idx++) {
            p5.fill(Math.floor(array[idx] / 255) * 100, array[idx] + 75, array[idx] + 75)
            p5.rect(barXValue * idx, displayHeight, barXValue, -barYValue * array[idx]);
          }
          i++
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

  const selectionSortCode = [
    "for (int i = 0; i < n - 1; i++) {",
    "   int min_idx = i;",
    "   for (int j = i + 1; j < n; j++) {",
    "     if (arr[j] < arr[min_idx]) {",
    "     min_idx = j;",
    "     }",
    "   }",
    "   int temp = arr[i];",
    "   arr[i] = arr[min_idx];",
    "   arr[min_idx] = temp;",
    "}",
  ]


  return (
    <Visualizer
      title="Selection Sort Visualization"
      userInputData=""
      P5Sketch={P5Sketch}
      algorithmCode={selectionSortCode}
    />
  )
}

export default SelectionSortVisualizer
