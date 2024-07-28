// NumResults.js
import React from "react";

function NumResults({ projects }) {
  return (
    <p className="num-results">
      Found <strong>{projects.length}</strong> results
    </p>
  );
}

export default NumResults;
