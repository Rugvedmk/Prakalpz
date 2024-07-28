import React, { useState } from "react";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";
import styles from "./upload.module.css";
import ReactPlayer from "react-player";

const Upload = () => {
  const [projectVideo, setProjectVideo] = useState(null); //preview video state

  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [project_title, setProjectTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [college_name, setCollegeName] = useState("");
  const [project_description, setProjectDescription] = useState("");
  const [numberofstudents, setNumberOfStudents] = useState(0);
  const [made_by_students, setMadeByStudents] = useState([]);
  const [tech_stack, setTechStack] = useState("");
  const [video_url, setVideoUrl] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(""); // Added state for video preview

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

  const handleFileChange = async (e, fileType) => {
    const newFile = e.target.files[0];

    if (fileType === "image") {
      setImg(newFile);
    } else if (fileType === "video") {
      setVideo(newFile);

      try {
        setLoading(true);

        const video_url = await uploadFile("video");

        // Update state for video_url
        setVideoUrl(video_url);
      } catch (err) {
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }

      // Now, update state for video preview
      setVideoPreviewUrl(URL.createObjectURL(newFile));
    }
  };

  const handleNumberOfStudentsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumberOfStudents(value);

    // Reset the 'madeByStudents' array with empty strings
    setMadeByStudents(Array(value).fill(""));
  };

  const handleMadeByStudentChange = (index, e) => {
    const updatedMadeByStudents = [...made_by_students];
    updatedMadeByStudents[index] = e.target.value;
    setMadeByStudents(updatedMadeByStudents);
  };

  const handleUploadClick = async () => {
    if (img && video) {
      try {
        setLoading(true);

        const image_url = await uploadFile("image");
        const video_url = await uploadFile("video");

        // Update state for video_url
        setVideoUrl(video_url);

        // Update state for video preview
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
          image_url: image_url,
        };

        axios
          .post("http://127.0.0.1:3000/api/v1/projects", projectData)
          .then((response) => {
            console.log("Project created:", response.data);
            setUploadSuccess(true);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const isUploadEnabled = img && video;

  return (
    <div className={styles["upload-div"]}>
      <form className={styles["upload-form"]}>
        {uploadSuccess ? (
          <div>
            <h1>Files are uploaded successfully.</h1>
            {videoPreviewUrl && (
              <div className={styles["video-preview"]}>
                <label>Video Preview:</label>
                <video controls width="300" height="200">
                  <source src={videoPreviewUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2>Upload Project</h2>
            <div className={styles["file-upload"]}>
              <label htmlFor="video">Project Video:</label>
              <input
                type="file"
                accept="video/*"
                id="video"
                onChange={(e) => handleFileChange(e, "video", setProjectVideo)}
              />
              {projectVideo && (
                <div className="preview">
                  <ReactPlayer
                    url={projectVideo}
                    width="100%"
                    height="100%"
                    controls
                  />
                </div>
              )}
            </div>
            <div className={styles["file-upload"]}>
              <label htmlFor="img">Project Thumbnail:</label>
              <input
                type="file"
                accept="image/*"
                id="img"
                onChange={(e) => handleFileChange(e, "image")}
              />
            </div>
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
            <label>Domain:</label>
            <input
              type="text"
              id="domain"
              placeholder="Domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
            <input
              type="text"
              id="college_name"
              placeholder="College Name"
              value={college_name}
              onChange={(e) => setCollegeName(e.target.value)}
            />
            <div>
              <label htmlFor="project_description">Project Description:</label>
              <textarea
                id="project_description"
                value={project_description}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Technical Stack:</label>
              <input
                type="text"
                id="tech_stack"
                value={tech_stack}
                onChange={(e) => setTechStack(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={handleUploadClick}
              disabled={!isUploadEnabled || loading}
            >
              Upload
            </button>
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
        {uploadSuccess && (
          <div>
            <h1>Files are uploaded successfully.</h1>
          </div>
        )}
      </form>
    </div>
  );
};

export default Upload;
