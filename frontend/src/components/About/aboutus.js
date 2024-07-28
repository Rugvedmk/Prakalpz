// // Import necessary libraries and styles
// import React from "react";
// import "./about.css"; // Make sure to import or define your styles
// import { Link } from "react-router-dom";

// function About() {
//   return (
//     <div className="abtmain">
//       <div className="background-image">
//         <h1 className="text-over-image">Welcome to Prakalpz</h1>
//         <h2 className="textContainer">
//           Prakalpz is an integrated online platform developed for students to
//           share information about their projects. This collaborative space
//           encourages peer learning and facilitates cross-functional research
//           among students from different universities and colleges
//         </h2>
//         <br></br>
//         <button
//           class="buttonSW"
//           style={{ marginTop: "40px", marginLeft: "20px" }}
//         >
//           <span class="button_lg">
//             <span class="button_sl"></span>
//             <Link to="/projects/software">
//               <span class="button_text">Software</span>
//             </Link>
//           </span>
//         </button>
//         <button class="buttonHW" style={{ marginLeft: "30px" }}>
//           <span class="button_lg">
//             <span class="button_slh"></span>
//             <Link to="/projects/hardware">
//               <span class="button_text">Hardware</span>
//             </Link>
//           </span>
//         </button>
//       </div>

//       <div className="container-xyz">
//         <div className="box">
//           <div className="image-container">
//             <img src="2nd.png" alt="Second Image" className="second-image" />
//           </div>
//           <div className="text-container">
//             <h1 style={{ color: "blue", marginTop: "40px" }}>ABOUT US </h1>

//             <h2 className="title2">
//               Empowering Students with Innovatine Projects
//             </h2>
//             <br></br>
//             <p className="pTag">
//               Prakalpz is an online platform designed to provide information
//               about the projects undertaken by students in various univiersites
//               and colleges. Our platform promotoes peer learning and
//               cross-function research, enabling student to unleash their full
//               potential.
//             </p>
//             <br></br>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;
import React from "react";
import "./about.css"; // Make sure to import or define your styles
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="abtmain">
      <div className="background-image">
        <h1 className="text-over-image">Welcome to Prakalpz</h1>
        <h2 className="textContainer">
          Prakalpz is an integrated online platform developed for students to
          share information about their projects. This collaborative space
          encourages peer learning and facilitates cross-functional research
          among students from different universities and colleges
        </h2>
        <br />
        <Link to="/projects/software">
          <button
            className="buttonSW"
            style={{ marginTop: "40px", marginLeft: "20px" }}
          >
            <span className="button_lg">
              <span className="button_sl"></span>
              <span className="button_text">Software</span>
            </span>
          </button>
        </Link>
        <Link to="/projects/hardware">
          <button className="buttonHW" style={{ marginLeft: "30px" }}>
            <span className="button_lg">
              <span className="button_slh"></span>
              <span className="button_text">Hardware</span>
            </span>
          </button>
        </Link>
      </div>

      <div className="container-xyz">
        <div className="box">
          <div className="image-container">
            <img src="2nd.png" alt="Second Image" className="second-image" />
          </div>
          <div className="text-container">
            <h1 style={{ color: "blue", marginTop: "40px" }}>ABOUT US </h1>

            <h2 className="title2">
              Empowering Students with Innovative Projects
            </h2>
            <br />
            <strong>
              <p className="pTag">
                Prakalpz is an online platform designed to provide information
                about the projects undertaken by students in various
                universities and colleges. Our platform promotes peer learning
                and cross-functional research, enabling students to unleash
                their full potential.
              </p>
            </strong>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
