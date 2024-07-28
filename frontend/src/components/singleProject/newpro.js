import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./newpro.css";
export default function VideoPage() {
  const [project, setProject] = useState([]);

  const params = useParams();
  //console.warn(params.id);
  let result = null;

  const getsingleprojectData = async () => {
    // result = await fetch(
    //   `http://127.0.0.1:3000/api/v1/projects/singleProject/${params.id}`
    // );
    // result = await result.json();
    // setProject(result.data.pr);
    // console.warn(result.data.pr);

    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/v1/projects/${params.id}`
      );
      const result = await response.json();
      setProject(result.data.pr);
      // console.warn(result);
    } catch (error) {
      console.error("Error fetching project data: ", error);
      console.warn("Error fetching project data: ", error);
      setProject(null); // Set project to null on error
    }
  };
  useEffect(() => {
    getsingleprojectData();
  }, []);

  //   console.warn(project);
  //   return <h1>hello</h1>;
  return <DisplayProject project={project} />;
  // return <DisplayProject project={project} />;
}

function DisplayProject({ project }) {
  const [like, setLike] = useState(false);
  // const [studentsArray,setstudentsArray] =useState([]);
  // const []
  //const params = useParams();
  const changeLike = async () => {
    const projectid = project._id;
    console.warn(project._id);

    if (like) {
      console.warn(like);
      let result = await fetch(
        `http://localhost:3000/api/v1/projects/home/dislike/${projectid}`,
        { method: "put" }
      );
      result = await result.json();
      // console.warn("result : ", result);
      // console.warn("url : ", result.data.pr.video_url);
      setLike(!like);
      project.likes = project.likes - 1;
    } else {
      console.warn(like);
      let result = await fetch(
        `http://localhost:3000/api/v1/projects/home/like/${projectid}`,
        {
          method: "put",
        }
      );
      result = await result.json();
      console.warn(result);
      setLike(!like);
      project.likes = project.likes + 1;
    }
  };

  const [students, setStudents] = useState([]);
  const [tech, setTech] = useState([]);

  const setArray = async () => {
    setStudents([project.made_by_students]);
    setTech([project.tech_stack]);
    // console.warn("project : ", project);
  };

  useEffect(() => {
    setArray();
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div key={project._id} className="grid grid-cols-10 my-8 mx-14 gap-12">
      <div className="col-span-7 flex flex-col">
        <h1
          style={{
            fontFamily: " Signika Negative, sans-serif",
            fontSize: "2em",
          }}
        >
          <u>Project Name</u> : {project.project_title}
        </h1>
        <div>
          <div>
            <video controls controlsList="nodownload">
              <source src={project.video_url} type="video/mp4" />
            </video>
          </div>
        </div>
        <Button
          variant={like ? "danger" : "outline-danger"}
          onClick={changeLike}
          style={{ maxWidth: "100px", marginTop: "10px", color: "black" }}
        >
          Likes: {project.likes}
        </Button>
        <div>
          <h2
            style={{
              marginTop: "40px",
              fontFamily: " Signika Negative, sans-serif",
            }}
          >
            Project Description
          </h2>
          <p>{project.project_description}</p>
        </div>
      </div>

      <div className="col-span-3">
        <div>
          <div class="mainC" style={{ marginTop: "50px" }}>
            <div class="currentplaying">
              <h2
                class="heading"
                style={{
                  marginTop: "0px",
                  textAlign: "center",
                  fontFamily: " Signika Negative, sans-serif",
                  fontSize: "2em",
                }}
              >
                College
              </h2>
            </div>

            <div
              class="loader"
              style={{ justifyContent: "center", fontSize: "1.4em" }}
            >
              <div class="song">
                <p
                  class="name"
                  style={{
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  <strong>{project.college_name}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr></hr>
        {/* <div>
          <div class="mainC" style={{ marginTop: "5px" }}>
            <div class="currentplaying">
              <h2
                class="heading"
                style={{
                  marginTop: "0px",
                  textAlign: "center",
                  fontFamily: " Signika Negative, sans-serif",
                  fontSize: "2em",
                }}
              >
                Team Leader{" "}
              </h2>
            </div>

            <div class="loader" style={{ fontSize: "1.4em" }}>
              <div class="song">
                <p
                  class="name"
                  style={{
                    fontFamily: " sans-serif",
                  }}
                >
                  <strong>{project.leader}</strong>
                </p>
              </div>
            </div>
          </div>
        </div> */}
        <div style={{}}>
          <div class="mainC">
            <div class="currentplaying">
              <h2
                class="heading"
                style={{
                  marginTop: "0px",
                  textAlign: "center",
                  fontFamily: " Signika Negative, sans-serif",
                  fontSize: "2em",
                }}
              >
                Team Leader
              </h2>
            </div>

            <div class="loader">
              <div class="song">
                <p
                  class="name"
                  style={{ fontFamily: " sans-serif", fontSize: "1.3em" }}
                >
                  {project.leader}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{}}>
          <div class="mainC">
            <div class="currentplaying">
              <h2
                class="heading"
                style={{
                  marginTop: "0px",
                  textAlign: "center",
                  fontFamily: " Signika Negative, sans-serif",
                  fontSize: "2em",
                }}
              >
                Team Members
              </h2>
            </div>
            {project.made_by_students && project.made_by_students.length > 0 ? (
              project.made_by_students.map((student, index) => (
                <div class="loader" key={index}>
                  <div class="song">
                    <p
                      class="name"
                      style={{ fontFamily: " sans-serif", fontSize: "1.3em" }}
                    >
                      {student}
                    </p>
                    <p class="artist">
                      <i>Team Member</i>
                    </p>
                  </div>
                  {/* <div class="albumcover"></div>
                  <div class="play"></div> */}
                </div>
              ))
            ) : (
              <p class="no-members">No team members found</p>
            )}
          </div>
        </div>

        <hr style={{ solid: "black" }}></hr>
        <div>
          <div class="mainC">
            <div class="currentplaying">
              <h2
                class="heading"
                style={{
                  marginTop: "0px",
                  textAlign: "center",
                  fontFamily: " Signika Negative, sans-serif",
                  fontSize: "2em",
                }}
              >
                Techstack
              </h2>
            </div>
            {project.tech_stack && project.tech_stack.length > 0 ? (
              project.tech_stack.map((a, index) => (
                <div class="loader" key={index}>
                  <div class="song">
                    <p class="name">{a}</p>
                  </div>
                  {/* <div class="albumcover"></div>
                  <div class="play"></div> */}
                </div>
              ))
            ) : (
              <p class="no-members">No team members found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  //   <PageWrapper className="grid grid-col-10">
  //     <LeftSection className="col-span-7 flex">
  //       <h1>Project Name</h1>
  //       <VideoPlayer className="grow">
  //         <VideoContainer>
  //           <video controls controlsList="nodownload">
  //             <source
  //               src={
  //                 "https://res.cloudinary.com/dpn9zrpa8/video/upload/v1698445840/videos/qlaom9fcpx3dsp8t942x.mp4"
  //               }
  //               type="video/mp4"
  //             />
  //           </video>
  //         </VideoContainer>
  //       </VideoPlayer>
  //       <ProjectInfo>
  //         <h2>Project Description</h2>
  //         <p>Your project description goes here.</p>
  //       </ProjectInfo>
  //     </LeftSection>

  //     <RightSection>
  //       <CollegeInfo>
  //         <h2>College Name</h2>
  //       </CollegeInfo>
  //       <TeamMembers>
  //         <h2>Team Members</h2>
  //         <ul>
  //           <li>Team Member 1</li>
  //           <li>Team Member 2</li>
  //         </ul>
  //       </TeamMembers>
  //       <TechStack>
  //         <h2>Tech Stack</h2>
  //         <p>Your tech stack goes here.</p>
  //       </TechStack>
  //     </RightSection>
  //   </PageWrapper>
}

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const PageWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   padding: 20px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const LeftSection = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   margin-left: 20px;
//   padding: 10px;
// `;

// const VideoPlayer = styled.div`
//   width: 100%; /* Take up 90% of the available width */
//   max-width: 2000px; /* Maximum width of 1200px */
//   height: 0;
//   padding-top: ${(9 / 16) * 100}%; /* 16:9 aspect ratio */
//   border: 2px solid #ccc;
//   overflow: hidden;
//   position: relative;
//   animation: ${fadeIn} 1s ease;

//   @media (max-width: 2000px) {
//     width: 100%;
//     max-width: none;
//   }
// `;

// const VideoContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
// `;

// const ProjectInfo = styled.div`
//   margin-top: 0px;
// `;

// const RightSection = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   padding: 20px;
//   margin-left: 20px;
// `;

// const CollegeInfo = styled.div`
//   margin-bottom: 20px;
// `;

// const TeamMembers = styled.div`
//   margin-bottom: 20px;
// `;

// const TechStack = styled.div`
//   margin-bottom: 20px;
// `;
