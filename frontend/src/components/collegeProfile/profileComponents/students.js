import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostContext from "./postContext";
import studentphoto from "./../images/student.jpeg";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [userToken, setuserToken] = useState();

  const studentData = useContext(PostContext);
  // console.log("posts ", posts.posts);
  // const fetchProjects = async () => {
  //   let result = await fetch("http://127.0.0.1:3000/api/v1/projects/home");
  //   result = await result.json();
  //   setProjects(result.data.projects);
  // };

  useEffect(() => {
    setuserToken(localStorage.getItem("token"));
    setStudents(studentData.students);
    // fetchProjects();
  }, []);

  return (
    <>
      {/* <StartProjects
        key={projects._id}
        projects={projects}
        userToken={userToken}
      /> */}
      <Student students={students} userToken={userToken} />
    </>
  );
}

function Student({ students, userToken }) {
  //   console.log(projects);
  return (
    <div className="grid grid-cols-2">
      {students.map((student) => (
        <>
          <DisplayStudent student={student} checkLogin={userToken} />
          {/* <Link to="singleProject">Link</Link> */}
        </>
      ))}
    </div>
  );
}

function DisplayStudent({ student, checkLogin }) {
  // console.warn("display posts", post);
  return (
    <button className="mx-2 mb-3 rounded-lg overflow-hidden hover:shadow-md hover:shadow-black">
      <Link
        to={"/singleProject/" + "65773659566e37223a0ad8e8"}
        style={{ textDecoration: "none" }}
        className="flex flex-col overflow-hidden rounded-lg bg-white pb-4"
      >
        {/* <img src={studentphoto} alt="Card Image" /> */}
        <div
          className="items-center my-1"
          style={{
            fontFamily: " Signika Negative, sans-serif",
            fontSize: "2em",
          }}
        >
          {student.name}
        </div>
      </Link>
    </button>
  );
}
