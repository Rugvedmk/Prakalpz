import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/users/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setMessage(data.message);
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (error) {
      setMessage("Error: Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email address to reset your password:</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Send Reset Email</button>
      <p>{message}</p>
    </div>
  );
};

// export default ForgotPassword;
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleBackClick = () => {
//     navigate("/login");
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://127.0.0.1:3000/api/v1/users/forgotPassword", {
//         email,
//       });
//       // Handle success or show a message to the user
//     } catch (error) {
//       console.log("Error:", error);
//       // Handle error or show an error message to the user
//     }
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleForgotPassword}>
//         <input
//           type="email"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button type="submit">Send Reset Email</button>
//       </form>
//       <p>
//         <a href="#" onClick={handleBackClick}>
//           Back to Login
//         </a>
//       </p>
//     </div>
//   );
// };

export default ForgotPassword;
