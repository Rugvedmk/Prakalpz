import React, { useState, useEffect } from "react";
import StartProjects from "./viewProjectComponents/startProjects";
import Button from "react-bootstrap/Button";
import "./projects.css";
import { useParams } from "react-router-dom";
// const ProjectCard = ({ project }) => {
//   return (
//     <div className="col-lg-4 col-md-6 mb-4">
//       <div className="card">
//         <img
//           src={project.image_url}
//           className="card-img-top"
//           alt="Card Image"
//         />
//         <div className="card-body">
//           <h5 className="card-title">{project.project_title}</h5>
//           <p className="card-text">{project.project_description}</p>
//           <p className="card-text">Likes: {project.likes}</p>
//           <a href="#" className="btn btn-primary">
//             Go somewhere
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2ExYTk2ZmI3ODIxMGFhYTRjNmJjZSIsImlhdCI6MTcwMjM3Nzc0MCwiZXhwIjoxNzEwMTUzNzQwfQ.8BOwX3Q5qb4qRUBKH4cNOKdpE_tsxl2gKxYzOFCR4s4
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [userToken, setuserToken] = useState();
  const { domain } = useParams();

  const fetchProjects = async () => {
    console.log("domain", domain);
    let result = await fetch(
      `http://127.0.0.1:3000/api/v1/projects?domain=${domain}`
    );
    result = await result.json();
    setProjects(result.data.projects);
  };

  //function to run API only once
  useEffect(() => {
    setuserToken(localStorage.getItem("token"));
    console.warn(localStorage.getItem("token"));
    fetchProjects();
  }, []);

  //function to search projects using text
  const textSearch = async (event) => {
    let key = event.target.value;

    if (key) {
      let result = await fetch(
        `http://localhost:3000/api/v1/projects/search/${key}`
      );
      result = await result.json();
      if (result) {
        setProjects(result);
      }
    } else {
      fetchProjects();
    }
  };

  return (
    <main>
      <div className="py-11">
        <div className="max-w-md mx-auto bg-gray-100 rounded-md text-center">
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search projects..."
            //value={query}
            onChange={textSearch}
          />
        </div>
      </div>

      {<SearchByFilter />}
      {
        <StartProjects
          key={projects._id}
          projects={projects}
          userToken={userToken}
        />
      }
    </main>
  );
}

function SearchByFilter() {
  const [openFilters, setOpenFilters] = useState(false);
  const [Filters, setFilters] = useState({
    techStack: [
      { tech: "Arduino", selected: false },
      { tech: "IoT", selected: false },
      { tech: "Node.js", selected: false },
      { tech: "MongoDB", selected: false },
    ],
    language: [
      { tech: "Java", selected: false },
      { tech: "Python", selected: false },
      { tech: "C#", selected: false },
    ],
  });
  const [appliedFilters, setAppliedFilters] = useState({
    techStack: [],
    language: [],
  });

  const updateFilters = async (type, tech) => {
    console.warn(Filters[type], tech.tech);

    const newFilters = {
      ...Filters,
      [type]: Filters[type].map((filter) => {
        return filter.tech === tech.tech
          ? { ...filter, selected: !filter.selected }
          : filter;
      }),
    };
    setFilters(newFilters);
    console.warn(Filters);

    if (tech.selected) {
      setAppliedFilters((prevFilters) => ({
        ...prevFilters,
        [type]: prevFilters[type].filter((filter) => tech.tech !== filter),
      }));
    } else {
      await setAppliedFilters((prevFilters) => ({
        ...prevFilters,
        [type]: [...prevFilters[type], tech.tech],
      }));
    }

    console.log(appliedFilters);
  };

  function displayFilters() {
    console.warn(Filters);
    console.warn(appliedFilters);
  }

  return (
    <div className="filter-container mx-12">
      <button
        className="px-4 py-1 rounded-full border-black border hover:bg-black hover:text-white"
        onClick={() => setOpenFilters((openFilters) => !openFilters)}
      >
        Filters
      </button>
      {openFilters && (
        <div className="filter-options-container">
          <Subfilter
            type="language"
            filters={Filters["language"]}
            updateFilters={updateFilters}
          />
          <Subfilter
            type="techStack"
            filters={Filters["techStack"]}
            updateFilters={updateFilters}
          />
          {/* <button
            className="btn-toggle filter-action-button"
            onClick={() => displayFilters()}
          >
            Show Filters
          </button> */}
        </div>
      )}
    </div>
  );
}

function Subfilter({ type, filters, updateFilters }) {
  const [openSubFilter, setOpenSubFilter] = useState(false);

  return (
    <div className="subfilter-container">
      <button
        className="btn-toggle filter-category"
        /* onClick={() => {
          setOpenSubFilter(() => !openSubFilter);
        }} */
      >
        {type}
      </button>

      <div className="filter-options">
        {filters.map((filter) => (
          <Filter
            key={filter.tech}
            type={type}
            filter={filter}
            updateFilters={updateFilters}
          />
        ))}
      </div>
    </div>
  );
}

function Filter({ type, filter, updateFilters }) {
  function handleChange() {
    updateFilters(type, filter);
  }
  return (
    <div className="label">
      <input type="checkbox" onChange={handleChange} />
      {filter.tech}
    </div>
  );
}
