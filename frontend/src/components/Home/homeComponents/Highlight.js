import React, { useEffect, useState } from "react";
import styles from "./Highlight.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) {
    return text;
  } else {
    // Find the index of the last space character within the maxLength
    const lastSpaceIndex = text.lastIndexOf(" ", maxLength);

    // Return the truncated text up to the last space
    return text.substring(0, lastSpaceIndex) + "...";
  }
}
function Highlight() {
  const [topProjectData, setTopProjectData] = useState(null);

  useEffect(() => {
    const fetchTopProject = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/projects/topproject"
        );
        if (response.data && response.data.status === "success") {
          setTopProjectData(response.data.data.topProject);
        } else {
          console.error("Failed to fetch top project data");
        }
      } catch (error) {
        console.error("Error fetching top project:", error);
      }
    };

    fetchTopProject();
  }, []);

  return (
    <div className={styles.blogSlider}>
      <div className={styles.blogSliderWrp}>
        <div className={styles.blogSliderItem}>
          {topProjectData && (
            <>
              <div className={styles.blogSliderImg}>
                <img
                  src={topProjectData.image}
                  alt={topProjectData.project_title}
                />
              </div>
              <div className={styles.blogSliderContent}>
                <div
                  className={styles.blogSliderTitle}
                  style={{ color: "red" }}
                >
                  Highlight Project of the week
                </div>
                <div className={styles.blogSliderTitle}>
                  {topProjectData.project_title}
                </div>
                <span>College Name : </span>
                <span className={styles.blogSliderCode}>
                  <b>{topProjectData.collegeInfo}</b>
                </span>
                <br />
                <div
                  className={styles.blogSliderText}
                  style={{ marginTop: "10px" }}
                >
                  <p>{truncateText(topProjectData.description, 200)}</p>
                </div>

                <Link
                  to={`/newpro/${topProjectData._id}`}
                  className={styles.blogSliderButton}
                >
                  Watch More
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.blogSliderPagination}></div>
    </div>
  );
}

export default Highlight;
