// // NavBar.js
// import React, { useEffect, useState } from "react";
// import Logo from "./Logo";
// import { NavLink, useNavigate } from "react-router-dom";
// import { FaRegUserCircle } from "react-icons/fa";

// function NavBar({ projects }) {
//   const auth = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const [userToken, setuserToken] = useState();
//   const [userInfo, setUserInfo] = useState();
//   const [activeTab, setActiveTab] = useState();

//   const getUser = async () => {
//     try {
//       let response = await fetch("http://127.0.0.1:3000/api/v1/users/me", {
//         method: "get",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       response = await response.json();

//       if (response) {
//         setUserInfo(response.data.data);
//       }

//       console.log("response", response.data.data);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   useEffect(() => {
//     setuserToken(localStorage.getItem("token"));
//   }, []);

//   useEffect(() => {
//     if (userToken) {
//       getUser();
//     }
//   }, [userToken]);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-none p-4">
//       <div className="container flex justify-between">
//         <div className="flex items-center gap-5">
//           <Logo />
//           <NavLink
//             to="/home"
//             activeClassName="active-link"
//             className={`ml-4 text-black px-4 py-1 rounded-full border-black border  ${
//               activeTab === "home" ? "bg-black text-white" : "bg-none"
//             }`}
//             onClick={() => {
//               setActiveTab("home");
//             }}
//           >
//             Home
//           </NavLink>
//           {auth && (
//             <>
//               <NavLink
//                 to="/viewColleges"
//                 activeClassName="active-link"
//                 className={`ml-4 text-black px-4 py-1 rounded-full border-black border ${
//                   activeTab === "View Colleges"
//                     ? "bg-black text-white"
//                     : "bg-none"
//                 }`}
//                 onClick={() => {
//                   setActiveTab("View Colleges");
//                 }}
//               >
//                 View Colleges
//               </NavLink>
//               <NavLink
//                 to="/upload"
//                 activeClassName="active-link"
//                 className={`ml-4 text-black px-4 py-1 rounded-full border-black border ${
//                   activeTab === "Upload" ? "bg-black text-white" : "bg-none"
//                 }`}
//                 onClick={() => {
//                   setActiveTab("Upload");
//                 }}
//               >
//                 Upload
//               </NavLink>
//             </>
//           )}
//           <NavLink
//             to="/aboutus"
//             activeClassName="active-link"
//             className={`ml-4 text-black px-4 py-1 rounded-full border-black border ${
//               activeTab === "About Us" ? "bg-black text-white" : "bg-none"
//             }`}
//             onClick={() => {
//               setActiveTab("About Us");
//             }}
//           >
//             About Us
//           </NavLink>
//         </div>

// <div className="flex items-center gap-2">
//   <div className="mr-4 text-white">
//     {userInfo ? (
//       <NavLink
//         to={`users/${userInfo.name}`}
//         activeClassName="active-link"
//         className={`px-4 py-1 rounded-full border-black border text-black ${
//           activeTab === "Hellow user"
//             ? "bg-black text-white"
//             : "bg-none"
//         }`}
//         onClick={() => {
//           setActiveTab("Hellow user");
//         }}
//       >
//         {userInfo.name}
//       </NavLink>
//     ) : (
//       <div className="px-4 py-1 rounded-full border-black border text-black">
//         Hello User!
//       </div>
//     )}
//    </div>
//      {auth ? (
//     <div className="flex items-center gap-3">
//       <FaRegUserCircle className="w-6 h-6 mr-2 text-black" />
//       <NavLink
//         to="/login"
//         onClick={() => {
//           logout();
//           setActiveTab();
//         }}
//         activeClassName="active-link"
//         className="text-black px-4 py-1 rounded-full border-black border"
//       >
//         Logout
//       </NavLink>
//     </div>
//     ) : (
//     <>
//       <NavLink
//         to="/login"
//         activeClassName="active-link"
//         className="ml-4 text-black px-4 py-1 rounded-full border-black border "
//       >
//         Login
//       </NavLink>
//       <NavLink
//         to="/signup"
//         activeClassName="active-link"
//         className="ml-4 text-black px-4 py-1 rounded-full border-black border "
//       >
//         SignUp
//       </NavLink>
//     </>
//    )}
//     </div>
//    </div>
//     </nav>
//   );
// }

// export default NavBar;
// NavBar.js
// NavBar.js
// NavBar.js
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

function NavBar() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userToken, setuserToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [activeTab, setActiveTab] = useState();

  const getUser = async () => {
    try {
      let response = await fetch("http://127.0.0.1:3000/api/v1/users/me", {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      response = await response.json();

      if (response) {
        setUserInfo(response.data.data);
      }

      console.log("response", response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    setuserToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (userToken) {
      getUser();
    }
  }, [userToken]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-none p-4">
      <div className="container flex justify-between">
        <div className="flex items-center gap-5">
          <Logo />
          <NavLink
            to="/home"
            activeClassName="active-link"
            className={`ml-4 text-black px-4 py-1 rounded-full border-black border  ${
              activeTab === "home" ? "bg-black text-white" : "bg-none"
            }`}
            onClick={() => {
              setActiveTab("home");
            }}
          >
            Home
          </NavLink>
          {auth && userInfo && (
            <>
              <NavLink
                to="/viewColleges"
                activeClassName="active-link"
                className={`ml-4 text-black px-4 py-1 rounded-full border-black border ${
                  activeTab === "View Colleges"
                    ? "bg-black text-white"
                    : "bg-none"
                }`}
                onClick={() => {
                  setActiveTab("View Colleges");
                }}
              >
                View Colleges
              </NavLink>
              {userInfo.role === "student" && (
                <NavLink
                  to="/upload"
                  activeClassName="active-link"
                  className={`ml-4 text-black px-4 py-1 rounded-full border-black border ${
                    activeTab === "Upload" ? "bg-black text-white" : "bg-none"
                  }`}
                  onClick={() => {
                    setActiveTab("Upload");
                  }}
                >
                  Upload
                </NavLink>
              )}
            </>
          )}
          <NavLink
            to="/aboutus"
            activeClassName="active-link"
            className={`ml-4 text-black px-4 py-1 rounded-full border-black border ${
              activeTab === "About Us" ? "bg-black text-white" : "bg-none"
            }`}
            onClick={() => {
              setActiveTab("About Us");
            }}
          >
            About Us
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <div className="mr-4 text-white">
            {userInfo && userInfo.name ? (
              <NavLink
                to={`users/${userInfo.name}`}
                activeClassName="active-link"
                className={`px-4 py-1 rounded-full border-black border text-black ${
                  activeTab === "Hello user" ? "bg-black text-white" : "bg-none"
                }`}
                onClick={() => {
                  setActiveTab("Hello user");
                }}
              >
                {userInfo.name}
              </NavLink>
            ) : (
              <div className="px-4 py-1 rounded-full border-black border text-black">
                Hello User!
              </div>
            )}
          </div>

          {auth ? (
            <div className="flex items-center gap-3">
              {/* <FaRegUserCircle className="w-6 h-6 mr-2 text-black" /> */}
              <NavLink
                to="/login"
                onClick={() => {
                  logout();
                  setActiveTab();
                }}
                activeClassName="active-link"
                className="text-black px-4 py-1 rounded-full border-black border"
              >
                Logout
              </NavLink>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                activeClassName="active-link"
                className="ml-4 text-black px-4 py-1 rounded-full border-black border"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                activeClassName="active-link"
                className="ml-4 text-black px-4 py-1 rounded-full border-black border"
              >
                SignUp
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
