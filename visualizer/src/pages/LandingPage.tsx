import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Algorithm Visualizer</h1>
      <p>Select an algorithm to visualize:</p>
      <Link to="/bubble-sort">
        <button>Go to Bubble Sort</button>
      </Link>
    </div>
  );
}

export default LandingPage;

