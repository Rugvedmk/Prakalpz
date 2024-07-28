// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Card from "react-bootstrap/Card";
// import { useParams } from "react-router-dom";
// import "./singleproject.css";

// export default function SingleProject() {
//   const [project, setProject] = useState([]);

//   const params = useParams();
//   //console.warn(params.id);
//   let result = null;

//   const getsingleprojectData = async () => {
//     // result = await fetch(
//     //   `http://127.0.0.1:3000/api/v1/projects/singleProject/${params.id}`
//     // );
//     // result = await result.json();
//     // setProject(result.data.pr);
//     // console.warn(result.data.pr);

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:3000/api/v1/projects/${params.id}`
//       );
//       const result = await response.json();
//       setProject(result.data.pr);
//       // console.warn(result);
//     } catch (error) {
//       console.error("Error fetching project data: ", error);
//       console.warn("Error fetching project data: ", error);
//       setProject(null); // Set project to null on error
//     }
//   };
//   useEffect(() => {
//     getsingleprojectData();
//   }, []);

//   //   console.warn(project);
//   //   return <h1>hello</h1>;
//   return <DisplayProject project={project} />;
//   // return <DisplayProject project={project} />;
// }

// function DisplayProject({ project }) {
//   const [like, setLike] = useState(false);
//   // const [studentsArray,setstudentsArray] =useState([]);
//   // const []
//   //const params = useParams();
//   const changeLike = async () => {
//     const projectid = project._id;
//     console.warn(project._id);

//     if (like) {
//       console.warn(like);
//       let result = await fetch(
//         `http://localhost:3000/api/v1/projects/home/dislike/${projectid}`,
//         { method: "put" }
//       );
//       result = await result.json();
//       // console.warn("result : ", result);
//       // console.warn("url : ", result.data.pr.video_url);
//       setLike(!like);
//       project.likes = project.likes - 1;
//     } else {
//       console.warn(like);
//       let result = await fetch(
//         `http://localhost:3000/api/v1/projects/home/like/${projectid}`,
//         {
//           method: "put",
//         }
//       );
//       result = await result.json();
//       console.warn(result);
//       setLike(!like);
//       project.likes = project.likes + 1;
//     }
//   };

//   const [students, setStudents] = useState([]);
//   const [tech, setTech] = useState([]);

//   const setArray = async () => {
//     setStudents([project.made_by_students]);
//     setTech([project.tech_stack]);
//     // console.warn("project : ", project);
//   };

//   useEffect(() => {
//     setArray();
//   }, []);

//   const handleContextMenu = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div key={project._id} className="project-main-div">
//       <div className="left-content">
//         <h3 style={{ wordSpacing: "10px", marginLeft: "20px" }}>
//           Project - {project.project_title}
//         </h3>
//         <div
//           style={{ position: "relative", paddingTop: "56.25%", width: "100%" }}
//         >
//           <video
//             controls
//             controlsList="nodownload"
//             style={{
//               position: "absolute",
//               top: "0",
//               left: "0",
//               width: "100%",
//               height: "100%",
//             }}
//           >
//             <source src={project.video_url} type="video/mp4" />
//           </video>
//         </div>
//         <p>{project.project_description}</p>
//       </div>

//       <div>
//         <div md={12} className="text-only" style={{ position: "relative" }}>
//           <div style={{ padding: "0 30px" }}>
//             <p>
//               <b>College:</b> {project.college_name}
//             </p>
//             <p>
//               <b>Domain:</b> {project.domain}
//             </p>
//             <p>
//               <b>Tech Stack:</b> {project.tech_stack}
//             </p>
//             <p>
//               <b>Team Members:</b>
//               {project.made_by_students &&
//               project.made_by_students.length > 0 ? (
//                 <ol>
//                   {project.made_by_students.map((student, index) => (
//                     <li key={index}>{student}</li>
//                   ))}
//                 </ol>
//               ) : (
//                 "No students found"
//               )}
//             </p>
//             <Button
//               variant={like ? "danger" : "outline-danger"}
//               onClick={changeLike}
//             >
//               Likes: {project.likes}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SimpleText({ text }) {
//   // console.warn("result inside sample", project.project_title);
//   // return <div>hello</div>;
//   text = text + "  ";
//   return { text };
// }
// // <div className="main-div">
// //   <div key={project._id} className="second-class">
// //   <h2 className="video-title">Video Player</h2>
// //     <Card  className="custom-card">
// //       <Row>
// //       <Col md={6}>
// //       <video controls >
// //     <source src={project.video_url} type="video/mp4" />
// //   </video>
// //   </Col>

// //   <Col md={6}>
// //   <Card.Body>
// //     <Card.Title>Title :{project.project_title}</Card.Title>
// //     <Card.Text>
// //     DisplayProjectDescription :{" "}
// //
// //     </Card.Text>
// //     <Card.Text>
// //     College name :{" "}
// //         {project.college_name}
// //     </Card.Text>
// //
// //   </Card.Body>
// //   </Col>4
// //       </Row>

// // </Card>

// //       </div>
// // </div>
