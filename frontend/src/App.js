import React, { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import NavBar from "./components/Nav/NavBar";
import ListBox from "./components/topFive/ListBox";
import Project from "./components/topFive/Project";
import Home from "./components/Home/Home";
import ViewColleges from "./components/viewColleges/ViewColleges";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/signup";
import Login from "./components/login/login";
import Footer from "./components/Footer/footer";
import ProjectForm from "./components/video-upload/Videoplay";
import Multimedia from "./components/video-upload/Multimedia";
import PrivateComponent from "./components/privatecomponents";
import Upload from "./components/upload/upload";
import About from "./components/About/aboutus";
import CollegeProfile from "./components/collegeProfile/collegeProfile";
import Posts from "./components/collegeProfile/profileComponents/posts";
import Students from "./components/collegeProfile/profileComponents/students";
import VideoPage from "./components/singleProject/newpro";
import SingleUser from "./components/singleUser/singleUser";
import Projects from "./components/viewProjects/projects";
import "./main-body.css";

export default function App() {
  const [projects, setProjects] = useState([]);

  const getTopFiveProjects = async () => {
    let result = await fetch(
      "http://127.0.0.1:3000/api/v1/projects/top-5-likes"
    );
    result = await result.json();
    setProjects(result.data.projects);
    console.warn(result.data);
  };
  useEffect(() => {
    getTopFiveProjects();
  }, []);

  return (
    <NextUIProvider>
      <main className="main-body">
        <BrowserRouter>
          <NavBar projects={projects} />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/viewColleges" element={<ViewColleges />} />
              <Route
                path="/topfive"
                element={<ListBox projects={projects} />}
              />
              {/* <Route path="/singleProject/:id" element={<SingleProject />} /> */}
              <Route path="/newpro/:id" element={<VideoPage />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/videoplay" element={<ProjectForm />} />
              <Route path="/multimedia" element={<Multimedia />} />
              <Route
                path="/projects/college-stats/:clg_id"
                element={<CollegeProfile />}
              >
                <Route index element={<Posts />} />
                <Route path="posts" element={<Posts />} />
                <Route path="students" element={<Students />} />
              </Route>
              <Route path="users/:name" element={<SingleUser />} />
            </Route>
            <Route path="/projects/:domain" element={<Projects />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Project" element={<Project />} />
            <Route path="/ListBox" element={<ListBox />} />
            <Route path="/newpro" element={<VideoPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </main>
    </NextUIProvider>
  );
}
