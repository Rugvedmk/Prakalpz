// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ProgressBar } from "react-loader-spinner";
// import styles from "./upload.module.css";

// const Upload = () => {
//   const [img, setImg] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [project_title, setProjectTitle] = useState("");
//   const [domain, setDomain] = useState("");
//   const [college_name, setCollegeName] = useState("");
//   const [collegeId, setCollegeId] = useState("");
//   const [project_description, setProjectDescription] = useState("");
//   const [numberofstudents, setNumberOfStudents] = useState(0);
//   const [made_by_students, setMadeByStudents] = useState([]);
//   const [tech_stack, setTechStack] = useState("");
//   const [video_url, setVideoUrl] = useState("");
//   const [image_url, setImageUrl] = useState("");
//   const [collegeSuggestions, setCollegeSuggestions] = useState([]);

//   useEffect(() => {
//     const handleCollegeSearch = async (partialName) => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:3000/api/v1/college/search/${partialName}`
//         );
//         setCollegeSuggestions(response.data.data.colleges);
//       } catch (error) {
//         console.error("College search failed:", error);
//       }
//     };

//     handleCollegeSearch(college_name);
//   }, [college_name]);

//   const handleCollegeInputChange = (e) => {
//     const { value } = e.target;
//     setCollegeName(value);
//   };

//   const handleCollegeSelection = async (selectedCollege) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:3000/api/v1/college/search/${selectedCollege}`
//       );

//       if (response.data.data.colleges.length > 0) {
//         const selectedCollegeId = response.data.data.colleges[0]._id;
//         setCollegeName(selectedCollege);
//         setCollegeId(selectedCollegeId);
//       }

//       setCollegeSuggestions([]);
//     } catch (error) {
//       console.error("College selection failed:", error);
//     }
//   };

//   const uploadFile = async (type) => {
//     const data = new FormData();
//     data.append("file", type === "image" ? img : video);
//     data.append(
//       "upload_preset",
//       type === "image" ? "images_preset" : "videos_preset"
//     );

//     try {
//       let cloudName = "dpn9zrpa8";
//       let resourceType = type === "image" ? "image" : "video";
//       let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

//       const res = await axios.post(api, data);
//       const { secure_url } = res.data;
//       return secure_url;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleFileChange = (e, fileType) => {
//     const newFile = e.target.files[0];

//     if (fileType === "image") {
//       setImg(newFile);
//     } else if (fileType === "video") {
//       setVideo(newFile);
//     }
//   };

//   const handleNumberOfStudentsChange = (e) => {
//     const value = parseInt(e.target.value, 10);
//     setNumberOfStudents(value);

//     const updatedMadeByStudents = Array(value).fill("");
//     setMadeByStudents(updatedMadeByStudents);

//     const updatedCollegeNames = Array(value).fill(college_name);
//     setCollegeName(updatedCollegeNames[0]); // Set college_name to the first element
//   };

//   const handleMadeByStudentChange = (index, e) => {
//     const updatedMadeByStudents = [...made_by_students];
//     updatedMadeByStudents[index] = e.target.value;
//     setMadeByStudents(updatedMadeByStudents);
//   };

//   const handleUploadClick = async () => {
//     if (img && video) {
//       try {
//         setLoading(true);

//         const image_url = await uploadFile("image");
//         const video_url = await uploadFile("video");

//         const projectData = {
//           project_title,
//           domain,
//           college_name,
//           collegeId,
//           project_description,
//           numberofstudents,
//           made_by_students,
//           tech_stack,
//           video_url,
//           image_url,
//         };

//         axios
//           .post("http://127.0.0.1:3000/api/v1/projects", projectData)
//           .then((response) => {
//             console.log("Project created:", response.data);
//             setUploadSuccess(true);
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//           });

//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const isUploadEnabled = img && video;

//   return (
//     <div className={styles["upload-div"]}>
//       <form className={styles["upload-form"]}>
//         {uploadSuccess ? (
//           <h1></h1>
//         ) : (
//           <div>
//             <h2>Upload Project</h2>
//             <div className={styles["file-upload"]}>
//               <label htmlFor="video">Project Video:</label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 id="video"
//                 onChange={(e) => handleFileChange(e, "video")}
//               />
//             </div>
//             <div className={styles["file-upload"]}>
//               <label htmlFor="img">Project Image:</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 id="img"
//                 onChange={(e) => handleFileChange(e, "image")}
//               />
//             </div>
//             <div>
//               <label htmlFor="numberofstudents">Team Members:</label>
//               <select
//                 id="numberofstudents"
//                 value={numberofstudents}
//                 onChange={handleNumberOfStudentsChange}
//               >
//                 {[...Array(6).keys()].map((num) => (
//                   <option key={num} value={num}>
//                     {num}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {made_by_students.map((student, index) => (
//               <div key={index}>
//                 <label htmlFor={`made_by_students${index}`}>
//                   Made by Student {index + 1}:
//                 </label>
//                 <input
//                   type="text"
//                   id={`made_by_students${index}`}
//                   value={student}
//                   onChange={(e) => handleMadeByStudentChange(index, e)}
//                 />
//               </div>
//             ))}
//             <input
//               type="text"
//               id="project_title"
//               placeholder="Project Title"
//               value={project_title}
//               autoComplete="off"
//               onChange={(e) => setProjectTitle(e.target.value)}
//             />
//             <label>Domain:</label>
//             <input
//               type="text"
//               id="domain"
//               placeholder="Domain"
//               value={domain}
//               autoComplete="off"
//               onChange={(e) => setDomain(e.target.value)}
//             />
//             <div>
//               <label htmlFor="college_name">College Name:</label>
//               <input
//                 type="text"
//                 id="college_name"
//                 placeholder="College Name"
//                 value={college_name}
//                 autoComplete="off"
//                 onChange={handleCollegeInputChange}
//               />
//               {collegeSuggestions.length > 0 && (
//                 <ul className={styles.suggestions}>
//                   {collegeSuggestions.map((college) => (
//                     <li
//                       key={college._id}
//                       onMouseDown={() => handleCollegeSelection(college.name)}
//                     >
//                       {college.name}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//             <div>
//               <label htmlFor="project_description">Project Description:</label>
//               <textarea
//                 id="project_description"
//                 value={project_description}
//                 autoComplete="off"
//                 onChange={(e) => setProjectDescription(e.target.value)}
//               />
//             </div>
//             <div>
//               <label>Technical Stack:</label>
//               <input
//                 type="text"
//                 id="tech_stack"
//                 value={tech_stack}
//                 autoComplete="off"
//                 onChange={(e) => setTechStack(e.target.value)}
//               />
//             </div>
//             <button
//               type="button"
//               onClick={handleUploadClick}
//               disabled={!isUploadEnabled}
//             >
//               {loading ? (
//                 <ProgressBar
//                   type="Oval"
//                   color="#00BFFF"
//                   height={20}
//                   width={20}
//                 />
//               ) : (
//                 "Upload"
//               )}
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Upload;
