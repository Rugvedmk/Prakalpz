// import React, { useState } from "react";
// import axios from "axios";

// const ResetPassword = () => {
//   const [token, setToken] = useState(""); // State to store the token
//   const [password, setPassword] = useState("");
//   const [passwordConfirm, setPasswordConfirm] = useState("");

//   const [message, setMessage] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.patch(
//         `http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`, // Use the token from the input field
//         {
//           password,
//           passwordConfirm,
//         }
//       );

//       if (response.data.status === "success") {
//         console.log("Password reset successful!");
//         // You can add a message to inform the user that the password has been reset
//         setMessage(response.message);
//       } else {
//         setMessage("Error: " + response.message);
//       }
//     } catch (error) {
//       console.log("password is reseted");
//       // Handle errors or display error messages to the user
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Reset Token" // Input field for the token
//           required
//           value={token}
//           onChange={(e) => setToken(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           required
//           value={passwordConfirm}
//           onChange={(e) => setPasswordConfirm(e.target.value)}
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState } from "react";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            passwordConfirm,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setMessage(data.message);
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (error) {
      setMessage("success");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="text"
        placeholder="Reset Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;
