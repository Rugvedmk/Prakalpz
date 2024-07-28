// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import styles from "./signup.module.css";

// // function Signup() {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     passwordConfirm: "",
// //     role: "user",
// //     collegeName: "",
// //   });
// //   const [error, setError] = useState("");
// //   const [colleges, setColleges] = useState([]);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleCollegeSearch = async (partialName) => {
// //     try {
// //       const response = await axios.get(
// //         `http://127.0.0.1:3000/api/v1/college/search/${partialName}`
// //       );
// //       setColleges(response.data.data.colleges);
// //     } catch (error) {
// //       console.error("College search failed:", error);
// //     }
// //   };

// //   const handleCollegeInputChange = (e) => {
// //     const { value } = e.target;
// //     setFormData({
// //       ...formData,
// //       collegeName: value,
// //     });
// //     handleCollegeSearch(value);
// //   };

// //   const handleCollegeSelection = (selectedCollege) => {
// //     setFormData({
// //       ...formData,
// //       collegeName: selectedCollege,
// //     });
// //     setColleges([]); // Clear the suggestion list after selection
// //   };

// //   useEffect(() => {
// //     const auth = localStorage.getItem("token");
// //     if (auth) {
// //       navigate("/home");
// //     }
// //   }, [navigate]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (formData.password !== formData.passwordConfirm) {
// //       setError("Passwords do not match.");
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(
// //         "http://127.0.0.1:3000/api/v1/users/signup",
// //         {
// //           email: formData.email,
// //           name: formData.name,
// //           password: formData.password,
// //           passwordConfirm: formData.passwordConfirm,
// //           role: formData.role,
// //           collegeName: formData.collegeName,
// //         }
// //       );

// //       if (response.status === 200) {
// //         const token = response.data.token;
// //         localStorage.setItem("token", token);
// //         navigate("/home");
// //       }
// //     } catch (error) {
// //       console.error("Signup failed:", error);
// //     }
// //   };

// //   return (
// //     <div className={styles.formContainer}>
// //       <form className={styles.form} onSubmit={handleSubmit}>
// //         <p className={styles.title}>Register</p>
// //         <p className={styles.message}>
// //           Signup now and get full access to our app.
// //         </p>
// //         <div className={styles.flex}>
// //           <label>
// //             <input
// //               required
// //               placeholder=""
// //               type="text"
// //               className={styles.input}
// //               name="name"
// //               value={formData.name}
// //               autoComplete="off"
// //               onChange={handleChange}
// //             />
// //             <span>Name</span>
// //           </label>
// //         </div>

// //         <label>
// //           <input
// //             required
// //             placeholder=""
// //             type="email"
// //             className={styles.input}
// //             name="email"
// //             value={formData.email}
// //             autoComplete="off"
// //             onChange={handleChange}
// //           />
// //           <span>Email</span>
// //         </label>

// //         <label>
// //           <input
// //             required
// //             placeholder=""
// //             type="password"
// //             className={styles.input}
// //             name="password"
// //             value={formData.password}
// //             autoComplete="off"
// //             onChange={handleChange}
// //           />
// //           <span>Password(Min 8 characters)</span>
// //         </label>

// //         <label>
// //           <input
// //             required
// //             placeholder=""
// //             type="password"
// //             className={styles.input}
// //             name="passwordConfirm"
// //             value={formData.passwordConfirm}
// //             autoComplete="off"
// //             onChange={handleChange}
// //           />
// //           <span>Confirm password</span>
// //         </label>

// //         {/* College Name field based on the selected role */}
// //         {formData.role === "student" && (
// //           <div className={styles.flex}>
// //             <label>
// //               <input
// //                 required={formData.role === "student"}
// //                 placeholder=""
// //                 type="text"
// //                 className={styles.input}
// //                 name="collegeName"
// //                 value={formData.collegeName}
// //                 autoComplete="off"
// //                 onChange={handleCollegeInputChange}
// //               />
// //               <span>Enter College Name</span>
// //             </label>
// //             {/* Display suggestions */}
// //             {colleges.length > 0 && (
// //               <ul className={styles.suggestions}>
// //                 {colleges.map((college) => (
// //                   <li
// //                     key={college._id}
// //                     onClick={() => handleCollegeSelection(college.name)}
// //                   >
// //                     {college.name}
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </div>
// //         )}

// //         {error && <div className={styles.error}>{error}</div>}

// //         {/* Role dropdown */}
// //         <div className={styles.flex}>
// //           <label>
// //             <span>Select role</span>
// //             <select
// //               className={styles.input}
// //               name="role"
// //               value={formData.role}
// //               onChange={handleChange}
// //             >
// //               <option value="user">User</option>
// //               <option value="student">Student</option>
// //             </select>
// //           </label>
// //         </div>

// //         <button className={styles.submit} type="submit">
// //           Submit
// //         </button>
// //         <p className={styles.signin}>
// //           Already have an account? <a href="/login">Signin</a>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Signup;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import styles from "./signup.module.css";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     passwordConfirm: "",
//     role: "user",
//     collegeName: "",
//     collegeId: "", // New state for college ID
//   });

//   const [error, setError] = useState("");
//   const [colleges, setColleges] = useState([]);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleCollegeSearch = async (partialName) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:3000/api/v1/college/search/${partialName}`
//       );
//       setColleges(response.data.data.colleges);
//     } catch (error) {
//       console.error("College search failed:", error);
//     }
//   };

//   const handleCollegeInputChange = (e) => {
//     const { value } = e.target;
//     setFormData({
//       ...formData,
//       collegeName: value,
//     });
//     handleCollegeSearch(value);
//   };

//   const handleCollegeSelection = async (selectedCollege) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:3000/api/v1/college/search/${selectedCollege}`
//       );

//       if (response.data.data.colleges.length > 0) {
//         const selectedCollegeId = response.data.data.colleges[0]._id;
//         setFormData({
//           ...formData,
//           collegeName: selectedCollege,
//           collegeId: selectedCollegeId,
//         });
//       }

//       setColleges([]); // Clear the suggestion list after selection
//     } catch (error) {
//       console.error("College selection failed:", error);
//     }
//   };

//   useEffect(() => {
//     const auth = localStorage.getItem("token");
//     if (auth) {
//       navigate("/home");
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.passwordConfirm) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:3000/api/v1/users/signup",
//         {
//           email: formData.email,
//           name: formData.name,
//           password: formData.password,
//           passwordConfirm: formData.passwordConfirm,
//           role: formData.role,
//           collegeName: formData.collegeName,
//           collegeId: formData.collegeId,
//         }
//       );

