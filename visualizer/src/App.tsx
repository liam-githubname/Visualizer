import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BubbleSortVisualizer from "./visualizations/BubbleSortVisualizer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Bubble Sort Visualizer */}
        <Route path="/bubble-sort" element={<BubbleSortVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;

