import React, { createContext, useContext, useEffect, useState } from "react";
import StartProjects from "../../Home/homeComponents/startProjects";
import { Link } from "react-router-dom";
import PostContext from "./postContext";

export default function Posts() {
  const [projects, setProjects] = useState([]);
  const [userToken, setuserToken] = useState();

  const posts = useContext(PostContext);
  console.log("posts ", posts);
  // const fetchProjects = async () => {
  //   let result = await fetch("http://127.0.0.1:3000/api/v1/projects/home");
  //   result = await result.json();
  //   setProjects(result.data.projects);
  // };

  useEffect(() => {
    setuserToken(localStorage.getItem("token"));
    setProjects(posts.posts);
    // fetchProjects();
  }, []);

  return (
    <>
      {/* <StartProjects
        key={projects._id}
        projects={projects}
        userToken={userToken}
      /> */}
      <Projects projects={projects} userToken={userToken} />
    </>
  );
}

function Projects({ projects, userToken }) {
  console.log(projects);
  return (
    <div className="grid grid-cols-2">
      {projects.map((project) => (
        <>
          <DisplayPost post={project} checkLogin={userToken} />
          {/* <Link to="singleProject">Link</Link> */}
        </>
      ))}
    </div>
  );
}

function DisplayPost({ post, checkLogin }) {
  // console.warn("display posts", post);
  return (
    <button className="mx-2 mb-3 rounded-lg overflow-hidden hover:shadow-md hover:shadow-black">
      <Link
        to={"/newpro/" + post._id}
        style={{ textDecoration: "none" }}
        className="flex flex-col overflow-hidden rounded-xl bg-white pb-4 "
      >
        <img src={post.image_url} alt="Card Image" />
        <div
          className="items-center my-1 "
          style={{
            fontFamily: " Signika Negative, sans-serif",
            fontSize: "2em",
          }}
        >
          {post.project_title}
        </div>
      </Link>
    </button>
  );
}