//       if (response.status === 200) {
//         const token = response.data.token;
//         localStorage.setItem("token", token);
//         navigate("/home");
//       }
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//   };

//   return (
//     <div className={styles.formContainer}>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <p className={styles.title}>Register</p>
//         <p className={styles.message}>
//           Signup now and get full access to our app.
//         </p>
//         <div className={styles.flex}>
//           <label>
//             <input
//               required
//               placeholder=""
//               type="text"
//               className={styles.input}
//               name="name"
//               value={formData.name}
//               autoComplete="off"
//               onChange={handleChange}
//             />
//             <span>Name</span>
//           </label>
//         </div>

//         <label>
//           <input
//             required
//             placeholder=""
//             type="email"
//             className={styles.input}
//             name="email"
//             value={formData.email}
//             autoComplete="off"
//             onChange={handleChange}
//           />
//           <span>Email</span>
//         </label>

//         <label>
//           <input
//             required
//             placeholder=""
//             type="password"
//             className={styles.input}
//             name="password"
//             value={formData.password}
//             autoComplete="off"
//             onChange={handleChange}
//           />
//           <span>Password(Min 8 characters)</span>
//         </label>

//         <label>
//           <input
//             required
//             placeholder=""
//             type="password"
//             className={styles.input}
//             name="passwordConfirm"
//             value={formData.passwordConfirm}
//             autoComplete="off"
//             onChange={handleChange}
//           />
//           <span>Confirm password</span>
//         </label>

