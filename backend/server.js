//* Require method
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { body } = require("express-validator");
const path = require("path");

// import Routes middleware
const catsController = require("./routes/cats");
const userController = require("./routes/user");

// App config
const app = express();
dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Routes middleware
app.use("/api/cats", catsController);
app.use("/api/users", userController);

// API endpoints
app.get("/", (req, res) => {
  res.status(200).send("API working!");
});

//for build
// for all routes that aren't API routes, heroku will serve the static page/frontend/index.html from the build folder
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// DB Config
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

// Listener
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// console.log("JWT_SECRET", process.env.JWT_SECRET);
// console.log("process.env.PORT", process.env.PORT);
