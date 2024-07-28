// ProjectList.js
import React, { useState } from "react";
import Project from "./Project";

function ProjectList({ projects }) {
  return (
    <ul className="list">
      {projects?.map((project) => (
        <Project project={project} key={project._id} />
      ))}
    </ul>
  );
}

export default ProjectList;
