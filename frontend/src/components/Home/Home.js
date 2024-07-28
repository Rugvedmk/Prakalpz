import React, { useState, useEffect } from "react";
import StartProjects from "./homeComponents/startProjects";
import { CiSearch } from "react-icons/ci";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
// import SortBy from "./homeComponents/Sortby";
import "./home.css";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [userToken, setuserToken] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    techStack: [],
    language: [],
  });

  const fetchProjects = async () => {
    let url = "http://127.0.0.1:3000/api/v1/projects/home";

    // Add filters to the URL if any are selected
    const filterParams = Object.entries(appliedFilters)
      .map(([type, filters]) => {
        if (filters.length > 0) {
          if (type === "techStack") {
            // For tech_stack, construct the filter parameter
            return `tech_stack=${filters.join(",")}`;
          } else {
            return `${type}=${filters.join(",")}`;
          }
        }
        return null;
      })
      .filter((param) => param !== null)
      .join("&");

    if (filterParams) {
      url += `?${filterParams}`;
    }

    let result = await fetch(url);
    result = await result.json();
    setProjects(result.data.projects);
  };

  useEffect(() => {
    setuserToken(localStorage.getItem("token"));
    fetchProjects();
  }, [appliedFilters]);

  const textSearch = async (event) => {
    const key = event.target.value;
    setSearchText(key);
    setIsSearching(key !== "");
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
      <div className="pb-11">
        <div className="p-10 bg-gradient-to-r from-indigo-100 from-25% via-violet-200 via-60% to-pink-100 to-90%"></div>
        <div className="z-10 relative flex justify-center h-300">
          <div className="absolute -top-8 w-50 max-w-md mx-auto bg-gray-100 rounded-md text-center relative">
            <CiSearch
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 ${
                searchText ? "hidden" : ""
              }`}
            />
            <input
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="   Search projects..."
              value={searchText}
              onChange={textSearch}
            />
          </div>
        </div>
      </div>
      <SearchByFilter
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
      />
      <StartProjects
        key={projects._id}
        projects={projects}
        userToken={userToken}
        isSearching={isSearching}
      />
    </main>
  );
}

function SearchByFilter({ appliedFilters, setAppliedFilters }) {
  const [filters, setIsFilters] = useState(false);
  const [isInvalid, setIsInvalid] = React.useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  const [Filters, setFilters] = useState({
    techStack: [
      { tech: "Arduino", selected: false },
      { tech: "IoT", selected: false },
      { tech: "NodeJs", selected: false },
      { tech: "MongoDB", selected: false },
      { tech: "Python", selected: false },
      { tech: "Java", selected: false },
      { tech: "C#", selected: false },
    ],
    language: [
      { tech: "Java", selected: false },
      { tech: "Python", selected: false },
      { tech: "C#", selected: false },
    ],
  });

  const updateFilters = async (type, tech) => {
    const newFilters = {
      ...Filters,
      [type]: Filters[type].map((filter) => {
        return filter.tech === tech.tech
          ? { ...filter, selected: !filter.selected }
          : filter;
      }),
    };

    setFilters(newFilters);
    setIsFilters(!filters);
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
  };

  return (
    <div className="fltr">
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
        </div>
      )}
    </div>
  );
}

function Subfilter({ type, filters, updateFilters }) {
  return (
    <div className="subfilter-container">
      <button className="btn-toggle filter-category">{type}</button>
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
