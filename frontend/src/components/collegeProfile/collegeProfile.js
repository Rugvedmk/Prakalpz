import React, { createContext, useEffect, useState } from "react";
import clgPhoto from "./images/kkwagh2.jpg";
import logo from "./images/logo.png";
import "./collegeProfile.css";
import PostContext from "./profileComponents/postContext";
import { NavLink, Outlet, useParams } from "react-router-dom";

export default function CollegeProfile() {
  const [collegeInfo, setCollegeInfo] = useState();
  const params = useParams();

  // let result = null;
  const getCollegeData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/v1/college/${params.clg_id}`
      );
      const result = await response.json();
      setCollegeInfo(result.data.pr);
      console.warn("This is result ", result.data.pr);
    } catch (error) {
      console.error("Error fetching project data: ", error);
      console.warn("Error fetching project data: ", error);
      setCollegeInfo(null); // Set project to null on error
    }
  };
  useEffect(() => {
    getCollegeData();
    console.warn("projects my", collegeInfo);
  }, []);

  return (
    <>
      {collegeInfo ? (
        <PostContext.Provider
          value={{
            updated: collegeInfo.updated,
            posts: collegeInfo.projects,
            students: collegeInfo.students,
          }}
        >
          <div className="grid-rows mx-40 my-5 grid grid-cols-10 gap-4">
            <div className="col-span-3 flex max-h-screen flex-col">
              <div
                className="mb-4 flex grow items-center overflow-hidden
            rounded-full bg-white"
              >
                <img src={collegeInfo.logo} alt={logo} />
              </div>
              <div className="h-96 grow rounded-xl bg-white">
                <div
                  className="m-4"
                  style={{
                    fontFamily: " Signika Negative, sans-serif",
                    fontSize: "2em",
                  }}
                >
                  About Us
                </div>
                <div className="m-4 text-justify">{collegeInfo.aboutus}</div>
              </div>
            </div>
            <div className="col-span-7 max-h-screen overflow-y-scroll no-scrollbar">
              {/* overflow */}
              <div className="mb-2 overflow-hidden rounded-xl text-center bg-white">
                <img src={collegeInfo.banner} alt={logo} />
                <div
                  className="p-2"
                  style={{
                    fontFamily: " Signika Negative, sans-serif",
                    fontSize: "2em",
                  }}
                >
                  {collegeInfo.name}
                </div>
              </div>
              <div className="my-2 flex flex-row space-x-4 p-3 ">
                <div className="rounded-full border-black border hover:bg-black hover:text-white">
                  <NavLink to="posts" className="p-3">
                    Posts
                  </NavLink>
                </div>
                <div className="rounded-full border-black border hover:bg-black hover:text-white">
                  <NavLink to="students" className="p-3">
                    Students
                  </NavLink>
                </div>
              </div>
              <Outlet />
            </div>
          </div>
        </PostContext.Provider>
      ) : (
        <div>Loading</div>
      )}
    </>
  );

  // mb-4 ml-4
  // return (
  //   <div className="flex flex-row mx-80 my-10">
  //     <div className="max-h-screen overflow-y-scroll no-scrollbar">
  //       <div className="grid grid-rows-3 mb-2 relative overflow-hidden rounded-xl text-center">
  //         <img
  //           src={clgPhoto}
  //           alt="College Photo"
  //           className="w-full h-auto rounded-xl"
  //         />
  //         <div className="flex grow-0 mb-4 ml-4 items-center overflow-hidden rounded-full bg-white transform -translate-y-1/2">
  //           <img src={logo} alt="Logo" className="rounded-full object-fill" />
  //         </div>
  //         <div className="p-2">{collegeInfo.name}</div>
  //       </div>

  //       <div className="my-2 flex flex-row space-x-4 bg-blue-100 px-2">
  //         <NavLink to="posts">Posts</NavLink>
  //         <NavLink to="students">Students</NavLink>
  //       </div>
  //       {collegeInfo ? (
  //         <PostContext.Provider
  //           value={{
  //             updated: collegeInfo.updated,
  //             posts: collegeInfo.projects,
  //             students: collegeInfo.students,
  //           }}
  //         >
  //           <Outlet />
  //         </PostContext.Provider>
  //       ) : (
  //         <div>Loading</div>
  //       )}
  //     </div>
  //   </div>
  // );
}