//         {formData.role === "student" && (
//           <div className={styles.flex}>
//             <label>
//               <input
//                 required={formData.role === "student"}
//                 placeholder=""
//                 type="text"
//                 className={styles.input}
//                 name="collegeName"
//                 value={formData.collegeName}
//                 autoComplete="off"
//                 onChange={handleCollegeInputChange}
//               />
//               <span>Enter College Name</span>
//             </label>
//             {colleges.length > 0 && (
//               <ul className={styles.suggestions}>
//                 {colleges.map((college) => (
//                   <li
//                     key={college._id}
//                     onClick={() => handleCollegeSelection(college.name)}
//                   >
//                     {college.name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {error && <div className={styles.error}>{error}</div>}

//         <div className={styles.flex}>
//           <label>
//             <span>Select role</span>
//             <select
//               className={styles.input}
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option value="user">User</option>
//               <option value="student">Student</option>
//             </select>
//           </label>
//         </div>

//         <button className={styles.submit} type="submit">
//           Submit
//         </button>
//         <p className={styles.signin}>
//           Already have an account? <a href="/login">Signin</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user",
    collegeName: "",
    collegeId: "",
  });

  const [error, setError] = useState("");
  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCollegeSearch = async (partialName) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/v1/college/search/${partialName}`
      );
      setColleges(response.data.data.colleges);
    } catch (error) {
      console.error("College search failed:", error);
    }
  };

  const handleCollegeInputChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      collegeName: value,
    });
    handleCollegeSearch(value);
  };

  const handleCollegeSelection = async (selectedCollege) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/v1/college/search/${selectedCollege}`
      );

      if (response.data.data.colleges.length > 0) {
        const selectedCollegeId = response.data.data.colleges[0]._id;
        setFormData({
          ...formData,
          collegeName: selectedCollege,
          collegeId: selectedCollegeId,
        });
      }

      setColleges([]); // Clear the suggestion list after selection
    } catch (error) {
      console.error("College selection failed:", error);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/signup",
        {
          email: formData.email,
          name: formData.name,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
          role: formData.role,
          collegeName: formData.collegeName,
          collegeId: formData.collegeId,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/home");
        window.location.reload();
        console.log("200");
      }
      console.log("not 200");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.title}>Register</p>
        <p className={styles.message}>
          Signup now and get full access to our app.
        </p>
        <div className={styles.flex}>
          <label>
            <input
              required
              placeholder=""
              type="text"
              className={styles.input}
              name="name"
              value={formData.name}
              autoComplete="off"
              onChange={handleChange}
            />
            <span>Name</span>
          </label>
        </div>

        <label>
          <input
            required
            placeholder=""
            type="email"
            className={styles.input}
            name="email"
            value={formData.email}
            autoComplete="off"
            onChange={handleChange}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type="password"
            className={styles.input}
            name="password"
            value={formData.password}
            autoComplete="off"
            onChange={handleChange}
          />
          <span>Password(Min 8 characters)</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type="password"
            className={styles.input}
            name="passwordConfirm"
            value={formData.passwordConfirm}
            autoComplete="off"
            onChange={handleChange}
          />
          <span>Confirm password</span>
        </label>

        {formData.role === "student" && (
          <div className={styles.flex}>
            <label>
              <input
                required={formData.role === "student"}
                placeholder=""
                type="text"
                className={styles.input}
                name="collegeName"
                value={formData.collegeName}
                autoComplete="off"
                onChange={handleCollegeInputChange}
              />
              <span>Enter College Name</span>
            </label>
            {colleges.length > 0 && (
              <ul className={styles.suggestions}>
                {colleges.map((college) => (
                  <li
                    key={college._id}
                    onMouseDown={() => handleCollegeSelection(college.name)}
                  >
                    {college.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.flex}>
          <label>
            <span>Select role</span>
            <select
              className={styles.input}
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="student">Student</option>
            </select>
          </label>
        </div>

        <button className={styles.submit} type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <p className={styles.signin}>
          Already have an account? <a href="/login">Signin</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
