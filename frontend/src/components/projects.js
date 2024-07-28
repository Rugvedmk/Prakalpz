import React, { useState, useEffect } from "react";

export default function TopFive() {
  const [projects, setProjects] = useState([]);

  const getTopFiveProjects = async () => {
    let result = await fetch(
      "http://127.0.0.1:3000/api/v1/projects/top-5-likes"
    );
    result = await result.json();
    setProjects(result.data.projects);
    console.warn(result.data);
  };
  useEffect(() => {
    getTopFiveProjects();
  }, []);

  return (
    <main className="main">
      <YourComponent projects={projects} />
      <h1>Hello</h1>
      <p>{projects.length}</p>
    </main>
  );
}
function YourComponent({ projects }) {
  return (
    <div>
      <h1>Top 5 Liked Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>{project.project_title}</li>
        ))}
      </ul>
    </div>
  );
}
