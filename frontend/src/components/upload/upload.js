import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";
import styles from "./../upload/upload.module.css";
import ReactPlayer from "react-player";

const Upload = () => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [project_title, setProjectTitle] = useState("");
  const [domain, setDomain] = useState("software");
  const [college_name, setCollegeName] = useState("");
  const [project_description, setProjectDescription] = useState("");
  const [numberofstudents, setNumberOfStudents] = useState(0);
  const [made_by_students, setMadeByStudents] = useState([]);
  const [tech_stack, setTechStack] = useState([]);
  const [video_url, setVideoUrl] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [collegeId, setCollegeId] = useState("");
  const [collegeSuggestions, setCollegeSuggestions] = useState([]);
  const [numberoftechstack, setNumberOfTechStack] = useState(0);
  const [leader, setProjectLeader] = useState("");

  useEffect(() => {
    const handleCollegeSearch = async (partialName) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/college/search/${partialName}`
        );
        setCollegeSuggestions(response.data.data.colleges);
      } catch (error) {
        console.error("College search failed:", error);
      }
    };

    handleCollegeSearch(college_name);
  }, [college_name]);

  const handleCollegeInputChange = (e) => {
    const { value } = e.target;
    setCollegeName(value);
  };

  const handleCollegeSelection = async (selectedCollege) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/v1/college/search/${selectedCollege}`
      );

      if (response.data.data.colleges.length > 0) {
        const selectedCollegeId = response.data.data.colleges[0]._id;
        setCollegeName(selectedCollege);
        setCollegeId(selectedCollegeId);
      }

      setCollegeSuggestions([]);
    } catch (error) {
      console.error("College selection failed:", error);
    }
  };

  const handleFileChange = async (e, fileType) => {
    const newFile = e.target.files[0];

    if (fileType === "image") {
      setImg(newFile);

      if (newFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(newFile);
      } else {
        setImagePreviewUrl("");
      }
    } else if (fileType === "video") {
      setVideo(newFile);

      if (newFile) {
        setVideoPreviewUrl(URL.createObjectURL(newFile));
      } else {
        setVideoPreviewUrl("");
      }
    }
  };

  const handleNumberOfStudentsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumberOfStudents(value);
    setMadeByStudents(Array(value).fill(""));
  };

  const handleMadeByStudentChange = (index, e) => {
    const updatedMadeByStudents = [...made_by_students];
    updatedMadeByStudents[index] = e.target.value;
    setMadeByStudents(updatedMadeByStudents);
  };

  const handleNumberOfTechStackChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumberOfTechStack(value);
    setTechStack(Array(value).fill(""));
  };

  const handleTechStackChange = (index, e) => {
    const updatedTechStack = [...tech_stack];
    updatedTechStack[index] = e.target.value;
    setTechStack(updatedTechStack);
  };

  const handleUploadClick = async () => {
    if (img && video) {
      try {
        setLoading(true);

        const image_url = await uploadFile("image");
        const video_url = await uploadFile("video");

        setVideoUrl(video_url);
        setVideoPreviewUrl(URL.createObjectURL(video));

        const projectData = {
          project_title,
          domain,
          college_name,
          project_description,
          numberofstudents,
          made_by_students,
          tech_stack,
          video_url,
          image_url,
          leader,
        };

        await axios.post("http://127.0.0.1:3000/api/v1/projects", projectData);

        setUploadSuccess(true);
        // Reset text input fields
        setProjectTitle("");
        setDomain("software");
        setCollegeName("");
        setProjectDescription("");
        setNumberOfStudents(0);
        setMadeByStudents([]);
        setTechStack([]);
        setNumberOfTechStack(0);
        setProjectLeader(""); // Reset the leader field
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : video);
    data.append(
      "upload_preset",
      type === "image" ? "images_preset" : "videos_preset"
    );

    try {
      let cloudName = "dpn9zrpa8";
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const isUploadEnabled = img && video;

  return (
    <div className={styles["upload-container"]}>
      <div className={styles["upload-left"]}>
        <div className={styles["file-upload"]}>
          <div className="input-div">
            <label htmlFor="video">Project Video:</label>
            <input
              type="file"
              accept="video/*"
              className="input"
              name="file"
              id="video"
              onChange={(e) => handleFileChange(e, "video")}
            />

            {videoPreviewUrl && (
              <div className={styles["preview"]}>
                <ReactPlayer
                  url={videoPreviewUrl}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles["file-upload"]}>
          <label htmlFor="img">Project Thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => handleFileChange(e, "image")}
          />
          {imagePreviewUrl && (
            <div className={styles["preview"]}>
              <img src={imagePreviewUrl} alt="Thumbnail Preview" />
            </div>
          )}
        </div>
      </div>
      <div className={styles["upload-right"]}>
        {!uploadSuccess ? (
          <div>
            <h2>Upload Project</h2>
            <div>
              <label htmlFor="numberofstudents">Team Members:</label>
              <select
                id="numberofstudents"
                value={numberofstudents}
                onChange={handleNumberOfStudentsChange}
              >
                {[...Array(6).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              id="leader"
              placeholder="Project Leader"
              value={leader}
              onChange={(e) => setProjectLeader(e.target.value)}
            />
            {made_by_students.map((student, index) => (
              <div key={index}>
                <label htmlFor={`made_by_students${index}`}>
                  Made by Student {index + 1}:
                </label>
                <input
                  type="text"
                  id={`made_by_students${index}`}
                  value={student}
                  onChange={(e) => handleMadeByStudentChange(index, e)}
                />
              </div>
            ))}
            <input
              type="text"
              id="project_title"
              placeholder="Project Title"
              value={project_title}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            <label>Project Category</label>
            <select value={domain} onChange={(e) => setDomain(e.target.value)}>
              <option value="software">Software</option>
              <option value="hardware">Hardware</option>
            </select>
            <div>
              <label htmlFor="college_name">College Name:</label>
              <input
                type="text"
                id="college_name"
                placeholder="College Name"
                value={college_name}
                autoComplete="off"
                onChange={handleCollegeInputChange}
              />
              {collegeSuggestions.length > 0 && (
                <ul className={styles.suggestions}>
                  {collegeSuggestions.map((college) => (
                    <li
                      key={college._id}
                      onClick={() => handleCollegeSelection(college.name)}
                    >
                      {college.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label htmlFor="project_description">Project Description:</label>
              <textarea
                id="project_description"
                value={project_description}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="numberoftechstack">Number of Tech Stack:</label>
              <select
                id="numberoftechstack"
                value={numberoftechstack}
                onChange={handleNumberOfTechStackChange}
              >
                {[...Array(6).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            {/* Updated tech_stack input */}
            {tech_stack.map((tech, index) => (
              <div key={index}>
                <label htmlFor={`tech_stack${index}`}>
                  Tech Stack {index + 1}:
                </label>
                <input
                  type="text"
                  id={`tech_stack${index}`}
                  value={tech}
                  onChange={(e) => handleTechStackChange(index, e)}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={handleUploadClick}
              disabled={!isUploadEnabled || loading}
              className={styles["btnUpload"]}
              style={{ backgroundColor: "black" }}
            >
              Upload
            </button>
          </div>
        ) : (
          <div>
            <h1>Files are uploaded successfully.</h1>
          </div>
        )}
        {loading && (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass={styles["progress-bar-wrapper"]}
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        )}
      </div>
    </div>
  );
};

export default Upload;
