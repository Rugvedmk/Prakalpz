import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./singleUser.css";

export default function SingleUser() {
  const [userInfo, setUserInfo] = useState(null);
  const { name } = useParams();
  const navigate = useNavigate();

  const deleteUser = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/users/deleteme",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        navigate("/home");
        window.location.reload();
      } else {
        alert("Error deleting account");
      }
    } catch (error) {
      console.error("Error deleting account:", error.message);
    }
  };

  const getUser = async () => {
    if (name) {
      try {
        const encodedName = encodeURIComponent(name);
        const response = await fetch(
          `http://127.0.0.1:3000/api/v1/users/${encodedName}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.status === "success") {
          setUserInfo(data.data.pr);
          console.log("pruthvij", data);
          console.log("pruthvij");
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    }
  };

  useEffect(() => {
    if (name) {
      getUser();
    }
  }, [name]);

  return (
    <div>
      {userInfo && (
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="cardM">
                <div className="cardM-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{userInfo.name}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="cardM mb-3">
                <div className="cardM-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.name ? userInfo.name : "No data"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.email ? userInfo.email : "No data"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">College</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.college && userInfo.college.name
                        ? userInfo.college.name
                        : "Not available"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">College Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.college && userInfo.college.email
                        ? userInfo.college.email
                        : "Not available"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">SPOC</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.college && userInfo.college.SPOC
                        ? userInfo.college.SPOC
                        : "Not available"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <button className="btn btn-danger" onClick={deleteUser}>
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h3>Your Projects</h3>
              {/* Project status */}
              <div className="flex flex-wrap justify-center gutters-sm">
                {userInfo.projects && userInfo.projects.length > 0 ? (
                  userInfo.projects.map((project) => (
                    <Project
                      key={project._id}
                      project_title={project.project_title}
                      project_description={project.project_description}
                      domain={project.domain}
                      id={project._id}
                    />
                  ))
                ) : (
                  <p>No projects available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function Project({ project_title, domain, project_description, id }) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const moveToProject = () => {
    navigate(`/newpro/${id}`);
  };

  const handleDelete = async () => {
    // Set isDeleting to true to display the confirmation message
    setIsDeleting(true);

    // Send DELETE request if confirmed
    // You can remove this part if you want to handle deletion separately
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/v1/projects/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Assuming you want to refresh the page after deletion
        window.location.reload();
      } else {
        // Handle error response
        console.error("Failed to delete project:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="col-sm-6 mb-3">
      <div className="project-card">
        <div className="cardM h-100">
          <div className="cardM-body">
            <div className="info-container">
              <div className="info-item">
                <label className="info-label">Name:</label>
                <span className="info-value">{project_title}</span>
              </div>
              <div className="info-item">
                <label className="info-label">Description:</label>
                <span className="info-value">{project_description}</span>
              </div>
              <div className="info-item">
                <label className="info-label">Domain:</label>
                <span className="info-value">{domain}</span>
              </div>
            </div>
            <div className="buttons-container mt-3">
              <button className="btn btn-primary" onClick={moveToProject}>
                View
              </button>
              <button
                className="btn btn-danger"
                onClick={isDeleting ? handleDelete : () => setIsDeleting(true)}
              >
                {isDeleting ? "Are you sure you want to delete?" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
