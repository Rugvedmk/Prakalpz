import React, { useState, useEffect } from "react";
import StartProjects from "./homeComponents/startProjects";
import "./home.css";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [userToken, setuserToken] = useState();

  //function with API to fetch all projects
  const fetchProjects = async () => {
    let result = await fetch("http://127.0.0.1:3000/api/v1/projects/home");
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
      <div>
        <div className="Search-div">
          <input
            className=" js-search-input"
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
    <div className="filter-container">
      <button
        className="btn-toggle filter-button"
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
          <button
            className="btn-toggle filter-action-button"
            onClick={() => displayFilters()}
          >
            Show Filters
          </button>
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
