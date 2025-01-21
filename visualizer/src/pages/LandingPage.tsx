import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Liam Harvell's Visualizer</h1>
      <p>Select an algorithm!</p>
      <Link to="/bubble-sort">
        <button>Go to Bubble Sort</button>
      </Link>
      <Link to="selection-sort">
        <button>Go to Selection Sort</button>
      </Link>
      <Link to="insertion-sort">
        <button>Go to Insertion Sort</button>
      </Link>
    </div>
  );
}

export default LandingPage;

