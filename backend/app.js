const express = require("express");
const morgan = require("morgan");
const projectRouter = require("./routes/projectRoutes");
const userRouter = require("./routes/userRoute");
const collegeRouter = require("./routes/collegeRoutes");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use((req, res, next) => {
  req.time = new Date().toISOString;
  next();
});
// const projects =
//app.use("/v1/projects", projects);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/college", collegeRouter);
app.use("/api/v1/users", userRouter);
module.exports = app;
