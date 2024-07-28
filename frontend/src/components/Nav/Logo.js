import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./logo.css";
function Logo() {
  return (
    <div className="logo" style={{ marginRight: "150px" }}>
      <Link to="/aboutus" style={{ textDecoration: "none" }}>
        <h1 className="h1" style={{ color: "black" }}>
          {" "}
          PRAKALPZ
        </h1>
      </Link>
    </div>
  );
}

export default Logo;
