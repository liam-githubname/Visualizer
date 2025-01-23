import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BubbleSortVisualizer from "./visualizations/BubbleSortVisualizer";
import SelectionSortVisualizer from "./visualizations/SelectionSortVisualizer";
import InsertionSortVisualizer from "./visualizations/InsertionSortVisualizer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Bubble Sort Visualizer */}
        <Route path="/bubble-sort" element={<BubbleSortVisualizer />} />
        {/* Selection Sort Visualizer */}
        <Route path="/selection-sort" element={<SelectionSortVisualizer />} />
        {/* Insertion Sort Visualizer */}
        <Route path="/insertion-sort" element={<InsertionSortVisualizer />} />
      </Routes>
    </Router>
  )
}

export default App

