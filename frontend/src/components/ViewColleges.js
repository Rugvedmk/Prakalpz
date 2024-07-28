import React, { useState, useEffect } from "react";

export default function ViewColleges() {
  const [projects, setProjects] = useState([]);

  const getColleges = async () => {
    try {
      let result = await fetch(
        "http://127.0.0.1:3000/api/v1/projects/college-stats"
      );
      if (result.ok) {
        const data = await result.json();
        setProjects(data.College.stats);
      } else {
        console.error(
          "Failed to fetch data:",
          result.status,
          result.statusText
        );
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };
  useEffect(() => {
    getColleges();
  }, []);

  return (
    <main>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            Title :{project._id} <br /> Average Likes :{project.averagelikes}{" "}
            <br /> totalprojects : {project.totalprojects} <br />
            softwareprojects :{project.softwareprojects} <br /> hardwareprojects
            : {project.hardwareprojects}
            <hr />
          </li>
        ))}
      </ul>
    </main>
  );
}
