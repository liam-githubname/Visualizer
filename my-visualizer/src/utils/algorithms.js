// src/utils/algorithms.js
export function bubbleSort(array, setArrayState) {
  const steps = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push([...array]);  // Save the state after each swap
      }
    }
  }
  setArrayState(steps);
}

