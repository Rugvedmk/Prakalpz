const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { log } = require("console");
const app = require("./app");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config({
  path: "./config.env",
});

app.use(cors());

const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(`name of the database is ${con.connection.name}`);
    console.log("successfully connected to the database");
    console.log(``);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`App running ${process.env.PORT}`);
});
