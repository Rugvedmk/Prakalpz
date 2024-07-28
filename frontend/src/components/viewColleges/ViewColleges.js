import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "./viewcollege.css";
import { Link } from "react-router-dom";
import ImgPhoto from "./images/kkwagh2.jpg";
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
        console.log("clg-stats", data);
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
      <div className="flex py-20 items-center justify-center bg-neutral-00 px-10">
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5 ">
          {projects.map((project, index) => (
            <div className="group relative rounded border-slate-500 border-2 item-center justify-center overflow-hidden cursor-pointer transition-shadowhover:shadow-xl hover:shadow-black/30 ">
              <Link
                to={`/projects/college-stats/${project.collegeid}`}
                style={{ textDecoration: "none" }}
              >
                <div className="h-80 w-83 ">
                  <img
                    className="h-full w-full object-cover   transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                    src={project.collegeInfo.banner}
                    alt="Prj-Image"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                <div className="absolute inset-0 flex translate-y-[40%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                  <h1 className="text-3xl font-bold text-white">
                    <b>{project._id}</b>
                  </h1>
                  <p className="mb-3 text-lg italic text-white opacity-5 transition-opacity duration-300 group-hover:opacity-100">
                    Average likes : {project.averagelikes} Software Project:{" "}
                    {project.softwareprojects} Hardware Project:{" "}
                    {project.hardwareprojects} Total Project:{" "}
                    {project.totalprojects}
                  </p>
                  <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">
                    See More
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
