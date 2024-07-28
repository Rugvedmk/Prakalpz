import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./../home.css";
import Highlight from "./Highlight";

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    // Find the index of the last space character within the maxLength
    const lastSpaceIndex = text.lastIndexOf(" ", maxLength);

    // Return the truncated text up to the last space
    return text.substring(0, lastSpaceIndex) + "...";
  }
}

function StartProjects({ projects, userToken, isSearching }) {
  return (
    <div>
      {!isSearching && <Highlight />}

      <div className="flex min-h-screen items-center justify-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {projects.map((project) => (
            <DisplayProject
              key={project._id}
              project={project}
              checkLogin={userToken}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DisplayProject({ project, userToken }) {
  const [like, setLike] = useState(false);

  const changeLike = async () => {
    if (userToken) {
      const projectid = project._id;

      if (like) {
        let result = await fetch(
          `http://localhost:3000/api/v1/projects/home/dislike/${projectid}`,
          { method: "put" }
        );
        result = await result.json();
        setLike(!like);
        project.likes = project.likes - 1;
      } else {
        let result = await fetch(
          `http://localhost:3000/api/v1/projects/home/like/${projectid}`,
          { method: "put" }
        );
        result = await result.json();
        setLike(!like);
        project.likes = project.likes + 1;
      }
    }
  };

  return (
    <div className="group relative item-center justify-center overflow-hidden cursor-pointer hover:drop-shadow-2xl transform duration-300 hover:scale-105">
      <Link to={"/newpro/" + project._id} style={{ textDecoration: "none" }}>
        <div className="card">
          <div className="card__img">
            <img
              src={project.image_url}
              className="card__img"
              alt="Card Image"
            />
            <span className="card__span">{project.domain}</span>
          </div>
          <div className="card-int">
            <p
              className="card-int__title"
              style={{ fontFamily: "Signika Negative, sans-serif" }}
            >
              {project.project_title}
            </p>
            <hr />
            <i>
              <p style={{ marginTop: "8px", fontFamily: "Lato, sans-serif" }}>
                {project.college_name}
              </p>
            </i>
            <p>{truncateText(project.project_description, 90)}</p>
            <div className="flex justify-between items-center mt-3 pt-5">
              <div className="flex gap-3">
                <button
                  className="w-[150px] bg-black h-[40px] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                  onClick={changeLike}
                >
                  Show More
                </button>
                <button className="Btn" onClick={changeLike}>
                  <span className="leftContainer">
                    <svg
                      fill="white"
                      viewBox="0 0 512 512"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
                    </svg>
                    <span className="like">Like</span>
                  </span>
                  <span className="likeCount">{project.likes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default StartProjects;
