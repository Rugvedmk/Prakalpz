import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/login",
        {
          email,
          password,
        }
      );
      // console.log("log response ", response);
      // console.log("status", response.data.status);
      // console.log("token", response.data.token);
      if (response.data.status === "success") {
        // response = await response.json();
        console.log("Logged in successfully!");
        localStorage.setItem("token", response.data.token);

        // window.setTimeout(() => {
        //   // window.location.assign("/home");
        //   navigate("/home");
        // }, 1500);

        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      //console.error(error.response.data.message);
      window.alert("Incorrect email or Password , please try again");
      console.log("hi");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Log In</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          id="email"
          className={styles.input}
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className={styles.input}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/../ListBox">
          <span className={styles.forgotP}>
            <a>Forgot Password ?</a>
          </span>
        </Link>
        <Link to="/../Project">
          <span className={styles.forgotP}>
            <a>Reset Password ?</a>
          </span>
        </Link>
        <input className={styles.reals} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
