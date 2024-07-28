import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./../projects.css";

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

function StartProjects({ projects, userToken }) {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5 ">
        {/* <h1>Home</h1> */}
        {/* <ul> */}
        {/* <BrowserRouter> */}
        {/* <Routes> */}
        {projects.map((project) => (
          <>
            <DisplayProject project={project} checkLogin={userToken} />
            {/* <Link to="singleProject">Link</Link> */}
          </>
        ))}
        {/* </Routes> */}
        {/* </BrowserRouter> */}
        {/* </ul> */}
      </div>
    </div>
  );
}

function DisplayProject({ project, userToken }) {
  const [like, setLike] = useState(false);

  //const params = useParams();
  const changeLike = async () => {
    if (userToken) {
      const projectid = project._id;
      console.warn(project._id);

      if (like) {
        console.warn(like);
        let result = await fetch(
          `http://localhost:3000/api/v1/projects/home/dislike/${projectid}`,
          { method: "put" }
        );
        result = await result.json();
        console.warn(result);
        setLike(!like);
        project.likes = project.likes - 1;
      } else {
        console.warn(like);
        let result = await fetch(
          `http://localhost:3000/api/v1/projects/home/like/${projectid}`,
          {
            method: "put",
          }
        );
        result = await result.json();
        console.warn(result);
        setLike(!like);
        project.likes = project.likes + 1;
      }
    }
  };

  return (
    <div className="group relative item-center justify-center overflow-hidden cursor-pointer hover:drop-shadow-2xl transform duration-300 hover:scale-105">
      <div className="card">
        <div class="card__img">
          <img src={project.image_url} className="card__img" alt="Card Image" />
          <span class="card__span">{project.domain}</span>
        </div>
        <div class="card-int">
          <p
            class="card-int__title"
            style={{ fontFamily: "Signika Negative, sans-serif" }}
          >
            {project.project_title}
          </p>
          <hr></hr>
          <i>
            <p
              style={{
                marginTop: "8px",
                fontFamily: "Lato, sans-serif",
              }}
            >
              {project.college_name}
            </p>
          </i>
          <p>{truncateText(project.project_description, 90)}</p>
          <Link
            to={"/newpro/" + project._id}
            style={{ textDecoration: "none" }}
          >
            <div class="absolute bottom-0 left-4 w-full">
              <button class="w-[150px] bg-black h-[40px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                Watch More
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
{
  /* <a href="#" className="btn btn-primary">
               Show more..
              </a> */
}
export default StartProjects;

//------
