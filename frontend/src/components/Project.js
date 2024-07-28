// Project.js
import React from "react";

function Project({ project }) {
  return (
    <li>
      {/* <img src={movie.Poster} alt={`${movie.Title} poster`} /> */}
      <h3>{project.project_title}</h3>
    </li>
  );
}

export default Project;
