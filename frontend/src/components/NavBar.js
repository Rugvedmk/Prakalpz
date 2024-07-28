// NavBar.js
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./navbar.css";

function NavBar({ projects }) {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userToken, setuserToken] = useState();
  const [userInfo, setUserInfo] = useState();

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Nzg0MjVkNTMxMjU4YTRhODk2NjRiZiIsImlhdCI6MTcwMjQ4MTQ0NSwiZXhwIjoxNzEwMjU3NDQ1fQ.jwolV_b16iKd56fWSuQuF7SbMZsU8GG034A4ogQthSs
  const getUser = async () => {
    let response = await fetch("http://127.0.0.1:3000/api/v1/users/me", {
      method: "get",
      // body: JSON.stringify({ userToken }),
      headers: {
        // Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    response = await response.json();

    if (response) {
      setUserInfo(response.data.data);
    }

    console.log("response", response.data.data);
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
  };

  return (
    <nav className="nav-bar" style={{ marginBottom: "0" }}>
      <div
        className="padd"
        style={{ backgroundColor: "#112D4E", height: "80px" }}
      >
        <div className="logo-s">
          <Logo />
        </div>
        <div className="button-edit">
          <div style={{ paddingLeft: "100px" }}>
            <Link to="/home">
              <Button variant="outline-dark" className="custom-button">
                Home
              </Button>
            </Link>
          </div>

          {auth && (
            <>
              <div style={{ paddingLeft: "100px" }}>
                <Link to="/viewColleges">
                  <Button variant="outline-dark" className="custom-button">
                    View Colleges
                  </Button>
                </Link>
              </div>

              <div style={{ paddingLeft: "100px" }}>
                <Link to="/upload">
                  <Button variant="outline-dark" className="custom-button">
                    Upload
                  </Button>
                </Link>
              </div>
            </>
          )}
          <div style={{ paddingLeft: "100px" }}>
            <Link to="/aboutus">
              <Button variant="outline-dark" className="custom-button">
                About Us
              </Button>
            </Link>
          </div>
          <div
            className="user-name-display"
            style={{ color: "white", marginTop: "8px", marginLeft: "280px" }}
          >
            <h5>
              {userInfo ? (
                <Link to="users/me">{userInfo.name}</Link>
              ) : (
                <div>Hellow User!</div>
              )}
            </h5>
          </div>
        </div>

        <div className="spacer" />

        {auth ? (
          <div className="log-out button-edit" style={{ paddingLeft: "100px" }}>
            <Link to="/login" onClick={logout}>
              <Button variant="outline-dark" className="custom-button">
                Logout
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="button-edit">
              <Link to="/login">
                <Button variant="outline-dark" className="custom-button">
                  Login
                </Button>
              </Link>
            </div>
            <div className="button-edit">
              <Link to="/signup">
                <Button variant="outline-dark" className="custom-button">
                  SignUp
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
